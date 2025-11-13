import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Scale, DollarSign, Clock, Shield, Ban } from "lucide-react";
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
    title: "Fight a Speeding Ticket in California",
    slug: "fight-speeding-ticket-california",
    description: "How to contest a speeding ticket in California traffic court"
  },
  {
    title: "Expunge Your Criminal Record",
    slug: "expunge-criminal-record",
    description: "Clear your criminal history through expungement"
  },
  {
    title: "Small Claims Court Process",
    slug: "small-claims-court-process",
    description: "Navigate small claims court without a lawyer"
  }
];

export default function DUIDefenseGuide() {
  return (
    <>
      <Helmet>
        <title>DUI Defense Guide: Penalties, Process & How to Fight DUI Charges 2025 | Legal Compass</title>
        <meta name="description" content="Complete DUI defense guide. Learn about DUI penalties, arrest procedures, defenses, license suspension, and how to fight drunk driving charges. Updated 2025." />
        <meta name="keywords" content="DUI defense, DWI charges, drunk driving penalties, fight DUI, DUI lawyer, BAC limit, field sobriety test, DUI first offense" />
        <link rel="canonical" href="https://legalcompass.shop/resources/dui-defense-guide" />
        
        <meta property="og:title" content="DUI Defense Guide: Penalties, Process & How to Fight DUI Charges 2025" />
        <meta property="og:description" content="Complete DUI defense guide. Learn about DUI penalties, arrest procedures, and defenses." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/dui-defense-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "DUI Defense Guide: Penalties, Process & How to Fight DUI Charges 2025",
            "description": "Complete DUI defense guide covering penalties, arrest procedures, defenses, and how to fight drunk driving charges.",
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
                  A DUI arrest can wreck your life—license suspended, thousands in fines, maybe jail time. This guide explains penalties, the arrest process, real defenses that work, and what you need to do immediately to protect yourself.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  What makes this guide unique: We detail specific penalties by offense (1st, 2nd, 3rd DUI with actual dollar amounts), explain your rights at each arrest stage (you CAN refuse field sobriety tests), provide concrete defenses that challenge breathalyzer accuracy and police procedures, and include critical deadlines (you have 10 days to request DMV hearing or lose your license automatically).
                </p>
              </div>

              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  DUI Defense Guide: Penalties, Process & How to Fight Charges
                </h1>
                <VerifiedBadge lastReviewed="2025-01-15" />
              </header>

              <ArticleAuthor />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Getting arrested for DUI feels like the end of the world—license gone, job at risk, thousands you don't have to spend. Understanding your rights, what actually happens next, and what defenses might work can make the difference between a dismissal and a conviction that follows you for years.
                </p>

              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 mb-8 rounded-r">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Legal Disclaimer</h3>
                    <p className="text-red-800 dark:text-red-300 text-sm mb-0">
                      This guide is for informational purposes only and does not constitute legal advice. Every DUI case is 
                      unique. If you've been arrested for DUI, consult with a qualified DUI attorney immediately. There are 
                      strict deadlines that, if missed, can result in automatic license suspension.
                    </p>
                  </div>
                </div>
              </div>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Scale className="mr-3 h-8 w-8 text-primary" />
                  What Is a DUI?
                </h2>
                
                <p className="mb-4">
                  DUI (Driving Under the Influence) means operating a vehicle while impaired by:
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span><strong>Alcohol:</strong> Blood Alcohol Concentration (BAC) of 0.08% or higher (0.04% for commercial drivers, 0.02% for drivers under 21)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span><strong>Drugs:</strong> Illegal drugs, prescription medications, or over-the-counter drugs that impair driving ability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 font-bold">•</span>
                    <span><strong>Combination:</strong> Alcohol and drugs together</span>
                  </li>
                </ul>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Important: You Can Get a DUI Even Below 0.08%</h3>
                    <p className="text-sm text-muted-foreground">
                      If an officer believes you're impaired, you can be arrested for DUI even if your BAC is under the 
                      legal limit. Many states have "impaired driving" laws that don't require a specific BAC level.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <DollarSign className="mr-3 h-8 w-8 text-primary" />
                  DUI Penalties by Offense
                </h2>
                
                <p className="mb-6">Penalties vary by state but typically include:</p>

                <div className="space-y-6">
                  <Card className="border-l-4 border-amber-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-4 text-foreground">First DUI Offense</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">Criminal Penalties:</p>
                          <ul className="text-sm space-y-1">
                            <li>• Fines: $500-$2,000</li>
                            <li>• Jail: 0-6 months (often suspended)</li>
                            <li>• Probation: 1-3 years</li>
                            <li>• DUI school: 3-9 months</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">License & Other:</p>
                          <ul className="text-sm space-y-1">
                            <li>• License suspension: 3-12 months</li>
                            <li>• Ignition interlock device (IID)</li>
                            <li>• Increased insurance rates</li>
                            <li>• Possible community service</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4 italic">
                        <strong>Total cost:</strong> $10,000-$15,000+ including fines, attorney fees, and increased insurance
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-orange-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-4 text-foreground">Second DUI Offense</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">Criminal Penalties:</p>
                          <ul className="text-sm space-y-1">
                            <li>• Fines: $1,000-$5,000</li>
                            <li>• Jail: 10 days-1 year (mandatory minimum)</li>
                            <li>• Probation: 3-5 years</li>
                            <li>• DUI school: 18-30 months</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">License & Other:</p>
                          <ul className="text-sm space-y-1">
                            <li>• License suspension: 1-2 years</li>
                            <li>• Mandatory IID (1-3 years)</li>
                            <li>• Vehicle impoundment possible</li>
                            <li>• Mandatory community service</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-red-600">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-4 text-foreground">Third DUI Offense (Felony in Many States)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">Criminal Penalties:</p>
                          <ul className="text-sm space-y-1">
                            <li>• Fines: $2,000-$10,000+</li>
                            <li>• Prison: 1-5 years (state prison)</li>
                            <li>• Probation: 3-5 years</li>
                            <li>• Felony conviction on record</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">License & Other:</p>
                          <ul className="text-sm space-y-1">
                            <li>• License suspension: 2-10 years</li>
                            <li>• Permanent license revocation possible</li>
                            <li>• Mandatory IID (3+ years)</li>
                            <li>• Loss of voting rights, gun rights</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-red-900 dark:text-red-200 mb-3">Aggravating Factors Increase Penalties</h3>
                    <ul className="space-y-2 text-sm text-red-800 dark:text-red-300">
                      <li>• BAC of 0.15% or higher (extreme DUI)</li>
                      <li>• Child passenger under 14 in vehicle</li>
                      <li>• Causing injury or death</li>
                      <li>• Excessive speeding or reckless driving</li>
                      <li>• Refusing chemical test</li>
                      <li>• Driving on suspended license</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Clock className="mr-3 h-8 w-8 text-primary" />
                  The DUI Arrest Process
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">1. Traffic Stop</h3>
                    <p className="mb-3">Officer pulls you over for:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Traffic violation (speeding, running stop sign, etc.)</li>
                      <li>• Erratic driving (swerving, weaving, driving too slowly)</li>
                      <li>• DUI checkpoint</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      <strong>Your rights:</strong> Be polite and cooperative. Provide license, registration, and insurance. 
                      You have the right to remain silent beyond basic identification.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">2. Field Sobriety Tests (FSTs)</h3>
                    <p className="mb-3">Officer may ask you to perform physical tests such as:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Walk-and-turn test</li>
                      <li>• One-leg stand test</li>
                      <li>• Horizontal gaze nystagmus (follow pen with eyes)</li>
                    </ul>
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded">
                      <p className="text-sm text-amber-900 dark:text-amber-200">
                        <strong>Know Your Rights:</strong> Field sobriety tests are VOLUNTARY in most states. You can politely 
                        refuse without penalty. These tests are subjective and designed for failure. However, refusal may give 
                        the officer more reason to arrest you.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">3. Preliminary Alcohol Screening (PAS) - Roadside Breathalyzer</h3>
                    <p className="mb-3">
                      Portable breath test administered at roadside. This is also VOLUNTARY for drivers over 21 (mandatory for under-21 drivers).
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Results are less accurate than station breathalyzers and can be challenged in court.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">4. Arrest and Chemical Test</h3>
                    <p className="mb-3">If arrested, you'll be taken to the station for a chemical test (your choice of):</p>
                    <ul className="space-y-2 mb-4">
                      <li>• <strong>Breath test (Breathalyzer):</strong> Most common, immediate results</li>
                      <li>• <strong>Blood test:</strong> More accurate, takes time to process</li>
                      <li>• <strong>Urine test:</strong> Rarely used, least accurate</li>
                    </ul>
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 rounded">
                      <p className="text-sm text-red-900 dark:text-red-200">
                        <strong>Implied Consent Law:</strong> By having a driver's license, you've agreed to take a chemical 
                        test when arrested for DUI. Refusing results in automatic license suspension (typically 1-2 years) 
                        and can be used against you in court.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">5. Release and License Suspension Notice</h3>
                    <p className="mb-3">You'll typically be:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Released within a few hours (bail or own recognizance)</li>
                      <li>• Given a temporary license (30-day permit)</li>
                      <li>• Notified of DMV hearing deadline (typically 10 days)</li>
                      <li>• Given a court date for criminal charges</li>
                    </ul>
                    <p className="text-sm font-semibold text-red-600">
                      CRITICAL: You have only 10 days in most states to request a DMV hearing to contest your license 
                      suspension. Miss this deadline and your license is automatically suspended!
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Shield className="mr-3 h-8 w-8 text-primary" />
                  Common DUI Defenses
                </h2>
                
                <p className="mb-6">
                  Even if you failed a breathalyzer, experienced DUI attorneys can challenge the charges. Common defenses include:
                </p>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Illegal Traffic Stop</h3>
                      <p className="text-sm">
                        Officer must have reasonable suspicion to pull you over. If the stop was unlawful, all evidence 
                        (including test results) may be suppressed.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Improper Field Sobriety Tests</h3>
                      <p className="text-sm">
                        FSTs must be administered according to NHTSA standards. Poor lighting, uneven surface, medical 
                        conditions, or officer error can invalidate results.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Breathalyzer Inaccuracy</h3>
                      <p className="text-sm">
                        Breathalyzers can be inaccurate due to:
                      </p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Improper calibration or maintenance</li>
                        <li>• Mouth alcohol from recent drinking, mouthwash, or GERD</li>
                        <li>• Radio frequency interference</li>
                        <li>• Operator error</li>
                        <li>• Rising BAC (alcohol still absorbing when tested)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Blood Test Issues</h3>
                      <p className="text-sm">
                        Blood tests can be challenged based on:
                      </p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Improper storage or handling (chain of custody)</li>
                        <li>• Contamination during collection</li>
                        <li>• Fermentation in vial (increases BAC artificially)</li>
                        <li>• Lab errors or technician qualifications</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Medical Conditions</h3>
                      <p className="text-sm">
                        Certain conditions mimic intoxication or affect test results:
                      </p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>• Diabetes (ketones can register as alcohol)</li>
                        <li>• GERD or acid reflux</li>
                        <li>• Neurological conditions affecting balance</li>
                        <li>• Eye conditions affecting gaze test</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Not Driving or No Evidence of Driving</h3>
                      <p className="text-sm">
                        If officer didn't actually see you driving, there may be reasonable doubt that you were the driver 
                        or that you were impaired while driving (vs. drinking after parking).
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Rising Blood Alcohol Defense</h3>
                      <p className="text-sm">
                        Alcohol takes 30-90 minutes to fully absorb. You may have been under the limit while driving but 
                        over by the time you were tested.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Ban className="mr-3 h-8 w-8 text-primary" />
                  DMV License Suspension vs. Criminal Case
                </h2>
                
                <p className="mb-6">
                  A DUI arrest triggers TWO separate proceedings:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">1. DMV Administrative Hearing</h3>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Purpose:</strong> License suspension only</li>
                        <li>• <strong>Timeline:</strong> Request hearing within 10 days</li>
                        <li>• <strong>Burden:</strong> Lower standard of proof</li>
                        <li>• <strong>Issues:</strong> Was there probable cause? Did you refuse test? Was BAC over limit?</li>
                        <li>• <strong>Result:</strong> License suspended or driving privileges retained</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">2. Criminal Court Case</h3>
                      <ul className="text-sm space-y-2">
                        <li>• <strong>Purpose:</strong> Criminal conviction, fines, jail</li>
                        <li>• <strong>Timeline:</strong> Arraignment in 2-4 weeks</li>
                        <li>• <strong>Burden:</strong> Beyond reasonable doubt</li>
                        <li>• <strong>Issues:</strong> All evidence, defenses, and legal arguments</li>
                        <li>• <strong>Result:</strong> Guilty/not guilty, sentencing if convicted</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-3">Important</h3>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      You can win the DMV hearing but still be convicted criminally (or vice versa). These are independent 
                      proceedings. A DUI attorney handles both to maximize your chances of keeping your license and avoiding conviction.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Should You Hire a DUI Attorney?</h2>
                
                <p className="mb-6">
                  <strong>Short answer: Yes.</strong> Here's why:
                </p>

                <div className="space-y-4 mb-6">
                  <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-3">Benefits of Hiring a DUI Lawyer</h3>
                      <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
                        <li>• Navigate DMV hearing (10-day deadline)</li>
                        <li>• Challenge evidence and test results</li>
                        <li>• Negotiate reduced charges (wet reckless, dry reckless)</li>
                        <li>• Explore diversion programs (first-time offenders)</li>
                        <li>• Minimize penalties, jail time, and fines</li>
                        <li>• Protect your driving privileges and employment</li>
                        <li>• Higher chance of case dismissal or acquittal</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3 text-foreground">Cost vs. Benefit</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">DUI Attorney Cost:</p>
                          <p className="text-2xl font-bold text-primary mb-2">$2,500-$10,000</p>
                          <p className="text-xs text-muted-foreground">Varies by location and case complexity</p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-2 text-foreground">DUI Conviction Cost:</p>
                          <p className="text-2xl font-bold text-red-600 mb-2">$10,000-$25,000+</p>
                          <p className="text-xs text-muted-foreground">Includes fines, insurance, lost income, and long-term consequences</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-sm text-muted-foreground">
                  A DUI conviction can affect employment, professional licenses, insurance rates (often doubling), child 
                  custody, immigration status, and housing. The cost of an attorney is often less than the financial and 
                  personal costs of a conviction.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Immediate Steps After a DUI Arrest</h2>
                
                <div className="space-y-4">
                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                        Request DMV Hearing (Within 10 Days!)
                      </h3>
                      <p className="text-sm text-muted-foreground ml-9">
                        This is your MOST CRITICAL DEADLINE. Miss it and automatic suspension begins.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                        Contact a DUI Attorney Immediately
                      </h3>
                      <p className="text-sm text-muted-foreground ml-9">
                        Early involvement improves outcomes. Many offer free consultations.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                        Document Everything
                      </h3>
                      <p className="text-sm text-muted-foreground ml-9">
                        Write down everything you remember: what you ate/drank, when, medications, arrest details, officer statements.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
                        Don't Discuss Your Case
                      </h3>
                      <p className="text-sm text-muted-foreground ml-9">
                        Don't post on social media or discuss details with anyone except your attorney.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground flex items-center">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">5</span>
                        Arrange Alternative Transportation
                      </h3>
                      <p className="text-sm text-muted-foreground ml-9">
                        Your license may be suspended soon. Plan for rideshares, public transit, or carpool.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r mb-8">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Arrested for DUI? Act Fast</h3>
                <p className="mb-4 text-sm">
                  Time is critical in DUI cases. The 10-day DMV hearing deadline and early attorney involvement can 
                  significantly impact your case outcome. Don't face DUI charges alone.
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