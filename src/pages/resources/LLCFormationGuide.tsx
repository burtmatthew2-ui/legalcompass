import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, DollarSign, Shield, FileText, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { RelatedArticles } from "@/components/RelatedArticles";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ArticleAuthor } from "@/components/ArticleAuthor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const relatedArticles = [
  {
    title: "Trademark Registration Guide",
    slug: "trademark-registration-guide",
    description: "Protect your business name and brand with trademark registration"
  },
  {
    title: "Breach of Contract: Freelancer's Guide",
    slug: "breach-of-contract-freelancers",
    description: "What to do when clients breach contracts"
  },
  {
    title: "File for Bankruptcy",
    slug: "file-bankruptcy",
    description: "Understanding bankruptcy options for businesses and individuals"
  }
];

export default function LLCFormationGuide() {
  return (
    <>
      <Helmet>
        <title>How to Form an LLC: Complete Step-by-Step Guide 2025 | Legal Compass</title>
        <meta name="description" content="Complete guide to LLC formation. Learn how to start an LLC, filing requirements, costs, operating agreements, and tax benefits. State-by-state instructions included." />
        <meta name="keywords" content="how to form an LLC, LLC formation, start an LLC, LLC benefits, LLC vs corporation, LLC operating agreement, LLC filing requirements" />
        <link rel="canonical" href="https://legalcompass.app/resources/llc-formation-guide" />
        
        <meta property="og:title" content="How to Form an LLC: Complete Step-by-Step Guide 2025" />
        <meta property="og:description" content="Complete guide to LLC formation including step-by-step process, costs, and tax benefits." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.app/resources/llc-formation-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Form an LLC: Complete Step-by-Step Guide 2025",
            "description": "Complete guide to forming a limited liability company including costs, requirements, and tax benefits.",
            "author": {
              "@type": "Organization",
              "name": "Legal Compass"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass",
              "logo": {
                "@type": "ImageObject",
                "url": "https://legalcompass.app/icon-512.png"
              }
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/resources" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                How to Form an LLC: Complete Step-by-Step Guide
              </h1>
              <VerifiedBadge lastReviewed="2025-01-15" />
            </header>

            <ArticleAuthor />

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Forming a Limited Liability Company (LLC) is one of the best ways to protect your personal assets while running 
                a business. This guide walks you through the entire LLC formation process, from choosing a name to obtaining 
                your EIN and staying compliant.
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Building2 className="mr-3 h-8 w-8 text-primary" />
                  What Is an LLC?
                </h2>
                
                <p className="mb-4">
                  A Limited Liability Company (LLC) is a business structure that combines the liability protection of a 
                  corporation with the tax benefits and simplicity of a sole proprietorship or partnership.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-200">Key Benefits of an LLC</h3>
                      <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
                        <li>• <strong>Limited liability protection:</strong> Personal assets protected from business debts</li>
                        <li>• <strong>Pass-through taxation:</strong> Avoid double taxation</li>
                        <li>• <strong>Flexible management:</strong> Member-managed or manager-managed</li>
                        <li>• <strong>Less paperwork:</strong> Fewer formalities than corporations</li>
                        <li>• <strong>Credibility:</strong> Professional image with customers</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-200">Potential Drawbacks</h3>
                      <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                        <li>• <strong>Self-employment taxes:</strong> Members pay SE tax on profits</li>
                        <li>• <strong>Annual fees & reporting:</strong> State filing fees required</li>
                        <li>• <strong>Harder to raise capital:</strong> Can't issue stock like corporations</li>
                        <li>• <strong>State-specific rules:</strong> Compliance varies by state</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Shield className="mr-3 h-8 w-8 text-primary" />
                  LLC vs. Other Business Structures
                </h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">LLC vs. Sole Proprietorship</h3>
                      <p className="text-sm mb-2"><strong>Sole Proprietorship:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• No liability protection - personal assets at risk</li>
                        <li>• Easiest to set up, no filing required</li>
                        <li>• Pass-through taxation</li>
                      </ul>
                      <p className="text-sm"><strong>LLC wins on:</strong> Liability protection and credibility</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">LLC vs. Corporation (C-Corp)</h3>
                      <p className="text-sm mb-2"><strong>C-Corporation:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Strong liability protection</li>
                        <li>• Can raise capital by issuing stock</li>
                        <li>• Double taxation (corporate + personal)</li>
                        <li>• Heavy formalities (board meetings, bylaws, etc.)</li>
                      </ul>
                      <p className="text-sm"><strong>LLC wins on:</strong> Simplicity, tax flexibility, less paperwork</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">LLC vs. S-Corporation</h3>
                      <p className="text-sm mb-2"><strong>S-Corporation:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Pass-through taxation (like LLC)</li>
                        <li>• Can save on self-employment taxes</li>
                        <li>• Strict ownership limits (100 shareholders max, US citizens/residents only)</li>
                        <li>• More formalities than LLC</li>
                      </ul>
                      <p className="text-sm"><strong>Note:</strong> LLCs can elect S-Corp tax treatment (best of both worlds)</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <CheckCircle className="mr-3 h-8 w-8 text-primary" />
                  Step-by-Step LLC Formation Process
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Choose Your LLC Name</h3>
                    <p className="mb-3">Your LLC name must:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Include "LLC," "L.L.C.," or "Limited Liability Company"</li>
                      <li>• Be distinguishable from existing businesses in your state</li>
                      <li>• Not contain restricted words (Bank, Insurance, University) without approval</li>
                      <li>• Comply with your state's naming rules</li>
                    </ul>
                    <p className="text-sm mb-3"><strong>Name Search Tools:</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• Search your state's business entity database (usually on Secretary of State website)</li>
                      <li>• Check domain availability (e.g., GoDaddy, Namecheap)</li>
                      <li>• Search USPTO trademark database (tmsearch.uspto.gov)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Choose a Registered Agent</h3>
                    <p className="mb-3">
                      Every LLC must have a registered agent—a person or company authorized to receive legal documents 
                      (lawsuits, subpoenas, tax notices) on behalf of your LLC.
                    </p>
                    <p className="mb-3"><strong>Requirements:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• Must have physical address in your state (no PO boxes)</li>
                      <li>• Available during business hours to accept documents</li>
                      <li>• Can be yourself, another member, or a professional service</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      <strong>Professional services cost:</strong> $100-$300/year (recommended for privacy and reliability)
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: File Articles of Organization</h3>
                    <p className="mb-3">
                      This is the official document that creates your LLC. File with your state's Secretary of State office.
                    </p>
                    <p className="mb-3"><strong>Information required:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• LLC name and address</li>
                      <li>• Registered agent name and address</li>
                      <li>• Purpose of LLC (can be general)</li>
                      <li>• Member/manager information</li>
                      <li>• Duration (perpetual or specific end date)</li>
                    </ul>
                    <p className="mb-3"><strong>Filing methods:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• <strong>Online:</strong> Most states allow online filing (fastest - 1-3 days)</li>
                      <li>• <strong>Mail:</strong> Send forms + payment by mail (1-4 weeks)</li>
                      <li>• <strong>In-person:</strong> Visit Secretary of State office (same day in some states)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: Create an LLC Operating Agreement</h3>
                    <p className="mb-3">
                      An operating agreement is an internal document that outlines ownership, management, and operating 
                      procedures of your LLC. While not required in most states, it's HIGHLY recommended.
                    </p>
                    <p className="mb-3"><strong>What to include:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• Ownership percentages (who owns what %)</li>
                      <li>• Member/manager roles and responsibilities</li>
                      <li>• Voting rights and procedures</li>
                      <li>• Profit and loss distribution</li>
                      <li>• Buy-sell provisions (what happens if member leaves)</li>
                      <li>• Dissolution procedures</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Templates available online or hire lawyer ($500-$2,000 for custom agreement)
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Obtain an EIN (Employer Identification Number)</h3>
                    <p className="mb-3">
                      An EIN is a federal tax ID number for your LLC. Required if you have employees or elect corporate taxation. 
                      Recommended even for single-member LLCs.
                    </p>
                    <p className="mb-3"><strong>How to get an EIN (FREE):</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• Apply online at IRS.gov (instant - takes 15 minutes)</li>
                      <li>• By mail using Form SS-4 (4-6 weeks)</li>
                      <li>• By fax (4-7 days)</li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded">
                      <p className="text-sm text-blue-900 dark:text-blue-200">
                        <strong>Important:</strong> Never pay someone to get your EIN. It's free from the IRS. Beware of 
                        third-party websites charging $200+ for this free service.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 6: Open a Business Bank Account</h3>
                    <p className="mb-3">
                      Separate your personal and business finances to maintain liability protection. Mixing funds can 
                      "pierce the corporate veil" and expose personal assets.
                    </p>
                    <p className="mb-3"><strong>Documents needed:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• Articles of Organization (filed copy)</li>
                      <li>• EIN confirmation letter</li>
                      <li>• Operating Agreement</li>
                      <li>• Personal ID (driver's license, passport)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 7: Get Business Licenses & Permits</h3>
                    <p className="mb-3">Depending on your business type and location, you may need:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• General business license (city/county)</li>
                      <li>• Professional licenses (contractors, real estate, etc.)</li>
                      <li>• Sales tax permit (if selling products)</li>
                      <li>• Health permits (restaurants, daycares)</li>
                      <li>• Home occupation permit (if home-based)</li>
                      <li>• Zoning permits</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Check SBA.gov/licenses and your city/county website for requirements
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 8: File Annual Reports & Stay Compliant</h3>
                    <p className="mb-3">Most states require annual or biennial reports to keep your LLC in good standing:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Due date varies by state (often on formation anniversary)</li>
                      <li>• Filing fee: $0-$800/year depending on state</li>
                      <li>• Failure to file can result in administrative dissolution</li>
                      <li>• Update registered agent, address, or member information</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <DollarSign className="mr-3 h-8 w-8 text-primary" />
                  LLC Formation Costs by State
                </h2>
                
                <div className="space-y-4 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">One-Time Formation Costs</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>State filing fee:</strong> $40-$500 (varies by state)</li>
                        <li>• <strong>Registered agent:</strong> $0-$300/year (if using service)</li>
                        <li>• <strong>Operating agreement:</strong> $0-$2,000 (template or attorney)</li>
                        <li>• <strong>EIN:</strong> Free from IRS</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Popular State Filing Fees (2025)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 text-sm">
                          <p>• <strong>California:</strong> $70 (+ $20 SOI + $800/year franchise tax)</p>
                          <p>• <strong>Delaware:</strong> $90 (+ $300/year franchise tax)</p>
                          <p>• <strong>Florida:</strong> $125</p>
                          <p>• <strong>Texas:</strong> $300</p>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p>• <strong>New York:</strong> $200 (+ publication requirement $1,000-$2,000)</p>
                          <p>• <strong>Nevada:</strong> $425</p>
                          <p>• <strong>Wyoming:</strong> $100</p>
                          <p>• <strong>Illinois:</strong> $150</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Ongoing Annual Costs</h3>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Annual report fee:</strong> $0-$800/year</li>
                        <li>• <strong>Franchise tax:</strong> $0-$800/year (CA, DE, TX)</li>
                        <li>• <strong>Registered agent:</strong> $100-$300/year</li>
                        <li>• <strong>Business licenses:</strong> $50-$500/year</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r">
                  <p className="text-sm">
                    <strong>Total first-year cost:</strong> $500-$3,000 depending on state and whether you use attorney/services. 
                    DIY formation in low-cost states (Wyoming, Kentucky) can be under $200.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <FileText className="mr-3 h-8 w-8 text-primary" />
                  LLC Taxation Explained
                </h2>
                
                <p className="mb-6">One of the biggest advantages of an LLC is tax flexibility. You can choose how to be taxed:</p>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Default: Pass-Through Taxation (Disregarded Entity)</h3>
                      <p className="text-sm mb-3">
                        <strong>Single-member LLC:</strong> Taxed as sole proprietor (Schedule C on personal return)<br/>
                        <strong>Multi-member LLC:</strong> Taxed as partnership (Form 1065)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Profits "pass through" to members' personal tax returns. LLC itself doesn't pay federal income tax.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Option 1: S-Corporation Election</h3>
                      <p className="text-sm mb-3">
                        Elect S-Corp status (Form 2553) to potentially save on self-employment taxes. Pay yourself a 
                        "reasonable salary" (subject to payroll taxes) and take remaining profits as distributions 
                        (no SE tax).
                      </p>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400">
                        <strong>Best for:</strong> LLCs with $60,000+ annual profit
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Option 2: C-Corporation Election</h3>
                      <p className="text-sm mb-3">
                        Rarely chosen. Results in double taxation (corporate + personal). May make sense for raising 
                        venture capital or going public.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Choosing the Best State to Form Your LLC</h2>
                
                <p className="mb-6">
                  <strong>General rule:</strong> Form your LLC in the state where you do business. Forming in another state 
                  usually doesn't provide benefits and requires you to "foreign qualify" (register) in your home state anyway.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-3">Best States for LLC Formation</h3>
                      <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
                        <li>• <strong>Wyoming:</strong> Low fees, no state income tax, strong privacy</li>
                        <li>• <strong>Delaware:</strong> Business-friendly laws, established court system</li>
                        <li>• <strong>Nevada:</strong> No state income tax, strong asset protection</li>
                        <li>• <strong>Florida:</strong> No state income tax, low fees</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-3">Expensive States</h3>
                      <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                        <li>• <strong>California:</strong> $800/year minimum franchise tax</li>
                        <li>• <strong>New York:</strong> Publication requirement ($1,000-$2,000)</li>
                        <li>• <strong>Massachusetts:</strong> $500 annual report fee</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r mb-8">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Need Help Forming Your LLC?</h3>
                <p className="mb-4 text-sm">
                  While many entrepreneurs successfully form LLCs on their own, consulting with a business attorney can ensure 
                  you choose the right structure, draft a solid operating agreement, and stay compliant with state and federal 
                  requirements.
                </p>
                <Link to="/dashboard">
                  <Button className="w-full sm:w-auto">
                    Get Free Legal Research with Legal Compass AI
                  </Button>
                </Link>
              </div>
            </div>

            <RelatedArticles articles={relatedArticles} />
          </article>
        </main>

        <NewsletterSignup />
        <Footer />
      </div>
    </>
  );
}