import { Check, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const ComparisonTable = () => {
  const navigate = useNavigate();

  const features = [
    { name: "Average Cost", traditional: "$300-500/hr", legalCompass: "$4.99/month" },
    { name: "Response Time", traditional: "2-5 business days", legalCompass: "Instant (seconds)" },
    { name: "Availability", traditional: "Business hours only", legalCompass: "24/7 access" },
    { name: "Jurisdictions", traditional: "Limited to attorney's practice area", legalCompass: "80+ jurisdictions worldwide" },
    { name: "Case Law Citations", traditional: true, legalCompass: true },
    { name: "Legal Memos", traditional: true, legalCompass: true },
    { name: "Multi-Jurisdiction Comparison", traditional: false, legalCompass: true },
    { name: "Unlimited Questions", traditional: false, legalCompass: true },
    { name: "Document Upload & Analysis", traditional: true, legalCompass: true },
  ];

  return (
    <div className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
            Why Choose Legal Compass?
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Get professional legal research tools at a fraction of the cost
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left p-3 md:p-6 font-semibold text-slate-700 text-sm md:text-base">Feature</th>
                  <th className="text-center p-3 md:p-6 font-semibold text-slate-700 text-sm md:text-base">Traditional Attorney</th>
                  <th className="text-center p-3 md:p-6 bg-primary/5 border-l-4 border-primary">
                    <div className="space-y-1">
                      <span className="block font-bold text-primary text-base md:text-lg">Legal Compass</span>
                      <span className="block text-xs text-slate-600 font-normal">Recommended</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className={`border-b border-slate-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="p-3 md:p-6 font-medium text-slate-900 text-sm md:text-base">{feature.name}</td>
                    <td className="p-3 md:p-6 text-center text-slate-600 text-sm md:text-base">
                      {typeof feature.traditional === "boolean" ? (
                        feature.traditional ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 md:w-5 md:h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        feature.traditional
                      )}
                    </td>
                    <td className="p-3 md:p-6 text-center bg-primary/5 border-l-4 border-primary text-sm md:text-base">
                      {typeof feature.legalCompass === "boolean" ? (
                        feature.legalCompass ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-primary mx-auto font-bold" />
                        ) : (
                          <X className="w-4 h-4 md:w-5 md:h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-primary text-sm md:text-base">{feature.legalCompass}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-blue-50 p-8 text-center border-t-4 border-primary">
            <p className="text-slate-700 mb-4 text-lg">
              <span className="font-bold text-slate-900">Start your legal research journey today.</span> First 3 questions are completely free.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-12 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial Now
            </Button>
            <p className="text-sm text-slate-600 mt-3">
              No credit card required • Cancel anytime
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
