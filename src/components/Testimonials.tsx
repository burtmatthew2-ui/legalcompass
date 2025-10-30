import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Small Business Owner",
    content: "Legal Compass helped me understand contract loopholes that saved my business thousands. The AI research is incredibly thorough.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Freelance Consultant",
    content: "Finally, affordable legal research that actually works. I use it weekly to review client agreements and protect my interests.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    role: "Startup Founder",
    content: "Game changer for early-stage founders. Instead of paying $$$ for basic legal consultations, I get instant AI-powered analysis.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-[var(--gradient-primary)]">
          Trusted by Thousands
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          See what our users are saying about Legal Compass
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/70 border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
