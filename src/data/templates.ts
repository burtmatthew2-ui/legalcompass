export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: "free" | "pro" | "business";
  tags: string[];
  content: string;
  customizableFields: {
    label: string;
    placeholder: string;
    type: "text" | "date" | "textarea";
  }[];
  seoKeywords?: string[]; // For search optimization
}

export const templateCategories = [
  "All Templates",
  "Contracts",
  "Court Documents",
  "Business Forms",
  "Estate Planning",
  "Real Estate",
  "Employment",
  "Intellectual Property",
  "Family Law",
  "Criminal Defense",
  "Personal Injury",
  "Immigration",
];

export const templates: Template[] = [
  {
    id: "nda-basic",
    title: "Non-Disclosure Agreement (NDA)",
    description: "Standard confidentiality agreement for business relationships",
    category: "Contracts",
    tier: "free",
    tags: ["confidentiality", "business", "contract"],
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement (the "Agreement") is entered into as of {{date}} by and between {{party1Name}} ("Disclosing Party") and {{party2Name}} ("Receiving Party").

1. CONFIDENTIAL INFORMATION
The parties wish to explore a business opportunity whereby Disclosing Party may disclose certain confidential technical and business information to Receiving Party.

2. OBLIGATIONS
Receiving Party agrees to:
a) Hold and maintain the Confidential Information in strict confidence
b) Not disclose the Confidential Information to third parties
c) Use the Confidential Information solely for {{purpose}}

3. TERM
This Agreement shall remain in effect for a period of {{termYears}} years from the date first written above.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

