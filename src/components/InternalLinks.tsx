import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, FileText, BookOpen, Users } from "lucide-react";

export const InternalLinks = () => {
  const linkSections = [
    {
      title: "Popular Resources",
      icon: BookOpen,
      links: [
        { to: "/resources/tenant-rights-california", label: "California Tenant Rights" },
        { to: "/resources/tenant-rights-new-york", label: "New York Tenant Rights" },
        { to: "/resources/tenant-rights-texas", label: "Texas Tenant Rights" },
        { to: "/resources/fight-speeding-ticket-california", label: "Fight Speeding Ticket (CA)" },
        { to: "/resources/small-claims-court-process", label: "Small Claims Court Guide" },
        { to: "/resources/divorce-custody-basics", label: "Divorce & Custody Basics" },
      ],
    },
    {
      title: "Legal Topics",
      icon: Scale,
      links: [
        { to: "/resources/employment-discrimination", label: "Employment Discrimination" },
        { to: "/resources/personal-injury-claims", label: "Personal Injury Claims" },
        { to: "/resources/file-bankruptcy", label: "Filing Bankruptcy" },
        { to: "/resources/expunge-criminal-record", label: "Expunge Criminal Record" },
        { to: "/resources/workers-compensation", label: "Workers' Compensation" },
        { to: "/resources/dui-defense-guide", label: "DUI Defense Guide" },
      ],
    },
    {
      title: "Business & Property",
      icon: FileText,
      links: [
        { to: "/resources/llc-formation-guide", label: "LLC Formation Guide" },
        { to: "/resources/trademark-registration-guide", label: "Trademark Registration" },
        { to: "/resources/landlord-tenant-disputes", label: "Landlord-Tenant Disputes" },
        { to: "/resources/breach-of-contract-freelancers", label: "Contract Breach (Freelancers)" },
        { to: "/resources/write-cease-desist-letter", label: "Cease & Desist Letters" },
        { to: "/resources/power-of-attorney-guide", label: "Power of Attorney" },
      ],
    },
    {
      title: "Platform",
      icon: Users,
      links: [
        { to: "/find-lawyers", label: "Find a Lawyer" },
        { to: "/pricing", label: "Pricing Plans" },
        { to: "/about", label: "About Legal Compass" },
        { to: "/support", label: "Support Center" },
        { to: "/lawyer-signup", label: "For Lawyers" },
        { to: "/resources", label: "All Legal Resources" },
      ],
    },
  ];

  return (
    <section className="py-12 bg-slate-50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Explore More Legal Resources
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {linkSections.map((section) => (
            <Card key={section.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <section.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
