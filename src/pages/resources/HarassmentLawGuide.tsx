import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, AlertTriangle, FileText, Scale, Ban } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { RelatedArticles } from "@/components/RelatedArticles";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ArticleAuthor } from "@/components/ArticleAuthor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const relatedArticles = [
  {
    title: "How to Get a Restraining Order",
    slug: "restraining-order-guide",
    description: "Legal protection from harassment and stalking"
  },
  {
    title: "Employment Discrimination Laws",
    slug: "employment-discrimination",
    description: "Understanding workplace harassment and discrimination"
  },
  {
    title: "Defamation and Online Reputation",
    slug: "defamation-online-reputation",
    description: "Protecting yourself from online attacks"
  }
];

export default function HarassmentLawGuide() {
  return (
    <>
      <Helmet>
        <title>Harassment Laws & Your Rights 2025 | Legal Compass</title>
        <meta name="description" content="Complete guide to harassment laws. Learn what legally constitutes harassment, workplace harassment, police harassment, stalking laws, and how to stop harassment legally." />
        <meta name="keywords" content="what is harassment, harassment laws, police harassment, workplace harassment, stalking laws, sexual harassment, stop harassment legally" />
        <link rel="canonical" href="https://legalcompass.shop/resources/harassment-law-guide" />
        
        <meta property="og:title" content="What Constitutes Harassment: Legal Definition, Laws & Your Rights 2025" />
        <meta property="og:description" content="Understand what legally constitutes harassment, your rights, and how to stop it." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/harassment-law-guide" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What Constitutes Harassment: Legal Definition, Laws & Your Rights 2025",
            "description": "Complete guide to harassment laws including legal definitions, workplace harassment, police harassment, and stopping harassment.",
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
          <BreadcrumbNav />
          <Link to="/resources" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>

            <article>
              <div className="mb-6">
                <p className="text-base text-muted-foreground mb-4">
                  Learn what legally counts as harassment—from exes who won't leave you alone to workplace bullying to police targeting. This guide explains when annoying behavior crosses into illegal territory and what you can do about it.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  What makes this guide unique: We break down the precise legal elements needed to prove harassment (repeated conduct + reasonable person standard), provide specific examples of what qualifies versus what doesn't, detail exact steps for restraining orders with forms and timelines, and explain when police harassment crosses legal lines—with citations to actual statutes, not feel-good platitudes about "standing up for yourself."
                </p>
              </div>

              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  What Constitutes Harassment: Legal Definition, Laws & Your Rights
                </h1>
                <VerifiedBadge lastReviewed="2025-01-15" />
              </header>

              <ArticleAuthor />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Someone won't stop calling you. A coworker makes every shift miserable. Your ex keeps showing up. When does annoying become illegal? Understanding what legally constitutes harassment is the first step to knowing when you can take action and actually get it to stop.
                </p>

              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 mb-8 rounded-r">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">If You're in Immediate Danger</h3>
                    <p className="text-red-800 dark:text-red-300 text-sm mb-0">
                      Call 911 if you're being threatened, stalked, or fear for your safety. Harassment that involves 
                      physical threats, violence, or stalking is a criminal offense requiring immediate police intervention.
                    </p>
                  </div>
                </div>
              </div>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Scale className="mr-3 h-8 w-8 text-primary" />
                  Legal Definition of Harassment
                </h2>
                
                <p className="mb-4">
                  <strong>Harassment</strong> is a course of conduct (repeated behavior) directed at a specific person that:
                </p>
                
                <div className="space-y-4 mb-6">
                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">1. Is Unwanted or Unwelcome</h3>
                      <p className="text-sm text-muted-foreground">
                        The victim has made clear (directly or through their actions) that the behavior is not wanted.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">2. Would Cause a Reasonable Person Distress</h3>
                      <p className="text-sm text-muted-foreground">
                        Not just annoying, but behavior that would alarm, frighten, or seriously annoy a reasonable person 
                        and serves no legitimate purpose.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">3. Is Repeated or Creates a Pattern</h3>
                      <p className="text-sm text-muted-foreground">
                        Generally must occur more than once, though a single extremely threatening event may qualify. 
                        Most states require 2+ incidents.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-primary">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">4. Serves No Legitimate Purpose</h3>
                      <p className="text-sm text-muted-foreground">
                        The behavior is not for a lawful reason (e.g., bill collecting, process serving, or protected speech).
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-3">✓ Examples of Harassment</h3>
                      <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
                        <li>• Repeatedly calling, texting, or emailing after being asked to stop</li>
                        <li>• Following someone (stalking)</li>
                        <li>• Showing up at someone's home or workplace uninvited</li>
                        <li>• Threatening violence or harm</li>
                        <li>• Posting private information online to harm someone (doxxing)</li>
                        <li>• Sending unwanted sexual messages or images</li>
                        <li>• Spreading false rumors to damage reputation</li>
                        <li>• Vandalizing property</li>
                        <li>• Recording or photographing someone without consent in private spaces</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-3">✗ NOT Harassment (Usually)</h3>
                      <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300">
                        <li>• One-time rude or offensive comment</li>
                        <li>• Lawful debt collection efforts</li>
                        <li>• Serving legal papers</li>
                        <li>• Protected free speech or political activity</li>
                        <li>• Mutual arguments or conflicts</li>
                        <li>• Ex-partner contacting about children/custody (unless violating court order)</li>
                        <li>• Boss giving legitimate work criticism</li>
                        <li>• Neighbor complaints made to authorities in good faith</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Shield className="mr-3 h-8 w-8 text-primary" />
                  Types of Harassment
                </h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Workplace/Sexual Harassment</h3>
                      <p className="text-sm mb-3">
                        <strong>Quid Pro Quo:</strong> Job benefits conditioned on sexual favors ("sleep with me or you're fired")
                      </p>
                      <p className="text-sm mb-3">
                        <strong>Hostile Work Environment:</strong> Pervasive unwelcome sexual conduct that interferes with work performance
                      </p>
                      <p className="text-sm mb-3"><strong>Examples:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Unwanted sexual advances, touching, or propositions</li>
                        <li>• Sexual comments, jokes, or displaying explicit materials</li>
                        <li>• Discrimination based on sex, gender identity, or sexual orientation</li>
                        <li>• Retaliation for rejecting advances or reporting harassment</li>
                      </ul>
                      <p className="text-sm font-semibold text-primary">
                        Protected by Title VII (federal) and state employment laws. File with EEOC within 180-300 days.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Stalking</h3>
                      <p className="text-sm mb-3">
                        Willful, malicious, and repeated following or harassment that causes reasonable fear for safety.
                      </p>
                      <p className="text-sm mb-3"><strong>Examples:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Following someone home, to work, or other locations</li>
                        <li>• Monitoring someone's phone, computer, or social media</li>
                        <li>• Installing tracking devices (GPS on car)</li>
                        <li>• Repeated unwanted gifts or messages</li>
                        <li>• Threats of violence to victim or their family</li>
                        <li>• Cyberstalking (online monitoring and harassment)</li>
                      </ul>
                      <p className="text-sm font-semibold text-primary">
                        Stalking is a crime in all 50 states. Penalties: 1-5 years prison, up to $10,000 fine.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Cyberbullying/Online Harassment</h3>
                      <p className="text-sm mb-3">
                        Using electronic communication to bully, threaten, or harass someone.
                      </p>
                      <p className="text-sm mb-3"><strong>Examples:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Sending threatening or abusive texts/emails/DMs</li>
                        <li>• Creating fake social media profiles to impersonate or defame</li>
                        <li>• Posting private photos or information without consent (revenge porn)</li>
                        <li>• Doxxing (publishing private info like address, phone number)</li>
                        <li>• Mass reporting to get accounts suspended</li>
                        <li>• Coordinated online attacks or harassment campaigns</li>
                      </ul>
                      <p className="text-sm font-semibold text-primary">
                        Many states have specific cyberbullying and revenge porn laws. Also violates federal laws if threats or extortion.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Neighbor Harassment</h3>
                      <p className="text-sm mb-3">
                        Repeated unwanted behavior from neighbors that goes beyond minor annoyances.
                      </p>
                      <p className="text-sm mb-3"><strong>Examples:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• Deliberately making excessive noise at all hours</li>
                        <li>• Trespassing on property after being warned</li>
                        <li>• Damaging property (yard, mailbox, car)</li>
                        <li>• Threatening or intimidating behavior</li>
                        <li>• Shining lights into windows to disturb</li>
                        <li>• Filing false complaints or police reports</li>
                      </ul>
                      <p className="text-sm text-muted-foreground italic">
                        Document everything and consider restraining order if pattern escalates.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Police Harassment</h3>
                      <p className="text-sm mb-3">
                        Officers abusing their authority to target, intimidate, or harass individuals without legitimate law enforcement purpose.
                      </p>
                      <p className="text-sm mb-3"><strong>Examples That May Constitute Harassment:</strong></p>
                      <ul className="text-sm space-y-1 mb-3">
                        <li>• <strong>Repeated unjustified stops:</strong> Pulling you over frequently without valid reason (pretextual stops)</li>
                        <li>• <strong>Surveillance without cause:</strong> Monitoring your home or activities without investigation</li>
                        <li>• <strong>False arrests:</strong> Arresting you on fabricated charges to intimidate</li>
                        <li>• <strong>Excessive force:</strong> Using unnecessary violence during encounters</li>
                        <li>• <strong>Retaliatory conduct:</strong> Targeting you for filing complaints or exercising rights</li>
                        <li>• <strong>Racist or discriminatory stops:</strong> Racial profiling, stops based on protected characteristics</li>
                        <li>• <strong>Threats or intimidation:</strong> Warning you to "watch yourself" or threatening arrest without cause</li>
                      </ul>
                      
                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded mt-4">
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">What to Do If You Experience Police Harassment:</p>
                        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                          <li><strong>1. Document everything:</strong> Note dates, times, officer names/badge numbers, witnesses, details of each encounter</li>
                          <li><strong>2. Record interactions:</strong> You have the right to film police in public (keep phone visible, don't interfere)</li>
                          <li><strong>3. File complaint with department:</strong> Internal Affairs or civilian oversight board</li>
                          <li><strong>4. Contact ACLU or civil rights attorney:</strong> May have Section 1983 civil rights claim</li>
                          <li><strong>5. File complaint with DOJ:</strong> If pattern of harassment or civil rights violation</li>
                          <li><strong>6. Never resist or argue during stop:</strong> Comply, then challenge legally later</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded mt-4">
                        <p className="text-sm text-amber-900 dark:text-amber-200">
                          <strong>Important:</strong> Police harassment claims are difficult to prove due to qualified immunity. 
                          You need clear evidence of pattern, lack of legitimate purpose, and violation of rights. Hire experienced 
                          civil rights attorney if pursuing legal action.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <FileText className="mr-3 h-8 w-8 text-primary" />
                  How to Stop Harassment Legally
                </h2>

                <div className="space-y-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Document Everything</h3>
                    <p className="mb-3">Create a detailed record of every harassment incident:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• <strong>Date and time</strong> of each incident</li>
                      <li>• <strong>What happened</strong> (specific actions, exact words)</li>
                      <li>• <strong>Where it occurred</strong></li>
                      <li>• <strong>Witnesses</strong> present</li>
                      <li>• <strong>How it made you feel</strong> (fear, distress)</li>
                      <li>• <strong>Any response</strong> you gave</li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      Save text messages, emails, voicemails, screenshots of social media. Keep everything organized by date.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Tell Them to Stop</h3>
                    <p className="mb-3">
                      Make it clear their behavior is unwanted. Send one firm, clear message:
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-4">
                      <p className="text-sm italic">
                        "Your repeated contact/behavior is unwanted. Do not contact me again for any reason. 
                        Further contact will be considered harassment and I will pursue legal remedies."
                      </p>
                    </div>
                    <ul className="space-y-2 mb-4">
                      <li>• Send via text or email (creates record)</li>
                      <li>• Keep a copy</li>
                      <li>• Do NOT engage after this - any response encourages them</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: Block and Filter</h3>
                    <ul className="space-y-2 mb-4">
                      <li>• Block their number, email, and social media</li>
                      <li>• Set email filters to auto-delete (but save in separate folder for evidence)</li>
                      <li>• Adjust privacy settings on social media</li>
                      <li>• Consider changing your phone number if severe</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: File a Police Report</h3>
                    <p className="mb-3">
                      Report harassment to local police, especially if involving:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• Threats of violence</li>
                      <li>• Stalking behavior</li>
                      <li>• Property damage</li>
                      <li>• Any physical contact</li>
                    </ul>
                    <p className="text-sm mb-3">
                      Bring your documentation. Get a copy of the report (you may need it for restraining order).
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Police may not arrest immediately (harassment is often misdemeanor), but report creates official record.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Send Cease and Desist Letter</h3>
                    <p className="mb-3">
                      Formal letter demanding they stop harassing you. Can be written by you or attorney.
                    </p>
                    <p className="text-sm mb-3"><strong>Should include:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• Description of harassment</li>
                      <li>• Demand to stop all contact</li>
                      <li>• Warning of legal action if continues</li>
                      <li>• Sent via certified mail (proof of receipt)</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Cost: $0-$500 (free if DIY, $200-$500 if attorney drafts). Often effective at stopping harassment.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 6: Obtain a Restraining Order</h3>
                    <p className="mb-3">
                      Court order prohibiting harasser from contacting or approaching you. Violation is criminal offense.
                    </p>
                    <p className="text-sm mb-3"><strong>Types:</strong></p>
                    <ul className="space-y-2 mb-4">
                      <li>• <strong>Civil Harassment Restraining Order:</strong> For non-family members (neighbors, acquaintances, strangers)</li>
                      <li>• <strong>Domestic Violence Restraining Order:</strong> For family members, spouses, dating partners</li>
                      <li>• <strong>Workplace Violence Restraining Order:</strong> For threats at work</li>
                    </ul>
                    <p className="text-sm text-primary font-semibold">
                      See our <Link to="/resources/restraining-order-guide" className="underline">Complete Restraining Order Guide</Link> for detailed filing instructions.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">Step 7: Sue for Damages (Civil Lawsuit)</h3>
                    <p className="mb-3">
                      If harassment caused you harm, you may sue for:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li>• <strong>Intentional infliction of emotional distress</strong></li>
                      <li>• <strong>Invasion of privacy</strong></li>
                      <li>• <strong>Defamation</strong> (if they spread lies)</li>
                      <li>• <strong>Lost wages</strong> (if harassment forced you to miss work)</li>
                      <li>• <strong>Therapy costs</strong></li>
                      <li>• <strong>Punitive damages</strong> (to punish harasser)</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      Consult with personal injury or civil rights attorney. Many work on contingency (only paid if you win).
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 flex items-center text-foreground">
                  <Ban className="mr-3 h-8 w-8 text-primary" />
                  Criminal Penalties for Harassment
                </h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">Misdemeanor Harassment (Most States)</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Fine: $500-$5,000</li>
                        <li>• Jail: Up to 6-12 months</li>
                        <li>• Probation: 1-3 years</li>
                        <li>• Mandatory counseling or anger management</li>
                        <li>• Restraining order</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">Aggravated Harassment (Felony)</h3>
                      <p className="text-sm mb-2 text-muted-foreground">
                        Elevated to felony if involving threats, weapons, violation of restraining order, or targeting protected classes.
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Prison: 1-5 years (state prison)</li>
                        <li>• Fine: $5,000-$250,000</li>
                        <li>• Felony record (affects employment, housing, voting rights)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 text-foreground">Stalking (Felony in Most States)</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Prison: 1-5 years</li>
                        <li>• Fine: Up to $10,000</li>
                        <li>• Permanent restraining order</li>
                        <li>• Registration as stalker (in some states)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Frequently Asked Questions</h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Can someone go to jail for harassing me?</h3>
                      <p className="text-sm">
                        Yes. Harassment is a crime in all 50 states. Penalties range from misdemeanor (up to 1 year jail) 
                        to felony (1-5 years prison) depending on severity and state laws.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">How many times does someone have to contact me for it to be harassment?</h3>
                      <p className="text-sm">
                        Generally 2+ incidents, but even one incident can qualify if it's severe enough (death threats, violence). 
                        The key is whether it creates a "course of conduct" that causes reasonable fear or distress.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Is it harassment if I never told them to stop?</h3>
                      <p className="text-sm">
                        For behavior that's clearly threatening or invasive (stalking, threats), you don't need to tell them 
                        to stop first. But for ambiguous situations, documenting that you told them to stop strengthens your case.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Can I sue someone for harassment?</h3>
                      <p className="text-sm">
                        Yes. You can file civil lawsuit for damages if harassment caused emotional distress, lost wages, 
                        therapy costs, etc. You may recover compensatory damages, punitive damages, and attorney fees.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r mb-8">
                <h3 className="font-semibold text-lg mb-3 text-foreground">Experiencing Harassment? Get Help</h3>
                <p className="mb-4 text-sm">
                  Harassment situations can be complex and dangerous. If you're being harassed, consider consulting with 
                  a personal injury attorney, civil rights lawyer, or victim advocate who can help you understand your 
                  options and take appropriate legal action.
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
        <FloatingAIButton topicContext="Harassment Law" />
        <Footer />
      </div>
    </>
  );
}