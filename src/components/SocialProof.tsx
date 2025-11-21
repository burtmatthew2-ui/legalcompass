import { Users, Star, Scale, FileCheck } from "lucide-react";
import { Card } from "./ui/card";

interface SocialProofProps {
  variant?: "compact" | "full";
}

export const SocialProof = ({ variant = "full" }: SocialProofProps) => {
  const stats = [
    {
      icon: Users,
      value: "15,000+",
      label: "Users Helped",
      color: "text-primary"
    },
    {
      icon: Scale,
      value: "500+",
      label: "Verified Lawyers",
      color: "text-green-600"
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "Average Rating",
      color: "text-yellow-600"
    },
    {
      icon: FileCheck,
      value: "50+",
      label: "Legal Templates",
      color: "text-blue-600"
    }
  ];

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 py-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
          <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
          <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
};