import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ShareButton } from "@/components/ShareButton";

import { ArticleAuthor } from "@/components/ArticleAuthor";
import { Home } from "lucide-react";
import { Helmet } from "react-helmet";

const LandlordTenantDisputes = () => {
  return (
    <>
      <Helmet>
        <title>Landlord-Tenant Disputes: How to Resolve Rental Issues 2024</title>
        <meta name="description" content="Complete guide to resolving landlord-tenant disputes: security deposits, repairs, evictions, lease violations, rent increases, and tenant rights. Steps to file complaints and win in court." />
        <meta name="keywords" content="landlord tenant dispute, rental dispute, security deposit dispute, eviction defense, tenant rights, landlord responsibilities, housing court, rent dispute, lease violation" />
        <link rel="canonical" href="https://legalcompass.shop/resources/landlord-tenant-disputes" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/landlord-tenant-disputes" />
        <meta property="og:title" content="Landlord-Tenant Disputes: How to Resolve Rental Issues 2024" />
        <meta property="og:description" content="Complete guide to resolving landlord-tenant disputes: security deposits, repairs, evictions, lease violations, rent increases, and tenant rights." />
        <meta property="og:site_name" content="Legal Compass" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:author" content="Legal Compass Team" />
        <meta property="article:section" content="Tenant Rights" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalcompass.shop/resources/landlord-tenant-disputes" />
        <meta name="twitter:title" content="Landlord-Tenant Disputes: How to Resolve Rental Issues 2024" />
        <meta name="twitter:description" content="Complete guide to resolving landlord-tenant disputes: security deposits, repairs, evictions, lease violations, and tenant rights." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Resolve Landlord-Tenant Disputes: Your Complete Guide",
            "description": "From security deposit fights to eviction defense, learn how to resolve common rental disputes, enforce your rights, and navigate housing court.",
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
              "@id": "https://legalcompass.shop/resources/landlord-tenant-disputes"
            },
            "articleSection": "Tenant Rights",
            "keywords": "landlord tenant dispute, rental dispute, security deposit dispute, eviction defense, tenant rights, landlord responsibilities, housing court, rent dispute, lease violation"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex-1">
          {/* Header */}
          <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <Link to="/resources" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                <span>Back to Resources</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            {/* Title Section */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How to Resolve Landlord-Tenant Disputes: Your Complete Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                From security deposit fights to eviction defense, learn how to resolve common rental disputes, enforce your rights, and navigate housing court.
              </p>
              <div className="flex items-center justify-between">
                <ArticleAuthor />
                <ShareButton />
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Understanding Landlord-Tenant Law</h2>
                <p className="text-lg leading-relaxed text-foreground/90">
                  Landlord-tenant disputes are among the most common legal conflicts. Whether you're a tenant fighting an unfair eviction or a landlord dealing with unpaid rent, knowing your rights and legal options is crucial to resolving disputes quickly and effectively.
                </p>
                <p>
                  <strong>Key principle:</strong> Both landlords and tenants have legal rights and responsibilities defined by state law, local ordinances, and the lease agreement. Most disputes arise from misunderstandings or violations of these obligations.
                </p>
              </section>

              {/* Common Disputes */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Most Common Landlord-Tenant Disputes</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Security Deposit Disputes</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Landlord wrongfully withholds part or all of security deposit.</p>
                    <p className="mb-2"><strong>Landlord issue:</strong> Tenant caused damage beyond normal wear and tear.</p>
                    <p className="text-sm text-muted-foreground">Most common dispute type. States have strict laws on deposit return timelines and allowable deductions.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Repair and Habitability Issues</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Landlord refuses to make necessary repairs (heat, plumbing, safety issues).</p>
                    <p className="mb-2"><strong>Landlord issue:</strong> Tenant damages property and refuses to pay for repairs.</p>
                    <p className="text-sm text-muted-foreground">Landlords must maintain habitability. Tenants can withhold rent or repair-and-deduct in some states.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Eviction/Unlawful Detainer</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Facing eviction without proper notice or for retaliatory reasons.</p>
                    <p className="mb-2"><strong>Landlord issue:</strong> Tenant won't pay rent or violates lease terms repeatedly.</p>
                    <p className="text-sm text-muted-foreground">Evictions must follow legal procedures. Self-help evictions (lockouts, utility shutoffs) are illegal.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Unpaid Rent</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Unable to pay due to financial hardship or disputes over habitability.</p>
                    <p className="mb-2"><strong>Landlord issue:</strong> Tenant stops paying rent without valid reason.</p>
                    <p className="text-sm text-muted-foreground">Landlords can't just lock tenants out. Must use legal eviction process to remove non-paying tenants.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Lease Violations</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Landlord violates lease (enters without notice, increases rent mid-lease).</p>
                    <p className="mb-2"><strong>Landlord issue:</strong> Tenant violates lease (unauthorized pets, guests, subletting).</p>
                    <p className="text-sm text-muted-foreground">Lease is a binding contract. Violations can lead to eviction or legal action.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Illegal Rent Increases</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Excessive rent hikes or increases during fixed-term lease.</p>
                    <p className="mb-2"><strong>Landlord issue:</strong> Tenant refuses lawful rent increase.</p>
                    <p className="text-sm text-muted-foreground">Rent control laws and lease terms govern when and how much rent can increase.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Privacy Violations</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Landlord enters property without notice or permission.</p>
                    <p className="text-sm text-muted-foreground">Tenants have right to "quiet enjoyment." Most states require 24-48 hours notice for landlord entry.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Discrimination and Retaliation</h3>
                    <p className="mb-2"><strong>Tenant issue:</strong> Evicted or harassed after complaining about repairs or discrimination.</p>
                    <p className="text-sm text-muted-foreground">Federal Fair Housing Act prohibits discrimination. Retaliation for lawful tenant actions is illegal.</p>
                  </div>
                </div>
              </section>

              {/* Resolution Steps */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">How to Resolve Disputes: Step-by-Step</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 1: Review Your Lease and State Laws</h3>
                    <p>Before taking action, understand your legal rights and obligations:</p>
                    <ul className="space-y-1 mt-2">
                      <li>• Read your lease agreement carefully</li>
                      <li>• Research your state's landlord-tenant laws</li>
                      <li>• Check local ordinances (cities often have tenant protections)</li>
                      <li>• Identify whether the issue violates the lease or law</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 2: Document Everything</h3>
                    <p>Evidence is critical. Document the dispute thoroughly:</p>
                    <ul className="space-y-1 mt-2">
                      <li>• Take photos/videos of damage, repairs needed, or conditions</li>
                      <li>• Save all emails, texts, and written communication</li>
                      <li>• Keep receipts for rent payments, repairs, and related expenses</li>
                      <li>• Write down dates, times, and details of conversations</li>
                      <li>• Get witness statements if applicable</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 3: Communicate in Writing</h3>
                    <p>Send a formal written notice (email or certified mail) to the other party:</p>
                    <ul className="space-y-1 mt-2">
                      <li>• State the problem clearly and factually</li>
                      <li>• Reference specific lease clauses or laws violated</li>
                      <li>• Propose a reasonable solution</li>
                      <li>• Set a deadline for response (typically 7-14 days)</li>
                      <li>• Keep copies of all correspondence</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Pro tip:</strong> Written communication creates a paper trail crucial for court.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 4: Request Mediation</h3>
                    <p>Many cities offer free or low-cost landlord-tenant mediation services:</p>
                    <ul className="space-y-1 mt-2">
                      <li>• Neutral third party helps negotiate resolution</li>
                      <li>• Faster and cheaper than court</li>
                      <li>• Non-binding (you don't have to accept the solution)</li>
                      <li>• Can preserve landlord-tenant relationship</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      Search "[Your City] landlord tenant mediation" to find local programs.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 5: File a Complaint with Housing Authority</h3>
                    <p>For habitability issues (no heat, broken plumbing, pests):</p>
                    <ul className="space-y-1 mt-2">
                      <li>• Contact local housing code enforcement or health department</li>
                      <li>• Inspector will visit and cite violations</li>
                      <li>• Landlord must fix issues or face fines</li>
                      <li>• Creates official record of problems</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Warning:</strong> Landlord may retaliate (illegal but happens). Document everything.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 6: Send a Demand Letter</h3>
                    <p>If informal resolution fails, send a formal demand letter:</p>
                    <ul className="space-y-1 mt-2">
                      <li>• State what you want (refund, repairs, dismissal of eviction)</li>
                      <li>• Cite legal basis for your demand</li>
                      <li>• Give final deadline (typically 10-14 days)</li>
                      <li>• State you'll pursue legal action if unresolved</li>
                      <li>• Send via certified mail with return receipt</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 7: File in Small Claims or Housing Court</h3>
                    <p>If the dispute remains unresolved:</p>
                    <ul className="space-y-1 mt-2">
                      <li>• <strong>Small claims court:</strong> For money disputes (deposits, unpaid rent) under state limit ($5,000-$10,000)</li>
                      <li>• <strong>Housing court:</strong> For evictions, habitability issues, and lease enforcement</li>
                      <li>• File complaint, pay filing fee (often under $100)</li>
                      <li>• Serve the other party with court papers</li>
                      <li>• Attend hearing with all evidence and witnesses</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 8: Hire a Lawyer (If Necessary)</h3>
                    <p>Consider legal representation if:</p>
                    <ul className="space-y-1 mt-2">
                      <li>• Facing eviction with significant defenses</li>
                      <li>• Dealing with discrimination or retaliation</li>
                      <li>• Dispute involves large amounts of money</li>
                      <li>• Landlord has attorney and case is complex</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">
                      Many tenant rights organizations offer free or low-cost legal help.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tenant-Specific Issues */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Tenant-Specific Dispute Strategies</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Fighting Security Deposit Withholding</h3>
                    <p className="mb-2"><strong>Your rights:</strong> Most states require landlords to:</p>
                    <ul className="space-y-1 mb-3">
                      <li>• Return deposit within 14-60 days (varies by state)</li>
                      <li>• Provide itemized list of deductions with receipts</li>
                      <li>• Only deduct for damage beyond normal wear and tear</li>
                    </ul>
                    <p className="mb-2"><strong>How to recover your deposit:</strong></p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Send demand letter citing state law deadline</li>
                      <li>Include move-in photos showing condition</li>
                      <li>File small claims if landlord doesn't respond</li>
                      <li>Many states award 2-3x deposit if landlord acted in bad faith</li>
                    </ol>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Forcing Repairs</h3>
                    <p className="mb-2"><strong>Your rights:</strong> Landlords must maintain habitable conditions:</p>
                    <ul className="space-y-1 mb-3">
                      <li>• Heat, hot water, plumbing, electricity</li>
                      <li>• Weatherproofing (roof, windows)</li>
                      <li>• Smoke/carbon monoxide detectors</li>
                      <li>• Pest control, sanitation, safe structure</li>
                    </ul>
                    <p className="mb-2"><strong>Options if landlord won't repair:</strong></p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li><strong>Repair and deduct:</strong> Pay for repairs, deduct from rent (if state allows)</li>
                      <li><strong>Withhold rent:</strong> Place rent in escrow account until fixed (if state allows)</li>
                      <li><strong>Report to housing authority:</strong> Get official violation notice</li>
                      <li><strong>Break lease:</strong> Move out without penalty for uninhabitable conditions</li>
                      <li><strong>Sue for damages:</strong> Recover costs of alternative housing or discomfort</li>
                    </ol>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Defending Against Eviction</h3>
                    <p className="mb-2"><strong>Common eviction defenses:</strong></p>
                    <ul className="space-y-1 mb-3">
                      <li>• <strong>Improper notice:</strong> Landlord didn't follow legal notice requirements</li>
                      <li>• <strong>Retaliation:</strong> Eviction is punishment for asserting tenant rights</li>
                      <li>• <strong>Discrimination:</strong> Eviction based on protected class (race, disability, etc.)</li>
                      <li>• <strong>Rent already paid:</strong> Proof you paid rent landlord claims is unpaid</li>
                      <li>• <strong>Habitability:</strong> Didn't pay rent because unit is uninhabitable</li>
                      <li>• <strong>Self-help eviction:</strong> Landlord locked you out or shut off utilities</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      <strong>CRITICAL:</strong> NEVER ignore eviction papers. You typically have 5-10 days to respond or lose by default.
                    </p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Challenging Illegal Rent Increases</h3>
                    <p className="mb-2"><strong>When rent increases are illegal:</strong></p>
                    <ul className="space-y-1 mb-3">
                      <li>• During fixed-term lease (unless lease allows)</li>
                      <li>• Without proper written notice (typically 30-90 days)</li>
                      <li>• Violates rent control/stabilization laws</li>
                      <li>• Retaliatory (after tenant complaint)</li>
                      <li>• Discriminatory</li>
                    </ul>
                    <p className="mb-2"><strong>How to fight:</strong></p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Check local rent control laws</li>
                      <li>Send written objection citing lease or law</li>
                      <li>Continue paying old rent amount</li>
                      <li>File complaint with rent board (if applicable)</li>
                      <li>Contest eviction if landlord tries to evict for non-payment</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Landlord-Specific Issues */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Landlord-Specific Dispute Strategies</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Evicting for Non-Payment of Rent</h3>
                    <p className="mb-2"><strong>Legal eviction process (varies by state):</strong></p>
                    <ol className="space-y-1 list-decimal list-inside mb-3">
                      <li><strong>Serve pay or quit notice:</strong> Give tenant 3-14 days to pay or move out</li>
                      <li><strong>File unlawful detainer lawsuit:</strong> If tenant doesn't comply, file in court</li>
                      <li><strong>Serve tenant with summons:</strong> Notify tenant of court hearing date</li>
                      <li><strong>Attend hearing:</strong> Present evidence of non-payment and proper notice</li>
                      <li><strong>Obtain writ of possession:</strong> If you win, sheriff removes tenant</li>
                    </ol>
                    <p className="text-sm text-red-500 font-semibold">
                      ⚠️ NEVER use self-help: No lockouts, utility shutoffs, or harassment. Only sheriff can physically remove tenant.
                    </p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Deducting from Security Deposit</h3>
                    <p className="mb-2"><strong>Legal deductions:</strong></p>
                    <ul className="space-y-1 mb-3">
                      <li>✓ Unpaid rent</li>
                      <li>✓ Damage beyond normal wear and tear</li>
                      <li>✓ Excessive cleaning costs</li>
                      <li>✓ Broken lease penalties (if in lease)</li>
                    </ul>
                    <p className="mb-2"><strong>NOT legal deductions:</strong></p>
                    <ul className="space-y-1 mb-3">
                      <li>✗ Normal wear and tear (faded paint, worn carpet)</li>
                      <li>✗ Pre-existing damage</li>
                      <li>✗ Repairs you were obligated to make</li>
                    </ul>
                    <p className="mb-2"><strong>How to protect yourself:</strong></p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Take detailed move-in and move-out photos/videos</li>
                      <li>Use written move-in checklist signed by tenant</li>
                      <li>Provide itemized deduction list with receipts/invoices</li>
                      <li>Return deposit (or deduction letter) within state deadline</li>
                    </ol>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Handling Lease Violations</h3>
                    <p className="mb-2"><strong>Common lease violations:</strong></p>
                    <ul className="space-y-1 mb-3">
                      <li>• Unauthorized occupants or pets</li>
                      <li>• Subletting without permission</li>
                      <li>• Noise complaints</li>
                      <li>• Illegal activity on property</li>
                      <li>• Property damage</li>
                    </ul>
                    <p className="mb-2"><strong>Proper response:</strong></p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>Document violation with photos, witness statements, police reports</li>
                      <li>Send written "cure or quit" notice (typically 10-30 days to fix)</li>
                      <li>If not cured, serve termination notice</li>
                      <li>File eviction lawsuit if tenant won't leave</li>
                    </ol>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Collecting Unpaid Rent After Tenant Moves</h3>
                    <p className="mb-2"><strong>Options for collection:</strong></p>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li><strong>Small claims court:</strong> Sue for unpaid rent + damages</li>
                      <li><strong>Collections agency:</strong> Sell debt to collector (typically get 25-50%)</li>
                      <li><strong>Credit reporting:</strong> Report debt to credit bureaus</li>
                      <li><strong>Wage garnishment:</strong> If you win judgment, garnish tenant's wages</li>
                    </ol>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Reality check:</strong> If tenant has no assets/income, collection may be impossible.
                    </p>
                  </div>
                </div>
              </section>

              {/* Prevention Tips */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">How to Prevent Disputes</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">For Tenants:</h3>
                    <ul className="space-y-1">
                      <li>✓ Read lease before signing, ask questions</li>
                      <li>✓ Document move-in condition with photos</li>
                      <li>✓ Pay rent on time, keep proof of payment</li>
                      <li>✓ Report repairs immediately in writing</li>
                      <li>✓ Follow lease rules</li>
                      <li>✓ Communicate in writing</li>
                      <li>✓ Know your state's tenant rights</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">For Landlords:</h3>
                    <ul className="space-y-1">
                      <li>✓ Use clear, detailed written lease</li>
                      <li>✓ Screen tenants thoroughly</li>
                      <li>✓ Conduct move-in/move-out inspections</li>
                      <li>✓ Respond to repair requests promptly</li>
                      <li>✓ Follow legal notice requirements</li>
                      <li>✓ Keep detailed records</li>
                      <li>✓ Know your state's landlord obligations</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* State Resources */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">State-Specific Resources</h2>
                <p className="mb-4">Landlord-tenant law varies significantly by state. Here are links to state-specific guides:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/resources/tenant-rights-california" className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-primary">California Tenant Rights →</h3>
                  </Link>
                  <Link to="/resources/tenant-rights-new-york" className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-primary">New York Tenant Rights →</h3>
                  </Link>
                  <Link to="/resources/tenant-rights-texas" className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-primary">Texas Tenant Rights →</h3>
                  </Link>
                  <Link to="/resources/tenant-rights-florida" className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-primary">Florida Tenant Rights →</h3>
                  </Link>
                </div>
              </section>

              {/* Conclusion CTA */}
              <section className="mt-12 p-6 bg-primary/10 border-2 border-primary/30 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Get Personalized Legal Guidance on Your Dispute</h2>
                <p className="mb-4">
                  Every landlord-tenant situation is unique. Get instant legal answers specific to your state laws and circumstances with <strong>Legal Compass AI</strong>.
                </p>
                <Link to="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Instant Legal Answers
                  </Button>
                </Link>
              </section>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandlordTenantDisputes;