import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, FileText, AlertCircle, Scale, Clock } from "lucide-react";
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
    title: "Defamation and Online Reputation Defense",
    slug: "defamation-online-reputation",
    description: "Protect your reputation from false statements and online attacks"
  },
  {
    title: "Divorce and Custody Basics",
    slug: "divorce-custody-basics",
    description: "Essential information about divorce proceedings and child custody"
  },
  {
    title: "Understanding Employment Discrimination Laws",
    slug: "employment-discrimination",
    description: "Know your rights against workplace discrimination"
  }
];

export default function RestrainingOrderGuide() {
  return (
    <>
      <Helmet>
        <title>How to Get a Restraining Order: Complete Step-by-Step Guide 2025 | Legal Compass</title>
        <meta name="description" content="Learn how to obtain a restraining order, including types of protection orders, filing requirements, court procedures, and what evidence you need. Free comprehensive guide updated for 2025." />
        <meta name="keywords" content="restraining order, protection order, how to get restraining order, temporary restraining order, domestic violence order, harassment protection, court order protection" />
        <link rel="canonical" href="https://legalcompass.shop/resources/restraining-order-guide" />
        
        <meta property="og:title" content="How to Get a Restraining Order: Complete Step-by-Step Guide 2025" />
        <meta property="og:description" content="Learn how to obtain a restraining order, including types of protection orders, filing requirements, court procedures, and what evidence you need." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/restraining-order-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Get a Restraining Order: Complete Step-by-Step Guide 2025",
            "description": "Learn how to obtain a restraining order, including types of protection orders, filing requirements, court procedures, and what evidence you need.",
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
                This step-by-step guide explains how to obtain a restraining order (protection order) for domestic violence, stalking, harassment, or threats. You'll learn about different types of restraining orders (emergency, temporary, permanent), exact filing procedures, evidence requirements, court hearing preparation, and what happens if the order is violated.
              </p>
              <p className="text-sm text-muted-foreground italic">
                What makes this guide unique: We provide the specific 7-step process from documentation to enforcement, exact evidence you need (photos, texts, police reports), realistic timelines (TRO: same day, permanent: 10-25 days), violation penalties (jail time, contempt charges), and renewal procedures—not generic safety advice but actual legal process details.
              </p>
            </div>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                How to Get a Restraining Order: Complete Step-by-Step Guide
              </h1>
              <VerifiedBadge lastReviewed="2025-01-15" />
            </header>

            <ArticleAuthor />

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A restraining order (also called a protection order) is a court order that legally prohibits someone from contacting or approaching you. If you're experiencing harassment, threats, stalking, or domestic violence, a restraining order can provide legal protection and peace of mind.
              </p>

              <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 mb-8 rounded-r">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Important Safety Notice</h3>
                    <p className="text-amber-800 dark:text-amber-300 text-sm mb-0">
                      If you are in immediate danger, call 911 or your local emergency services. A restraining order takes time to obtain, and law enforcement can provide immediate protection.
                    </p>
                  </div>
                </div>
              </div>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Shield className="mr-3 h-8 w-8 text-primary" />
                  Types of Restraining Orders
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Emergency Protective Order (EPO)</h3>
                      <p className="text-muted-foreground text-sm mb-2">Duration: 5-7 days</p>
                      <p className="text-sm">
                        Issued by law enforcement at the scene of domestic violence or abuse. Provides immediate short-term protection until you can file for a longer order.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Temporary Restraining Order (TRO)</h3>
                      <p className="text-muted-foreground text-sm mb-2">Duration: 15-25 days</p>
                      <p className="text-sm">
                        Issued quickly by a judge after you file paperwork. Provides protection until a full court hearing can be scheduled.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Permanent Restraining Order</h3>
                      <p className="text-muted-foreground text-sm mb-2">Duration: 1-5 years (renewable)</p>
                      <p className="text-sm">
                        Issued after a full court hearing where both parties can present evidence. Provides long-term legal protection.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Domestic Violence Restraining Order</h3>
                      <p className="text-muted-foreground text-sm mb-2">Special Protection</p>
                      <p className="text-sm">
                        Specifically for protection from spouse, partner, family member, or someone you dated. Offers strongest protections.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <FileText className="mr-3 h-8 w-8 text-primary" />
                  Who Qualifies for a Restraining Order?
                </h2>
                
                <p className="mb-4">You may qualify for a restraining order if someone has:</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Physically harmed, threatened, or attempted to harm you</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Sexually assaulted or abused you</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Stalked or harassed you repeatedly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Made you reasonably fear for your safety or the safety of your family</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Destroyed your personal property</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span>Disturbed your peace through repeated unwanted contact</span>
                  </li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Clock className="mr-3 h-8 w-8 text-primary" />
                  Step-by-Step Process to Get a Restraining Order
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Document the Abuse or Harassment</h3>
                    <p className="mb-3">Gather evidence to support your case:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Photos of injuries or property damage</li>
                      <li>• Screenshots of threatening texts, emails, or social media messages</li>
                      <li>• Police reports or 911 call records</li>
                      <li>• Medical records documenting injuries</li>
                      <li>• Witness statements or contact information</li>
                      <li>• Journal entries documenting incidents (dates, times, details)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Go to Your Local Courthouse</h3>
                    <p className="mb-3">Visit the family court or civil court clerk's office in your county. You will need to:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Request restraining order forms (usually free)</li>
                      <li>• Ask about filing fees (often waived for domestic violence cases)</li>
                      <li>• Bring valid photo identification</li>
                      <li>• Request a fee waiver if you cannot afford the filing fee</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: Complete the Required Forms</h3>
                    <p className="mb-3">You'll need to fill out several forms, typically including:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Petition for restraining order</li>
                      <li>• Description of abuse (be specific with dates, times, and details)</li>
                      <li>• Information about the respondent (person you're seeking protection from)</li>
                      <li>• Request for specific orders (stay away, no contact, etc.)</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Tip: Many courts have free legal assistance or advocates who can help you fill out forms correctly.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: File Your Petition</h3>
                    <p className="mb-3">Submit your completed forms to the court clerk. The judge will review your petition, usually the same day.</p>
                    <p className="mb-3"><strong>What happens next:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• If granted, you'll receive a temporary restraining order (TRO)</li>
                      <li>• The court will schedule a hearing (typically 10-25 days away)</li>
                      <li>• The respondent must be served with the TRO and hearing notice</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Serve the Restraining Order</h3>
                    <p className="mb-3">The respondent must be legally "served" (officially notified) of the restraining order. This can be done by:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Sheriff or process server (recommended)</li>
                      <li>• Someone over 18 who is not involved in the case</li>
                      <li>• Certified mail in some jurisdictions</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Important: You cannot serve the papers yourself. Keep proof of service for court.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 6: Attend the Court Hearing</h3>
                    <p className="mb-3">At the hearing, you'll need to:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Arrive early and bring all evidence</li>
                      <li>• Present your case to the judge</li>
                      <li>• Answer questions about the abuse/harassment</li>
                      <li>• Bring witnesses if available</li>
                      <li>• Respond to any statements from the respondent</li>
                    </ul>
                    <p className="mb-3">
                      The judge will decide whether to grant a permanent restraining order (typically lasting 1-5 years).
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 7: If Granted - Know Your Rights</h3>
                    <p className="mb-3">A restraining order typically prohibits the respondent from:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Contacting you directly or indirectly</li>
                      <li>• Coming within a certain distance of you (often 100-500 feet)</li>
                      <li>• Going to your home, workplace, or school</li>
                      <li>• Possessing firearms (in many jurisdictions)</li>
                      <li>• Contacting you through third parties or social media</li>
                    </ul>
                    <p className="font-semibold text-foreground">
                      Keep copies of the order with you at all times and give copies to local police, your employer, and your child's school.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Scale className="mr-3 h-8 w-8 text-primary" />
                  What Happens If the Order Is Violated?
                </h2>
                
                <p className="mb-4">
                  Violating a restraining order is a criminal offense. If the respondent violates the order:
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">1.</span>
                    <span><strong>Call 911 immediately</strong> if you feel threatened or in danger</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">2.</span>
                    <span><strong>Document the violation</strong> with photos, screenshots, or witness statements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">3.</span>
                    <span><strong>File a police report</strong> as soon as possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">4.</span>
                    <span><strong>Return to court</strong> to report the violation - the judge can hold the respondent in contempt</span>
                  </li>
                </ul>

                <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-red-900 dark:text-red-200 mb-3">Penalties for Violating a Restraining Order</h3>
                    <ul className="space-y-2 text-sm text-red-800 dark:text-red-300">
                      <li>• Arrest and criminal charges</li>
                      <li>• Jail time (up to 1 year for misdemeanor, more for felony violations)</li>
                      <li>• Fines (typically $1,000-$10,000)</li>
                      <li>• Extended restraining order duration</li>
                      <li>• Permanent criminal record</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Important Considerations</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Cost</h3>
                      <p className="text-sm">
                        Filing fees vary by state ($0-$500), but many courts waive fees for domestic violence cases. 
                        Legal representation is optional but recommended for complex cases.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Duration and Renewal</h3>
                      <p className="text-sm">
                        Permanent restraining orders typically last 1-5 years but can be renewed if you still need protection. 
                        Request renewal before the order expires.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Out-of-State Protection</h3>
                      <p className="text-sm">
                        Under federal law (Violence Against Women Act), restraining orders are enforceable across state lines. 
                        Register your order in any new state where you relocate.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Child Custody and Visitation</h3>
                      <p className="text-sm">
                        Restraining orders can affect custody arrangements. The court may order supervised visitation 
                        or include children in the protection order if they're also at risk.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Free Resources and Support</h2>
                
                <div className="space-y-4">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">National Domestic Violence Hotline</h3>
                      <p className="text-sm mb-2">24/7 support, resources, and safety planning</p>
                      <p className="font-semibold text-primary">1-800-799-7233 or text "START" to 88788</p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">RAINN (Sexual Assault Hotline)</h3>
                      <p className="text-sm mb-2">Support for sexual assault survivors</p>
                      <p className="font-semibold text-primary">1-800-656-4673</p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">Local Legal Aid</h3>
                      <p className="text-sm">Search for free or low-cost legal assistance in your area at LegalAid.org</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r mb-8">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Need More Legal Guidance?</h3>
                <p className="mb-4 text-sm">
                  Every restraining order case is unique. While this guide provides general information, 
                  consider consulting with a domestic violence attorney or victim advocate for personalized advice.
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