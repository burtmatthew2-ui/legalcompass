import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ShareButton } from "@/components/ShareButton";

import { ArticleAuthor } from "@/components/ArticleAuthor";
import { Home } from "lucide-react";
import { Helmet } from "react-helmet";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const PersonalInjuryClaims = () => {
  return (
    <>
      <Helmet>
        <title>Personal Injury Claims Guide: Steps, Timeline & Settlement 2024</title>
        <meta name="description" content="Complete guide to filing personal injury claims: injury types, claim process, settlement negotiation, statute of limitations, and what your case is worth. Free legal consultation tips." />
        <meta name="keywords" content="personal injury claim, injury settlement, accident lawyer, personal injury lawsuit, claim process, injury compensation, negligence claim, settlement negotiation" />
        <link rel="canonical" href="https://legalcompass.shop/resources/personal-injury-claims" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/personal-injury-claims" />
        <meta property="og:title" content="Personal Injury Claims Guide: Steps, Timeline & Settlement 2024" />
        <meta property="og:description" content="Complete guide to filing personal injury claims: injury types, claim process, settlement negotiation, statute of limitations, and what your case is worth." />
        <meta property="og:site_name" content="Legal Compass" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:author" content="Legal Compass Team" />
        <meta property="article:section" content="Personal Injury" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalcompass.shop/resources/personal-injury-claims" />
        <meta name="twitter:title" content="Personal Injury Claims Guide: Steps, Timeline & Settlement 2024" />
        <meta name="twitter:description" content="Complete guide to filing personal injury claims: injury types, claim process, settlement negotiation, statute of limitations, and what your case is worth." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Personal Injury Claims: Complete Guide to Filing & Winning Your Case",
            "description": "Step-by-step guide to filing personal injury claims, negotiating settlements, and understanding what your case is worth after an accident or injury.",
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
              "@id": "https://legalcompass.shop/resources/personal-injury-claims"
            },
            "articleSection": "Personal Injury",
            "keywords": "personal injury claim, injury settlement, accident lawyer, personal injury lawsuit, claim process, injury compensation, negligence claim, settlement negotiation"
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
                Personal Injury Claims: Complete Guide to Filing & Winning Your Case
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Step-by-step guide to filing personal injury claims, negotiating settlements, and understanding what your case is worth after an accident or injury.
              </p>
              <div className="flex items-center justify-between">
                <ArticleAuthor />
                <ShareButton />
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">What Is a Personal Injury Claim?</h2>
                <p className="text-lg leading-relaxed text-foreground/90">
                  A personal injury claim is a legal case filed when you've been hurt due to someone else's negligence or intentional actions. These claims seek financial compensation for medical bills, lost wages, pain and suffering, and other damages resulting from your injuries.
                </p>
                <p>
                  <strong>Key principle:</strong> To win a personal injury case, you must prove the other party was at fault (liable) and that their actions directly caused your injuries.
                </p>
              </section>

              {/* Types of Personal Injury Cases */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Common Types of Personal Injury Cases</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Car Accidents</h3>
                    <p>Most common personal injury claims. Includes rear-end collisions, T-bone crashes, hit-and-runs, and drunk driving accidents.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Slip and Fall / Premises Liability</h3>
                    <p>Injuries on someone else's property due to hazardous conditions like wet floors, broken stairs, inadequate lighting, or negligent security.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Medical Malpractice</h3>
                    <p>Harm caused by healthcare provider negligence, including misdiagnosis, surgical errors, medication mistakes, or birth injuries.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Product Liability</h3>
                    <p>Injuries from defective products, including design defects, manufacturing defects, or failure to warn about dangers.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Dog Bites / Animal Attacks</h3>
                    <p>Injuries caused by animals, where the owner may be strictly liable depending on state law.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Workplace Accidents</h3>
                    <p>Injuries at work may involve workers' comp claims or third-party liability if caused by someone other than your employer.</p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Assault and Intentional Torts</h3>
                    <p>Deliberate acts causing harm, including assault, battery, or false imprisonment.</p>
                  </div>
                </div>
              </section>

              {/* Elements to Prove */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">What You Must Prove to Win Your Case</h2>
                <p className="mb-4">
                  To succeed in a personal injury claim, you must establish four elements:
                </p>
                
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="p-4 bg-card border border-border rounded-lg">
                    <strong className="text-lg">Duty of Care:</strong> The defendant owed you a legal duty to act reasonably (e.g., drivers must follow traffic laws, property owners must maintain safe premises).
                  </li>
                  <li className="p-4 bg-card border border-border rounded-lg">
                    <strong className="text-lg">Breach of Duty:</strong> The defendant breached that duty through action or inaction (e.g., ran a red light, failed to clean up a spill).
                  </li>
                  <li className="p-4 bg-card border border-border rounded-lg">
                    <strong className="text-lg">Causation:</strong> The breach directly caused your injuries. You must show "but for" their actions, you wouldn't have been injured.
                  </li>
                  <li className="p-4 bg-card border border-border rounded-lg">
                    <strong className="text-lg">Damages:</strong> You suffered actual harm (medical bills, lost income, pain and suffering) that can be compensated.
                  </li>
                </ol>
              </section>

              {/* Step-by-Step Process */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Personal Injury Claim Process: Step-by-Step</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 1: Seek Medical Attention Immediately</h3>
                    <p>Go to the ER or urgent care right after the accident, even if you feel fine. Delayed treatment can hurt your claim.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Why it matters:</strong> Medical records are crucial evidence. Insurance companies will argue injuries aren't serious if you waited to see a doctor.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 2: Document Everything</h3>
                    <ul className="space-y-1">
                      <li>• Take photos/videos of the accident scene, injuries, property damage</li>
                      <li>• Get contact info from witnesses</li>
                      <li>• File a police report (for accidents)</li>
                      <li>• Keep all medical records, bills, prescriptions</li>
                      <li>• Document lost wages and out-of-pocket expenses</li>
                      <li>• Keep a pain journal detailing your daily suffering</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 3: Report to Insurance (Carefully)</h3>
                    <p>Notify your insurance company of the accident, but <strong>do not give a recorded statement</strong> to the other party's insurer without consulting a lawyer first.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Pro tip:</strong> Insurance adjusters will try to get you to admit fault or downplay injuries. Stick to basic facts only.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 4: Consult a Personal Injury Attorney</h3>
                    <p>Most personal injury lawyers work on <strong>contingency fees</strong> (typically 33-40%), meaning they only get paid if you win. Free consultations are standard.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>When to hire a lawyer:</strong> Serious injuries, disputed liability, lowball settlement offers, or when the insurance company denies your claim.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 5: Investigation and Demand Letter</h3>
                    <p>Your attorney investigates the claim, gathers evidence, obtains medical records, and sends a demand letter to the at-fault party's insurer outlining your damages and settlement demand.</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 6: Negotiate Settlement</h3>
                    <p>Most cases settle before trial. Your lawyer negotiates with the insurance company to reach a fair settlement. This can take weeks to months.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Important:</strong> Never accept the first offer. Initial offers are usually 20-40% of your case's actual value.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 7: File a Lawsuit (If Necessary)</h3>
                    <p>If settlement fails, your attorney files a personal injury lawsuit. This begins the formal litigation process with discovery, depositions, and potentially trial.</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold mb-2">Step 8: Trial or Settlement</h3>
                    <p>Even after filing, most cases still settle before trial. If you go to trial, a jury (or judge) determines liability and damages.</p>
                  </div>
                </div>
              </section>

              {/* Statute of Limitations */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Statute of Limitations by State</h2>
                <p className="mb-4">
                  The statute of limitations is the deadline to file your personal injury lawsuit. Miss this deadline, and you lose your right to sue permanently.
                </p>
                
                <div className="p-4 bg-card border border-border rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-2">Common Deadlines (varies by state):</h3>
                  <ul className="space-y-2">
                    <li><strong>California:</strong> 2 years from injury date</li>
                    <li><strong>Texas:</strong> 2 years from injury date</li>
                    <li><strong>New York:</strong> 3 years from injury date</li>
                    <li><strong>Florida:</strong> 4 years from injury date (but 2 years for medical malpractice)</li>
                    <li><strong>Louisiana:</strong> 1 year from injury date</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-500/10 border-2 border-yellow-500/50 rounded-lg">
                  <p className="font-semibold mb-2">⚠️ Critical Deadlines:</p>
                  <ul className="space-y-1">
                    <li>• <strong>Medical malpractice:</strong> Often 1-3 years (shorter than general injuries)</li>
                    <li>• <strong>Government claims:</strong> As short as 6 months notice requirement</li>
                    <li>• <strong>Minors:</strong> Clock often doesn't start until they turn 18</li>
                  </ul>
                </div>
              </section>

              {/* What's Your Case Worth */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">What Is My Personal Injury Case Worth?</h2>
                <p className="mb-4">
                  Settlement value depends on multiple factors. Damages fall into two categories:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Economic Damages (Objective Losses)</h3>
                    <ul className="space-y-1">
                      <li>• <strong>Medical expenses:</strong> Past and future treatment costs</li>
                      <li>• <strong>Lost wages:</strong> Income lost due to missed work</li>
                      <li>• <strong>Loss of earning capacity:</strong> If you can't return to your job</li>
                      <li>• <strong>Property damage:</strong> Vehicle repair/replacement costs</li>
                      <li>• <strong>Out-of-pocket costs:</strong> Travel to appointments, home modifications, etc.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Non-Economic Damages (Subjective Losses)</h3>
                    <ul className="space-y-1">
                      <li>• <strong>Pain and suffering:</strong> Physical pain and discomfort</li>
                      <li>• <strong>Emotional distress:</strong> Anxiety, depression, PTSD</li>
                      <li>• <strong>Loss of enjoyment of life:</strong> Can't participate in hobbies/activities</li>
                      <li>• <strong>Loss of consortium:</strong> Impact on relationship with spouse</li>
                      <li>• <strong>Disfigurement/scarring:</strong> Permanent physical changes</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Calculating Settlement Value</h3>
                    <p className="mb-2">A common formula used by insurance companies:</p>
                    <p className="font-mono bg-muted p-3 rounded">
                      (Medical Bills × Multiplier) + Lost Wages + Property Damage = Settlement Estimate
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Multiplier ranges from 1.5 to 5</strong> based on injury severity, permanence, and liability strength.
                    </p>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Factors That Increase Settlement Value</h3>
                    <ul className="space-y-1">
                      <li>✓ Clear liability (defendant obviously at fault)</li>
                      <li>✓ Severe, permanent injuries</li>
                      <li>✓ High medical bills with consistent treatment</li>
                      <li>✓ Strong documentation and evidence</li>
                      <li>✓ Significant impact on quality of life</li>
                      <li>✓ Sympathetic plaintiff (likeable, credible)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Factors That Decrease Settlement Value</h3>
                    <ul className="space-y-1">
                      <li>✗ Disputed liability or shared fault</li>
                      <li>✗ Pre-existing injuries</li>
                      <li>✗ Gaps in medical treatment</li>
                      <li>✗ Minor injuries with full recovery</li>
                      <li>✗ Inconsistent statements or social media posts contradicting injuries</li>
                      <li>✗ Policy limits too low to cover full damages</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Settlement Tips */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Settlement Negotiation Tips</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Do's:</h3>
                    <ul className="space-y-1">
                      <li>✓ <strong>Wait until you reach maximum medical improvement (MMI)</strong> before settling</li>
                      <li>✓ <strong>Document everything</strong> meticulously</li>
                      <li>✓ <strong>Be patient</strong> – good settlements take time</li>
                      <li>✓ <strong>Consider future medical needs</strong> in your demand</li>
                      <li>✓ <strong>Let your lawyer handle negotiations</strong> – they know the tactics</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Don'ts:</h3>
                    <ul className="space-y-1">
                      <li>✗ <strong>Don't accept the first offer</strong> – it's always lowball</li>
                      <li>✗ <strong>Don't sign anything</strong> without attorney review</li>
                      <li>✗ <strong>Don't post on social media</strong> about your case or activities</li>
                      <li>✗ <strong>Don't give recorded statements</strong> to the other side's insurer</li>
                      <li>✗ <strong>Don't exaggerate injuries</strong> – credibility is everything</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* When to Hire a Lawyer */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">Do I Need a Personal Injury Lawyer?</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-500/10 border-2 border-green-500/50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">You Can Handle Your Own Claim If:</h3>
                    <ul className="space-y-1">
                      <li>✓ Injuries are minor (fully healed)</li>
                      <li>✓ Liability is crystal clear</li>
                      <li>✓ Total damages under $10,000</li>
                      <li>✓ Insurance company is cooperative</li>
                      <li>✓ No permanent injuries or scarring</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Hire a Lawyer If:</h3>
                    <ul className="space-y-1">
                      <li>✓ Serious or permanent injuries</li>
                      <li>✓ Medical bills over $10,000</li>
                      <li>✓ Liability is disputed</li>
                      <li>✓ Insurance company denies claim or offers lowball settlement</li>
                      <li>✓ Multiple parties involved</li>
                      <li>✓ Medical malpractice case</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Timeline */}
              <section className="mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-4">How Long Does a Personal Injury Case Take?</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Settlement Timeline (No Lawsuit)</h3>
                    <ul className="space-y-2">
                      <li><strong>2-6 months:</strong> Minor injury cases with clear liability</li>
                      <li><strong>6-12 months:</strong> Moderate injuries requiring extended treatment</li>
                      <li><strong>1-2 years:</strong> Serious injuries where you reach MMI after lengthy treatment</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Lawsuit Timeline (If Filed)</h3>
                    <ul className="space-y-2">
                      <li><strong>1-2 years:</strong> Simple cases that settle during discovery</li>
                      <li><strong>2-3 years:</strong> Cases that go to trial</li>
                      <li><strong>3+ years:</strong> Complex cases with appeals</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Conclusion CTA */}
              <section className="mt-12 p-6 bg-primary/10 border-2 border-primary/30 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Need Legal Advice on Your Personal Injury Case?</h2>
                <p className="mb-4">
                  Every personal injury case is unique. Get personalized legal guidance based on your specific situation and state laws with <strong>Legal Compass AI</strong>.
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
        <FloatingAIButton topicContext="Personal Injury Claims" />
        <Footer />
      </div>
    </>
  );
};

export default PersonalInjuryClaims;