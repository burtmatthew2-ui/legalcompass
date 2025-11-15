import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Home, Briefcase, Users, FileText, DollarSign } from "lucide-react";

interface QuizOption {
  icon: any;
  label: string;
  category: string;
}

const categories: QuizOption[] = [
  { icon: Home, label: "Housing & Landlord Issues", category: "housing" },
  { icon: Briefcase, label: "Employment & Workplace", category: "employment" },
  { icon: Users, label: "Family & Relationships", category: "family" },
  { icon: FileText, label: "Contracts & Agreements", category: "contracts" },
  { icon: DollarSign, label: "Debt & Financial Issues", category: "financial" },
  { icon: HelpCircle, label: "Other Legal Matter", category: "other" },
];

export const LegalDirectionFinder = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Navigate to chat with pre-filled category context
    setTimeout(() => {
      navigate(`/?chat=true&category=${category}`);
    }, 500);
  };

  return (
    <section id="direction-finder" className="py-16 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
            Tell us what kind of legal issue you're facing, and we'll guide you to the right help
          </p>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Choose a category below to get started with personalized guidance
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.category}
                  variant={selectedCategory === cat.category ? "default" : "outline"}
                  className="h-auto py-4 md:py-6 flex flex-col items-center gap-2 md:gap-3 hover:border-primary transition-all text-xs md:text-base"
                  onClick={() => handleCategorySelect(cat.category)}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="font-medium text-center leading-tight">{cat.label}</span>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};
