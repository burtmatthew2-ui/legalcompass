import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const ChildSupport = () => {
  return (
    <>
      <Helmet>
        <title>Child Support Guide: Calculation & State Laws | Legal Compass</title>
        <meta 
          name="description" 
          content="Complete guide to child support in 2025: calculation methods, state-by-state guidelines, how to modify support orders, enforcement, and what happens if you can't pay." 
        />
        <meta 
          name="keywords" 
          content="child support, child support calculation, child support guidelines, child support modification, child support enforcement, child support arrears, child custody, family law" 
        />
        <link rel="canonical" href="https://legalcompass.shop/resources/child-support" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/child-support" />
        <meta property="og:title" content="Child Support Calculation Guide: How Much, Who Pays & State Laws" />
        <meta property="og:description" content="Complete guide to child support in 2025: calculation methods, state-by-state guidelines, how to modify support orders, enforcement, and what happens if you can't pay." />
        <meta property="og:site_name" content="Legal Compass" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:author" content="Legal Compass Team" />
        <meta property="article:section" content="Family Law" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalcompass.shop/resources/child-support" />
        <meta name="twitter:title" content="Child Support Calculation Guide: How Much, Who Pays & State Laws" />
        <meta name="twitter:description" content="Complete guide to child support in 2025: calculation methods, state-by-state guidelines, how to modify support orders, enforcement, and what happens if you can't pay." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Child Support: Complete Calculation & Guidelines for 2025",
            "description": "Understanding how child support is calculated, state-specific guidelines, modification process, and enforcement",
            "author": {
              "@type": "Organization",
              "name": "Legal Compass"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass",
              "url": "https://legalcompass.shop"
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://legalcompass.shop/resources/child-support"
            },
            "articleSection": "Family Law",
            "keywords": "child support, child support calculation, child support guidelines, child support modification, child support enforcement, child support arrears, child custody, family law"
          })}
        </script>
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
            <div className="mb-6">
              <p className="text-base text-muted-foreground mb-4">
                Learn how child support works—what you'll pay, what you'll get, and how to modify orders when life changes. This guide covers calculation methods, state differences, and the real steps to take when you need an adjustment.
              </p>
              <p className="text-sm text-muted-foreground italic">
                What makes this guide unique: We give you actual state formulas, percentage breakdowns, average payment amounts by state, exact modification requirements, and enforcement methods with realistic timelines—not vague generalizations about "best interests" and "factors considered."
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Child Support: Complete Calculation & Guidelines for 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Understanding how child support is calculated, state-specific guidelines, modification process, and enforcement
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What is Child Support?</h2>
              <p className="text-muted-foreground mb-4">
                Child support is court-ordered financial assistance paid by one parent to the other (or to a guardian) to help cover the costs of raising a child. Support continues until the child reaches the age of majority (18-21, depending on state) or becomes emancipated.
              </p>
              <p className="text-muted-foreground mb-4">
                Both parents have a legal obligation to support their children financially, regardless of marital status or custody arrangement. Child support is the child's right—parents cannot waive or negotiate it away without court approval.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How is Child Support Calculated?</h2>
              <p className="text-muted-foreground mb-4">
                Each state uses one of three calculation models to determine child support:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">1. Income Shares Model (Used by 40+ States)</h3>
              <p className="text-muted-foreground mb-4">
                This model estimates what parents would have spent on the child if they lived together, then divides that amount proportionally based on each parent's income.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Formula:</strong> Combined parental income × guideline percentage = total child support obligation. This is then split based on each parent's percentage of combined income. The non-custodial parent pays their share to the custodial parent.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>States using this model:</strong> California, New York, Florida, Illinois, Pennsylvania, Ohio, Georgia, North Carolina, Michigan, New Jersey, Virginia, and many others.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">2. Percentage of Income Model (Flat Percentage)</h3>
              <p className="text-muted-foreground mb-4">
                The non-custodial parent pays a flat percentage of their income based on the number of children, regardless of the custodial parent's income.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Typical percentages:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>1 child: 20% of gross income</li>
                <li>2 children: 25% of gross income</li>
                <li>3 children: 30% of gross income</li>
                <li>4 children: 35% of gross income</li>
                <li>5+ children: 40% of gross income</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>States using this model:</strong> Texas, Wisconsin, Arkansas, Mississippi, Nevada, North Dakota
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">3. Melson Formula</h3>
              <p className="text-muted-foreground mb-4">
                This model ensures each parent's basic needs are met first, then allocates remaining income to the child based on a percentage formula. It's the most complex model.
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>States using this model:</strong> Delaware, Hawaii, Montana
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What Income is Considered?</h2>
              <p className="text-muted-foreground mb-4">
                Child support calculations typically include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Gross income:</strong> Wages, salaries, tips, commissions, bonuses</li>
                <li><strong>Self-employment income:</strong> Business profits (after reasonable expenses)</li>
                <li><strong>Investment income:</strong> Interest, dividends, rental income</li>
                <li><strong>Retirement income:</strong> Pensions, Social Security, disability benefits</li>
                <li><strong>Unemployment benefits:</strong> Workers' comp, unemployment insurance</li>
                <li><strong>Other income:</strong> Royalties, trust distributions, lottery winnings</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Deductions allowed:</strong> Pre-existing child support orders, alimony/spousal support payments, mandatory retirement contributions, health insurance premiums for the child
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Additional Factors That Affect Child Support</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Number of children:</strong> More children = higher total support, but not proportionally (e.g., 2 children isn't double the amount for 1)</li>
                <li><strong>Custody arrangement:</strong> Joint physical custody may reduce support payments; sole custody typically results in higher payments</li>
                <li><strong>Parenting time:</strong> More overnights with the non-custodial parent may reduce support in some states</li>
                <li><strong>Childcare costs:</strong> Daycare, after-school programs usually added on top of base support</li>
                <li><strong>Healthcare costs:</strong> Health insurance premiums and uninsured medical expenses are typically split</li>
                <li><strong>Educational expenses:</strong> Private school, tutoring, extracurricular activities may be added</li>
                <li><strong>Special needs:</strong> Children with disabilities or special needs may require higher support</li>
                <li><strong>Age of child:</strong> Some states increase support for teenagers due to higher costs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Child Support by State: Average Amounts</h2>
              <p className="text-muted-foreground mb-4">
                These are approximate average monthly payments for one child based on median income:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>California:</strong> $430-$550/month (varies greatly by county and income)</li>
                <li><strong>Texas:</strong> $400-$500/month (20% of net income for 1 child)</li>
                <li><strong>Florida:</strong> $475-$600/month</li>
                <li><strong>New York:</strong> $500-$650/month (17% of combined income for 1 child)</li>
                <li><strong>Illinois:</strong> $400-$550/month</li>
                <li><strong>Pennsylvania:</strong> $450-$600/month</li>
                <li><strong>National average:</strong> $430/month per child</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Note:</strong> Actual amounts vary widely based on both parents' incomes, custody arrangements, and local cost of living.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How to Establish Child Support</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">1. Through Divorce or Separation</h3>
              <p className="text-muted-foreground mb-4">
                Child support is typically established as part of a divorce decree or legal separation agreement. The court will use state guidelines to calculate the amount.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">2. Through Paternity Action</h3>
              <p className="text-muted-foreground mb-4">
                For unmarried parents, paternity must be established first (through acknowledgment or DNA test), then child support can be ordered.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">3. Through State Child Support Agency</h3>
              <p className="text-muted-foreground mb-4">
                You can apply for services through your state's child support enforcement agency (often part of the Department of Social Services). This is free and the agency will:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Locate the other parent</li>
                <li>Establish paternity if needed</li>
                <li>Calculate and establish support order</li>
                <li>Enforce the order and collect payments</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">4. Through Private Agreement (Requires Court Approval)</h3>
              <p className="text-muted-foreground mb-4">
                Parents can agree on a child support amount, but it must be submitted to court for approval to ensure it meets minimum guidelines and protects the child's interests.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How to Modify Child Support</h2>
              <p className="text-muted-foreground mb-4">
                You can request a modification if there's been a "substantial change in circumstances" such as:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Significant income change (job loss, promotion, disability) for either parent</li>
                <li>Change in custody or parenting time</li>
                <li>Change in the child's needs (medical condition, special education)</li>
                <li>Change in childcare or healthcare costs</li>
                <li>Parent's remarriage or additional children (limited impact in most states)</li>
                <li>In many states, 3+ years since last order or 15-20% change in calculated amount</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Modification Process</h3>
              <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-2">
                <li>File a motion to modify with the court that issued the original order</li>
                <li>Provide evidence of changed circumstances</li>
                <li>Submit updated financial information</li>
                <li>Attend a hearing where both parents can present evidence</li>
                <li>Judge reviews and issues modified order</li>
              </ol>
              <p className="text-muted-foreground mb-4">
                <strong>Important:</strong> Support obligations continue at the current amount until a judge officially modifies the order. Never stop paying or reduce payments without a court order.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What Happens If You Can't Pay Child Support?</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">What You Should Do</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>File for modification immediately:</strong> Don't wait until you're behind</li>
                <li><strong>Pay what you can:</strong> Show good faith effort; partial payment is better than none</li>
                <li><strong>Document your situation:</strong> Job termination letters, medical records, disability notices</li>
                <li><strong>Communicate:</strong> Inform the other parent and child support agency about your situation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">What You Should NOT Do</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Don't just stop paying:</strong> Arrears will accumulate with interest</li>
                <li><strong>Don't make informal agreements:</strong> Only court-ordered modifications count</li>
                <li><strong>Don't hide income:</strong> This is fraud and can result in criminal charges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Child Support Enforcement Methods</h2>
              <p className="text-muted-foreground mb-4">
                If a parent fails to pay child support, enforcement actions can include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Income withholding:</strong> Automatic deduction from paychecks (most common)</li>
                <li><strong>Tax refund intercept:</strong> State and federal tax refunds seized</li>
                <li><strong>Bank account levy:</strong> Funds frozen and withdrawn from bank accounts</li>
                <li><strong>License suspension:</strong> Driver's license, professional licenses, passport suspended</li>
                <li><strong>Credit bureau reporting:</strong> Arrears reported to credit agencies (damages credit score)</li>
                <li><strong>Property liens:</strong> Liens placed on real estate or vehicles</li>
                <li><strong>Contempt of court:</strong> Fines, jail time up to 6 months for willful non-payment</li>
                <li><strong>Criminal charges:</strong> Federal felony if more than $5,000 owed or 1 year delinquent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Child Support Arrears: Paying Back Support</h2>
              <p className="text-muted-foreground mb-4">
                Arrears are past-due child support payments. They do not go away and typically must be paid even if:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>The child turns 18 or becomes emancipated</li>
                <li>You lose custody or visitation</li>
                <li>The other parent remarries</li>
                <li>You file bankruptcy (child support debt survives bankruptcy)</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Interest on arrears:</strong> Most states charge interest (typically 6-12% annually) on unpaid support
              </p>
              <p className="text-muted-foreground mb-4">
                <strong>Statute of limitations:</strong> Varies by state, but typically 10-20 years after the child turns 18, and can be renewed indefinitely
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">When Does Child Support End?</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Child reaches age of majority:</strong> 18 in most states, 19 in Alabama and Nebraska, 21 in New York and Mississippi</li>
                <li><strong>High school graduation:</strong> Some states extend to 19 if still in high school</li>
                <li><strong>Child becomes emancipated:</strong> Gets married, joins military, becomes self-supporting</li>
                <li><strong>Child dies</strong></li>
                <li><strong>Parental rights terminated:</strong> Through adoption by another person</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Important:</strong> Support does NOT automatically end. The paying parent must file a motion to terminate support with the court.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Common Child Support Myths</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Myth:</strong> I don't have to pay if I don't see my kids. <strong>Truth:</strong> Child support and visitation are separate legal issues.</li>
                <li><strong>Myth:</strong> The other parent doesn't use the money for the child. <strong>Truth:</strong> The custodial parent doesn't have to account for how support is spent.</li>
                <li><strong>Myth:</strong> I can stop paying if the other parent won't let me see the kids. <strong>Truth:</strong> Never stop paying; instead, file for custody/visitation enforcement.</li>
                <li><strong>Myth:</strong> If my ex makes more money than me, I don't have to pay. <strong>Truth:</strong> Both parents' incomes are considered, but support is based on custody arrangement.</li>
                <li><strong>Myth:</strong> Child support covers everything. <strong>Truth:</strong> Support covers basic needs; extraordinary expenses may be split separately.</li>
                <li><strong>Myth:</strong> I can deduct child support on my taxes. <strong>Truth:</strong> Child support is not tax-deductible for payer or taxable for recipient.</li>
              </ul>
            </section>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Need Help With Child Support Issues?</h2>
              <p className="text-muted-foreground mb-6">
                Legal Compass AI can help you understand child support calculations in your state, determine if you can modify your support order, and connect you with family law attorneys. Get personalized guidance for your specific situation.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Child Support Guidance
                </Button>
              </Link>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Related Resources</h3>
              <div className="grid gap-3">
                <Link to="/resources/divorce-custody-basics" className="text-primary hover:underline">
                  → Divorce and Custody Basics
                </Link>
                <Link to="/resources/file-bankruptcy" className="text-primary hover:underline">
                  → How to File for Bankruptcy
                </Link>
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  → Small Claims Court Process
                </Link>
              </div>
            </div>
          </article>
        </main>

        <FloatingAIButton topicContext="Child Support" />
        <Footer />
      </div>
    </>
  );
};

export default ChildSupport;