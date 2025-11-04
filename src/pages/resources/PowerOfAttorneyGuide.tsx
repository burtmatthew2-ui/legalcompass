import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Shield, Users, AlertTriangle, Scale, CheckCircle } from "lucide-react";
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
    title: "Probate Process Guide",
    slug: "probate-process",
    description: "Understanding estate settlement and probate court procedures"
  },
  {
    title: "File for Bankruptcy",
    slug: "file-bankruptcy",
    description: "Step-by-step bankruptcy filing process and debt relief options"
  },
  {
    title: "Divorce and Custody Basics",
    slug: "divorce-custody-basics",
    description: "Essential information about divorce proceedings and child custody"
  }
];

export default function PowerOfAttorneyGuide() {
  return (
    <>
      <Helmet>
        <title>Power of Attorney Guide: Types, How to Get One & What It Means 2025 | Legal Compass</title>
        <meta name="description" content="Complete guide to power of attorney. Learn about POA types, how to create one, agent duties, and when POA terminates. Free comprehensive guide updated 2025." />
        <meta name="keywords" content="power of attorney, POA, durable power of attorney, medical power of attorney, financial POA, how to get power of attorney, attorney in fact" />
        <link rel="canonical" href="https://legalcompass.app/resources/power-of-attorney-guide" />
        
        <meta property="og:title" content="Power of Attorney Guide: Types, How to Get One & What It Means 2025" />
        <meta property="og:description" content="Complete guide to power of attorney. Learn about POA types, how to create one, and agent duties." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.app/resources/power-of-attorney-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Power of Attorney Guide: Types, How to Get One & What It Means 2025",
            "description": "Complete guide to power of attorney. Learn about POA types, how to create one, agent duties, and when POA terminates.",
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
                Power of Attorney Guide: Types, How to Get One & What It Means
              </h1>
              <VerifiedBadge lastReviewed="2025-01-15" />
            </header>

            <ArticleAuthor />

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A power of attorney (POA) is a legal document that allows you to appoint someone you trust to make decisions on your behalf if you become unable to do so. Understanding the different types and how to create one is essential for comprehensive estate planning.
              </p>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <FileText className="mr-3 h-8 w-8 text-primary" />
                  What Is Power of Attorney?
                </h2>
                
                <p className="mb-4">
                  A power of attorney is a legal document where you (the "principal") grant authority to another person 
                  (the "agent" or "attorney-in-fact") to act on your behalf in legal or financial matters.
                </p>

                <Card className="bg-primary/5 border-primary/20 mb-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Key Terminology</h3>
                    <dl className="space-y-3 text-sm">
                      <div>
                        <dt className="font-semibold text-foreground">Principal:</dt>
                        <dd className="text-muted-foreground">The person creating the POA and granting authority</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Agent/Attorney-in-Fact:</dt>
                        <dd className="text-muted-foreground">The person appointed to make decisions on your behalf</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Durable POA:</dt>
                        <dd className="text-muted-foreground">Remains valid even if you become incapacitated</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Springing POA:</dt>
                        <dd className="text-muted-foreground">Only becomes effective upon a specified event (like incapacitation)</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 rounded-r">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Important</h3>
                      <p className="text-amber-800 dark:text-amber-300 text-sm mb-0">
                        A power of attorney does NOT allow your agent to make decisions after your death. 
                        For that, you need a will and/or trust. POA authority ends when you pass away.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Shield className="mr-3 h-8 w-8 text-primary" />
                  Types of Power of Attorney
                </h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">1. General Power of Attorney</h3>
                      <p className="text-sm mb-3">
                        Grants broad authority to handle all legal and financial matters including banking, real estate, 
                        business transactions, and more. Typically ends if you become incapacitated (unless made durable).
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        <strong>Best for:</strong> Temporary situations like being out of the country or short-term delegation
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">2. Durable Power of Attorney</h3>
                      <p className="text-sm mb-3">
                        Remains in effect even if you become mentally incapacitated. This is the most common type for 
                        estate planning because it ensures someone can manage your affairs if you can't.
                      </p>
                      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded">
                        <p className="text-sm text-emerald-900 dark:text-emerald-200">
                          <strong>Most Recommended:</strong> Essential for comprehensive estate planning. Avoids costly guardianship proceedings.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">3. Limited (Special) Power of Attorney</h3>
                      <p className="text-sm mb-3">
                        Grants authority for specific tasks or time periods only, such as:
                      </p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Selling a specific piece of property</li>
                        <li>• Managing a single bank account</li>
                        <li>• Signing documents for a particular transaction</li>
                      </ul>
                      <p className="text-sm text-muted-foreground italic">
                        <strong>Best for:</strong> One-time transactions or limited scope situations
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">4. Medical Power of Attorney (Healthcare POA)</h3>
                      <p className="text-sm mb-3">
                        Authorizes someone to make healthcare decisions on your behalf if you're unable to communicate. 
                        Also called a "healthcare proxy" or "healthcare power of attorney."
                      </p>
                      <p className="text-sm mb-3">Your agent can decide on:</p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Medical treatments and procedures</li>
                        <li>• Choice of healthcare providers</li>
                        <li>• End-of-life care decisions</li>
                        <li>• Organ donation (in some states)</li>
                      </ul>
                      <p className="text-sm text-muted-foreground italic">
                        <strong>Best for:</strong> Everyone - especially important for incapacity planning
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">5. Springing Power of Attorney</h3>
                      <p className="text-sm mb-3">
                        Only becomes effective when a specific event occurs, typically when you become incapacitated 
                        (usually determined by one or two doctors).
                      </p>
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded">
                        <p className="text-sm text-amber-900 dark:text-amber-200">
                          <strong>Caution:</strong> Can be difficult to implement because banks/institutions may require 
                          extensive proof of incapacity. Durable POA is often easier to use.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <CheckCircle className="mr-3 h-8 w-8 text-primary" />
                  How to Create a Power of Attorney
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Choose Your Agent Carefully</h3>
                    <p className="mb-3">Select someone who is:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Trustworthy and financially responsible</li>
                      <li>• Willing and able to serve</li>
                      <li>• Good with paperwork and organization</li>
                      <li>• At least 18 years old and mentally competent</li>
                      <li>• Understanding of your wishes and values</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Tip: Name a backup (successor) agent in case your first choice can't serve
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Determine the Type and Scope of Authority</h3>
                    <p className="mb-3">Decide what powers to grant:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Financial matters (banking, investments, taxes)</li>
                      <li>• Real estate transactions</li>
                      <li>• Healthcare decisions</li>
                      <li>• Business operations</li>
                      <li>• Government benefits</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: Use the Proper Form</h3>
                    <p className="mb-3">You have several options:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• <strong>State-specific forms:</strong> Many states provide official POA forms (recommended)</li>
                      <li>• <strong>Online legal services:</strong> LegalZoom, Rocket Lawyer ($30-$150)</li>
                      <li>• <strong>Attorney:</strong> Customized POA ($200-$500) - best for complex situations</li>
                      <li>• <strong>Estate planning software:</strong> Part of comprehensive planning</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: Sign and Notarize</h3>
                    <p className="mb-3">POA requirements vary by state, but typically you need:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Your signature as the principal</li>
                      <li>• Notarization (required in most states)</li>
                      <li>• Witnesses (2 witnesses in some states)</li>
                      <li>• Agent's signature accepting the role (in some states)</li>
                    </ul>
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded mt-4">
                      <p className="text-sm text-red-900 dark:text-red-200">
                        <strong>Critical:</strong> Check your state's specific requirements. An improperly executed POA may be invalid.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Distribute Copies</h3>
                    <p className="mb-3">Provide copies to:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Your agent (and backup agent)</li>
                      <li>• Your bank and financial institutions</li>
                      <li>• Your attorney</li>
                      <li>• Healthcare providers (for medical POA)</li>
                      <li>• Family members who should be aware</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Keep the original in a safe but accessible place. Tell your agent where it's located.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Users className="mr-3 h-8 w-8 text-primary" />
                  Agent Duties and Responsibilities
                </h2>
                
                <p className="mb-6">Your agent has a legal "fiduciary duty" which means they must:</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Act in Your Best Interest</h3>
                      <p className="text-sm text-muted-foreground">
                        All decisions must benefit you, not the agent. No self-dealing or conflicts of interest.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Keep Records</h3>
                      <p className="text-sm text-muted-foreground">
                        Maintain detailed records of all transactions and decisions made on your behalf.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Separate Finances</h3>
                      <p className="text-sm text-muted-foreground">
                        Never mix your money with theirs. Keep your assets completely separate.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Follow Your Instructions</h3>
                      <p className="text-sm text-muted-foreground">
                        Respect your wishes and any limitations you've specified in the POA document.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Act Prudently</h3>
                      <p className="text-sm text-muted-foreground">
                        Make reasonable decisions a prudent person would make in similar circumstances.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Avoid Conflicts</h3>
                      <p className="text-sm text-muted-foreground">
                        Don't make decisions that benefit themselves at your expense.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-red-900 dark:text-red-200 mb-3">If Your Agent Abuses Their Power</h3>
                    <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                      Agent abuse of power can be prosecuted as elder abuse, financial exploitation, or fraud.
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-300">
                      You can revoke the POA at any time if you're still mentally competent. Family members can 
                      petition the court if they suspect abuse.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Scale className="mr-3 h-8 w-8 text-primary" />
                  When Does a Power of Attorney End?
                </h2>
                
                <p className="mb-4">A power of attorney terminates when:</p>
                
                <div className="space-y-4 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">You Revoke It</h3>
                      <p className="text-sm text-muted-foreground">
                        You can cancel the POA at any time while mentally competent. Notify your agent and all 
                        institutions in writing.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">You Pass Away</h3>
                      <p className="text-sm text-muted-foreground">
                        All POAs automatically end at death. Your executor or trustee takes over at that point.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">The Expiration Date Arrives</h3>
                      <p className="text-sm text-muted-foreground">
                        If you specified an end date in the document, the POA terminates on that date.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">You Become Incapacitated (Non-Durable POA Only)</h3>
                      <p className="text-sm text-muted-foreground">
                        Regular POAs end if you become incapacitated. Durable POAs continue.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">Your Agent Can't or Won't Serve</h3>
                      <p className="text-sm text-muted-foreground">
                        If your agent dies, resigns, or becomes incapacitated and no successor is named, the POA ends.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">Divorce (If Agent Is Spouse)</h3>
                      <p className="text-sm text-muted-foreground">
                        In many states, divorce automatically revokes a POA granted to your ex-spouse.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Common Questions</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Do I Need a Lawyer to Create a Power of Attorney?</h3>
                      <p className="text-sm">
                        Not necessarily. Simple POAs can be created using state forms or online services. However, 
                        consult an attorney if you have significant assets, complex family situations, or want customized provisions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Can I Have Multiple Agents?</h3>
                      <p className="text-sm">
                        Yes. You can appoint co-agents to act jointly (together) or severally (independently). 
                        Joint requires agreement; several allows any agent to act alone. Be cautious - joint can 
                        create practical difficulties.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Is a Power of Attorney the Same as Guardianship?</h3>
                      <p className="text-sm">
                        No. POA is voluntary - you choose your agent. Guardianship is court-imposed when someone 
                        is incapacitated without a POA. Guardianship is expensive ($3,000-$10,000+) and takes months. 
                        Having a durable POA avoids guardianship.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">When Should I Create a Power of Attorney?</h3>
                      <p className="text-sm">
                        Now, while you're healthy and competent. You must be mentally capable to create a valid POA. 
                        Waiting until you need one may be too late. POA is a cornerstone of estate planning for adults of all ages.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r mb-8">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Need Help Setting Up Power of Attorney?</h3>
                <p className="mb-4 text-sm">
                  While creating a basic POA can be straightforward, ensuring it meets your state's requirements 
                  and truly protects your interests may require legal guidance. Consider consulting with an estate 
                  planning attorney for personalized advice.
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