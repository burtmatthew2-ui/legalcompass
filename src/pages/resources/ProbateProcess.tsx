import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Clock, DollarSign, AlertCircle, Scale, CheckCircle } from "lucide-react";
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
    title: "File for Bankruptcy: Complete Guide",
    slug: "file-bankruptcy",
    description: "Step-by-step process for filing Chapter 7 or Chapter 13 bankruptcy"
  },
  {
    title: "Divorce and Custody Basics",
    slug: "divorce-custody-basics",
    description: "Essential information about divorce proceedings and child custody"
  },
  {
    title: "Small Claims Court Process",
    slug: "small-claims-court-process",
    description: "How to file and win in small claims court without a lawyer"
  }
];

export default function ProbateProcess() {
  return (
    <>
      <Helmet>
        <title>Probate Process Guide: How to Settle an Estate Step-by-Step 2025 | Legal Compass</title>
        <meta name="description" content="Complete guide to the probate process. Learn how to navigate estate settlement, executor duties, court procedures, and avoiding probate. Updated 2025." />
        <meta name="keywords" content="probate process, estate settlement, executor duties, probate court, how to avoid probate, estate administration, will probate, probate attorney" />
        <link rel="canonical" href="https://legalcompass.shop/resources/probate-process" />
        
        <meta property="og:title" content="Probate Process Guide: How to Settle an Estate Step-by-Step 2025" />
        <meta property="og:description" content="Complete guide to the probate process. Learn how to navigate estate settlement, executor duties, and court procedures." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/probate-process" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Probate Process Guide: How to Settle an Estate Step-by-Step 2025",
            "description": "Complete guide to the probate process. Learn how to navigate estate settlement, executor duties, court procedures, and avoiding probate.",
            "author": {
              "@type": "Organization",
              "name": "Legal Compass"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Legal Compass",
              "logo": {
                "@type": "ImageObject",
                "url": "https://legalcompass.shop/icon-512.png"
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
            <div className="mb-6">
              <p className="text-base text-muted-foreground mb-4">
                This guide provides a complete walkthrough of the probate process from filing the initial petition to closing the estate. Whether you're an executor handling an estate or a beneficiary waiting for inheritance, understanding probate timelines, costs, and requirements can help you navigate this complex court process with confidence.
              </p>
              <p className="text-sm text-muted-foreground italic">
                What makes this guide unique: We break down the exact 6-step probate process with realistic timelines (simple estates: 6-9 months, complex: 2+ years), actual cost breakdowns including attorney fees (3-7% of estate), filing fees, and appraisal costs, plus strategies to avoid probate altogether—not just vague platitudes about "consulting an attorney."
              </p>
            </div>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Probate Process Guide: How to Settle an Estate Step-by-Step
              </h1>
              <VerifiedBadge lastReviewed="2025-01-15" />
            </header>

            <ArticleAuthor />

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Probate is the legal process of administering a deceased person's estate, paying debts, and distributing assets to beneficiaries. Understanding how probate works can help executors and heirs navigate this complex process more effectively.
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <FileText className="mr-3 h-8 w-8 text-primary" />
                  What Is Probate?
                </h2>
                
                <p className="mb-4">
                  Probate is the court-supervised process of:
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Validating the deceased person's will (if one exists)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Identifying and inventorying the deceased's assets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Paying outstanding debts, taxes, and expenses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Distributing remaining assets to beneficiaries or heirs</span>
                  </li>
                </ul>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Key Terms</h3>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-semibold text-foreground">Executor/Administrator:</dt>
                        <dd className="text-muted-foreground">Person appointed to manage the estate</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Beneficiary:</dt>
                        <dd className="text-muted-foreground">Person who inherits assets from the estate</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Intestate:</dt>
                        <dd className="text-muted-foreground">Dying without a valid will</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Letters Testamentary:</dt>
                        <dd className="text-muted-foreground">Court document authorizing executor to act on behalf of estate</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Clock className="mr-3 h-8 w-8 text-primary" />
                  The Probate Process: Step-by-Step
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: File Petition with Probate Court</h3>
                    <p className="mb-3">Within 30 days of death (varies by state), file a petition to:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Admit the will to probate (if one exists)</li>
                      <li>• Appoint an executor or administrator</li>
                      <li>• Provide death certificate and original will</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      <strong>Where to file:</strong> Probate court in the county where the deceased lived
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Notify Heirs and Creditors</h3>
                    <p className="mb-3">The executor must notify:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• All beneficiaries named in the will</li>
                      <li>• Legal heirs (if no will exists)</li>
                      <li>• Known creditors of the estate</li>
                      <li>• Publish notice in local newspaper (in most states)</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      <strong>Timeframe:</strong> Creditors typically have 3-6 months to file claims
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: Inventory Estate Assets</h3>
                    <p className="mb-3">Create a comprehensive list of all assets including:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Real estate property</li>
                      <li>• Bank accounts and investments</li>
                      <li>• Vehicles, jewelry, and personal property</li>
                      <li>• Business interests</li>
                      <li>• Life insurance policies</li>
                      <li>• Retirement accounts</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      <strong>Important:</strong> Assets may need professional appraisal for accurate valuation
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: Pay Debts and Taxes</h3>
                    <p className="mb-3">Before distributing assets, the executor must pay:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Outstanding debts and bills</li>
                      <li>• Final income taxes</li>
                      <li>• Estate taxes (if applicable - estates over $13.61M in 2025)</li>
                      <li>• Funeral and administration expenses</li>
                    </ul>
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded mt-4">
                      <p className="text-sm text-amber-900 dark:text-amber-200">
                        <strong>Priority Order:</strong> Court costs and administration fees are paid first, followed by funeral expenses, then taxes, and finally other debts.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Distribute Assets to Beneficiaries</h3>
                    <p className="mb-3">After debts are paid and court approval is obtained:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Transfer property titles</li>
                      <li>• Distribute cash and personal property</li>
                      <li>• Obtain receipts from beneficiaries</li>
                      <li>• Follow will instructions or state intestacy laws</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 6: Close the Estate</h3>
                    <p className="mb-3">File final accounting with the court showing:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• All assets collected</li>
                      <li>• All debts and expenses paid</li>
                      <li>• All distributions made to beneficiaries</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Once approved, the executor is discharged and the estate is officially closed.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Clock className="mr-3 h-8 w-8 text-primary" />
                  How Long Does Probate Take?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Simple Estates</h3>
                      <p className="text-3xl font-bold text-primary mb-2">6-9 months</p>
                      <p className="text-sm text-muted-foreground">
                        Small estates with no disputes, clear will, and few assets
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Average Estates</h3>
                      <p className="text-3xl font-bold text-primary mb-2">1-2 years</p>
                      <p className="text-sm text-muted-foreground">
                        Typical estates with moderate complexity and multiple assets
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Complex Estates</h3>
                      <p className="text-3xl font-bold text-primary mb-2">2+ years</p>
                      <p className="text-sm text-muted-foreground">
                        Large estates with disputes, business interests, or tax issues
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 text-amber-900 dark:text-amber-200">Factors That Slow Down Probate</h3>
                    <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                      <li>• Will contests or family disputes</li>
                      <li>• Hard-to-locate assets or beneficiaries</li>
                      <li>• Complex tax situations</li>
                      <li>• Real estate sales required</li>
                      <li>• Business valuations needed</li>
                      <li>• Court backlog in your jurisdiction</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <DollarSign className="mr-3 h-8 w-8 text-primary" />
                  Probate Costs
                </h2>
                
                <p className="mb-6">Typical probate expenses include:</p>

                <div className="space-y-4 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Court Filing Fees</h3>
                        <span className="text-primary font-semibold">$200-$500</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Initial petition and related court documents</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Attorney Fees</h3>
                        <span className="text-primary font-semibold">3-7% of estate</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Hourly rates ($200-$400/hr) or percentage of estate value</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Executor Fees</h3>
                        <span className="text-primary font-semibold">2-5% of estate</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Compensation for executor's time (often waived by family)</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Appraisal & Accounting</h3>
                        <span className="text-primary font-semibold">$300-$1,500</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Professional asset valuations and accounting services</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">Miscellaneous Costs</h3>
                        <span className="text-primary font-semibold">$500-$2,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Publication fees, postage, property maintenance, etc.</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded-r">
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    <strong>Total Cost Range:</strong> Expect 3-10% of the total estate value in probate costs. 
                    For a $500,000 estate, this could be $15,000-$50,000.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Scale className="mr-3 h-8 w-8 text-primary" />
                  How to Avoid Probate
                </h2>
                
                <p className="mb-6">Several strategies can help assets bypass probate:</p>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Revocable Living Trust
                      </h3>
                      <p className="text-sm mb-3">
                        Transfer assets to a trust during your lifetime. Upon death, assets pass directly to beneficiaries 
                        without probate. Most comprehensive probate avoidance strategy.
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        <strong>Cost:</strong> $1,000-$3,000 to set up
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Joint Ownership with Right of Survivorship
                      </h3>
                      <p className="text-sm mb-3">
                        Property automatically transfers to surviving owner. Common for married couples' homes and bank accounts.
                      </p>
                      <p className="text-sm text-amber-800 dark:text-amber-300 italic">
                        <strong>Caution:</strong> Be careful with non-spouse joint owners - potential gift tax and loss of control issues
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Beneficiary Designations
                      </h3>
                      <p className="text-sm mb-3">
                        Name beneficiaries on:
                      </p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Life insurance policies</li>
                        <li>• Retirement accounts (401k, IRA)</li>
                        <li>• Bank accounts (POD - Payable on Death)</li>
                        <li>• Investment accounts (TOD - Transfer on Death)</li>
                      </ul>
                      <p className="text-sm text-muted-foreground italic">
                        <strong>Important:</strong> Keep beneficiary designations updated - they override your will
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        Small Estate Procedures
                      </h3>
                      <p className="text-sm">
                        Many states offer simplified probate for estates under a certain value (typically $50,000-$184,500). 
                        Process is faster and cheaper with minimal court involvement.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <AlertCircle className="mr-3 h-8 w-8 text-primary" />
                  Common Probate Mistakes to Avoid
                </h2>
                
                <div className="space-y-4">
                  <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Delaying the Probate Filing</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Don't wait too long to start probate. Assets may deteriorate, bills pile up, and creditor claims grow.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Mixing Personal and Estate Funds</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Open a separate estate bank account. Never mix your personal money with estate assets - this can lead to legal liability.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Distributing Assets Before Paying Debts</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Creditors must be paid first. If you distribute assets prematurely, you may be personally liable for unpaid debts.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Poor Record Keeping</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Keep detailed records of all transactions. You'll need documentation for final court accounting and to protect yourself from beneficiary challenges.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Not Getting Court Approval for Major Decisions</h3>
                      <p className="text-sm text-red-800 dark:text-red-300">
                        Get court approval before selling real estate or making significant financial decisions to avoid personal liability.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r mb-8">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Need Help with Probate?</h3>
                <p className="mb-4 text-sm">
                  Probate can be complex, especially for larger estates or when family disputes arise. Consider consulting 
                  with a probate attorney to ensure you're handling the estate correctly and protecting yourself from liability.
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