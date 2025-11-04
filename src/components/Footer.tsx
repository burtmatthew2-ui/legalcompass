import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Shield, BookOpen, Scale, Lock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card/30 backdrop-blur-xl border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-2xl mb-4 flex items-center gap-2 text-foreground">
              <Scale className="h-6 w-6 text-primary" />
              Legal Compass
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Professional legal research platform providing educational resources and AI-powered guidance.
            </p>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3 text-primary" />
                <span>Educational Resources Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-3 w-3 text-primary" />
                <span>Not a Law Firm</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-3 w-3 text-primary" />
                <span>Privacy Guaranteed</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">Resources</h3>
            <ul className="space-y-3">
              {[
                { to: "/resources", label: "All Legal Guides" },
                { to: "/pricing", label: "Pricing" },
                { to: "/install", label: "Install App" },
                { to: "/security", label: "Security & Privacy", icon: Shield }
              ].map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.icon && <link.icon className="h-3 w-3" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">Legal</h3>
            <ul className="space-y-3">
              {[
                { to: "/terms-of-service", label: "Terms of Service" },
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/refund-policy", label: "Refund Policy" }
              ].map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Security
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ End-to-end encryption</li>
              <li>✓ Row-level security</li>
              <li>✓ AI confidentiality</li>
              <li>✓ Private by design</li>
            </ul>
          </div>
        </div>
        
        <Separator className="mb-8 bg-border/50" />
        
        <div className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-amber-900 dark:text-amber-100 text-center">
              <strong className="font-semibold">Important Legal Notice:</strong> Legal Compass provides general legal information and educational resources only. 
              We are not a law firm and do not provide legal advice or representation. The information on this platform should not be relied upon as 
              legal advice for any specific situation. Always consult with a licensed attorney for guidance on your particular circumstances.
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Legal Compass. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">
              Information compiled from public legal sources and reviewed for general accuracy. Laws vary by jurisdiction and change frequently.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
