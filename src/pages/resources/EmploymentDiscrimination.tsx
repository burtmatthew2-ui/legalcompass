import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { FloatingAIButton } from "@/components/FloatingAIButton";

const EmploymentDiscrimination = () => {
  return (
    <>
      <Helmet>
        <title>Employment Discrimination: File EEOC Claims | Legal Compass</title>
        <meta 
          name="description" 
          content="Complete guide to employment discrimination laws in 2025. Learn about protected classes, types of discrimination, how to file EEOC complaints, and your rights as an employee." 
        />
        <meta 
          name="keywords" 
          content="employment discrimination, workplace discrimination, EEOC complaint, wrongful termination, hostile work environment, age discrimination, race discrimination, gender discrimination, disability discrimination" 
        />
        <link rel="canonical" href="https://legalcompass.shop/resources/employment-discrimination" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://legalcompass.shop/resources/employment-discrimination" />
        <meta property="og:title" content="Employment Discrimination Laws: Types, Examples & How to File a Claim" />
        <meta property="og:description" content="Complete guide to employment discrimination laws in 2025. Learn about protected classes, types of discrimination, how to file EEOC complaints, and your rights as an employee." />
        <meta property="og:site_name" content="Legal Compass" />
        <meta property="article:published_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:modified_time" content="2025-01-15T00:00:00Z" />
        <meta property="article:author" content="Legal Compass Team" />
        <meta property="article:section" content="Employment Law" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalcompass.shop/resources/employment-discrimination" />
        <meta name="twitter:title" content="Employment Discrimination Laws: Types, Examples & How to File a Claim" />
        <meta name="twitter:description" content="Complete guide to employment discrimination laws in 2025. Learn about protected classes, types of discrimination, how to file EEOC complaints, and your rights as an employee." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Employment Discrimination Laws: Types, Examples & How to File a Claim",
            "description": "Complete guide to employment discrimination laws in 2025. Learn about protected classes, types of discrimination, how to file EEOC complaints, and your rights as an employee.",
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
              "@id": "https://legalcompass.shop/resources/employment-discrimination"
            },
            "articleSection": "Employment Law",
            "keywords": "employment discrimination, workplace discrimination, EEOC complaint, wrongful termination, hostile work environment, age discrimination, race discrimination, gender discrimination, disability discrimination"
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
                  Getting fired, passed over, or harassed because of who you are is illegal. This guide breaks down what counts as employment discrimination, who's protected, and exactly how to file an EEOC complaint.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  What makes this guide unique: We explain the exact legal standards for proving discrimination (disparate treatment vs. disparate impact), provide specific examples of what does and doesn't qualify, detail the actual EEOC complaint process with timelines (180-300 days to file or you lose your claim), and clarify when you can sue versus when EEOC handles it—not vague talk about "workplace fairness."
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Employment Discrimination: Complete Legal Guide for 2025
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Understanding your rights, types of discrimination, protected classes, and how to file an EEOC complaint
              </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What is Employment Discrimination?</h2>
              <p className="text-muted-foreground mb-4">
                Employment discrimination occurs when an employer treats an employee or job applicant unfavorably because of their membership in a protected class. Federal law prohibits discrimination in all aspects of employment including hiring, firing, promotions, pay, benefits, training, and job assignments.
              </p>
              <p className="text-muted-foreground mb-4">
                Several federal laws protect employees from discrimination, enforced by the Equal Employment Opportunity Commission (EEOC):
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Title VII of the Civil Rights Act (1964):</strong> Prohibits discrimination based on race, color, religion, sex, national origin</li>
                <li><strong>Age Discrimination in Employment Act (ADEA):</strong> Protects workers 40 and older</li>
                <li><strong>Americans with Disabilities Act (ADA):</strong> Protects qualified individuals with disabilities</li>
                <li><strong>Equal Pay Act:</strong> Requires equal pay for equal work regardless of gender</li>
                <li><strong>Genetic Information Nondiscrimination Act (GINA):</strong> Prohibits discrimination based on genetic information</li>
                <li><strong>Pregnancy Discrimination Act:</strong> Prohibits discrimination based on pregnancy, childbirth, or related conditions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Protected Classes Under Federal Law</h2>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Race and Color:</strong> African American, Asian, Native American, White, mixed race, skin color</li>
                <li><strong>National Origin:</strong> Country of origin, ethnicity, accent, ancestry</li>
                <li><strong>Religion:</strong> All religions and sincerely held beliefs, including atheism</li>
                <li><strong>Sex/Gender:</strong> Male, female, transgender, sexual orientation (under recent interpretations)</li>
                <li><strong>Pregnancy:</strong> Pregnancy, childbirth, lactation, related medical conditions</li>
                <li><strong>Age:</strong> 40 years old and older</li>
                <li><strong>Disability:</strong> Physical or mental impairment that substantially limits major life activities</li>
                <li><strong>Genetic Information:</strong> Family medical history, genetic test results, genetic services</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Many states and cities provide additional protections for sexual orientation, gender identity, marital status, political affiliation, and other characteristics.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Types of Employment Discrimination</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">1. Disparate Treatment (Intentional Discrimination)</h3>
              <p className="text-muted-foreground mb-4">
                Treating someone less favorably because of a protected characteristic. Examples:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Not hiring qualified women for management positions</li>
                <li>Paying employees of one race less than another for the same work</li>
                <li>Firing an employee shortly after learning they're pregnant</li>
                <li>Refusing to promote employees over 50 to executive roles</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">2. Disparate Impact (Unintentional Discrimination)</h3>
              <p className="text-muted-foreground mb-4">
                Neutral policies that disproportionately affect a protected group without business justification. Examples:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Height and weight requirements that exclude more women than men</li>
                <li>Written tests not related to job duties that disproportionately screen out minorities</li>
                <li>Physical strength requirements beyond what the job actually requires</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">3. Harassment</h3>
              <p className="text-muted-foreground mb-4">
                Unwelcome conduct based on protected characteristics that creates a hostile work environment or results in adverse employment action. Examples:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Sexual harassment: unwanted sexual advances, requests for sexual favors, sexual comments or touching</li>
                <li>Racial slurs, offensive jokes, or derogatory comments</li>
                <li>Display of racist, sexist, or religiously offensive materials</li>
                <li>Intimidation, ridicule, or insults based on protected characteristics</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Harassment is illegal when it's severe or pervasive enough to create an abusive work environment or results in quid pro quo (job benefits in exchange for tolerating harassment).
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">4. Retaliation</h3>
              <p className="text-muted-foreground mb-4">
                Punishing an employee for engaging in protected activity:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Filing a discrimination complaint (EEOC or internal)</li>
                <li>Participating in a discrimination investigation or lawsuit</li>
                <li>Opposing discriminatory practices</li>
                <li>Requesting reasonable accommodation for disability or religion</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Retaliation can include termination, demotion, pay reduction, negative evaluation, or any adverse action that would deter a reasonable person from making a complaint.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Common Examples of Workplace Discrimination</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Age Discrimination</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Laying off only older workers during downsizing</li>
                <li>Comments like "we need fresh blood" or "looking for digital natives"</li>
                <li>Denying training opportunities to workers over 50</li>
                <li>Forcing early retirement</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Race/National Origin Discrimination</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>English-only rules without business necessity</li>
                <li>Hair discrimination (natural hairstyles associated with race)</li>
                <li>Assigning minorities only to back-office or non-customer-facing roles</li>
                <li>Racial profiling in security or theft prevention</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Gender/Sex Discrimination</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Paying women less than men for the same job (equal pay violation)</li>
                <li>Denying promotions to women because they "might get pregnant"</li>
                <li>Excluding women from client meetings or business trips</li>
                <li>Different dress codes based on gender stereotypes</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Pregnancy Discrimination</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Refusing to hire because of pregnancy or plans to have children</li>
                <li>Denying light duty or reasonable accommodations for pregnancy</li>
                <li>Forcing pregnant employees to take unpaid leave</li>
                <li>Firing or demoting after returning from maternity leave</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Disability Discrimination</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Refusing to provide reasonable accommodations (schedule changes, assistive devices, workspace modifications)</li>
                <li>Asking medical questions before job offer</li>
                <li>Terminating employee for taking medical leave</li>
                <li>Assuming someone can't do a job because of their disability</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Religious Discrimination</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Refusing religious accommodation for dress, grooming, or prayer breaks</li>
                <li>Scheduling conflicts with religious observances without attempting accommodation</li>
                <li>Harassment based on religious beliefs or practices</li>
                <li>Proselytizing or forcing religious participation on employees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How to File an EEOC Discrimination Complaint</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 1: Document Everything</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Keep records of discriminatory incidents (dates, times, witnesses, what was said/done)</li>
                <li>Save emails, texts, performance reviews, pay stubs</li>
                <li>Document your job qualifications and performance</li>
                <li>Note any similarly situated employees treated differently</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 2: Report Internally (If Safe to Do So)</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Follow your company's complaint procedure</li>
                <li>Report to HR or supervisor in writing</li>
                <li>Keep copies of all complaints and responses</li>
                <li>This may help resolve the issue and strengthens your case later</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 3: Contact the EEOC</h3>
              <p className="text-muted-foreground mb-4">
                <strong>Deadline:</strong> You must file within 180 days of the discriminatory act (300 days in states with their own anti-discrimination agencies)
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Online:</strong> File through EEOC public portal at eeoc.gov</li>
                <li><strong>Phone:</strong> Call 1-800-669-4000 to schedule an interview</li>
                <li><strong>In person:</strong> Visit your local EEOC field office</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 4: EEOC Investigation</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>EEOC notifies your employer of the charge</li>
                <li>Investigator gathers evidence from both sides</li>
                <li>May offer mediation (voluntary, free, confidential)</li>
                <li>Process takes 6-10 months on average</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 5: EEOC Determination</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Cause finding:</strong> EEOC believes discrimination occurred; attempts conciliation</li>
                <li><strong>No cause finding:</strong> EEOC doesn't find sufficient evidence; issues "right to sue" letter</li>
                <li><strong>Dismissal:</strong> EEOC closes case; issues "right to sue" letter</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Step 6: File a Lawsuit (If Necessary)</h3>
              <p className="text-muted-foreground mb-4">
                After receiving a right-to-sue letter, you have 90 days to file a lawsuit in federal or state court. An employment attorney can help you with this process.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Proving Discrimination: What You Need</h2>
              <p className="text-muted-foreground mb-4">
                To prove discrimination, you typically need to show:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>You're in a protected class</strong></li>
                <li><strong>You were qualified for the position/performing satisfactorily</strong></li>
                <li><strong>You suffered an adverse employment action</strong> (fired, demoted, not hired, denied promotion)</li>
                <li><strong>Similarly situated employees outside your class were treated more favorably</strong></li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Types of evidence:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Direct evidence:</strong> Explicit statements or written policies showing bias (rare)</li>
                <li><strong>Circumstantial evidence:</strong> Patterns, statistics, timing, inconsistent explanations (more common)</li>
                <li><strong>Comparator evidence:</strong> How others were treated in similar situations</li>
                <li><strong>Pretext evidence:</strong> Employer's stated reason is false or not believable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Remedies for Employment Discrimination</h2>
              <p className="text-muted-foreground mb-4">
                If you win your discrimination case, you may receive:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Back pay:</strong> Lost wages from termination/demotion date to judgment</li>
                <li><strong>Front pay:</strong> Future lost earnings if reinstatement isn't feasible</li>
                <li><strong>Reinstatement:</strong> Getting your job back</li>
                <li><strong>Promotion:</strong> If you were denied a promotion</li>
                <li><strong>Compensatory damages:</strong> Emotional distress, pain and suffering (capped at $50,000-$300,000 depending on employer size)</li>
                <li><strong>Punitive damages:</strong> To punish especially egregious conduct (capped, combined with compensatory damages)</li>
                <li><strong>Attorney fees and costs:</strong> If you prevail</li>
                <li><strong>Injunctive relief:</strong> Court order requiring policy changes, training, etc.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Who is Covered? Employee vs. Independent Contractor</h2>
              <p className="text-muted-foreground mb-4">
                Anti-discrimination laws generally apply to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Employers with 15+ employees</strong> (Title VII, ADA, GINA)</li>
                <li><strong>Employers with 20+ employees</strong> (ADEA for age discrimination)</li>
                <li><strong>All employers</strong> (Equal Pay Act)</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Independent contractors:</strong> Generally not protected by federal anti-discrimination laws, but some states provide protections. Misclassification as an independent contractor is illegal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">State and Local Protections</h2>
              <p className="text-muted-foreground mb-4">
                Many states offer broader protections than federal law:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Lower employee thresholds:</strong> Some states protect employees at companies with fewer than 15 employees</li>
                <li><strong>Additional protected classes:</strong> Sexual orientation, gender identity, marital status, political affiliation, criminal history</li>
                <li><strong>Stronger remedies:</strong> Higher damage caps or no caps at all</li>
                <li><strong>Longer filing deadlines:</strong> Up to 300 days in some states</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Check your state's civil rights agency or state labor department for specific protections in your area.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What to Do If You Experience Discrimination</h2>
              <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Don't quit immediately:</strong> It's easier to prove discrimination if you're still employed; quitting may be seen as "constructive discharge" only in extreme cases</li>
                <li><strong>Keep detailed records:</strong> Documentation is critical to your case</li>
                <li><strong>Report the discrimination:</strong> Follow company procedures; put complaints in writing</li>
                <li><strong>Preserve evidence:</strong> Don't delete emails or texts; save performance reviews and witness names</li>
                <li><strong>Know the deadlines:</strong> You have 180-300 days to file with EEOC; don't wait</li>
                <li><strong>Consult an employment attorney:</strong> Many offer free consultations; they can advise on your specific situation</li>
                <li><strong>File with EEOC:</strong> This is required before you can sue in court (except for Equal Pay Act claims)</li>
                <li><strong>Don't sign anything:</strong> Severance agreements often waive discrimination claims; have a lawyer review first</li>
              </ol>
            </section>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Experienced Employment Discrimination?</h2>
              <p className="text-muted-foreground mb-6">
                Legal Compass AI can help you understand your rights, determine if you have a valid discrimination claim, and connect you with experienced employment attorneys. Get personalized guidance for your situation.
              </p>
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Discrimination Claim Guidance
                </Button>
              </Link>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Related Resources</h3>
              <div className="grid gap-3">
                <Link to="/resources/workers-compensation" className="text-primary hover:underline">
                  → Workers' Compensation Claims
                </Link>
                <Link to="/resources/write-cease-desist-letter" className="text-primary hover:underline">
                  → How to Write a Cease and Desist Letter
                </Link>
                <Link to="/resources/small-claims-court-process" className="text-primary hover:underline">
                  → Small Claims Court Process
                </Link>
              </div>
            </div>
          </article>
        </main>

        <FloatingAIButton topicContext="Employment Discrimination" />
        <Footer />
      </div>
    </>
  );
};

export default EmploymentDiscrimination;