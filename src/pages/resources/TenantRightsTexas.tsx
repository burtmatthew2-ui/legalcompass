import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const TenantRightsTexas = () => {
  return (
    <>
      <Helmet>
        <title>Tenant Rights in Texas: Complete 2025 Guide | Legal Compass</title>
        <meta name="description" content="Know your rights as a Texas tenant. Learn about security deposits, eviction procedures, repairs, and landlord responsibilities under Texas Property Code." />
        <meta name="keywords" content="Texas tenant rights, renter protections Texas, TX security deposit laws, Texas eviction process, landlord tenant law Texas" />
        <link rel="canonical" href="https://legalcompass.shop/resources/tenant-rights-texas" />
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
                Tenant Rights in Texas: What Renters Need to Know
              </h1>
              <p className="text-lg text-muted-foreground">
                Essential guide to Texas tenant protections, security deposits, and eviction procedures.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p>
                Texas is known as a landlord-friendly state, but tenants still have important legal protections under the Texas Property Code. Whether you're renting in Houston, Dallas, Austin, or San Antonio, understanding your rights can help you avoid disputes and protect yourself from unlawful practices.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Security Deposit Laws</h2>
              <p>
                Texas law does not cap security deposits, but most landlords charge one to two months' rent. Under Texas Property Code § 92.103-92.109, landlords must return your security deposit within 30 days of move-out, along with an itemized list of deductions. If they fail to provide an itemized accounting, they forfeit the right to withhold any amount and may owe you $100 plus three times the wrongfully withheld amount, plus attorney's fees.
              </p>
              <p>
                Landlords can deduct for unpaid rent, damages beyond normal wear and tear, and costs to re-key locks if you don't return all keys. Normal wear and tear—such as minor scuffs, faded paint, or worn carpet from regular use—cannot be deducted. To protect yourself, document the unit's condition with photos at move-in and move-out, and send your forwarding address in writing to the landlord.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Eviction Process in Texas</h2>
              <p>
                Texas has one of the fastest eviction processes in the country. For nonpayment of rent, landlords must provide at least 3 days' notice before filing an eviction lawsuit. If you don't pay or move out within that time, the landlord can file for eviction in Justice Court. The court typically schedules a hearing within 10-21 days.
              </p>
              <p>
                If the judge rules in the landlord's favor, you have 5 days to appeal or move out. After that, the landlord can obtain a writ of possession, and a constable can physically remove you and your belongings. Texas does not recognize "self-help" evictions—landlords cannot change locks, remove your belongings, or shut off utilities to force you out. If they do, you can sue for actual damages plus $1,000, one month's rent, and attorney's fees.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Repairs and Habitability</h2>
              <p>
                While Texas doesn't have a statewide implied warranty of habitability, landlords still have a duty to make certain repairs. Under Texas Property Code § 92.052, if a condition "materially affects the physical health or safety of an ordinary tenant," the landlord must repair it within a reasonable time (typically 7 days, or 3 days for lack of water, heat, or AC).
              </p>
              <p>
                Examples of conditions requiring repair include broken locks, lack of heat or air conditioning (in extreme weather), plumbing failures, roof leaks causing water damage, and electrical hazards. To enforce your repair rights, you must provide written notice to the landlord and give them the statutory time to fix it. If they don't, you can repair and deduct, terminate the lease, or sue for damages.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Retaliation Protections</h2>
              <p>
                Texas law prohibits landlords from retaliating against tenants who exercise their legal rights. Under Texas Property Code § 92.331, landlords cannot evict, increase rent, decrease services, or threaten you because you requested repairs, complained to a government agency, or joined a tenant organization. Protection lasts for six months after you exercise your rights.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Lease Terms and Termination</h2>
              <p>
                In Texas, written leases are highly recommended and govern the relationship between landlord and tenant. If you don't have a written lease, you're considered a month-to-month tenant, and either party can terminate with one month's notice. Texas law requires landlords to disclose certain information, including whether the property has flooded in the past five years and the name and address of the property owner.
              </p>
              <p>
                Breaking a lease early can result in financial penalties unless you qualify for an exception, such as military deployment, family violence, or uninhabitable conditions. Always document your reasons and follow proper procedures to minimize liability.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Every tenant situation is unique. If you're facing an eviction, security deposit dispute, or repair issue in Texas, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can provide research specific to your county and situation, with citations to relevant Texas Property Code sections and case law.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/tenant-rights-florida" className="text-primary hover:underline">
                  Tenant Rights in Florida
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
              <h3 className="text-2xl font-bold mb-3">Facing a Texas Landlord Dispute?</h3>
              <p className="text-muted-foreground mb-6">
                Get instant legal research specific to Texas tenant law with Legal Compass AI.
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

export default TenantRightsTexas;
