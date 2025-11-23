import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, BookOpen, Scale, HelpCircle } from "lucide-react";

/**
 * Internal Linking Strategy Component
 * 
 * Implements Phase 1 recommendation: Leverage Internal Linking for Authority Flow
 * Strategically links related content to boost page authority
 */

export const RelatedResourcesLinks = () => {
  const links = [
    {
      href: "/templates",
      icon: FileText,
      title: "Legal Templates",
      description: "50+ free attorney-reviewed templates",
    },
    {
      href: "/resources",
      icon: BookOpen,
      title: "Legal Resources",
      description: "Comprehensive guides and articles",
    },
    {
      href: "/faq",
      icon: HelpCircle,
      title: "FAQ",
      description: "Common questions answered",
    },
    {
      href: "/find-lawyers",
      icon: Scale,
      title: "Find Lawyers",
      description: "Connect with verified attorneys",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {links.map((link) => (
        <Link key={link.href} to={link.href} className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
            <CardContent className="p-6">
              <link.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

interface TopicLink {
  href: string;
  text: string;
}

interface RelatedTopicsProps {
  topic: string;
  links: TopicLink[];
}

export const RelatedTopicsLinks = ({ topic, links }: RelatedTopicsProps) => {
  return (
    <div className="bg-muted/30 border border-border rounded-lg p-6 my-8">
      <h2 className="text-xl font-bold mb-4 text-foreground">
        Related {topic} Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="text-primary hover:text-primary/80 hover:underline font-medium text-sm transition-colors"
          >
            → {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const BottomCTA = () => {
  return (
    <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-8 text-center my-12">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        Need Help With Your Legal Issue?
      </h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Get instant AI-powered legal guidance for free. Ask questions, analyze your case, and connect with verified attorneys.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/?chat=true">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
            Get Free AI Legal Help
          </button>
        </Link>
        <Link to="/templates">
          <button className="bg-background hover:bg-muted text-foreground border border-border px-6 py-3 rounded-lg font-semibold transition-colors">
            Browse Legal Templates
          </button>
        </Link>
      </div>
    </div>
  );
};
