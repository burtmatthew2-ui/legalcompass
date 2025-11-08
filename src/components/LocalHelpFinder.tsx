import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Phone, ExternalLink } from "lucide-react";

export const LocalHelpFinder = () => {
  const [zipCode, setZipCode] = useState("");

  const handleSearch = () => {
    if (!zipCode) return;
    // In real implementation, this would search for local legal aid
    window.open(`https://www.lawhelp.org/find-help?zipcode=${zipCode}`, '_blank');
  };

  return (
    <section id="local-help" className="py-16 px-6 bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Find Free or Low-Cost Legal Help Near You
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect with legal aid organizations, pro bono lawyers, and community resources in your area
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter your ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Button size="lg" onClick={handleSearch} className="px-8">
                <MapPin className="w-5 h-5 mr-2" />
                Find Help
              </Button>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Helpful Resources:</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://www.lawhelp.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-primary transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">LawHelp.org</div>
                    <div className="text-sm text-slate-600">Free legal aid directory</div>
                  </div>
                </a>

                <a
                  href="https://www.americanbar.org/groups/legal_services/flh-home/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-primary transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">ABA Free Legal Help</div>
                    <div className="text-sm text-slate-600">Find a lawyer program</div>
                  </div>
                </a>

                <a
                  href="tel:211"
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Dial 211</div>
                    <div className="text-sm text-slate-600">Community resources hotline</div>
                  </div>
                </a>

                <a
                  href="https://www.lsc.gov/what-legal-aid/find-legal-aid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-primary transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Legal Services Corp</div>
                    <div className="text-sm text-slate-600">Federal legal aid locator</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
