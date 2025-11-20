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
  },
];
