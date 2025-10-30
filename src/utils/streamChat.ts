import { supabase } from "@/integrations/supabase/client";

type Message = { role: "user" | "assistant"; content: string };

export async function streamLegalResearch({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  try {
    const { data, error } = await supabase.functions.invoke("legal-research", {
      body: { messages },
    });

    if (error) {
      // Check for free trial exhaustion or subscription errors
      if (error.message?.includes("free trial") || error.message?.includes("Subscribe")) {
        throw new Error("TRIAL_EXHAUSTED");
      }
      throw error;
    }
    if (!data) throw new Error("No response from server");

    // The data is the raw Response object from the edge function
    const response = data as Response;
    
    // Check if response indicates an error (403 for trial exhausted)
    if (!response.ok) {
      if (response.status === 403) {
        const errorData = await response.json();
        if (errorData.freeTrialExhausted) {
          throw new Error("TRIAL_EXHAUSTED");
        }
        throw new Error(errorData.error || "Access denied");
      }
      throw new Error("Failed to start stream");
    }
    
    if (!response.body) {
      throw new Error("Failed to start stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          /* ignore partial leftovers */
        }
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream error:", error);
    if (onError) {
      onError(error instanceof Error ? error.message : "Failed to get response");
    }
  }
}
