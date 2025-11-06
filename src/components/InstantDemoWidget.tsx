import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Loader2, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const exampleQuestions = [
  "What are my rights as a tenant in California?",
  "How do I protect my intellectual property?",
  "What should I know before starting an LLC?",
];

export const InstantDemoWidget = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer("");

    try {
      const { data, error } = await supabase.functions.invoke("faq-ai", {
        body: { question: question.trim() },
      });

      if (error) throw error;
      setAnswer(data.answer || "I apologize, but I couldn't generate a response. Please try signing up for the full experience.");
      
      // Show signup CTA after demo
      setTimeout(() => {
        toast.success("Want more detailed legal research? Sign up for 3 free questions!", {
          duration: 5000,
          action: {
            label: "Sign Up Free",
            onClick: () => navigate("/auth"),
          },
        });
      }, 2000);
    } catch (error: any) {
      console.error("Demo error:", error);
      toast.error("Try this feature by signing up for free!");
      setTimeout(() => navigate("/auth"), 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-50 border-primary/20 shadow-lg">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Try It Instantly - No Signup Required</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Ask a Legal Question Right Now
          </h2>
          <p className="text-slate-600">
            Experience our AI-powered legal research in action. Ask any legal question below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your legal question here... (e.g., 'What are my rights during a traffic stop in Texas?')"
              className="min-h-[100px] text-base resize-none border-slate-300 focus:border-primary"
              disabled={isLoading}
            />
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-slate-500">Quick examples:</span>
              {exampleQuestions.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuestion(q)}
                  className="text-xs px-2 py-1 bg-white border border-slate-200 rounded hover:border-primary hover:bg-primary/5 transition-colors"
                  disabled={isLoading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-base"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Researching Legal Databases...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Get Instant Answer
              </>
            )}
          </Button>
        </form>

        {answer && (
          <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Research Result:
            </h3>
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
              {answer}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">
                Want more detailed research with case citations and multi-jurisdiction analysis?
              </p>
              <Button
                onClick={() => navigate("/auth")}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
              >
                Start Free Trial - 3 Questions Free
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
