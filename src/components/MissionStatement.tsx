import { Heart } from "lucide-react";

export const MissionStatement = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-primary/5 to-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Our Mission
        </h2>
        
        <p className="text-xl text-slate-700 leading-relaxed mb-4">
          To make legal help accessible for everyone — especially people who can't afford traditional consultations.
        </p>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          LegalCompass bridges the gap between people in need and the attorneys who can help, 
          creating a fair and transparent marketplace for legal services.
        </p>
      </div>
    </section>
  );
};