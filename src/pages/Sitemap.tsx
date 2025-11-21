import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Home, FileText, Users, BookOpen, Shield, DollarSign } from "lucide-react";

const Sitemap = () => {
  const sections = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About Us" },
        { to: "/pricing", label: "Pricing" },
        { to: "/support", label: "Support" },
        { to: "/security", label: "Security & Privacy" },
        { to: "/find-lawyers", label: "Find Lawyers" },
        { to: "/lawyer-signup", label: "For Lawyers" },
      ],
    },
    {
      title: "Tenant Rights",
      icon: FileText,
      links: [
        { to: "/resources/tenant-rights-california", label: "California Tenant Rights" },
        { to: "/resources/tenant-rights-new-york", label: "New York Tenant Rights" },
        { to: "/resources/tenant-rights-texas", label: "Texas Tenant Rights" },
        { to: "/resources/tenant-rights-florida", label: "Florida Tenant Rights" },
        { to: "/resources/landlord-tenant-disputes", label: "Landlord-Tenant Disputes" },
        { to: "/resources/eviction-notice-laws", label: "Eviction Notice Laws" },
        { to: "/resources/security-deposit-return-timeline", label: "Security Deposit Return" },
      ],
    },
    {
      title: "Traffic & Criminal",
      icon: Shield,
      links: [
        { to: "/resources/fight-speeding-ticket-california", label: "Fight Speeding Ticket (CA)" },
        { to: "/resources/fight-speeding-ticket-texas", label: "Fight Speeding Ticket (TX)" },
        { to: "/resources/fight-speeding-ticket-new-york", label: "Fight Speeding Ticket (NY)" },
        { to: "/resources/dui-defense-guide", label: "DUI Defense Guide" },
        { to: "/resources/expunge-criminal-record", label: "Expunge Criminal Record" },
        { to: "/resources/reinstate-drivers-license", label: "Reinstate Driver's License" },
      ],
    },
    {
      title: "Family Law",
      icon: Users,
      links: [
        { to: "/resources/divorce-custody-basics", label: "Divorce & Custody Basics" },
        { to: "/resources/child-support", label: "Child Support Guide" },
        { to: "/resources/custody-modification-guide", label: "Custody Modification" },
        { to: "/resources/restraining-order-guide", label: "Restraining Order Guide" },
      ],
    },
    {
      title: "Employment & Consumer",
      icon: DollarSign,
      links: [
        { to: "/resources/employment-discrimination", label: "Employment Discrimination" },
        { to: "/resources/workers-compensation", label: "Workers' Compensation" },
        { to: "/resources/harassment-law-guide", label: "Harassment Law Guide" },
        { to: "/resources/consumer-refund-rights", label: "Consumer Refund Rights" },
        { to: "/resources/breach-of-contract-freelancers", label: "Contract Breach (Freelancers)" },
      ],
    },
    {
      title: "Business & Legal Forms",
      icon: FileText,
      links: [
        { to: "/resources/llc-formation-guide", label: "LLC Formation Guide" },
        { to: "/resources/trademark-registration-guide", label: "Trademark Registration" },
        { to: "/resources/write-cease-desist-letter", label: "Cease & Desist Letters" },
        { to: "/resources/power-of-attorney-guide", label: "Power of Attorney" },
        { to: "/resources/probate-process", label: "Probate Process" },
      ],
    },
    {
      title: "Personal Injury & Courts",
      icon: BookOpen,
      links: [
        { to: "/resources/personal-injury-claims", label: "Personal Injury Claims" },
        { to: "/resources/small-claims-court-process", label: "Small Claims Court" },
        { to: "/resources/file-bankruptcy", label: "File Bankruptcy" },
        { to: "/resources/defamation-online-reputation", label: "Defamation & Online Reputation" },
      ],
    },
    {
      title: "Legal Information",
      icon: BookOpen,
      links: [
        { to: "/resources", label: "All Legal Resources" },
        { to: "/resources/legal-resources-tools", label: "Legal Research Tools" },
        { to: "/resources/cheapest-legal-aid-comparison", label: "Legal Aid Comparison" },
      ],
    },
    {
      title: "Legal",
      icon: Shield,
      links: [
        { to: "/privacy-policy", label: "Privacy Policy" },
        { to: "/terms-of-service", label: "Terms of Service" },
        { to: "/refund-policy", label: "Refund Policy" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap | Legal Compass - Complete Site Directory</title>
        <meta name="description" content="Complete sitemap of Legal Compass featuring 40+ legal resource guides covering tenant rights, traffic law, family law, employment law, business formation, and platform pages. Find any page quickly." />
        <meta name="keywords" content="sitemap, site directory, legal resources, legal guides, page index" />
        <link rel="canonical" href="https://legalcompass.shop/sitemap" />
        
        <meta property="og:title" content="Sitemap - Complete Site Directory | Legal Compass" />
        <meta property="og:description" content="Browse all pages on Legal Compass - 40+ legal guides, resources, and platform information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalcompass.shop/sitemap" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sitemap",
            "description": "Complete directory of all Legal Compass pages and resources",
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
          <BreadcrumbNav />
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sitemap
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse all pages on Legal Compass - Legal guides, resources, and platform information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
