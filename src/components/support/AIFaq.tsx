import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, Loader2, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const commonQuestions = [
  "How do I get started with Legal Compass?",
  "What subscription plans are available?",
  "How secure is my legal research data?",
  "Can I export my research findings?",
  "How accurate is the AI legal research?",
];

export const AIFaq = () => {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async (q: string) => {
    if (!q.trim()) return;

    setQuestion(q);
    setIsLoading(true);
    setAnswer("");

    try {
      const { data, error } = await supabase.functions.invoke("faq-ai", {
        body: { question: q },
      });

      if (error) throw error;

      setAnswer(data.answer);
    } catch (error) {
      console.error("Error getting answer:", error);
      toast({
        title: "Error",
        description: "Failed to get answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask any question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAskQuestion(question)}
            disabled={isLoading}
          />
          <Button
            onClick={() => handleAskQuestion(question)}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {answer && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <p className="font-semibold">{question}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {answer}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Common Questions</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {commonQuestions.map((q, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger
                onClick={() => !isLoading && handleAskQuestion(q)}
                className="text-left"
              >
                {q}
              </AccordionTrigger>
              <AccordionContent>
                {isLoading && question === q ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Getting answer...</span>
                  </div>
                ) : answer && question === q ? (
                  <p className="text-sm text-muted-foreground">{answer}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Click to get AI-powered answer
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
