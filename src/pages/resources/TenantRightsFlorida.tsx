import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const TenantRightsFlorida = () => {
  return (
    <>
      <Helmet>
        <title>Tenant Rights in Florida: Complete 2025 Guide | Legal Compass</title>
        <meta name="description" content="Florida tenant rights guide covering security deposits, eviction laws, repairs, and landlord obligations under Florida Statutes Chapter 83." />
        <meta name="keywords" content="Florida tenant rights, renter protections Florida, FL security deposit laws, Florida eviction process, landlord tenant law Florida" />
        <link rel="canonical" href="https://legalcompass.shop/resources/tenant-rights-florida" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <Link to="/resources" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>All Resources</span>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <article className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Scale className="h-5 w-5" />
                <span className="text-sm font-semibold">Tenant Rights</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Tenant Rights in Florida: Essential Guide for Renters
              </h1>
              <p className="text-lg text-muted-foreground">
                Understand Florida tenant protections, security deposit rules, and eviction procedures.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p>
                Florida's landlord-tenant law is governed primarily by Chapter 83 of the Florida Statutes. While Florida is generally considered landlord-friendly, tenants still have important rights, especially regarding security deposits, habitability, and eviction procedures. Whether you're renting in Miami, Tampa, Orlando, or Jacksonville, knowing these protections can help you navigate disputes effectively.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Security Deposit Requirements</h2>
              <p>
                Florida law does not limit the amount landlords can charge for security deposits, though one to two months' rent is typical. Under Florida Statute § 83.49, landlords must hold security deposits in one of three ways: in a separate non-interest-bearing account, in a separate interest-bearing account (with interest paid to tenant), or posted as a surety bond.
              </p>
              <p>
                Within 30 days of receiving your deposit, landlords must notify you in writing of the bank name and address where the deposit is held. After you move out, landlords have 15 days to return your full deposit, or 30 days to send a written notice of intent to impose a claim on the deposit. If they miss these deadlines, they forfeit the right to make any deductions.
              </p>
              <p>
                Common lawful deductions include unpaid rent, damage beyond normal wear and tear, and costs to restore the unit to its original condition. Landlords must provide an itemized list of deductions. If you disagree with deductions, you have 15 days to object in writing.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Eviction Process in Florida</h2>
              <p>
                Florida's eviction process is relatively fast. For nonpayment of rent, landlords must provide a 3-Day Notice to Pay Rent or Vacate. If you don't pay or move out, the landlord can file an eviction lawsuit. Unlike some states, Florida's 3-day notice does not include weekends or holidays, making the deadline very strict.
              </p>
              <p>
                For lease violations other than nonpayment, landlords must provide a 7-Day Notice to Cure or Vacate. If the violation is curable (like having an unauthorized pet) and you fix it, the eviction process stops. After filing the eviction lawsuit, a hearing is typically scheduled within 5-30 days.
              </p>
              <p>
                Florida law prohibits "self-help" evictions. Landlords cannot lock you out, remove your belongings, or shut off utilities to force you to leave. If they do, you can sue for actual damages or three months' rent, whichever is greater, plus attorney's fees.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Habitability and Repairs</h2>
              <p>
                Florida law requires landlords to maintain rental properties in habitable condition. Under § 83.51, landlords must comply with building, housing, and health codes, maintain the roof, windows, screens, doors, and structural components, and provide functioning plumbing, hot water, and heat.
              </p>
              <p>
                If your landlord fails to maintain the property, you must provide written notice describing the problem. The landlord then has 7 days to make repairs (or 20 days for issues that reasonably require more time). If they don't, you can terminate the lease, withhold rent, or sue for damages. Florida does not have a formal "repair and deduct" statute, but courts may allow it in limited circumstances.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Retaliation Protections</h2>
              <p>
                Florida law protects tenants from retaliation under § 83.64. Landlords cannot increase rent, decrease services, or threaten eviction because you complained about code violations, organized a tenant group, or exercised your legal rights. If you believe your landlord is retaliating, you can raise this as a defense in court.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Notice Requirements for Lease Termination</h2>
              <p>
                For month-to-month tenancies, either party must provide at least 15 days' written notice before the next rental payment due date. For annual leases, the lease typically terminates automatically at the end of the term unless renewed. Landlords must provide proper notice if they choose not to renew, typically 30-60 days depending on the lease terms.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Florida tenant law involves strict timelines and procedural requirements. If you're facing an eviction, security deposit dispute, or repair issue, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can provide detailed research on Florida Statutes, local ordinances, and case law relevant to your specific situation.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/tenant-rights-texas" className="text-primary hover:underline">
                  Tenant Rights in Texas
                </Link>
                <Link to="/resources/eviction-notice-laws" className="text-primary hover:underline">
                  Eviction Notice Laws by State
                </Link>
                <Link to="/resources/security-deposit-return-timeline" className="text-primary hover:underline">
                  Security Deposit Return Timeline
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Dealing with a Florida Landlord Issue?</h3>
              <p className="text-muted-foreground mb-6">
                Get personalized Florida tenant law research with Legal Compass AI.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Legal Compass AI Free
                </Button>
              </Link>
            </div>
          </article>
        </div>
        <FloatingAIButton topicContext="Tenant Rights in Florida" />
        <Footer />
      </div>
    </>
  );
};

export default TenantRightsFlorida;
