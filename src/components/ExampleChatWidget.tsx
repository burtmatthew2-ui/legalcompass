import { useState } from "react";
import { Card } from "./ui/card";
import { MessageSquare, User, Bot, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const exampleConversation = [
  {
    role: "user",
    content: "I'm being evicted but my landlord never fixed the broken heater. Do I have a case?",
  },
  {
    role: "assistant",
    content:
      "This is a strong case! Landlords have a legal duty to maintain habitable conditions, including adequate heating. Here's what you should know:\n\n✓ **Habitability Violation**: Broken heating is a breach of the implied warranty of habitability in all 50 states\n\n✓ **Retaliatory Eviction**: If the eviction came after you complained about repairs, this may be illegal retaliation\n\n✓ **Your Options**:\n• File a motion to stay the eviction\n• Countersue for constructive eviction\n• Withhold rent (varies by state)\n\n**I can connect you with a tenant rights attorney in your area who can help you fight this eviction. They typically offer free consultations.**",
  },
];

export const ExampleChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Legal Help
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            See Legal Compass in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real example of how our platform helps you understand your rights and connect with attorneys
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl border-2 border-border/50 bg-card/60 backdrop-blur-sm">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-primary via-primary to-accent p-5 flex items-center justify-between text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg">Legal Compass AI</span>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Online • Ready to help
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-white/20"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Minimize" : "Expand"}
            </Button>
          </div>

          {/* Chat messages */}
          <div className="p-6 space-y-6 bg-gradient-to-b from-muted/30 to-background min-h-[400px]">
            {exampleConversation.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-primary-foreground" />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] rounded-2xl p-5 shadow-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border-2 border-border/50 text-foreground"
                  }`}
                >
                  <p className={`leading-relaxed whitespace-pre-line ${!isExpanded && index === 1 ? "line-clamp-4" : ""}`}>
                    {message.content}
                  </p>
                  
                  {message.role === "assistant" && isExpanded && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <Button
                        onClick={() => navigate('/auth')}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Get Connected with an Attorney Now
                      </Button>
                    </div>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
            ))}

            {!isExpanded && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(true)}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  See Full Conversation & Get Help
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-muted/50 px-6 py-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">100% Confidential</strong> • All conversations are attorney-client privileged
            </p>
          </div>
        </Card>

        {isExpanded && (
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-card/60 border border-border/50">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">Instant Analysis</p>
              <p className="text-xs text-muted-foreground">AI-powered legal research</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/60 border border-border/50">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">Attorney Matching</p>
              <p className="text-xs text-muted-foreground">Connect within 24 hours</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card/60 border border-border/50">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">Full Case Management</p>
              <p className="text-xs text-muted-foreground">Messaging, docs & signatures</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
