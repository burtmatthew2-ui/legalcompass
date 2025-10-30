import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card/30 backdrop-blur-xl border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-2xl mb-4 bg-clip-text text-transparent bg-[var(--gradient-primary)]">Legal Compass</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered legal research tool. Not a substitute for professional legal advice.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-foreground">Resources</h3>
            <ul className="space-y-3">
              {[
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
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Legal Compass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
