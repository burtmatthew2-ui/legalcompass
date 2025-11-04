import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ArticleAuthor } from "@/components/ArticleAuthor";
import { CitationFooter } from "@/components/CitationFooter";

const FileBankruptcy = () => {
  return (
    <>
      <Helmet>
        <title>How to File for Bankruptcy: Chapter 7 vs Chapter 13 Guide | Legal Compass</title>
        <meta 
          name="description" 
          content="Complete guide to filing bankruptcy in 2025. Learn the differences between Chapter 7 and Chapter 13, eligibility requirements, costs, and step-by-step filing process." 
        />
        <meta 
          name="keywords" 
          content="how to file for bankruptcy, chapter 7 bankruptcy, chapter 13 bankruptcy, bankruptcy process, bankruptcy eligibility, bankruptcy cost, debt relief, bankruptcy attorney" 
        />
        <link rel="canonical" href="https://legalcompass.shop/resources/file-bankruptcy" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link to="/resources" className="text-primary hover:text-primary/80 font-medium">
                ← All Resources
              </Link>
              <Link to="/" className="text-primary hover:text-primary/80 font-medium">
                Home
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <article>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How to File for Bankruptcy: Complete Guide for 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Understanding Chapter 7 vs Chapter 13 bankruptcy, eligibility requirements, costs, and the step-by-step filing process
            </p>

            <VerifiedBadge lastReviewed="2025-01-15" />
            <ArticleAuthor />
            <LegalDisclaimer />

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What is Bankruptcy?</h2>
              <p className="text-muted-foreground mb-4">
                Bankruptcy is a legal process that helps individuals and businesses eliminate or repay their debts under the protection of federal bankruptcy court. Filing bankruptcy can stop foreclosures, repossessions, wage garnishments, and creditor harassment while giving you a fresh financial start.
              </p>
              <p className="text-muted-foreground mb-4">
                The two most common types of personal bankruptcy are Chapter 7 (liquidation) and Chapter 13 (repayment plan). Each has different requirements, benefits, and consequences that depend on your financial situation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Chapter 7 vs Chapter 13: Key Differences</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Chapter 7 Bankruptcy (Liquidation)</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Duration:</strong> Typically completed in 3-6 months</li>
                <li><strong>How it works:</strong> Non-exempt assets are sold to pay creditors; remaining eligible debts are discharged</li>
                <li><strong>Eligibility:</strong> Must pass the means test (income below state median or qualify based on expenses)</li>
                <li><strong>Cost:</strong> $338 filing fee (as of 2025) plus attorney fees ($1,000-$3,500 average)</li>
                <li><strong>Best for:</strong> People with limited income, few assets, and primarily unsecured debt</li>
                <li><strong>Debts discharged:</strong> Credit cards, medical bills, personal loans, collection accounts</li>
                <li><strong>Debts NOT discharged:</strong> Student loans, child support, alimony, recent taxes, criminal fines</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Chapter 13 Bankruptcy (Repayment Plan)</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Duration:</strong> 3-5 year repayment plan</li>
                <li><strong>How it works:</strong> You keep your assets and repay creditors through a court-approved payment plan</li>
                <li><strong>Eligibility:</strong> Regular income required; debt limits apply ($465,275 unsecured, $1,395,875 secured as of 2025)</li>
                <li><strong>Cost:</strong> $313 filing fee plus attorney fees ($2,500-$6,000 average)</li>
                <li><strong>Best for:</strong> People with regular income who want to keep their home or car and catch up on missed payments</li>
                <li><strong>Advantages:</strong> Stop foreclosure, keep property, catch up on secured debts, consolidate payments</li>
                <li><strong>Disadvantages:</strong> Longer process, must make regular payments, some debts remain</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Step-by-Step Bankruptcy Filing Process</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Assess Your Financial Situation</h3>
              <p className="text-muted-foreground mb-4">
                List all your debts, assets, income, and monthly expenses. Determine if bankruptcy is the right solution or if alternatives like debt settlement or credit counseling might work better.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Complete Credit Counseling</h3>
              <p className="text-muted-foreground mb-4">
                You must complete credit counseling from an approved agency within 180 days before filing. This typically costs $10-$50 and can be done online in 60-90 minutes.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: Determine Which Chapter to File</h3>
              <p className="text-muted-foreground mb-4">
                Take the means test to see if you qualify for Chapter 7. If your income is above the state median and you don't pass the means test, you'll need to file Chapter 13.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: Gather Required Documentation</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Pay stubs from the last 6 months</li>
                <li>Tax returns for the last 2 years</li>
                <li>Bank statements and financial account information</li>
                <li>List of all creditors and amounts owed</li>
                <li>List of all assets (real estate, vehicles, retirement accounts, etc.)</li>
                <li>Monthly expense records</li>
                <li>Credit counseling certificate</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Complete Bankruptcy Forms</h3>
              <p className="text-muted-foreground mb-4">
                File the bankruptcy petition and required schedules with the bankruptcy court. This includes detailed information about your financial situation, assets, debts, income, and expenses.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 6: File Your Bankruptcy Petition</h3>
              <p className="text-muted-foreground mb-4">
                Submit all forms and the filing fee to the bankruptcy court in your district. The automatic stay goes into effect immediately, stopping most collection actions.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 7: Attend the 341 Meeting of Creditors</h3>
              <p className="text-muted-foreground mb-4">
                About 30-40 days after filing, you'll meet with the bankruptcy trustee and answer questions under oath about your finances and petition. Creditors may attend but rarely do.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 8: Complete Debtor Education Course</h3>
              <p className="text-muted-foreground mb-4">
                After the 341 meeting, complete a debtor education course from an approved provider. This is required before your debts can be discharged.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 9: Receive Your Discharge</h3>
              <p className="text-muted-foreground mb-4">
                For Chapter 7, discharge typically occurs 60-90 days after the 341 meeting. For Chapter 13, discharge occurs after completing your repayment plan (3-5 years).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Bankruptcy Exemptions: What You Can Keep</h2>
              <p className="text-muted-foreground mb-4">
                Bankruptcy exemptions protect certain property from being sold in Chapter 7 or included in Chapter 13 repayment calculations. Common federal exemptions include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Homestead exemption:</strong> Up to $27,900 in home equity (2025)</li>
                <li><strong>Motor vehicle:</strong> Up to $4,450 in vehicle equity</li>
                <li><strong>Household goods:</strong> Up to $700 per item, $14,875 total</li>
                <li><strong>Jewelry:</strong> Up to $1,875</li>
                <li><strong>Retirement accounts:</strong> Unlimited for most 401(k)s and IRAs (up to $1,512,350 for traditional/Roth IRAs)</li>
                <li><strong>Tools of trade:</strong> Up to $2,800 in work-related tools/equipment</li>
                <li><strong>Wildcard exemption:</strong> Up to $1,475 for any property, plus up to $13,950 of unused homestead exemption</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Many states allow you to choose between federal exemptions and state-specific exemptions. Some state exemptions are more generous, particularly for homestead protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How Bankruptcy Affects Your Credit</h2>
              <p className="text-muted-foreground mb-4">
                Bankruptcy remains on your credit report for 7-10 years:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Chapter 7:</strong> Stays on credit report for 10 years from filing date</li>
                <li><strong>Chapter 13:</strong> Stays on credit report for 7 years from filing date</li>
                <li><strong>Immediate impact:</strong> Credit score typically drops 130-240 points</li>
                <li><strong>Recovery timeline:</strong> Most people can rebuild to a 700+ credit score within 2-4 years with responsible credit use</li>
                <li><strong>Future credit:</strong> You can get a secured credit card immediately and may qualify for an FHA mortgage 2 years after discharge</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Alternatives to Bankruptcy</h2>
              <p className="text-muted-foreground mb-4">
                Before filing bankruptcy, consider these alternatives:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Debt consolidation:</strong> Combine multiple debts into one lower-interest loan</li>
                <li><strong>Debt management plan:</strong> Work with credit counseling agency to negotiate lower interest rates</li>
                <li><strong>Debt settlement:</strong> Negotiate with creditors to pay less than the full amount owed</li>
                <li><strong>Loan modification:</strong> Renegotiate mortgage or car loan terms</li>
                <li><strong>Selling assets:</strong> Sell property or valuables to pay down debt</li>
                <li><strong>Increasing income:</strong> Take a second job or side work to pay off debts faster</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Do You Need a Bankruptcy Attorney?</h2>
              <p className="text-muted-foreground mb-4">
                While you can file bankruptcy without an attorney (pro se), it's generally not recommended due to the complexity of bankruptcy law. An attorney can:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Ensure all paperwork is completed correctly and on time</li>
                <li>Maximize exemptions to protect your property</li>
                <li>Handle objections from creditors or the trustee</li>
                <li>Advise whether Chapter 7 or Chapter 13 is better for your situation</li>
                <li>Prevent common mistakes that could result in dismissal or fraud allegations</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Many bankruptcy attorneys offer free consultations and payment plans. Legal aid organizations may provide free or low-cost assistance if you qualify based on income.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Common Bankruptcy Mistakes to Avoid</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Transferring assets before filing:</strong> Can be considered fraudulent and result in dismissal or criminal charges</li>
                <li><strong>Running up debts right before filing:</strong> Creditors can challenge discharge of debts incurred within 70-90 days</li>
                <li><strong>Hiding assets or income:</strong> Must disclose all assets and income; hiding them is bankruptcy fraud</li>
                <li><strong>Not listing all creditors:</strong> Unlisted debts may not be discharged</li>
                <li><strong>Filing too early:</strong> If you received a discharge within 8 years, you can't file Chapter 7 again</li>
                <li><strong>Failing to complete required courses:</strong> Credit counseling and debtor education are mandatory</li>
                <li><strong>Not attending the 341 meeting:</strong> Failure to attend will result in dismissal</li>
              </ul>
            </section>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Need Help Deciding if Bankruptcy is Right for You?</h2>
              <p className="text-muted-foreground mb-6">
                Legal Compass AI can help you understand your bankruptcy options, determine eligibility, and connect you with local bankruptcy attorneys. Get personalized guidance based on your specific financial situation.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Personalized Bankruptcy Guidance
                </Button>
              </Link>
            </div>

            <CitationFooter sources={[
              {
                title: "United States Courts - Bankruptcy Basics",
                url: "https://www.uscourts.gov/services-forms/bankruptcy/bankruptcy-basics",
                description: "Official guidance from the federal judiciary on bankruptcy procedures and requirements."
              },
              {
                title: "11 U.S.C. § 101 et seq. - Bankruptcy Code",
                description: "Federal bankruptcy statutes governing all bankruptcy proceedings in the United States."
              },
              {
                title: "U.S. Department of Justice - U.S. Trustee Program",
                url: "https://www.justice.gov/ust",
                description: "Information on bankruptcy trustees, filing requirements, and consumer education."
              },
              {
                title: "Federal Rules of Bankruptcy Procedure",
                description: "Official procedural rules for bankruptcy cases in federal courts, updated annually."
              }
            ]} />

            <div className="border-t pt-8 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Related Resources</h3>
              <div className="grid gap-3">
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  → Small Claims Court Process
                </Link>
                <Link to="/resources/consumer-refund-rights" className="text-primary hover:underline">
                  → Consumer Refund Rights
                </Link>
                <Link to="/resources/security-deposit-return-timeline" className="text-primary hover:underline">
                  → Security Deposit Return Timeline
                </Link>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FileBankruptcy;