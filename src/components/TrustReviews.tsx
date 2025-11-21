import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Marcus Chen",
    location: "San Francisco, CA",
    rating: 5,
    text: "Legal Compass helped me understand my tenant rights when my landlord tried to raise rent illegally. The AI explained everything in plain English and even suggested free legal aid resources in my area.",
    date: "2 weeks ago"
  },
  {
    name: "Sarah Mitchell",
    location: "Austin, TX",
    rating: 5,
    text: "I was drowning in legal jargon after a car accident. This platform broke everything down step-by-step and connected me with an affordable lawyer who actually cared. Best $4.99 I've ever spent.",
    date: "1 month ago"
  },
  {
    name: "David Rodriguez",
    location: "Miami, FL",
    rating: 5,
    text: "As a small business owner, I can't afford a full-time lawyer. Legal Compass has been a lifesaver for contract reviews and basic legal questions. The document templates alone are worth the subscription.",
    date: "3 weeks ago"
  },
  {
    name: "Emily Thompson",
    location: "Chicago, IL",
    rating: 5,
    text: "Going through a custody battle and couldn't afford expensive legal help. The AI helped me prepare my documents and understand court procedures. It gave me confidence when I felt completely lost.",
    date: "1 week ago"
  },
  {
    name: "James Park",
    location: "Seattle, WA",
    rating: 5,
    text: "I was skeptical at first, but the AI actually knows its stuff. Got clear answers about employment discrimination and was connected with a pro bono attorney in my area. This service is a game-changer.",
    date: "2 months ago"
  },
  {
    name: "Rachel Adams",
    location: "Boston, MA",
    rating: 5,
    text: "Finally, legal help that doesn't cost hundreds per hour. The AI caught details in my lease that I would have missed. Already recommended it to three friends dealing with landlord issues.",
    date: "3 days ago"
  }
];

export const TrustReviews = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Real People, Real Results
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join thousands who found affordable legal clarity when they needed it most
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
