import { supabase } from "@/integrations/supabase/client";
import { logger } from "./logger";

type Message = { role: "user" | "assistant"; content: string };

export async function streamLegalResearch({
  messages,
  uploadedFiles,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  uploadedFiles?: Array<{ name: string; path: string }>;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  logger.log("🚀 Starting stream", { messageCount: messages.length });
  let hasReceivedContent = false;
  
  try {
    const { data, error } = await supabase.functions.invoke("legal-research", {
      body: { messages, uploadedFiles },
    });

    if (error) {
      logger.error("❌ Supabase invoke error:", error);
      if (error.message?.includes("free trial") || error.message?.includes("Subscribe")) {
        throw new Error("TRIAL_EXHAUSTED");
      }
      throw error;
    }
    if (!data) throw new Error("No response from server");

    const response = data as Response;
    logger.log("📡 Response status", { status: response.status });
    
    if (!response.ok) {
      if (response.status === 403) {
        const errorData = await response.json();
        if (errorData.freeTrialExhausted) {
          throw new Error("TRIAL_EXHAUSTED");
        }
        throw new Error(errorData.error || "Access denied");
      }
      throw new Error(`Server error: ${response.status}`);
    }
    
    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;
    let chunkCount = 0;

    logger.log("📥 Starting to read stream...");

    // Optimize stream processing for smooth rendering
    let updateBuffer = "";
    const BATCH_SIZE = 10; // Process chunks in batches
    let chunksSinceUpdate = 0;

    const flushBuffer = () => {
      if (updateBuffer) {
        onDelta(updateBuffer);
        updateBuffer = "";
        chunksSinceUpdate = 0;
      }
    };

    while (!streamDone) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          logger.log("✅ Stream completed", { chunkCount });
          flushBuffer(); // Flush any remaining content
          break;
        }
        
        const chunk = decoder.decode(value, { stream: true });
        textBuffer += chunk;
        chunkCount++;

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            logger.log("🏁 Received [DONE] signal");
            flushBuffer(); // Flush before marking done
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              hasReceivedContent = true;
              updateBuffer += content;
              chunksSinceUpdate++;
              
              // Batch updates to reduce re-renders
              if (chunksSinceUpdate >= BATCH_SIZE) {
                flushBuffer();
              }
            }
          } catch (parseError) {
            logger.warn("⚠️ Failed to parse chunk, will retry:", parseError);
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      } catch (readError) {
        logger.error("❌ Error reading stream chunk:", readError);
        flushBuffer(); // Flush before throwing
        throw readError;
      }
    }

    // Process any remaining buffer
    if (textBuffer.trim()) {
      logger.log("📝 Processing remaining buffer...");
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
          if (content) {
            hasReceivedContent = true;
            onDelta(content);
          }
        } catch {
          logger.warn("⚠️ Ignoring unparseable buffer fragment");
        }
      }
    }

    logger.log("✨ Stream processing complete", { hasReceivedContent });
    onDone();
    
  } catch (error) {
    logger.error("💥 Stream error:", error);
    logger.error("Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      hasReceivedContent
    });
    
    if (onError) {
      onError(error instanceof Error ? error.message : "Failed to get response");
    }
    
    // If we received some content before the error, still call onDone to preserve it
    if (hasReceivedContent) {
      logger.log("⚠️ Calling onDone despite error to preserve partial content");
      onDone();
    }
  }
}