{{party1Name}}                    {{party2Name}}
Signature: _____________         Signature: _____________
Date: _____________              Date: _____________`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Disclosing Party Name", placeholder: "Enter party name", type: "text" },
      { label: "Receiving Party Name", placeholder: "Enter party name", type: "text" },
      { label: "Purpose", placeholder: "Describe the purpose", type: "textarea" },
      { label: "Term (Years)", placeholder: "Enter number of years", type: "text" },
    ],
  },
  {
    id: "service-agreement",
    title: "Service Agreement Contract",
    description: "Professional services contract template",
    category: "Contracts",
    tier: "pro",
    tags: ["service", "contract", "business"],
    content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is made as of {{date}} between {{clientName}} ("Client") and {{providerName}} ("Service Provider").

1. SERVICES
Service Provider agrees to provide the following services: {{serviceDescription}}

2. COMPENSATION
Client agrees to pay Service Provider {{paymentAmount}} for the services rendered. Payment terms: {{paymentTerms}}

3. TERM AND TERMINATION
This Agreement shall commence on {{startDate}} and continue until {{endDate}}, unless terminated earlier by either party with {{noticePeriod}} days written notice.

4. INTELLECTUAL PROPERTY
All work product created by Service Provider shall be {{ipOwnership}}.

5. CONFIDENTIALITY
Both parties agree to maintain confidentiality of proprietary information.

6. INDEPENDENT CONTRACTOR
Service Provider is an independent contractor and not an employee of Client.

IN WITNESS WHEREOF, the parties execute this Agreement.

{{clientName}}                    {{providerName}}
Signature: _____________         Signature: _____________
Date: _____________              Date: _____________`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Client Name", placeholder: "Enter client name", type: "text" },
      { label: "Service Provider Name", placeholder: "Enter provider name", type: "text" },
      { label: "Service Description", placeholder: "Describe services", type: "textarea" },
      { label: "Payment Amount", placeholder: "Enter amount", type: "text" },
      { label: "Payment Terms", placeholder: "Enter payment terms", type: "text" },
      { label: "Start Date", placeholder: "Enter start date", type: "date" },
      { label: "End Date", placeholder: "Enter end date", type: "date" },
      { label: "Notice Period (Days)", placeholder: "Enter days", type: "text" },
      { label: "IP Ownership", placeholder: "owned by Client/Service Provider", type: "text" },
    ],
  },
  {
    id: "employment-offer",
    title: "Employment Offer Letter",
    description: "Formal job offer letter template",
    category: "Employment",
    tier: "pro",
    tags: ["employment", "offer", "hiring"],
    content: `EMPLOYMENT OFFER LETTER

Date: {{date}}

Dear {{candidateName}},

We are pleased to offer you the position of {{jobTitle}} at {{companyName}}.

POSITION DETAILS:
- Job Title: {{jobTitle}}
- Department: {{department}}
- Start Date: {{startDate}}
- Salary: {{salary}} per year
- Benefits: {{benefits}}

EMPLOYMENT TYPE:
This is a {{employmentType}} position.

REPORTING:
You will report directly to {{supervisorName}}, {{supervisorTitle}}.

WORK SCHEDULE:
Your regular work schedule will be {{workSchedule}}.

CONDITIONS:
This offer is contingent upon {{conditions}}.

Please sign and return this letter by {{responseDeadline}} to confirm your acceptance.

We look forward to welcoming you to our team!

Sincerely,

{{hiringManagerName}}
{{hiringManagerTitle}}

ACCEPTANCE:
I accept the terms of this employment offer.

Signature: _____________
Date: _____________
Print Name: {{candidateName}}`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Candidate Name", placeholder: "Enter candidate name", type: "text" },
      { label: "Job Title", placeholder: "Enter job title", type: "text" },
      { label: "Company Name", placeholder: "Enter company name", type: "text" },
      { label: "Department", placeholder: "Enter department", type: "text" },
      { label: "Start Date", placeholder: "Enter start date", type: "date" },
      { label: "Salary", placeholder: "Enter salary", type: "text" },
      { label: "Benefits", placeholder: "Describe benefits", type: "textarea" },
      { label: "Employment Type", placeholder: "Full-time/Part-time/Contract", type: "text" },
      { label: "Supervisor Name", placeholder: "Enter supervisor name", type: "text" },
      { label: "Supervisor Title", placeholder: "Enter supervisor title", type: "text" },
      { label: "Work Schedule", placeholder: "Enter work schedule", type: "text" },
      { label: "Conditions", placeholder: "Enter conditions", type: "textarea" },
      { label: "Response Deadline", placeholder: "Enter deadline", type: "date" },
      { label: "Hiring Manager Name", placeholder: "Enter manager name", type: "text" },
      { label: "Hiring Manager Title", placeholder: "Enter manager title", type: "text" },
    ],
  },
  {
    id: "llc-operating-agreement",
    title: "LLC Operating Agreement",
    description: "Comprehensive operating agreement for LLCs",
    category: "Business Forms",
    tier: "business",
    tags: ["llc", "business", "operating agreement"],
    content: `OPERATING AGREEMENT OF {{companyName}}

This Operating Agreement ("Agreement") is made as of {{date}} by and among the Members of {{companyName}}, a {{state}} Limited Liability Company.

ARTICLE I - ORGANIZATION
1.1 Formation: The Company was formed by filing Articles of Organization with the {{state}} Secretary of State.
1.2 Name: The name of the Company is {{companyName}}.
1.3 Principal Office: {{address}}

ARTICLE II - MEMBERS AND OWNERSHIP
2.1 Initial Members:
{{membersList}}

2.2 Ownership Interests:
{{ownershipBreakdown}}

ARTICLE III - MANAGEMENT
3.1 Management Structure: The Company shall be managed by {{managementType}}.
3.2 Authority: Managers shall have authority to {{managerAuthority}}.

ARTICLE IV - CAPITAL CONTRIBUTIONS
4.1 Initial Contributions: Each Member has contributed {{contributions}}.

ARTICLE V - DISTRIBUTIONS
5.1 Distributions shall be made {{distributionSchedule}}.

ARTICLE VI - MEETINGS
6.1 Regular meetings shall be held {{meetingFrequency}}.

ARTICLE VII - TRANSFER OF INTERESTS
7.1 No Member may transfer their interest without {{transferRestrictions}}.

IN WITNESS WHEREOF, the Members execute this Agreement.

{{signatures}}`,
    customizableFields: [
      { label: "Company Name", placeholder: "Enter LLC name", type: "text" },
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "State", placeholder: "Enter state", type: "text" },
      { label: "Principal Office Address", placeholder: "Enter address", type: "textarea" },
      { label: "Members List", placeholder: "List all members", type: "textarea" },
      { label: "Ownership Breakdown", placeholder: "Enter ownership percentages", type: "textarea" },
      { label: "Management Type", placeholder: "member-managed/manager-managed", type: "text" },
      { label: "Manager Authority", placeholder: "Describe authority", type: "textarea" },
      { label: "Initial Contributions", placeholder: "Describe contributions", type: "textarea" },
      { label: "Distribution Schedule", placeholder: "Enter distribution terms", type: "text" },
      { label: "Meeting Frequency", placeholder: "Enter frequency", type: "text" },
      { label: "Transfer Restrictions", placeholder: "Enter restrictions", type: "textarea" },
    ],
  },
  {
    id: "lease-agreement",
    title: "Residential Lease Agreement",
    description: "Standard residential rental agreement",
    category: "Real Estate",
    tier: "free",
    tags: ["lease", "rental", "residential"],
    content: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement ("Lease") is entered into on {{date}} between {{landlordName}} ("Landlord") and {{tenantName}} ("Tenant").

1. PROPERTY
Landlord leases to Tenant the property located at:
{{propertyAddress}}

2. TERM
The lease term begins on {{startDate}} and ends on {{endDate}}.

3. RENT
Tenant agrees to pay rent of {{rentAmount}} per month, due on the {{dueDate}} of each month.

4. SECURITY DEPOSIT
Tenant has paid a security deposit of {{depositAmount}}.

5. UTILITIES
Tenant is responsible for: {{tenantUtilities}}
Landlord is responsible for: {{landlordUtilities}}

6. MAINTENANCE
Tenant agrees to maintain the property in good condition and report any needed repairs promptly.

7. PETS
Pets are {{petPolicy}}.

8. TERMINATION
Either party may terminate this lease with {{noticeDays}} days written notice.

Landlord: {{landlordName}}          Tenant: {{tenantName}}
Signature: _____________           Signature: _____________
Date: _____________                Date: _____________`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Landlord Name", placeholder: "Enter landlord name", type: "text" },
      { label: "Tenant Name", placeholder: "Enter tenant name", type: "text" },
      { label: "Property Address", placeholder: "Enter full address", type: "textarea" },
      { label: "Start Date", placeholder: "Enter start date", type: "date" },
      { label: "End Date", placeholder: "Enter end date", type: "date" },
      { label: "Monthly Rent Amount", placeholder: "Enter amount", type: "text" },
      { label: "Rent Due Date", placeholder: "Enter day of month", type: "text" },
      { label: "Security Deposit", placeholder: "Enter amount", type: "text" },
      { label: "Tenant Utilities", placeholder: "List utilities", type: "textarea" },
      { label: "Landlord Utilities", placeholder: "List utilities", type: "textarea" },
      { label: "Pet Policy", placeholder: "allowed/not allowed with restrictions", type: "text" },
      { label: "Notice Days", placeholder: "Enter number of days", type: "text" },
    ],
  },
  {
    id: "will-basic",
    title: "Last Will and Testament",
    description: "Basic will template for estate planning",
    category: "Estate Planning",
    tier: "pro",
    tags: ["will", "estate", "testament"],
    content: `LAST WILL AND TESTAMENT

I, {{testatorName}}, of {{city}}, {{state}}, being of sound mind and memory, do hereby make, publish, and declare this to be my Last Will and Testament.

ARTICLE I - REVOCATION
I hereby revoke all prior wills and codicils.

ARTICLE II - EXECUTOR
I appoint {{executorName}} as Executor of this Will. If unable to serve, I appoint {{alternateExecutor}} as alternate Executor.

ARTICLE III - BENEFICIARIES
I give, devise, and bequeath my estate as follows:
{{beneficiaryDistributions}}

ARTICLE IV - GUARDIANSHIP
If I have minor children, I appoint {{guardianName}} as guardian. If unable to serve, I appoint {{alternateGuardian}}.

ARTICLE V - RESIDUARY ESTATE
I give the rest, residue, and remainder of my estate to {{residuaryBeneficiary}}.

IN WITNESS WHEREOF, I have signed this Will on {{date}}.

Testator: {{testatorName}}
Signature: _____________
Date: _____________

WITNESSES:
We declare that the testator signed this Will in our presence.

Witness 1: _____________    Date: _____________
Print Name: _____________

Witness 2: _____________    Date: _____________
Print Name: _____________`,
    customizableFields: [
      { label: "Testator Name", placeholder: "Your full legal name", type: "text" },
      { label: "City", placeholder: "Enter city", type: "text" },
      { label: "State", placeholder: "Enter state", type: "text" },
      { label: "Executor Name", placeholder: "Enter executor name", type: "text" },
      { label: "Alternate Executor", placeholder: "Enter alternate", type: "text" },
      { label: "Beneficiary Distributions", placeholder: "Describe distributions", type: "textarea" },
      { label: "Guardian Name", placeholder: "Enter guardian name", type: "text" },
      { label: "Alternate Guardian", placeholder: "Enter alternate", type: "text" },
      { label: "Residuary Beneficiary", placeholder: "Enter beneficiary", type: "text" },
      { label: "Date", placeholder: "Enter date", type: "date" },
    ],
  },
  {
    id: "power-of-attorney",
    title: "Power of Attorney",
    description: "General power of attorney document",
    category: "Estate Planning",
    tier: "pro",
    tags: ["poa", "power of attorney", "legal authority"],
    content: `POWER OF ATTORNEY

I, {{principalName}}, of {{city}}, {{state}}, hereby appoint {{agentName}} of {{agentAddress}} as my attorney-in-fact (Agent) to act in my name, place, and stead.

POWERS GRANTED:
My Agent shall have the power to:
{{powersGranted}}

LIMITATIONS:
This Power of Attorney {{limitations}}.

EFFECTIVE DATE:
This Power of Attorney shall become effective {{effectiveDate}}.

DURATION:
This Power of Attorney shall {{duration}}.

IN WITNESS WHEREOF, I have executed this Power of Attorney on {{date}}.

Principal: {{principalName}}
Signature: _____________
Date: _____________

ACKNOWLEDGMENT:
State of {{state}}
County of {{county}}

On {{date}}, before me personally appeared {{principalName}}, known to me to be the person described in the foregoing instrument, and acknowledged that they executed the same.

Notary Public: _____________
My Commission Expires: _____________`,
    customizableFields: [
      { label: "Principal Name", placeholder: "Your full name", type: "text" },
      { label: "City", placeholder: "Enter city", type: "text" },
      { label: "State", placeholder: "Enter state", type: "text" },
      { label: "Agent Name", placeholder: "Enter agent name", type: "text" },
      { label: "Agent Address", placeholder: "Enter agent address", type: "textarea" },
      { label: "Powers Granted", placeholder: "List specific powers", type: "textarea" },
      { label: "Limitations", placeholder: "Enter any limitations", type: "textarea" },
      { label: "Effective Date", placeholder: "immediately/upon incapacity", type: "text" },
      { label: "Duration", placeholder: "remain in effect until...", type: "textarea" },
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "County", placeholder: "Enter county", type: "text" },
    ],
  },
  {
    id: "complaint-civil",
    title: "Civil Complaint Template",
    description: "Template for filing a civil lawsuit complaint",
    category: "Court Documents",
    tier: "business",
    tags: ["complaint", "lawsuit", "civil", "court"],
    content: `IN THE {{courtName}}
{{jurisdiction}}

{{plaintiffName}},                    Case No. {{caseNumber}}
     Plaintiff,

v.                                     COMPLAINT

{{defendantName}},
     Defendant.

COMES NOW the Plaintiff and files this Complaint against Defendant, alleging as follows:

I. PARTIES
1. Plaintiff {{plaintiffName}} is {{plaintiffDescription}}.
2. Defendant {{defendantName}} is {{defendantDescription}}.

II. JURISDICTION AND VENUE
3. This Court has jurisdiction over this matter because {{jurisdictionBasis}}.
4. Venue is proper in this Court because {{venueBasis}}.

III. FACTS
{{factualAllegations}}

IV. CAUSES OF ACTION
COUNT ONE: {{cause1Title}}
{{cause1Details}}

COUNT TWO: {{cause2Title}}
{{cause2Details}}

V. DAMAGES
Plaintiff has suffered damages including {{damages}}.

WHEREFORE, Plaintiff respectfully requests:
{{prayerForRelief}}

Respectfully submitted,

{{plaintiffAttorney}}
Attorney for Plaintiff
Bar No. {{barNumber}}
{{attorneyAddress}}
{{attorneyPhone}}
{{attorneyEmail}}

Dated: {{date}}`,
    customizableFields: [
      { label: "Court Name", placeholder: "Enter court name", type: "text" },
      { label: "Jurisdiction", placeholder: "Enter jurisdiction", type: "text" },
      { label: "Plaintiff Name", placeholder: "Enter plaintiff name", type: "text" },
      { label: "Case Number", placeholder: "Enter case number", type: "text" },
      { label: "Defendant Name", placeholder: "Enter defendant name", type: "text" },
      { label: "Plaintiff Description", placeholder: "Describe plaintiff", type: "textarea" },
      { label: "Defendant Description", placeholder: "Describe defendant", type: "textarea" },
      { label: "Jurisdiction Basis", placeholder: "Explain jurisdiction", type: "textarea" },
      { label: "Venue Basis", placeholder: "Explain venue", type: "textarea" },
      { label: "Factual Allegations", placeholder: "State facts", type: "textarea" },
      { label: "Cause of Action 1 Title", placeholder: "Enter cause title", type: "text" },
      { label: "Cause of Action 1 Details", placeholder: "Enter details", type: "textarea" },
      { label: "Cause of Action 2 Title", placeholder: "Enter cause title", type: "text" },
      { label: "Cause of Action 2 Details", placeholder: "Enter details", type: "textarea" },
      { label: "Damages", placeholder: "Describe damages", type: "textarea" },
      { label: "Prayer for Relief", placeholder: "State requested relief", type: "textarea" },
      { label: "Attorney Name", placeholder: "Enter attorney name", type: "text" },
      { label: "Bar Number", placeholder: "Enter bar number", type: "text" },
      { label: "Attorney Address", placeholder: "Enter address", type: "textarea" },
      { label: "Attorney Phone", placeholder: "Enter phone", type: "text" },
      { label: "Attorney Email", placeholder: "Enter email", type: "text" },
      { label: "Date", placeholder: "Enter date", type: "date" },
    ],
    seoKeywords: ["civil complaint template", "lawsuit complaint form", "how to file a lawsuit", "civil lawsuit template", "complaint form"],
  },
  {
    id: "divorce-petition",
    title: "Divorce Petition / Dissolution of Marriage",
    description: "Petition to initiate divorce proceedings",
    category: "Family Law",
    tier: "pro",
    tags: ["divorce", "marriage", "family law", "dissolution"],
    seoKeywords: ["divorce papers", "how to file for divorce", "divorce petition template", "uncontested divorce forms", "dissolution of marriage"],
    content: `PETITION FOR DISSOLUTION OF MARRIAGE

IN THE {{courtName}}
{{jurisdiction}}

In re the Marriage of:

{{petitionerName}},                    Case No. {{caseNumber}}
     Petitioner,

and                                    PETITION FOR DISSOLUTION
                                       OF MARRIAGE
{{respondentName}},
     Respondent.

COMES NOW Petitioner and petitions this Court for dissolution of marriage, stating:

I. JURISDICTIONAL FACTS
1. Petitioner has been a resident of {{state}} for more than {{residencyDays}} days.
2. The parties were married on {{marriageDate}} in {{marriageLocation}}.
3. {{separationStatement}}

II. CHILDREN
{{childrenStatement}}

III. PROPERTY
The parties own the following marital property: {{maritalProperty}}

IV. RELIEF REQUESTED
WHEREFORE, Petitioner requests:
A. That the marriage be dissolved
B. {{custodyRequest}}
C. {{propertyRequest}}
D. {{supportRequest}}
E. Such other relief as the Court deems just and proper

Petitioner: {{petitionerName}}
Signature: _____________
Date: {{date}}

Attorney Information:
{{attorneyInfo}}`,
    customizableFields: [
      { label: "Court Name", placeholder: "Enter court name", type: "text" },
      { label: "Jurisdiction", placeholder: "Enter jurisdiction", type: "text" },
      { label: "Petitioner Name", placeholder: "Your name", type: "text" },
      { label: "Case Number", placeholder: "Enter case number", type: "text" },
      { label: "Respondent Name", placeholder: "Spouse name", type: "text" },
      { label: "State", placeholder: "Enter state", type: "text" },
      { label: "Residency Days", placeholder: "Enter days", type: "text" },
      { label: "Marriage Date", placeholder: "Enter date", type: "date" },
      { label: "Marriage Location", placeholder: "Enter location", type: "text" },
      { label: "Separation Statement", placeholder: "Describe separation", type: "textarea" },
      { label: "Children Statement", placeholder: "List children and custody wishes", type: "textarea" },
      { label: "Marital Property", placeholder: "Describe property", type: "textarea" },
      { label: "Custody Request", placeholder: "State custody request", type: "textarea" },
      { label: "Property Request", placeholder: "State property division", type: "textarea" },
      { label: "Support Request", placeholder: "State support request", type: "textarea" },
      { label: "Attorney Info", placeholder: "Enter attorney information", type: "textarea" },
      { label: "Date", placeholder: "Enter date", type: "date" },
    ],
  },
  {
    id: "child-custody",
    title: "Child Custody Agreement",
    description: "Parenting plan and custody arrangement",
    category: "Family Law",
    tier: "pro",
    tags: ["custody", "parenting", "children", "family"],
    seoKeywords: ["child custody agreement", "parenting plan template", "custody arrangement", "joint custody agreement", "visitation schedule"],
    content: `CHILD CUSTODY AND PARENTING PLAN AGREEMENT

This Agreement is made on {{date}} between {{parent1Name}} ("Parent 1") and {{parent2Name}} ("Parent 2") regarding the minor child(ren):
{{childrenNames}}

I. LEGAL CUSTODY
The parents agree to {{legalCustodyType}} legal custody.

II. PHYSICAL CUSTODY
The parents agree to the following physical custody arrangement:
{{physicalCustodyArrangement}}

III. PARENTING TIME SCHEDULE
Regular Schedule: {{regularSchedule}}
Holiday Schedule: {{holidaySchedule}}
Summer Schedule: {{summerSchedule}}

IV. DECISION MAKING
Education: {{educationDecisions}}
Healthcare: {{healthcareDecisions}}
Religious: {{religiousDecisions}}

V. COMMUNICATION
Parents agree to: {{communicationAgreement}}

VI. CHILD SUPPORT
{{childSupportTerms}}

VII. DISPUTE RESOLUTION
{{disputeResolution}}

Parent 1: {{parent1Name}}          Parent 2: {{parent2Name}}
Signature: _____________           Signature: _____________
Date: _____________                Date: _____________`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Parent 1 Name", placeholder: "Enter name", type: "text" },
      { label: "Parent 2 Name", placeholder: "Enter name", type: "text" },
      { label: "Children Names", placeholder: "List children", type: "textarea" },
      { label: "Legal Custody Type", placeholder: "joint/sole", type: "text" },
      { label: "Physical Custody Arrangement", placeholder: "Describe arrangement", type: "textarea" },
      { label: "Regular Schedule", placeholder: "Describe schedule", type: "textarea" },
      { label: "Holiday Schedule", placeholder: "Describe holidays", type: "textarea" },
      { label: "Summer Schedule", placeholder: "Describe summer", type: "textarea" },
      { label: "Education Decisions", placeholder: "How decided", type: "text" },
      { label: "Healthcare Decisions", placeholder: "How decided", type: "text" },
      { label: "Religious Decisions", placeholder: "How decided", type: "text" },
      { label: "Communication Agreement", placeholder: "Communication terms", type: "textarea" },
      { label: "Child Support Terms", placeholder: "Enter terms", type: "textarea" },
      { label: "Dispute Resolution", placeholder: "Resolution method", type: "textarea" },
    ],
  },
  {
    id: "eviction-notice",
    title: "Eviction Notice (Notice to Vacate)",
    description: "Formal notice to tenant to vacate property",
    category: "Real Estate",
    tier: "free",
    tags: ["eviction", "landlord", "tenant", "notice"],
    seoKeywords: ["eviction notice template", "how to evict a tenant", "notice to vacate", "30 day notice", "landlord eviction"],
    content: `NOTICE TO VACATE PREMISES

Date: {{date}}

TO: {{tenantName}}
    {{propertyAddress}}

RE: NOTICE TO VACATE

Dear {{tenantName}},

You are hereby notified that your tenancy of the above-referenced premises will terminate {{noticeDays}} days from the date of this notice, on {{vacateDate}}.

REASON FOR TERMINATION:
{{reason}}

You are required to vacate and surrender possession of the premises by {{vacateDate}}. Failure to vacate may result in legal action for unlawful detainer.

SECURITY DEPOSIT:
Your security deposit will be handled in accordance with state law. A final inspection will be conducted after you vacate.

MOVE-OUT REQUIREMENTS:
- Remove all personal belongings
- Clean the premises
- Return all keys
- Provide forwarding address for deposit return

If you have questions, contact:
{{landlordName}}
{{landlordContact}}

This notice is given pursuant to {{stateLaw}}.

Landlord/Agent: {{landlordName}}
Signature: _____________
Date: {{date}}

PROOF OF SERVICE:
I served this notice by: {{serviceMethod}}
Date served: {{serviceDate}}`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Tenant Name", placeholder: "Enter tenant name", type: "text" },
      { label: "Property Address", placeholder: "Enter address", type: "textarea" },
      { label: "Notice Days", placeholder: "30/60/90", type: "text" },
      { label: "Vacate Date", placeholder: "Enter date", type: "date" },
      { label: "Reason", placeholder: "Enter reason", type: "textarea" },
      { label: "Landlord Name", placeholder: "Enter name", type: "text" },
      { label: "Landlord Contact", placeholder: "Phone/email", type: "text" },
      { label: "State Law", placeholder: "Enter statute", type: "text" },
      { label: "Service Method", placeholder: "personal/mail/posting", type: "text" },
      { label: "Service Date", placeholder: "Enter date", type: "date" },
    ],
  },
  {
    id: "demand-letter",
    title: "Demand Letter for Payment",
    description: "Formal demand for payment of debt or damages",
    category: "Court Documents",
    tier: "free",
    tags: ["demand", "payment", "debt", "collection"],
    seoKeywords: ["demand letter template", "how to write a demand letter", "payment demand letter", "debt collection letter", "final notice"],
    content: `DEMAND LETTER FOR PAYMENT

Date: {{date}}

{{debtorName}}
{{debtorAddress}}

RE: Demand for Payment of \${{amount}}

Dear {{debtorName}},

This letter serves as formal demand for payment of the outstanding debt you owe to {{creditorName}}.

DEBT DETAILS:
Original Amount: \${{originalAmount}}
Date of Transaction: {{transactionDate}}
Description: {{debtDescription}}

Current Balance Due: \${{amount}}
Late Fees/Interest: \${{lateFees}}

PAYMENT HISTORY:
{{paymentHistory}}

LEGAL BASIS:
{{legalBasis}}

DEMAND FOR PAYMENT:
You are hereby demanded to pay the full amount of \${{amount}} within {{paymentDeadlineDays}} days of the date of this letter. Payment must be received by {{paymentDeadline}}.

Payment should be sent to:
{{paymentAddress}}

CONSEQUENCES OF NON-PAYMENT:
If payment is not received by the deadline, we will pursue all available legal remedies, including but not limited to:
- Filing a lawsuit
- Reporting to credit bureaus
- Pursuing wage garnishment
- Seeking attorney fees and court costs

This demand is made without prejudice to any other rights or remedies available under law.

Please treat this matter with urgency to avoid further legal action.

Sincerely,

{{creditorName}}
{{creditorContact}}

cc: Attorney File`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Debtor Name", placeholder: "Enter debtor name", type: "text" },
      { label: "Debtor Address", placeholder: "Enter address", type: "textarea" },
      { label: "Amount", placeholder: "Enter amount", type: "text" },
      { label: "Creditor Name", placeholder: "Your name/company", type: "text" },
      { label: "Original Amount", placeholder: "Original amount", type: "text" },
      { label: "Transaction Date", placeholder: "Enter date", type: "date" },
      { label: "Debt Description", placeholder: "Describe debt", type: "textarea" },
      { label: "Late Fees", placeholder: "Enter fees", type: "text" },
      { label: "Payment History", placeholder: "List payments", type: "textarea" },
      { label: "Legal Basis", placeholder: "Contract/agreement basis", type: "textarea" },
      { label: "Payment Deadline Days", placeholder: "10/15/30", type: "text" },
      { label: "Payment Deadline", placeholder: "Enter date", type: "date" },
      { label: "Payment Address", placeholder: "Enter address", type: "textarea" },
      { label: "Creditor Contact", placeholder: "Phone/email", type: "text" },
    ],
  },
  {
    id: "promissory-note",
    title: "Promissory Note",
    description: "Legal promise to repay a debt",
    category: "Contracts",
    tier: "free",
    tags: ["loan", "debt", "promissory", "repayment"],
    seoKeywords: ["promissory note template", "personal loan agreement", "IOU template", "loan document", "promissory note form"],
    content: `PROMISSORY NOTE

Principal Amount: \${{principalAmount}}
Date: {{date}}

FOR VALUE RECEIVED, {{borrowerName}} ("Borrower") promises to pay to {{lenderName}} ("Lender") the principal sum of \${{principalAmount}}, together with interest at the rate of {{interestRate}}% per annum.

PAYMENT TERMS:
{{paymentTerms}}

First Payment Due: {{firstPaymentDate}}
Final Payment Due: {{finalPaymentDate}}

INTEREST:
Interest shall accrue on the unpaid principal balance at the rate of {{interestRate}}% per {{interestPeriod}}.

LATE PAYMENT:
A late fee of \${{lateFee}} will be charged for payments more than {{gracePeriod}} days late.

PREPAYMENT:
Borrower may prepay this note in whole or in part at any time without penalty.

DEFAULT:
This note shall be in default if:
- Any payment is more than {{defaultDays}} days late
- Borrower files for bankruptcy
- {{otherDefaultConditions}}

Upon default, the entire unpaid balance shall become immediately due and payable.

GOVERNING LAW:
This note shall be governed by the laws of {{state}}.

Borrower: {{borrowerName}}
Address: {{borrowerAddress}}
Signature: _____________
Date: _____________

Lender: {{lenderName}}
Address: {{lenderAddress}}
Signature: _____________
Date: _____________`,
    customizableFields: [
      { label: "Principal Amount", placeholder: "Enter loan amount", type: "text" },
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Borrower Name", placeholder: "Enter borrower name", type: "text" },
      { label: "Lender Name", placeholder: "Enter lender name", type: "text" },
      { label: "Interest Rate", placeholder: "Enter rate %", type: "text" },
      { label: "Payment Terms", placeholder: "Describe payment schedule", type: "textarea" },
      { label: "First Payment Date", placeholder: "Enter date", type: "date" },
      { label: "Final Payment Date", placeholder: "Enter date", type: "date" },
      { label: "Interest Period", placeholder: "year/month", type: "text" },
      { label: "Late Fee", placeholder: "Enter fee amount", type: "text" },
      { label: "Grace Period", placeholder: "Enter days", type: "text" },
      { label: "Default Days", placeholder: "Enter days", type: "text" },
      { label: "Other Default Conditions", placeholder: "List conditions", type: "textarea" },
      { label: "State", placeholder: "Enter state", type: "text" },
      { label: "Borrower Address", placeholder: "Enter address", type: "textarea" },
      { label: "Lender Address", placeholder: "Enter address", type: "textarea" },
    ],
  },
  {
    id: "bill-of-sale",
    title: "Bill of Sale",
    description: "Document transferring ownership of personal property",
    category: "Contracts",
    tier: "free",
    tags: ["sale", "purchase", "property", "vehicle"],
    seoKeywords: ["bill of sale template", "vehicle bill of sale", "car bill of sale", "boat bill of sale", "general bill of sale"],
    content: `BILL OF SALE

Date: {{date}}

SELLER:
{{sellerName}}
{{sellerAddress}}

BUYER:
{{buyerName}}
{{buyerAddress}}

ITEM DESCRIPTION:
{{itemDescription}}

Make/Model: {{makeModel}}
Year: {{year}}
VIN/Serial Number: {{vinNumber}}
Color: {{color}}
Condition: {{condition}}

PURCHASE PRICE: \${{purchasePrice}}

PAYMENT:
Payment of \${{purchasePrice}} has been received by Seller from Buyer.
Payment Method: {{paymentMethod}}

AS-IS SALE:
{{asIsClause}}

WARRANTIES:
Seller warrants that:
- Seller is the legal owner of the item
- Item is free of liens and encumbrances
- Seller has the right to sell the item
{{additionalWarranties}}

SIGNATURES:

SELLER:
{{sellerName}}
Signature: _____________
Date: _____________

BUYER:
{{buyerName}}
Signature: _____________
Date: _____________

NOTARY:
State of {{notaryState}}
County of {{notaryCounty}}

Subscribed and sworn before me this {{notaryDate}}

Notary Public: _____________
Commission Expires: _____________`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Seller Name", placeholder: "Enter seller name", type: "text" },
      { label: "Seller Address", placeholder: "Enter address", type: "textarea" },
      { label: "Buyer Name", placeholder: "Enter buyer name", type: "text" },
      { label: "Buyer Address", placeholder: "Enter address", type: "textarea" },
      { label: "Item Description", placeholder: "Describe item", type: "textarea" },
      { label: "Make/Model", placeholder: "Enter make/model", type: "text" },
      { label: "Year", placeholder: "Enter year", type: "text" },
      { label: "VIN/Serial Number", placeholder: "Enter VIN/serial", type: "text" },
      { label: "Color", placeholder: "Enter color", type: "text" },
      { label: "Condition", placeholder: "Describe condition", type: "text" },
      { label: "Purchase Price", placeholder: "Enter amount", type: "text" },
      { label: "Payment Method", placeholder: "cash/check/wire", type: "text" },
      { label: "As-Is Clause", placeholder: "Enter as-is terms", type: "textarea" },
      { label: "Additional Warranties", placeholder: "List warranties", type: "textarea" },
      { label: "Notary State", placeholder: "Enter state", type: "text" },
      { label: "Notary County", placeholder: "Enter county", type: "text" },
      { label: "Notary Date", placeholder: "Enter date", type: "date" },
    ],
  },
  {
    id: "affidavit",
    title: "General Affidavit",
    description: "Sworn statement of facts",
    category: "Court Documents",
    tier: "free",
    tags: ["affidavit", "sworn statement", "notary", "court"],
    seoKeywords: ["affidavit template", "sworn affidavit", "notarized statement", "affidavit form", "legal affidavit"],
    content: `AFFIDAVIT

State of {{state}}
County of {{county}}

I, {{affiantName}}, being duly sworn, depose and state as follows:

1. I am over the age of 18 years and competent to make this affidavit.

2. I have personal knowledge of the facts stated herein.

3. {{statement1}}

4. {{statement2}}

5. {{statement3}}

6. {{statement4}}

7. {{additionalStatements}}

8. This affidavit is made for the purpose of {{purpose}}.

9. I declare under penalty of perjury that the foregoing is true and correct.

{{affiantName}}
Signature: _____________
Date: {{date}}

SUBSCRIBED AND SWORN TO before me this {{notaryDate}}

Notary Public: _____________
State: {{notaryState}}
My Commission Expires: {{commissionExpires}}

[NOTARY SEAL]`,
    customizableFields: [
      { label: "State", placeholder: "Enter state", type: "text" },
      { label: "County", placeholder: "Enter county", type: "text" },
      { label: "Affiant Name", placeholder: "Your full legal name", type: "text" },
      { label: "Statement 1", placeholder: "First fact statement", type: "textarea" },
      { label: "Statement 2", placeholder: "Second fact statement", type: "textarea" },
      { label: "Statement 3", placeholder: "Third fact statement", type: "textarea" },
      { label: "Statement 4", placeholder: "Fourth fact statement", type: "textarea" },
      { label: "Additional Statements", placeholder: "Any additional facts", type: "textarea" },
      { label: "Purpose", placeholder: "Purpose of affidavit", type: "textarea" },
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Notary Date", placeholder: "Enter date", type: "date" },
      { label: "Notary State", placeholder: "Enter state", type: "text" },
      { label: "Commission Expires", placeholder: "Enter date", type: "date" },
    ],
  },
  {
    id: "independent-contractor",
    title: "Independent Contractor Agreement",
    description: "Agreement for freelance or contract work",
    category: "Employment",
    tier: "pro",
    tags: ["contractor", "freelance", "1099", "agreement"],
    seoKeywords: ["independent contractor agreement", "freelance contract", "1099 agreement", "contractor agreement template", "consulting agreement"],
    content: `INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is made as of {{date}} between {{clientName}} ("Client") and {{contractorName}} ("Contractor").

1. SERVICES
Contractor agrees to provide the following services: {{servicesDescription}}

Project Scope: {{projectScope}}
Deliverables: {{deliverables}}

2. COMPENSATION
Client agrees to pay Contractor {{paymentAmount}} for the services.
Payment Schedule: {{paymentSchedule}}
Expenses: {{expensePolicy}}

3. INDEPENDENT CONTRACTOR STATUS
Contractor is an independent contractor, not an employee. Contractor:
- Controls how services are performed
- Is responsible for own taxes
- Provides own tools and equipment
- Is not entitled to employee benefits
- May work for other clients

4. WORK PRODUCT
All work product shall be {{ipOwnership}}.

5. CONFIDENTIALITY
Contractor agrees to maintain confidentiality of Client's proprietary information.

6. TERM AND TERMINATION
Start Date: {{startDate}}
End Date/Duration: {{duration}}
Either party may terminate with {{terminationNotice}} days written notice.

7. LIABILITY AND INDEMNIFICATION
{{liabilityTerms}}

8. INDEPENDENT CONTRACTOR REPRESENTATIONS
Contractor represents that they:
- Have necessary skills and licenses
- Will comply with all laws
- Have liability insurance (if required)

Client: {{clientName}}              Contractor: {{contractorName}}
Signature: _____________           Signature: _____________
Date: _____________                Date: _____________`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Client Name", placeholder: "Enter client name", type: "text" },
      { label: "Contractor Name", placeholder: "Enter contractor name", type: "text" },
      { label: "Services Description", placeholder: "Describe services", type: "textarea" },
      { label: "Project Scope", placeholder: "Define scope", type: "textarea" },
      { label: "Deliverables", placeholder: "List deliverables", type: "textarea" },
      { label: "Payment Amount", placeholder: "Enter amount", type: "text" },
      { label: "Payment Schedule", placeholder: "Describe schedule", type: "textarea" },
      { label: "Expense Policy", placeholder: "Expense terms", type: "textarea" },
      { label: "IP Ownership", placeholder: "owned by Client/Contractor/Shared", type: "text" },
      { label: "Start Date", placeholder: "Enter start date", type: "date" },
      { label: "Duration", placeholder: "Project duration", type: "text" },
      { label: "Termination Notice", placeholder: "Enter days", type: "text" },
      { label: "Liability Terms", placeholder: "Liability and indemnification", type: "textarea" },
    ],
  },
  {
    id: "prenuptial-agreement",
    title: "Prenuptial Agreement",
    description: "Pre-marriage property and financial agreement",
    category: "Family Law",
    tier: "business",
    tags: ["prenup", "marriage", "property", "financial"],
    seoKeywords: ["prenuptial agreement", "prenup template", "premarital agreement", "marriage contract", "prenup form"],
    content: `PRENUPTIAL AGREEMENT

This Agreement is made on {{date}} between {{party1Name}} ("Party 1") and {{party2Name}} ("Party 2"), who intend to marry on {{weddingDate}}.

I. PURPOSE
The parties wish to establish their respective rights and obligations regarding property and finances.

II. DISCLOSURE
Party 1 Assets: {{party1Assets}}
Party 1 Debts: {{party1Debts}}
Party 1 Income: {{party1Income}}

Party 2 Assets: {{party2Assets}}
Party 2 Debts: {{party2Debts}}
Party 2 Income: {{party2Income}}

III. SEPARATE PROPERTY
The following shall remain separate property:
{{separateProperty}}

IV. MARITAL PROPERTY
The following shall be considered marital property:
{{maritalProperty}}

V. DIVISION IN EVENT OF DIVORCE
{{divisionTerms}}

VI. SPOUSAL SUPPORT
{{spousalSupportTerms}}

VII. DEATH
{{deathProvisions}}

VIII. ATTORNEYS
Party 1 was represented by: {{party1Attorney}}
Party 2 was represented by: {{party2Attorney}}

IX. VOLUNTARY AGREEMENT
Each party acknowledges this agreement is voluntary and entered into freely.

Party 1: {{party1Name}}             Party 2: {{party2Name}}
Signature: _____________            Signature: _____________
Date: _____________                 Date: _____________

Attorney 1: _____________           Attorney 2: _____________`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Party 1 Name", placeholder: "Enter name", type: "text" },
      { label: "Party 2 Name", placeholder: "Enter name", type: "text" },
      { label: "Wedding Date", placeholder: "Enter wedding date", type: "date" },
      { label: "Party 1 Assets", placeholder: "List assets", type: "textarea" },
      { label: "Party 1 Debts", placeholder: "List debts", type: "textarea" },
      { label: "Party 1 Income", placeholder: "Enter income", type: "text" },
      { label: "Party 2 Assets", placeholder: "List assets", type: "textarea" },
      { label: "Party 2 Debts", placeholder: "List debts", type: "textarea" },
      { label: "Party 2 Income", placeholder: "Enter income", type: "text" },
      { label: "Separate Property", placeholder: "Define separate property", type: "textarea" },
      { label: "Marital Property", placeholder: "Define marital property", type: "textarea" },
      { label: "Division Terms", placeholder: "How to divide in divorce", type: "textarea" },
      { label: "Spousal Support Terms", placeholder: "Spousal support terms", type: "textarea" },
      { label: "Death Provisions", placeholder: "Death provisions", type: "textarea" },
      { label: "Party 1 Attorney", placeholder: "Attorney name", type: "text" },
      { label: "Party 2 Attorney", placeholder: "Attorney name", type: "text" },
    ],
  },
  {
    id: "living-will",
    title: "Living Will / Advance Healthcare Directive",
    description: "Healthcare wishes and end-of-life decisions",
    category: "Estate Planning",
    tier: "pro",
    tags: ["living will", "healthcare", "advance directive", "end of life"],
    seoKeywords: ["living will template", "advance directive", "healthcare directive", "end of life decisions", "medical power of attorney"],
    content: `LIVING WILL AND ADVANCE HEALTHCARE DIRECTIVE

I, {{declarantName}}, being of sound mind, make this Living Will to specify my wishes regarding medical treatment.

I. DECLARATION
If I become unable to make healthcare decisions and am in any of the following conditions:
{{conditions}}

Then I direct my healthcare providers and family as follows:

II. LIFE-SUSTAINING TREATMENT
{{lifeSustainingWishes}}

III. SPECIFIC INSTRUCTIONS
Artificial Nutrition/Hydration: {{nutritionWishes}}
Pain Relief: {{painReliefWishes}}
Organ Donation: {{organDonationWishes}}

IV. HEALTHCARE AGENT
I appoint {{agentName}} as my healthcare agent to make decisions if I cannot.
Agent Contact: {{agentContact}}

Alternate Agent: {{alternateAgent}}
Alternate Contact: {{alternateContact}}

V. AGENT AUTHORITY
My agent has authority to:
{{agentAuthority}}

VI. ADDITIONAL INSTRUCTIONS
{{additionalInstructions}}

I understand this directive will remain in effect until revoked.

Declarant: {{declarantName}}
Signature: _____________
Date: {{date}}

WITNESSES:
We declare the declarant is of sound mind.

Witness 1: _____________    Date: _____________
Print Name: _____________
Address: _____________

Witness 2: _____________    Date: _____________
Print Name: _____________
Address: _____________`,
    customizableFields: [
      { label: "Declarant Name", placeholder: "Your full legal name", type: "text" },
      { label: "Conditions", placeholder: "terminal illness, permanent unconsciousness, etc.", type: "textarea" },
      { label: "Life Sustaining Wishes", placeholder: "Your wishes for life support", type: "textarea" },
      { label: "Nutrition Wishes", placeholder: "Your wishes", type: "textarea" },
      { label: "Pain Relief Wishes", placeholder: "Your wishes", type: "textarea" },
      { label: "Organ Donation Wishes", placeholder: "Yes/No and details", type: "textarea" },
      { label: "Agent Name", placeholder: "Healthcare agent name", type: "text" },
      { label: "Agent Contact", placeholder: "Phone/address", type: "text" },
      { label: "Alternate Agent", placeholder: "Alternate agent name", type: "text" },
      { label: "Alternate Contact", placeholder: "Phone/address", type: "text" },
      { label: "Agent Authority", placeholder: "List authorities", type: "textarea" },
      { label: "Additional Instructions", placeholder: "Any other wishes", type: "textarea" },
      { label: "Date", placeholder: "Enter date", type: "date" },
    ],
  },
  {
    id: "personal-injury-demand",
    title: "Personal Injury Settlement Demand Letter",
    description: "Demand for compensation for personal injuries",
    category: "Personal Injury",
    tier: "business",
    tags: ["personal injury", "settlement", "demand", "accident"],
    seoKeywords: ["personal injury demand letter", "accident settlement demand", "injury claim letter", "car accident demand", "slip and fall demand"],
    content: `PERSONAL INJURY SETTLEMENT DEMAND

Date: {{date}}

{{insuranceCompany}}
{{insuranceAddress}}

RE: Claim No. {{claimNumber}}
    Insured: {{insuredName}}
    Claimant: {{claimantName}}
    Date of Incident: {{incidentDate}}

Dear Claims Adjuster:

This letter constitutes a formal demand for settlement of the above-referenced claim.

I. INCIDENT DESCRIPTION
{{incidentDescription}}

II. LIABILITY
{{liabilityStatement}}

III. INJURIES SUSTAINED
{{injuries}}

IV. MEDICAL TREATMENT
{{medicalTreatment}}

V. MEDICAL EXPENSES
{{medicalExpenses}}

Total Medical Bills: \${{totalMedical}}

VI. LOST WAGES
{{lostWages}}

Total Lost Income: \${{totalLost}}

VII. PAIN AND SUFFERING
{{painSuffering}}

VIII. PROPERTY DAMAGE
{{propertyDamage}}

IX. DEMAND
Based on the above, I demand settlement in the amount of \${{demandAmount}}.

This demand is valid for {{validityDays}} days. If not accepted, I will file a lawsuit.

Please respond by {{responseDeadline}}.

Sincerely,

{{claimantName}}
{{claimantContact}}

Attachments:
- Medical records
- Medical bills
- Wage loss documentation
- Photos of injuries/property damage
- Police report`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Insurance Company", placeholder: "Enter company name", type: "text" },
      { label: "Insurance Address", placeholder: "Enter address", type: "textarea" },
      { label: "Claim Number", placeholder: "Enter claim number", type: "text" },
      { label: "Insured Name", placeholder: "Enter insured name", type: "text" },
      { label: "Claimant Name", placeholder: "Your name", type: "text" },
      { label: "Incident Date", placeholder: "Enter date", type: "date" },
      { label: "Incident Description", placeholder: "Describe incident", type: "textarea" },
      { label: "Liability Statement", placeholder: "Why they are liable", type: "textarea" },
      { label: "Injuries", placeholder: "List injuries", type: "textarea" },
      { label: "Medical Treatment", placeholder: "Describe treatment", type: "textarea" },
      { label: "Medical Expenses", placeholder: "Itemize expenses", type: "textarea" },
      { label: "Total Medical", placeholder: "Total amount", type: "text" },
      { label: "Lost Wages", placeholder: "Describe lost wages", type: "textarea" },
      { label: "Total Lost", placeholder: "Total amount", type: "text" },
      { label: "Pain and Suffering", placeholder: "Describe impact", type: "textarea" },
      { label: "Property Damage", placeholder: "Describe damage", type: "textarea" },
      { label: "Demand Amount", placeholder: "Settlement demand", type: "text" },
      { label: "Validity Days", placeholder: "30", type: "text" },
      { label: "Response Deadline", placeholder: "Enter deadline", type: "date" },
      { label: "Claimant Contact", placeholder: "Phone/email", type: "text" },
    ],
  },
  {
    id: "small-claims-complaint",
    title: "Small Claims Court Complaint",
    description: "Complaint for small claims court filing",
    category: "Court Documents",
    tier: "free",
    tags: ["small claims", "lawsuit", "court", "complaint"],
    seoKeywords: ["small claims complaint", "small claims court forms", "how to sue in small claims", "small claims template", "sue for money owed"],
    content: `SMALL CLAIMS COMPLAINT

{{courtName}}
Small Claims Division
{{courtAddress}}

PLAINTIFF: {{plaintiffName}}
Address: {{plaintiffAddress}}
Phone: {{plaintiffPhone}}

DEFENDANT: {{defendantName}}
Address: {{defendantAddress}}

CLAIM AMOUNT: \${{claimAmount}}
Court Costs: \${{courtCosts}}
TOTAL: \${{totalAmount}}

STATEMENT OF CLAIM:

1. On or about {{incidentDate}}, the following occurred:
{{incidentDescription}}

2. As a result, Defendant owes Plaintiff:
{{damagesBreakdown}}

3. Plaintiff has demanded payment, but Defendant has failed to pay.

4. The amount owed is \${{claimAmount}}.

I declare under penalty of perjury that the statements in this claim are true and correct.

Plaintiff Signature: _____________
Date: {{filingDate}}

DEFENDANT'S ANSWER (to be completed by defendant):

Defendant admits/denies the claim: {{defenseStatement}}

Defendant Signature: _____________
Date: _____________

COURT USE ONLY
Case Number: _____________
Hearing Date: _____________
Time: _____________`,
    customizableFields: [
      { label: "Court Name", placeholder: "Enter court name", type: "text" },
      { label: "Court Address", placeholder: "Enter court address", type: "textarea" },
      { label: "Plaintiff Name", placeholder: "Your name", type: "text" },
      { label: "Plaintiff Address", placeholder: "Your address", type: "textarea" },
      { label: "Plaintiff Phone", placeholder: "Your phone", type: "text" },
      { label: "Defendant Name", placeholder: "Defendant name", type: "text" },
      { label: "Defendant Address", placeholder: "Defendant address", type: "textarea" },
      { label: "Claim Amount", placeholder: "Amount claimed", type: "text" },
      { label: "Court Costs", placeholder: "Filing fees", type: "text" },
      { label: "Total Amount", placeholder: "Total", type: "text" },
      { label: "Incident Date", placeholder: "Date of incident", type: "date" },
      { label: "Incident Description", placeholder: "What happened", type: "textarea" },
      { label: "Damages Breakdown", placeholder: "Itemize damages", type: "textarea" },
      { label: "Filing Date", placeholder: "Today's date", type: "date" },
    ],
  },
  {
    id: "cease-desist",
    title: "Cease and Desist Letter",
    description: "Formal demand to stop unwanted behavior",
    category: "Court Documents",
    tier: "pro",
    tags: ["cease and desist", "harassment", "copyright", "trademark"],
    seoKeywords: ["cease and desist letter", "stop harassment letter", "copyright infringement letter", "trademark cease and desist", "legal warning letter"],
    content: `CEASE AND DESIST LETTER

Date: {{date}}

SENT VIA CERTIFIED MAIL

{{recipientName}}
{{recipientAddress}}

RE: CEASE AND DESIST DEMAND

Dear {{recipientName}},

I am writing on behalf of {{clientName}} to demand that you immediately cease and desist from {{behaviorDescription}}.

FACTS:
{{factualBackground}}

LEGAL BASIS:
Your actions constitute {{legalViolation}}, in violation of {{applicableLaw}}.

HARM:
{{harmDescription}}

DEMAND:
You are hereby demanded to:
1. Immediately cease {{behavior1}}
2. {{demand2}}
3. {{demand3}}

DEADLINE:
You must comply with these demands within {{deadlineDays}} days of receipt of this letter, by {{deadline}}.

CONSEQUENCES:
Failure to comply will result in:
{{consequences}}

PRESERVATION OF RIGHTS:
Nothing in this letter shall be construed as a waiver of any rights or remedies, which are expressly reserved.

This letter is sent without prejudice to our client's rights to seek all available legal remedies.

Please confirm your compliance in writing within {{deadlineDays}} days.

Sincerely,

{{senderName}}
{{senderTitle}}
{{senderContact}}

cc: Legal File`,
    customizableFields: [
      { label: "Date", placeholder: "Enter date", type: "date" },
      { label: "Recipient Name", placeholder: "Enter name", type: "text" },
      { label: "Recipient Address", placeholder: "Enter address", type: "textarea" },
      { label: "Client Name", placeholder: "Your name/company", type: "text" },
      { label: "Behavior Description", placeholder: "Describe unwanted behavior", type: "textarea" },
      { label: "Factual Background", placeholder: "What happened", type: "textarea" },
      { label: "Legal Violation", placeholder: "harassment/infringement/etc", type: "text" },
      { label: "Applicable Law", placeholder: "Cite law/statute", type: "text" },
      { label: "Harm Description", placeholder: "Describe damages/harm", type: "textarea" },
      { label: "Behavior 1", placeholder: "First demand", type: "text" },
      { label: "Demand 2", placeholder: "Second demand", type: "text" },
      { label: "Demand 3", placeholder: "Third demand", type: "text" },
      { label: "Deadline Days", placeholder: "10/15/30", type: "text" },
      { label: "Deadline", placeholder: "Deadline date", type: "date" },
      { label: "Consequences", placeholder: "Legal actions to be taken", type: "textarea" },
      { label: "Sender Name", placeholder: "Your name", type: "text" },
      { label: "Sender Title", placeholder: "Your title", type: "text" },
      { label: "Sender Contact", placeholder: "Phone/email", type: "text" },
    ],
  },
];

