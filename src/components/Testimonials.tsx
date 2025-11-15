import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Divorce Case Client",
    location: "California",
    content: "Legal Compass matched me with an amazing family law attorney within 24 hours. The secure messaging and document signing made everything so easy during a difficult time.",
    rating: 5,
    caseType: "Family Law",
    avatarColor: "from-rose-500 to-pink-600"
  },
  {
    name: "James K.",
    role: "Business Owner",
    location: "Texas",
    content: "I was being evicted unfairly and didn't know what to do. Legal Compass connected me with a tenant rights attorney who helped me understand my rights and fight back successfully.",
    rating: 5,
    caseType: "Landlord-Tenant",
    avatarColor: "from-blue-500 to-indigo-600"
  },
  {
    name: "Maria R.",
    role: "First-Time Homebuyer",
    location: "Florida",
    content: "The platform made it so simple to get legal help for my real estate closing. My attorney was responsive, professional, and the whole process was transparent.",
    rating: 5,
    caseType: "Real Estate",
    avatarColor: "from-emerald-500 to-teal-600"
  }
];

export const Testimonials = () => {
  return (
    <div className="py-20 px-6 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Real Stories, Real Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how Legal Compass has helped thousands of people find the legal help they need
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 border-2 border-background" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-background" />
            </div>
            <span className="text-muted-foreground">
              <strong className="text-foreground">10,000+</strong> satisfied clients
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group relative bg-card/60 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="pt-8 pb-6 px-6 relative z-10">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Case type badge */}
                <div className="inline-block mb-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {testimonial.caseType}
                  </span>
                </div>

                {/* Testimonial content */}
                <p className="text-foreground mb-6 leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                  <Avatar className="w-12 h-12 border-2 border-border">
                    <AvatarFallback className={`bg-gradient-to-br ${testimonial.avatarColor} text-white font-bold`}>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
