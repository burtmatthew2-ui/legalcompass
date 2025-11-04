import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { BookOpen, ArrowRight, Home } from "lucide-react";
import { Helmet } from "react-helmet";

const resources = [
  {
    title: "Tenant Rights in California",
    slug: "tenant-rights-california",
    description: "Comprehensive guide to renter protections, security deposits, and eviction laws in California.",
    category: "Tenant Rights"
  },
  {
    title: "Tenant Rights in New York",
    slug: "tenant-rights-new-york",
    description: "Essential information about NYC and NY State tenant protections, rent control, and lease laws.",
    category: "Tenant Rights"
  },
  {
    title: "Tenant Rights in Texas",
    slug: "tenant-rights-texas",
    description: "Know your rights as a Texas tenant, including security deposit rules and eviction procedures.",
    category: "Tenant Rights"
  },
  {
    title: "Tenant Rights in Florida",
    slug: "tenant-rights-florida",
    description: "Florida tenant protections, landlord responsibilities, and eviction defense strategies.",
    category: "Tenant Rights"
  },
  {
    title: "How to Fight a Speeding Ticket in California",
    slug: "fight-speeding-ticket-california",
    description: "Step-by-step guide to contesting speeding tickets and traffic violations in California courts.",
    category: "Traffic Law"
  },
  {
    title: "How to Fight a Speeding Ticket in Texas",
    slug: "fight-speeding-ticket-texas",
    description: "Strategies for challenging speeding tickets and defending traffic violations in Texas.",
    category: "Traffic Law"
  },
  {
    title: "How to Fight a Speeding Ticket in New York",
    slug: "fight-speeding-ticket-new-york",
    description: "Navigate NY traffic court and learn effective defenses against speeding tickets.",
    category: "Traffic Law"
  },
  {
    title: "Small Claims Court Process: Complete Guide",
    slug: "small-claims-court-process",
    description: "File and win in small claims court with our complete step-by-step guide for all 50 states.",
    category: "Court Procedures"
  },
  {
    title: "Eviction Notice Laws by State",
    slug: "eviction-notice-laws",
    description: "Understand eviction notice requirements, timelines, and tenant defenses across US states.",
    category: "Tenant Rights"
  },
  {
    title: "Security Deposit Return: State-by-State Guide",
    slug: "security-deposit-return-timeline",
    description: "When landlords must return deposits, deductions rules, and how to recover wrongfully withheld funds.",
    category: "Tenant Rights"
  },
  {
    title: "Breach of Contract: Freelancer's Guide",
    slug: "breach-of-contract-freelancers",
    description: "What to do when clients breach contracts, including demand letters and legal remedies.",
    category: "Contract Law"
  },
  {
    title: "Defamation and Online Reputation Protection",
    slug: "defamation-online-reputation",
    description: "Protect your reputation from false statements, libel, and online defamation attacks.",
    category: "Personal Rights"
  },
  {
    title: "Divorce and Custody Basics: State Guide",
    slug: "divorce-custody-basics",
    description: "Navigate divorce proceedings, child custody arrangements, and family court procedures.",
    category: "Family Law"
  },
  {
    title: "Consumer Refund Rights: Products & Services",
    slug: "consumer-refund-rights",
    description: "Know your rights to refunds, returns, and chargebacks under consumer protection laws.",
    category: "Consumer Law"
  },
  {
    title: "How to Write a Cease and Desist Letter",
    slug: "write-cease-desist-letter",
    description: "Draft effective cease and desist letters for harassment, infringement, and contract violations.",
    category: "Legal Documents"
  },
  {
    title: "How to File for Bankruptcy: Chapter 7 vs 13",
    slug: "file-bankruptcy",
    description: "Complete guide to filing bankruptcy, eligibility requirements, costs, and step-by-step process.",
    category: "Financial Law"
  },
  {
    title: "Workers' Compensation Claims Guide",
    slug: "workers-compensation",
    description: "Everything you need to know about filing workers' comp claims, benefits, and what to do if denied.",
    category: "Employment Law"
  },
  {
    title: "Child Support Calculation & Guidelines",
    slug: "child-support",
    description: "State-by-state child support calculation methods, modification process, and enforcement.",
    category: "Family Law"
  },
  {
    title: "Employment Discrimination Laws",
    slug: "employment-discrimination",
    description: "Understanding protected classes, types of discrimination, and how to file an EEOC complaint.",
    category: "Employment Law"
  },
  {
    title: "How to Expunge Your Criminal Record",
    slug: "expunge-criminal-record",
    description: "State-by-state guide to expungement, eligibility requirements, costs, and the complete process.",
    category: "Criminal Law"
  }
];

const categories = Array.from(new Set(resources.map(r => r.category)));

const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Legal Resources & Guides | Legal Compass</title>
        <meta name="description" content="Free legal guides covering tenant rights, traffic tickets, small claims, contracts, and more. Expert legal information to help you understand your rights." />
        <meta name="keywords" content="legal guides, tenant rights, traffic tickets, small claims court, legal resources, free legal information" />
        <link rel="canonical" href="https://legalcompass.shop/resources" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          {/* Header */}
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Try Legal Compass AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-4">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Legal Resources & Guides
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Free legal information covering the most common legal questions. Get personalized answers with <Link to="/auth" className="text-primary hover:underline">Legal Compass AI</Link>.
              </p>
            </div>

            {/* Browse by Category */}
            {categories.map(category => {
              const categoryResources = resources.filter(r => r.category === category);
              return (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="h-1 w-8 bg-primary rounded"></span>
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryResources.map(resource => (
                      <Link
                        key={resource.slug}
                        to={`/resources/${resource.slug}`}
                        className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                      >
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium">
                          Read Guide
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Newsletter */}
            <div className="mt-16">
              <NewsletterSignup />
            </div>

            {/* CTA Section */}
            <div className="mt-8 bg-primary/10 border-2 border-primary/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Need Personalized Legal Research?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These guides provide general information. For research specific to your situation, try Legal Compass AI—get instant answers with case law citations.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Legal Compass AI Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Resources;
