import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const WorkersCompensation = () => {
  return (
    <>
      <Helmet>
        <title>Workers' Compensation Claims: Complete Guide to Filing & Benefits | Legal Compass</title>
        <meta 
          name="description" 
          content="Learn how to file a workers' compensation claim, what injuries are covered, benefit types, timelines, and common reasons claims are denied. State-by-state guide for 2025." 
        />
        <meta 
          name="keywords" 
          content="workers compensation, workers comp claim, workplace injury, occupational disease, workers comp benefits, workers comp denial, workers comp attorney, injured at work" 
        />
        <link rel="canonical" href="https://legalcompass.shop/resources/workers-compensation" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/workers-compensation" />
        <meta property="og:title" content="Workers' Compensation Claims: Complete Guide to Filing & Benefits" />
        <meta property="og:description" content="Learn how to file a workers' compensation claim, what injuries are covered, benefit types, timelines, and common reasons claims are denied. State-by-state guide for 2025." />
        <meta property="og:site_name" content="Legal Compass" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:author" content="Legal Compass Team" />
        <meta property="article:section" content="Employment Law" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalcompass.shop/resources/workers-compensation" />
        <meta name="twitter:title" content="Workers' Compensation Claims: Complete Guide to Filing & Benefits" />
        <meta name="twitter:description" content="Learn how to file a workers' compensation claim, what injuries are covered, benefit types, timelines, and common reasons claims are denied." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Workers' Compensation Claims: Complete Guide for 2025",
            "description": "Everything you need to know about filing workers' comp claims, covered injuries, benefits, and what to do if your claim is denied",
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
              "@id": "https://legalcompass.shop/resources/workers-compensation"
            },
            "articleSection": "Employment Law",
            "keywords": "workers compensation, workers comp claim, workplace injury, occupational disease, workers comp benefits, workers comp denial, workers comp attorney, injured at work"
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
                This guide provides comprehensive information on filing workers' compensation claims, understanding your rights, and navigating the claims process. Whether you've suffered a workplace injury or occupational disease, we explain exactly what you're entitled to and how to protect your benefits.
              </p>
              <p className="text-sm text-muted-foreground italic">
                What makes this guide unique: Unlike generic overviews, we include state-specific reporting deadlines, actual benefit calculation formulas, specific reasons claims are denied, and step-by-step appeals processes with realistic timelines and costs.
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Workers' Compensation Claims: Complete Guide for 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know about filing workers' comp claims, covered injuries, benefits, and what to do if your claim is denied
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What is Workers' Compensation?</h2>
              <p className="text-muted-foreground mb-4">
                Workers' compensation is a state-mandated insurance program that provides benefits to employees who suffer work-related injuries or illnesses. It's a no-fault system, meaning you can receive benefits regardless of who caused the injury (with few exceptions).
              </p>
              <p className="text-muted-foreground mb-4">
                Nearly all employers are required to carry workers' comp insurance. In exchange for guaranteed benefits, employees generally cannot sue their employer for workplace injuries (except in cases of gross negligence or intentional harm).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What Injuries and Illnesses Are Covered?</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Covered Injuries</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Acute injuries:</strong> Falls, cuts, burns, broken bones, sprains from a specific incident</li>
                <li><strong>Repetitive stress injuries:</strong> Carpal tunnel syndrome, tendonitis, back strain from repeated motions</li>
                <li><strong>Occupational diseases:</strong> Asbestosis, mesothelioma, hearing loss, respiratory conditions from workplace exposure</li>
                <li><strong>Aggravation of pre-existing conditions:</strong> Work activities that worsen an existing injury or illness</li>
                <li><strong>Mental health conditions:</strong> PTSD, anxiety, depression from workplace trauma (varies by state)</li>
                <li><strong>Heart attacks and strokes:</strong> If work stress or exertion is a significant contributing factor</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">What's NOT Covered</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Injuries from horseplay or fighting</li>
                <li>Self-inflicted injuries</li>
                <li>Injuries while intoxicated or under the influence of drugs</li>
                <li>Injuries during unpaid breaks or while commuting (generally)</li>
                <li>Injuries from violating company policy or law</li>
                <li>Pre-existing conditions not aggravated by work</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Types of Workers' Compensation Benefits</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">1. Medical Benefits</h3>
              <p className="text-muted-foreground mb-4">
                Workers' comp covers all reasonable and necessary medical treatment for work-related injuries:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Emergency room visits and hospitalization</li>
                <li>Doctor visits and specialist consultations</li>
                <li>Surgery and medical procedures</li>
                <li>Prescription medications</li>
                <li>Physical therapy and rehabilitation</li>
                <li>Medical equipment (crutches, wheelchair, prosthetics)</li>
                <li>Mileage reimbursement for medical appointments</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">2. Wage Replacement Benefits</h3>
              <p className="text-muted-foreground mb-4">
                If you can't work due to your injury, you're entitled to wage replacement:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Temporary Total Disability (TTD):</strong> Typically 2/3 of your average weekly wage while unable to work (most common)</li>
                <li><strong>Temporary Partial Disability (TPD):</strong> Partial wage replacement if you return to work at reduced hours or pay</li>
                <li><strong>Permanent Total Disability (PTD):</strong> Long-term benefits if you can never return to any work</li>
                <li><strong>Permanent Partial Disability (PPD):</strong> Lump sum or payments for permanent impairment but can still work</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">3. Vocational Rehabilitation</h3>
              <p className="text-muted-foreground mb-4">
                If you can't return to your previous job, you may receive:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Job retraining and education</li>
                <li>Job placement assistance</li>
                <li>Resume and interview preparation</li>
                <li>Adaptive equipment for new work</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">4. Death Benefits</h3>
              <p className="text-muted-foreground mb-4">
                If a workplace injury results in death, dependents can receive:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Funeral and burial expenses (typically up to $5,000-$15,000)</li>
                <li>Ongoing payments to surviving spouse and dependent children</li>
                <li>Benefits typically continue until the youngest child turns 18 or spouse remarries</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Step-by-Step: How to File a Workers' Comp Claim</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Report Your Injury Immediately</h3>
              <p className="text-muted-foreground mb-4">
                <strong>Critical deadlines:</strong> Most states require reporting within 30 days, but some require 24-72 hours for certain injuries. Report verbally right away and follow up in writing.
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Notify your supervisor, manager, or HR department</li>
                <li>Provide details: when, where, how the injury occurred</li>
                <li>Request a written incident report</li>
                <li>Keep a copy of all documentation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Seek Medical Treatment</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Get emergency treatment if needed</li>
                <li>Your employer may direct you to a specific doctor or medical network</li>
                <li>Tell the doctor your injury is work-related</li>
                <li>Follow all treatment recommendations</li>
                <li>Keep all medical records, bills, and receipts</li>
                <li>Document all symptoms and how they affect your daily life</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: File a Formal Claim</h3>
              <p className="text-muted-foreground mb-4">
                File a claim with your state's workers' compensation board:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Deadline:</strong> Varies by state (typically 1-3 years from injury date)</li>
                <li><strong>Required information:</strong> Your personal details, employer information, injury description, medical provider details</li>
                <li><strong>Forms:</strong> Obtain from your employer, state workers' comp board website, or workers' comp attorney</li>
                <li><strong>Copies:</strong> Keep copies of everything you submit</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: Your Employer/Insurance Company Responds</h3>
              <p className="text-muted-foreground mb-4">
                The insurance carrier has a specific time to accept or deny your claim (typically 14-90 days depending on state):
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Accepted:</strong> Benefits begin; medical bills are paid</li>
                <li><strong>Denied:</strong> You receive a written explanation; you have the right to appeal</li>
                <li><strong>Under investigation:</strong> May request additional information or medical examination</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: Receive Benefits or Appeal Denial</h3>
              <p className="text-muted-foreground mb-4">
                If accepted, you'll receive ongoing medical care and wage replacement checks. If denied, you can:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Request a hearing before a workers' comp judge</li>
                <li>Hire a workers' comp attorney</li>
                <li>Gather additional medical evidence</li>
                <li>Present your case at a formal hearing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Common Reasons Claims Are Denied</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Late reporting:</strong> Missing the deadline to report the injury to your employer</li>
                <li><strong>Insufficient medical evidence:</strong> Doctor doesn't clearly state injury is work-related</li>
                <li><strong>Pre-existing condition:</strong> Insurance claims injury existed before employment</li>
                <li><strong>Dispute about how injury occurred:</strong> Employer claims injury happened outside of work</li>
                <li><strong>Independent contractor status:</strong> Employer claims you're not an employee</li>
                <li><strong>Intoxication:</strong> Positive drug/alcohol test at time of injury</li>
                <li><strong>Failure to seek authorized treatment:</strong> Seeing a doctor not approved by workers' comp</li>
                <li><strong>Inconsistent statements:</strong> Your description of the injury changes over time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">State-Specific Workers' Comp Requirements</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Reporting Deadlines by State</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>California:</strong> 30 days to employer; 1 year to file claim</li>
                <li><strong>Texas:</strong> 30 days to employer; 1 year to file claim (note: Texas doesn't require employers to carry workers' comp)</li>
                <li><strong>Florida:</strong> 30 days to employer; 2 years to file claim</li>
                <li><strong>New York:</strong> 30 days to employer; 2 years to file claim</li>
                <li><strong>Illinois:</strong> 45 days to employer; 3 years to file claim</li>
                <li><strong>Pennsylvania:</strong> 21 days for medical treatment; 120 days to employer; 3 years to file claim</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Benefit Calculation Differences</h3>
              <p className="text-muted-foreground mb-4">
                Wage replacement varies by state:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Most states pay 2/3 of average weekly wage</li>
                <li>Maximum weekly benefits range from $400-$2,000+ depending on state</li>
                <li>Waiting periods before benefits start: typically 3-7 days</li>
                <li>Some states have retroactive pay if you're out more than 14-21 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How Long Do Workers' Comp Cases Take?</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Initial decision on claim:</strong> 14-90 days after filing</li>
                <li><strong>First benefit payment:</strong> 14-30 days after approval</li>
                <li><strong>Simple cases (minor injury):</strong> Resolved in 3-6 months</li>
                <li><strong>Moderate cases (surgery required):</strong> 6-18 months</li>
                <li><strong>Complex cases or disputes:</strong> 1-3 years or more</li>
                <li><strong>Hearings and appeals:</strong> Can add 6-18 months to the process</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Can You Be Fired for Filing a Workers' Comp Claim?</h2>
              <p className="text-muted-foreground mb-4">
                No. It's illegal in all states to fire, demote, or retaliate against an employee for filing a workers' compensation claim. This is called "workers' comp retaliation" and you can sue your employer for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Wrongful termination</li>
                <li>Lost wages and benefits</li>
                <li>Emotional distress</li>
                <li>Punitive damages</li>
                <li>Attorney fees</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                However, you can be fired for legitimate reasons unrelated to your claim. If you believe you were retaliated against, consult an employment attorney immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Do You Need a Workers' Comp Attorney?</h2>
              <p className="text-muted-foreground mb-4">
                You should consider hiring an attorney if:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Your claim was denied or benefits were terminated</li>
                <li>Your injury is severe or will cause permanent disability</li>
                <li>You're being pressured to settle for less than you deserve</li>
                <li>Your employer retaliates against you</li>
                <li>You need to appeal a decision</li>
                <li>The insurance company is acting in bad faith</li>
                <li>You have a pre-existing condition that complicates your claim</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Workers' comp attorneys typically work on contingency (no upfront fees). They receive 15-25% of your settlement or benefits, and fees are often regulated by state law.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Tips for a Successful Workers' Comp Claim</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Report immediately:</strong> Don't wait; late reporting is the #1 reason claims are denied</li>
                <li><strong>Be specific and consistent:</strong> Provide detailed, accurate information about how the injury occurred</li>
                <li><strong>Follow medical advice:</strong> Attend all appointments and follow treatment plans</li>
                <li><strong>Document everything:</strong> Keep records of all medical visits, expenses, communications</li>
                <li><strong>Don't minimize your injury:</strong> Be honest about pain and limitations</li>
                <li><strong>Avoid social media:</strong> Don't post photos or activities that could contradict your claim</li>
                <li><strong>Cooperate with investigations:</strong> But don't sign anything without reviewing carefully</li>
                <li><strong>Know your rights:</strong> You have the right to a second medical opinion in most states</li>
              </ul>
            </section>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Need Help With Your Workers' Comp Claim?</h2>
              <p className="text-muted-foreground mb-6">
                Legal Compass AI can help you understand your rights, determine if you have a valid claim, and connect you with experienced workers' compensation attorneys in your area. Get personalized guidance for your specific injury and state.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Workers' Comp Claim Guidance
                </Button>
              </Link>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Related Resources</h3>
              <div className="grid gap-3">
                <Link to="/resources/employment-discrimination" className="text-primary hover:underline">
                  → Employment Discrimination Laws
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

        <FloatingAIButton topicContext="Workers Compensation" />
        <Footer />
      </div>
    </>
  );
};

export default WorkersCompensation;