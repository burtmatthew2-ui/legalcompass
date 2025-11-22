import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const TenantRightsNewYork = () => {
  return (
    <>
      <Helmet>
        <title>Tenant Rights in New York: NYC & State Guide 2025 | Legal Compass</title>
        <meta name="description" content="Complete guide to New York tenant rights including rent stabilization, security deposits, eviction protections, and NYC-specific regulations." />
        <meta name="keywords" content="New York tenant rights, NYC renter protections, rent stabilization NYC, NY eviction laws, tenant rights New York State" />
        <link rel="canonical" href="https://legalcompass.shop/resources/tenant-rights-new-york" />
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
                Tenant Rights in New York: Complete Guide for NYC & NY State
              </h1>
              <p className="text-lg text-muted-foreground">
                Navigate New York's complex tenant protection laws, from rent stabilization to eviction defenses.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p>
                New York offers some of the most comprehensive tenant protections in the country, particularly in New York City. The Housing Stability and Tenant Protection Act of 2019 significantly strengthened renter rights across the state. Understanding these protections is crucial whether you're renting in Manhattan, Brooklyn, Buffalo, or anywhere in New York State.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Rent Stabilization and Rent Control</h2>
              <p>
                In New York City, approximately one million apartments are rent-stabilized. If your building was built before 1974 and has six or more units, your apartment may be rent-stabilized, which means your rent increases are limited by the Rent Guidelines Board (typically 2-5% annually). Rent-controlled apartments—an even stricter designation—are rare and apply to tenants who have lived continuously in buildings built before 1947 since July 1, 1971.
              </p>
              <p>
                Under the 2019 reforms, landlords can no longer deregulate apartments by raising rent above a certain threshold after vacancy. Once an apartment is stabilized, it generally remains stabilized. Landlords must provide tenants with a lease rider explaining rent stabilization rights and must register rents annually with the New York State Division of Homes and Community Renewal (DHCR).
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Security Deposits and Advance Rent</h2>
              <p>
                New York law limits security deposits to one month's rent. Landlords must deposit your security in an interest-bearing account and provide you with the bank's name and address within 30 days. For buildings with six or more units, landlords must pay you annual interest on your deposit or credit it toward rent.
              </p>
              <p>
                Landlords must return your deposit within 14 days of move-out, along with an itemized list of any deductions and supporting receipts. If they fail to provide an itemized statement, they may forfeit the right to retain any portion of your deposit.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Eviction Protections</h2>
              <p>
                New York's "Good Cause Eviction" protections require landlords to have a legally valid reason to evict tenants. These reasons include nonpayment of rent, violation of lease terms, illegal use of premises, or owner occupancy. Landlords cannot evict in retaliation for tenants exercising their rights, such as reporting violations or joining a tenant organization.
              </p>
              <p>
                Before starting an eviction case, landlords must serve proper notice: typically 14 days for nonpayment of rent in NYC, 30 days for month-to-month tenants who have lived there less than one year, and 90 days for tenants who have lived there more than two years. The Housing Stability and Tenant Protection Act also extended the timeline for eviction proceedings, giving tenants more time to prepare a defense.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Right to Repairs and Habitability</h2>
              <p>
                New York's warranty of habitability requires landlords to maintain rental units in good repair and comply with all health and safety codes. Essential services include heat (at least 68°F from October through May), hot and cold water, electricity, and structural soundness. Units must be free from vermin, mold, and lead paint hazards.
              </p>
              <p>
                If your landlord fails to make repairs, you can report violations to the NYC Department of Housing Preservation and Development (HPD) or your local code enforcement office. You may also be able to withhold rent, make repairs and deduct the cost, or pursue a rent reduction. HP violations can result in fines for landlords and court-ordered repairs.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Lease Renewal Rights</h2>
              <p>
                Tenants in rent-stabilized apartments have the right to lease renewal. Landlords must offer a one- or two-year renewal lease at rates set by the Rent Guidelines Board. If you're not rent-stabilized, your landlord is not required to renew your lease but must provide proper notice if they choose not to renew (typically 30-90 days depending on length of tenancy).
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                New York tenant law is complex, with different rules for NYC, Westchester, Nassau, and the rest of the state. If you're facing an eviction, rent overcharge, or habitability issue, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can help you research New York statutes, DHCR regulations, and relevant case law specific to your situation.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/tenant-rights-california" className="text-primary hover:underline">
                  Tenant Rights in California
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
              <h3 className="text-2xl font-bold mb-3">Need NYC-Specific Legal Research?</h3>
              <p className="text-muted-foreground mb-6">
                Get instant answers about your New York tenant rights with case law citations.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Legal Compass AI Free
                </Button>
              </Link>
            </div>
          </article>
        </div>
        <FloatingAIButton topicContext="Tenant Rights in New York" />
        <Footer />
      </div>
    </>
  );
};

export default TenantRightsNewYork;
