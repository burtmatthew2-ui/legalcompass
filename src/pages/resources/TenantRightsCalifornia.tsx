import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const TenantRightsCalifornia = () => {
  return (
    <>
      <Helmet>
        <title>Tenant Rights in California: Complete 2025 Guide | Legal Compass</title>
        <meta name="description" content="Know your rights as a California tenant. Learn about security deposits, eviction procedures, rent control, and landlord responsibilities under CA law." />
        <meta name="keywords" content="California tenant rights, renter protections California, CA security deposit laws, California eviction process, rent control California" />
        <link rel="canonical" href="https://legalcompass.shop/resources/tenant-rights-california" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          {/* Header */}
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

          {/* Article */}
          <article className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Scale className="h-5 w-5" />
                <span className="text-sm font-semibold">Tenant Rights</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Tenant Rights in California: Complete 2025 Guide
              </h1>
              <p className="text-lg text-muted-foreground">
                Understanding your rights as a California tenant, from security deposits to eviction protections.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p>
                California has some of the strongest tenant protection laws in the United States. Whether you're renting an apartment in Los Angeles, San Francisco, or anywhere else in the Golden State, understanding your rights is essential to protecting yourself from unlawful landlord practices.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Security Deposit Rights</h2>
              <p>
                Under California Civil Code § 1950.5, landlords can charge a maximum security deposit of two months' rent for unfurnished units and three months' rent for furnished units. Landlords must return your deposit within 21 days of move-out, along with an itemized statement of any deductions. If they fail to do so, you may be entitled to the full deposit plus damages.
              </p>
              <p>
                Landlords can only deduct for unpaid rent, damages beyond normal wear and tear, and cleaning necessary to restore the unit to its original condition. Normal wear and tear—like faded paint or worn carpet from regular use—cannot be deducted from your deposit.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Eviction Protections</h2>
              <p>
                California's Tenant Protection Act of 2019 (AB 1482) provides just-cause eviction protections for most tenants. After living in a rental for 12 months, your landlord can only evict you for specific legal reasons such as nonpayment of rent, lease violations, or the landlord's intent to move into the unit themselves.
              </p>
              <p>
                Before evicting, landlords must provide proper notice: typically 3 days for nonpayment of rent, 30 days for month-to-month tenancies under one year, and 60 days for tenancies over one year. Landlords cannot evict in retaliation for exercising your legal rights, such as requesting repairs or reporting code violations.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Habitability and Repairs</h2>
              <p>
                California law guarantees that your rental unit must be habitable. This means it must have working plumbing, heating, electricity, weather-tight windows and roof, and be free from vermin and mold. Under the implied warranty of habitability, landlords are required to make repairs within a reasonable time after receiving notice.
              </p>
              <p>
                If your landlord fails to make necessary repairs, you have several options: repair and deduct (fix it yourself and deduct the cost from rent), withhold rent until repairs are made, or break the lease due to uninhabitable conditions. Each remedy has specific legal requirements, so it's important to follow proper procedures.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Rent Control and Rent Increases</h2>
              <p>
                Under AB 1482, most California tenants are protected from excessive rent increases. Rent can only be increased once per 12-month period, and the increase is capped at 5% plus the local inflation rate, or 10%, whichever is lower. Some cities like San Francisco, Los Angeles, and Oakland have additional local rent control ordinances with stricter limits.
              </p>
              <p>
                Landlords must provide at least 30 days' notice for rent increases under 10%, and 90 days' notice for increases of 10% or more. These protections apply to most rental properties built before 2007, with some exceptions for new construction and single-family homes.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Privacy Rights</h2>
              <p>
                California tenants have strong privacy rights. Landlords must provide at least 24 hours' advance written or verbal notice before entering your unit, except in emergencies. Entry must occur during normal business hours and only for specific reasons: making repairs, showing the unit to prospective tenants or buyers, or inspecting for damage.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                While this guide covers general tenant rights in California, every situation is unique. If you're facing an eviction, security deposit dispute, or habitability issue, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can provide personalized research with citations to specific California statutes and case law relevant to your situation.
              </p>
            </div>

            {/* Internal Links */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/security-deposit-return-timeline" className="text-primary hover:underline">
                  Security Deposit Return Timeline Guide
                </Link>
                <Link to="/resources/eviction-notice-laws" className="text-primary hover:underline">
                  Eviction Notice Laws by State
                </Link>
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  Small Claims Court Process
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Need Specific Legal Research?</h3>
              <p className="text-muted-foreground mb-6">
                Get instant answers about your California tenant rights situation with Legal Compass AI.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try Legal Compass AI Free
                </Button>
              </Link>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TenantRightsCalifornia;
