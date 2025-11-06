import { useState } from "react";
import { Card } from "./ui/card";
import { MessageSquare, User, Bot } from "lucide-react";

const exampleConversation = [
  {
    role: "user",
    content: "What are my rights if my landlord wants to enter my apartment without notice?",
  },
  {
    role: "assistant",
    content:
      "In most US states, landlords must provide 24-48 hours notice before entering your apartment, except in emergencies. Let me break down the specific laws:\n\n**California** ([Cal. Civ. Code § 1954](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1954)): Requires 24 hours written notice for non-emergency entry.\n\n**New York** ([N.Y. Real Prop. Law § 235-f](https://www.nysenate.gov/legislation/laws/RPP/235-F)): Requires reasonable notice, typically 24 hours.\n\n**Emergency exceptions** apply for urgent repairs, fire, or safety hazards in all states.",
  },
];

export const ExampleChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-12 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            See Legal Compass in Action
          </h2>
          <p className="text-slate-600">
            Real example of our AI-powered legal research with proper citations
          </p>
        </div>

        <Card
          className="overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="bg-gradient-to-r from-primary to-blue-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">Legal Research Chat</span>
            </div>
            <span className="text-sm opacity-90">
              {isExpanded ? "Click to minimize" : "Click to view"}
            </span>
          </div>

          <div className="p-6 space-y-4 bg-white">
            {exampleConversation.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p
                    className={`text-sm leading-relaxed ${
                      !isExpanded && index === 1 ? "line-clamp-3" : ""
                    }`}
                  >
                    {message.content}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                )}
              </div>
            ))}

            {!isExpanded && (
              <div className="text-center pt-2">
                <p className="text-sm text-primary font-medium">Click to see full response with citations</p>
              </div>
            )}
          </div>
        </Card>

        {isExpanded && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-slate-700">
            <p>
              <strong>Notice:</strong> This is an example conversation showing how Legal Compass provides research with direct source citations. 
              All legal references link to official government sources for verification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
