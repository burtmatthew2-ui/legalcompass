import { Heart } from "lucide-react";

export const MissionStatement = () => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-6 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full mb-4 md:mb-6">
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        </div>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
          Our Mission
        </h2>
        
        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-3 md:mb-4 px-4">
          To make legal help accessible for everyone — especially people who can't afford traditional consultations.
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          LegalCompass bridges the gap between people in need and the attorneys who can help, 
          creating a fair and transparent marketplace for legal services.
        </p>
      </div>
    </section>
  );
};