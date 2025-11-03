import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Home, Scale } from "lucide-react";
import { Helmet } from "react-helmet";

const SecurityDepositReturnTimeline = () => {
  return (
    <>
      <Helmet>
        <title>Security Deposit Return Timeline: State-by-State Guide | Legal Compass</title>
        <meta name="description" content="Know when your landlord must return your security deposit. State-by-state deadlines, deduction rules, and how to recover wrongfully withheld funds." />
        <meta name="keywords" content="security deposit return, security deposit laws by state, landlord deposit deadlines, recover security deposit, deposit deductions" />
        <link rel="canonical" href="https://legalcompass.shop/resources/security-deposit-return-timeline" />
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
                Security Deposit Return: State-by-State Timeline Guide
              </h1>
              <p className="text-lg text-muted-foreground">
                When landlords must return deposits, allowable deductions, and how to recover wrongfully withheld funds.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p>
                Security deposits are one of the most common sources of landlord-tenant disputes. Every state has specific laws governing when landlords must return deposits, what deductions are allowed, and penalties for noncompliance. Understanding your state's timeline and requirements is essential to recovering your money.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Security Deposit Return Deadlines by State</h2>
              <p>
                <strong>14 Days or Less:</strong> Connecticut (30 days if no deductions), Iowa (30 days), Massachusetts (30 days), Maryland (varies 30-45 days), Tennessee (30 days with itemization; immediately if no deductions).
              </p>
              <p>
                <strong>15-21 Days:</strong> Alaska (14 days if no deductions, 30 days with deductions), Arizona (14 business days), California (21 days), Florida (15 days if no deductions, 30 days with itemized statement), Nevada (30 days), Oregon (31 days), Virginia (45 days).
              </p>
              <p>
                <strong>30 Days:</strong> Colorado, Delaware, Georgia, Illinois (30-45 days depending on county), Indiana, Kansas, Kentucky, Louisiana, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, New Hampshire, New Jersey, New Mexico, North Carolina, North Dakota, Ohio, Oklahoma, Pennsylvania, Rhode Island, South Carolina, South Dakota, Texas, Utah, Vermont, Washington, West Virginia, Wisconsin, Wyoming.
              </p>
              <p>
                <strong>Longer Periods:</strong> Alabama (35 days), Arkansas (60 days), Hawaii (14 days), Idaho (21-30 days depending on circumstances), Maine (30 days; 21 days if tenancy lasted less than one year), New York (14 days with itemization).
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">What Landlords Can Deduct</h2>
              <p>
                Security deposits are intended to cover unpaid rent, damages beyond normal wear and tear, and in some states, cleaning costs necessary to restore the unit to its original condition. <strong>Normal wear and tear</strong>—the gradual deterioration from ordinary use—cannot be deducted. Examples include faded paint, worn carpet from foot traffic, minor scuffs on walls, and small nail holes from picture hanging.
              </p>
              <p>
                <strong>Allowable deductions</strong> include unpaid rent and utilities, broken fixtures or appliances, large holes in walls, pet damage (urine stains, scratching, excessive pet hair requiring professional cleaning), broken windows or doors, and excessive cleaning beyond normal move-out expectations.
              </p>
              <p>
                Many states require landlords to provide an itemized statement of deductions with receipts or invoices for repairs. If the landlord doesn't provide proper documentation within the statutory deadline, they may forfeit the right to make any deductions.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Penalties for Landlord Violations</h2>
              <p>
                Most states impose penalties when landlords wrongfully withhold security deposits. Common penalties include forfeiture of all deductions (even legitimate ones), double or triple damages (the withheld amount multiplied by 2x or 3x), statutory penalties (a fixed amount like $100-$500), and attorney's fees if you sue and win.
              </p>
              <p>
                For example, California requires landlords to return deposits within 21 days with an itemized statement. If they fail to do so without a valid reason, tenants can sue for the full deposit amount plus up to twice the deposit in penalties. In Texas, landlords who act in bad faith may owe tenants three times the wrongfully withheld amount plus $100 and attorney's fees.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">How to Protect Your Security Deposit</h2>
              <p>
                <strong>Document everything at move-in:</strong> Take photos and videos of the entire unit, including walls, floors, appliances, and fixtures. Note any existing damage on the move-in checklist and have the landlord sign it.
              </p>
              <p>
                <strong>Maintain the unit:</strong> Keep the property clean and report maintenance issues promptly in writing. Fix minor issues before they become major problems.
              </p>
              <p>
                <strong>Document at move-out:</strong> Take photos and videos showing the unit's condition after you've cleaned and removed your belongings. Clean thoroughly, including appliances, carpets, and windows.
              </p>
              <p>
                <strong>Provide forwarding address:</strong> Give your landlord your new address in writing (certified mail is best). Many states require landlords to mail the deposit to your forwarding address, so failure to provide one can delay return.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Steps to Recover a Wrongfully Withheld Deposit</h2>
              <p>
                <strong>Step 1:</strong> Send a formal demand letter. Explain why the deductions were improper, cite your state's security deposit statute, and give the landlord 7-10 days to return the money. Send via certified mail with return receipt.
              </p>
              <p>
                <strong>Step 2:</strong> If the landlord doesn't respond, file a small claims lawsuit. Most security deposit cases fall within small claims limits ($3,000-$10,000 depending on state). You don't need a lawyer for small claims court.
              </p>
              <p>
                <strong>Step 3:</strong> Prepare your evidence: move-in and move-out photos, lease agreement, itemized statement from landlord, receipts for rent payments, and your demand letter. Bring all documentation to court.
              </p>
              <p>
                <strong>Step 4:</strong> Present your case. Explain the timeline, show your evidence, and cite your state's deposit law. Judges in small claims are familiar with deposit disputes and often rule in tenants' favor when landlords can't justify deductions.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Personalized Legal Research</h2>
              <p>
                Security deposit laws vary significantly by state. If your landlord wrongfully withheld your deposit or made improper deductions, <Link to="/auth" className="text-primary hover:underline font-semibold">Legal Compass AI</Link> can help you research your state's specific statutes, calculate penalties, and prepare a demand letter with proper legal citations.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/resources/tenant-rights-california" className="text-primary hover:underline">
                  Tenant Rights in California
                </Link>
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  Small Claims Court Process
                </Link>
                <Link to="/resources/eviction-notice-laws" className="text-primary hover:underline">
                  Eviction Notice Laws
                </Link>
                <Link to="/" className="text-primary hover:underline">
                  Legal Compass Home
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 border-2 border-primary/30 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Landlord Keeping Your Deposit?</h3>
              <p className="text-muted-foreground mb-6">
                Research your state's security deposit laws and learn how to recover your money.
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

export default SecurityDepositReturnTimeline;
