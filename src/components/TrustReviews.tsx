import { useEffect, useState, Suspense, lazy } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ReviewsSkeleton } from "./ReviewsSkeleton";
import { ErrorBoundary } from "./ErrorBoundary";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Generate structured data for reviews
  const reviewsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": reviews.map((review, index) => ({
      "@type": "Review",
      "position": index + 1,
      "author": {
        "@type": "Person",
        "name": review.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": review.location
        }
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5
      },
      "reviewBody": review.text,
      "datePublished": new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }))
  };

  useEffect(() => {
    // Set loading to false after a short delay to ensure content displays
    const timer = setTimeout(() => setIsLoading(false), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    // Auto-play functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    // Update current slide
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  return (
    <section className="py-8 md:py-12 px-4 md:px-8 bg-muted/20">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsStructuredData) }}
      />
      
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
          See What Users Are Saying About Us
        </h2>
        
        <ErrorBoundary>
          {isLoading ? (
            <ReviewsSkeleton />
          ) : (
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-card border-border h-full animate-fade-in">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-foreground mb-4 leading-relaxed flex-grow text-sm">
                          "{review.text}"
                        </p>
                        <div className="border-t border-border pt-4 mt-auto">
                          <p className="font-semibold text-foreground text-sm">{review.name}</p>
                          <p className="text-xs text-muted-foreground">{review.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          )}
        </ErrorBoundary>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};