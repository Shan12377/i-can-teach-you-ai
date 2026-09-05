export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  visual?: {
    image: string;
    alt: string;
    label: string;
    proof: string;
  };
  comparison?: {
    kicker: string;
    title: string;
    before: {
      label: string;
      points: string[];
    };
    after: {
      label: string;
      points: string[];
    };
    takeaway: string;
  };
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'my-automation-stack-pharmd-builds-with-ai',
    title: 'My Automation Stack: How a PharmD Runs 5 Businesses With 5 Tools',
    excerpt: 'I run two production apps, a Chrome extension, an exam prep product, and a consulting service. Here is the exact automation stack behind all of it.',
    category: 'My Stack',
    date: 'Aug 18, 2026',
    readTime: '8 min read',
    visual: {
      image: '/proof/oracle-n8n-email-brief-workflow-redacted.png',
      alt: 'Redacted n8n email briefing workflow used in Dr. Hunter\'s automation stack',
      label: 'The working automation stack',
      proof: 'Real workflow · Redacted',
    },
    content: `
## Why This Post Exists

Most "what tools I use" posts are affiliate marketing disguised as advice. This one is not. These are the five tools I actually use every day to run Hunter's Holistic Health, Pharmacy Decoder, I Can Teach You AI, and my consulting work. No affiliate links. Just what works and why.

## The Stack

**1. Claude Code (Primary Build Tool)**

Claude Code is the reason these businesses exist in their current form. I am a PharmD, not a software engineer. Claude Code let me build a full React + Supabase health education platform (huntersholistichealth.com), a pharmacy exam prep app with 340 questions and OTP verification (pharmacydecoder.com), and this site.

The key is the CLAUDE.md file. Every project gets one. It contains the design system, the compliance rules, the file structure, and explicit instructions about what Claude should never do without asking. When Claude Code reads a thorough CLAUDE.md, it behaves like a senior developer who has been briefed. Without one, it guesses.

I use Claude Code for initial builds, major refactors, and anything that touches multiple files at once.

**2. n8n on AWS (HIPAA-Lane Automation)**

n8n is a self-hosted workflow automation tool. I run it on AWS specifically because AWS offers a Business Associate Agreement (BAA). That BAA is what makes this instance safe for automations that handle data adjacent to my health education practice.

This instance runs the intake routing system for Hunter's Holistic Health: four submission types (waitlist, support, feature requests, clinical inquiries) each routed to their own Google Sheets tab with email alerts. It also handles appointment follow-up automations and the daily business briefing workflow that pulls from five Gmail accounts and three database tables.

The reason I self-host on AWS instead of using n8n Cloud or Zapier: when you self-host, your webhook data never passes through a third-party server. For healthcare-adjacent work, that matters.

**3. n8n on Oracle Cloud (Teaching and Client Builds)**

Oracle Cloud offers a free tier that includes a VM with enough resources to run n8n for 12 months at zero cost. I use this second n8n instance for everything that does not need the BAA: teaching demos, client workflow builds, and personal automations that have nothing to do with health data.

This separation is deliberate. The AWS instance is the clinical-adjacent lane. The Oracle instance is the general-purpose lane. They never share data. This is the two-layer architecture applied to my own infrastructure.

For anyone starting out with n8n, Oracle Cloud free tier is the best way to learn without paying for hosting.

**4. Google Apps Script (Pharmacy Decoder Backend)**

Pharmacy Decoder is a single-file web app that serves 340 UMPJE practice questions. It does not need a full backend. Google Apps Script handles everything server-side: OTP email verification for school access codes, activation logging to Google Sheets, and review collection.

The pattern is simple. The front end calls Apps Script via JSONP (dynamic script injection, not fetch, because of cross-origin restrictions). Apps Script handles the logic and writes to a linked Google Spreadsheet. Zero hosting cost. Zero maintenance. It has been running without issues since launch.

For simple apps that need server-side logic without a full backend, Apps Script is the laziest correct solution.

**5. Make (Personal Automations)**

Make (formerly Integromat) handles my personal workflow automations: Telegram bots that send morning briefings, Notion integrations for cycle tracking and daily logs, and various notification flows that do not need the security posture of the AWS n8n instance.

Make is easier to set up than n8n for simple two-step automations. The visual builder is more polished, and the pre-built integrations with Telegram and Notion work without configuration. The tradeoff is that your data flows through Make's servers, which is fine for personal use but not for anything health-related.

## Why These Five and Not Others

Every tool in this stack was chosen because it solves a specific problem better than the alternatives, not because it is popular or trendy.

Claude Code over Cursor: because I need agentic autonomy, not an editor with autocomplete. I am not a developer looking for speed; I am a domain expert who needs the AI to handle implementation.

n8n over Zapier: because self-hosting gives me data control and Zapier gets expensive at scale.

Google Apps Script over a Vercel serverless function: because Pharmacy Decoder does not need a build step, a deployment pipeline, or TypeScript. Apps Script is the right level of complexity for what it does.

Make over building everything in n8n: because some automations are simple enough that self-hosting is overkill.

## The Takeaway

Five tools. Two production apps. One Chrome extension. One exam prep product. One consulting service. No dev team. No CS degree. PharmD who builds.

## Related reading

- Read [why running n8n on AWS under a signed BAA matters](/blog/n8n-aws-baa-healthcare-automation).
- Read [using Google Apps Script as the entire backend for Pharmacy Decoder](/blog/google-apps-script-pharmacy-decoder-backend).
- Read [the n8n intake router pattern for a health practice](/blog/n8n-intake-routing-health-practice).
- Ready to work together? [a discovery call to build your own version of this stack](/services).
`,
  },
  {
    slug: 'n8n-aws-baa-healthcare-automation',
    title: 'Running n8n on AWS With a BAA: Why It Matters for Healthcare',
    excerpt: 'If you are automating workflows for a health practice, where your automation runs matters as much as what it does. Here is why AWS plus a BAA is the right hosting decision.',
    category: 'My Stack',
    date: 'Aug 16, 2026',
    readTime: '7 min read',
    visual: {
      image: '/proof/n8n-intake-router-redacted.png',
      alt: 'Redacted n8n intake routing workflow running in the healthcare automation environment',
      label: 'Healthcare automation architecture',
      proof: 'Reviewed workflow · Redacted',
    },
    content: `
## The Hosting Decision Most People Skip

When healthcare professionals discover n8n, they usually go straight to n8n Cloud or spin up a Docker container on the cheapest VPS they can find. The workflow runs. Data flows. Nobody thinks about where that data is sitting.

That matters more with n8n than with most tools, because n8n does not offer a BAA. n8n staff confirmed as much on the company's own community forum in January 2026, and there is no HIPAA page in n8n's documentation. On n8n Cloud, n8n is the one holding your data, and without a BAA that closes the door on PHI. Self hosting flips it: you run the software on infrastructure you control, n8n the company never sees the data, and the only BAA you need is with the host underneath.

For general business automation, this is fine. For healthcare-adjacent automation, it is a compliance gap.

## What a BAA Actually Does

A Business Associate Agreement (BAA) is a legal contract between you and a service provider that handles data on your behalf. Under HIPAA the obligation runs the other way from how most people assume. A covered entity or business associate may only disclose PHI to a vendor after it obtains satisfactory assurances in writing, meaning a signed BAA, that the vendor will safeguard the information. The vendor is under no duty to offer you one, and plenty will simply say no. HHS also carves out a narrow conduit exception for services that only transmit PHI without accessing it, like an ISP. If a vendor stores your data or works with it, that exception does not apply and you need the BAA.

AWS offers a BAA that you accept yourself through AWS Artifact. Accepting it does not bless your whole account. AWS is specific about this: you can run any AWS service inside a HIPAA account, but you may only process, store, or transmit PHI in the services AWS names on its HIPAA Eligible Services list, and you have to encrypt all of that PHI at rest and in transit. EC2, EBS, S3, RDS, Elastic Load Balancing, and AWS Certificate Manager are all on that list today, which is why the stack below is built out of exactly those pieces. Anything not on the list can still run in the account, it just cannot touch PHI.

Without a BAA you are operating on the provider's ordinary commercial terms, which are not written with PHI in mind. No contractual limits on how PHI may be used or disclosed, no obligation to report a breach up to you, no HIPAA-specific safeguard commitments. Terms vary by provider, so read yours rather than assuming. The point is that none of the protections HIPAA expects a business associate to give you are in that contract, because that is not what the contract is for.

## What My AWS n8n Instance Actually Runs

The n8n instance on AWS handles everything connected to Hunter's Holistic Health:

[The intake router](/blog/n8n-intake-routing-health-practice) receives four types of form submissions (waitlist, support, feature requests, clinical inquiries). Each type is routed to its own Google Sheets tab. Email alerts go out with name, email, category, and timestamp only. No health details in the alerts.

The clinical inquiry flow is the most sensitive. The form itself collects only general interest information with a visible disclaimer telling users not to include lab results or diagnoses. The safeguard here is the form design, not the hosting. The form does not collect clinical detail, so nothing that arrives is PHI to begin with. I still run this flow on the eligible AWS services under the BAA because it is the gateway to the clinical lane and I would rather the legal floor already be in place than have to move the workflow later. Hosting it there is not what makes it safe. Not collecting PHI is.

The daily business briefing pulls data from five Gmail accounts, four Google Sheets tabs, and three Supabase tables. It summarizes everything via Claude Haiku, posts to Telegram, and creates calendar events for anything with a deadline. Worth being blunt about this one: the AWS BAA stops at AWS. Claude, Telegram, and Supabase are separate vendors on separate terms, and the BAA does not travel with the data once it leaves the instance. So this briefing carries operational data only. Revenue, task counts, deadlines, message volume. No client health information goes anywhere near it, which is the only reason it can talk to those three services at all.

## The Two-Instance Pattern

I run two separate n8n instances. The AWS instance handles healthcare-adjacent flows. A second instance on Oracle Cloud free tier handles everything else: teaching demos, client workflow builds, personal automations.

This separation costs nothing extra (Oracle free tier is genuinely free for 12 months) and creates a clean boundary between data that needs the BAA umbrella and data that does not.

## The Setup

The AWS setup is straightforward. An EC2 t3.micro instance running Ubuntu with Docker. n8n runs as a Docker container with a mounted volume for persistent data. The instance sits behind an Application Load Balancer with an SSL certificate from AWS Certificate Manager.

Total monthly cost: roughly $15 to $20 depending on traffic, well within the free tier for the first year.

## The Takeaway

If you are building automation for a health practice, the hosting decision is not just a technical choice. It is a compliance decision. Running n8n on AWS with a BAA does not make your workflows HIPAA-compliant by itself. Not close. It puts one layer, the infrastructure layer, on a defensible legal footing. Everything above it is still on you: what your forms collect, who can reach the data, how it is encrypted, what you log.

Start one step earlier than the hosting question. Work out whether you are a covered entity or a business associate under HIPAA, because that determines whether a BAA is legally required of you or simply good hygiene. A cash-pay educator who never bills insurance electronically may land in a different place than a billing clinic.

This is how I set up my own environment and it is general information, not legal advice. Before you rely on any of it, run your setup past your own healthcare attorney or compliance officer. Your situation, your state, and your payer relationships all change the answer.

## Related reading

- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Read [the n8n intake router pattern for a health practice](/blog/n8n-intake-routing-health-practice).
- Read [how to set up Google Workspace as your HIPAA clinical lane](/blog/google-workspace-hipaa-clinical-lane-setup).
- Ready to work together? [a scoped n8n build for your health practice](/services).
`,
  },
  {
    slug: 'google-apps-script-pharmacy-decoder-backend',
    title: 'Google Apps Script as a Backend: How Pharmacy Decoder Runs Without a Server',
    excerpt: 'Pharmacy Decoder serves 340 exam questions with OTP verification and student tracking. The entire backend is Google Apps Script. Here is why that is the right choice.',
    category: 'My Stack',
    date: 'Aug 14, 2026',
    readTime: '6 min read',
    visual: {
      image: '/proof/pharmacy-decoder.jpg',
      alt: 'Pharmacy Decoder exam preparation product screen',
      label: 'A focused backend for a real product',
      proof: '340 questions · OTP verified',
    },
    comparison: {
      kicker: 'Architecture comparison',
      title: 'What changed when the backend matched the product',
      before: {
        label: 'Typical small-app backend',
        points: [
          'Dedicated server or serverless project',
          'Separate database administration',
          'Email provider configuration',
          'Independent deployment pipeline',
        ],
      },
      after: {
        label: 'Pharmacy Decoder build',
        points: [
          'Apps Script web endpoint',
          'Gmail sends OTP messages',
          'Google Sheets logs activations',
          'No dedicated backend server',
        ],
      },
      takeaway: 'The result is fewer infrastructure layers while preserving the server-side functions the product actually needs.',
    },
    content: `
## The Problem

Pharmacy Decoder is a single-file web app. It serves 340 UMPJE practice questions to pharmacy students. Schools get access codes that unlock 14 days of free use. Students verify their school email via a one-time password sent to their inbox.

That OTP flow needs server-side logic. You cannot send emails from the browser. You cannot verify codes securely in client-side JavaScript. The question was: what is the simplest possible backend that handles this without introducing a build system, a deployment pipeline, or a monthly hosting bill?

## Why Google Apps Script

Google Apps Script is JavaScript that runs on Google's infrastructure. It can send emails via Gmail, read and write to Google Sheets, and expose web endpoints via the doGet and doPost functions. It is free for the usage levels a small app needs.

For Pharmacy Decoder, Apps Script handles three things:

First, OTP generation and delivery. When a student enters their school email and access code, the app calls Apps Script. The script generates a 6-digit code, stores it with an expiration timestamp, and sends it to the student's inbox via Gmail.

Second, OTP verification. The student enters the code. The app calls Apps Script again. The script checks the code against the stored value and expiration. If valid, it returns success.

Third, activation logging. On successful verification, the script writes a row to a Google Sheets tab: full name, email, access code, graduation year, exam date, follow-up date, activation timestamp.

## The JSONP Pattern

Apps Script endpoints do not support CORS in the way a typical API does. The standard fetch API with no-cors mode cannot read the response body. The solution is JSONP: dynamic script tag injection.

The app creates a script element, sets the src to the Apps Script URL with a callback parameter, and appends it to the document. Apps Script wraps the response in a function call that matches the callback name. When the script loads, the browser executes the callback with the response data.

This pattern is old and unfashionable. It also works perfectly for this use case with zero configuration.

## What This Costs

Nothing. Google Apps Script has generous daily quotas for email sending (100 emails per day on a free account, 1500 on Google Workspace) and script execution time. Pharmacy Decoder does not come close to any of these limits.

Compare this to a Vercel serverless function, which would work but introduces a build step, a deployment pipeline, environment variables, and a framework dependency. For what Pharmacy Decoder needs, that is unnecessary complexity.

## When Apps Script Is the Wrong Choice

Apps Script is wrong when you need real-time performance, complex routing, or heavy computation. It is wrong when you need WebSocket connections or streaming responses. It is wrong when your app grows to hundreds of concurrent users.

For a pharmacy exam prep app that serves a few hundred students per school cohort with occasional OTP verification requests, it is the laziest correct solution. And in software, the laziest correct solution is usually the best one.

## The Takeaway

Not every app needs a full backend. Google Apps Script gives you server-side email sending, data storage via Sheets, and web endpoints for free. For small, focused apps where the backend logic is simple, it is a tool worth knowing.

## Related reading

- Read [the full five-tool automation stack behind this business](/blog/my-automation-stack-pharmd-builds-with-ai).
- Read [the complete Stripe setup for a health education platform](/blog/stripe-setup-health-educator-platform).
- Read [the n8n intake router pattern for a health practice](/blog/n8n-intake-routing-health-practice).
- Ready to work together? [a lean-backend build for your own product](/services).
`,
  },
  {
    slug: 'hipaa-conscious-ai-workflows-healthcare',
    title: 'HIPAA-Conscious AI Workflows: What Most Tutorials Get Wrong',
    excerpt: 'Most AI workflow tutorials skip the compliance layer entirely. Here is the two-layer architecture that keeps PHI out of the wrong places and your practice out of trouble.',
    category: 'HIPAA',
    date: 'Jun 10, 2026',
    readTime: '9 min read',
    content: `
## The Problem With Most AI Workflow Tutorials

Most AI workflow tutorials are written by developers who have never had to think about HIPAA. They show you how to connect a form to a Google Sheet, route it through n8n, and send a Gmail notification. The tutorial ends. The compliance risk begins.

The core issue is that healthcare professionals are applying general-purpose automation patterns to environments where the rules are fundamentally different. What works for a SaaS company's lead capture form does not automatically work for a clinical intake process.

This post covers the two-layer architecture that makes AI workflows safe for healthcare use, based on what was actually built and deployed at Hunters Holistic Health.

## What HIPAA Actually Requires (The Practical Version)

Before any of this: I am a PharmD, not an attorney, and this post is general information about how I built one system. It is not legal advice and it does not create any professional relationship. HIPAA obligations turn on facts specific to your practice, your state, and your vendors. Confirm anything here with your compliance officer or a healthcare attorney before you rely on it, and confirm every regulatory citation against the current text at ecfr.gov and hhs.gov rather than against my summary of it.

HIPAA applies to covered entities and their business associates. A covered entity is a healthcare provider who transmits health information electronically in connection with certain transactions, a health plan, or a healthcare clearinghouse.

The key phrase is "in connection with certain transactions." If you are a cash-pay functional medicine educator who does not bill insurance electronically, you may not be a covered entity under the strict legal definition. This is worth confirming with a healthcare attorney for your specific situation.

That said, the practical approach is to build as if HIPAA applies, because the underlying principle (protect individually identifiable health information) is good practice regardless of your legal status.

Protected Health Information (PHI) has a narrower legal definition than most people assume. Under 45 CFR 160.103, information is PHI when three things are true at once. It was created or received by a health care provider, health plan, employer, or health care clearinghouse. It relates to a person's past, present, or future physical or mental health, to the provision of health care, or to payment for that care. And it identifies the person, or there is a reasonable basis to believe it could be used to identify them. The regulation then carves out four categories that are not PHI even when all three are met: FERPA education records, certain treatment records under 20 U.S.C. 1232g(a)(4)(B)(iv), employment records held by a covered entity acting as an employer, and information about someone who has been deceased more than 50 years. That means a name combined with a health condition, a lab value, a diagnosis, or a treatment plan. A name and email are not automatically PHI. In the hands of a marketing list, they are just contact data. But the definition of individually identifiable health information expressly includes demographic information, so the same name and email become PHI the moment a covered provider receives them in connection with a request for care. A list of people who asked about clinical services is PHI even if not one health detail is attached to it. Assume any identifier that arrives through a clinical intake path is PHI, and design the workflow around that assumption rather than around the presence or absence of a diagnosis. A name, email, and a description of someone's health goals together can be.

## The Two-Layer Architecture

The architecture that keeps AI workflows safe is built around a hard separation between two lanes.

**Lane 1: The Non-PHI App and Automation Layer**

This is where your intake forms, n8n workflows, Google Sheets, and email notifications live. Lane 1 is designed so that PHI has no reason to be there. What it cannot do is guarantee the outcome, because any free-text field can receive something a user was asked not to type, and a disclaimer above a text box is a request rather than a control. So plan for the failure case: review the free-text column on a set schedule, delete anything clinical out of the Sheet and out of the n8n execution log, move the substance into Lane 2, and write down that you did it. A lane that is designed for non-PHI and cleaned when it slips is defensible. A lane you claim in writing never touches PHI is a claim someone will one day check against the actual rows. Forms collect operational and interest data only. Email alerts contain name, email, category, and timestamp. No health narratives, no lab values, no diagnoses. Be precise about what that buys you. Stripping the narrative does not de-identify the alert. HIPAA recognizes only two ways to de-identify: Expert Determination under 45 CFR 164.514(b)(1), where a qualified statistician documents that the re-identification risk is very small, and Safe Harbor under 164.514(b)(2), where all 18 listed identifiers are removed and you have no actual knowledge that what is left could still identify someone. Names, email addresses, and event dates are three of those 18, so an alert that carries all three is not de-identified by any measure. What minimization actually gives you is a smaller blast radius: less sensitive content sitting in a mailbox, and a shorter breach notification if that mailbox is ever compromised. Route the alert to your covered Google Workspace mailbox anyway, and treat it as PHI.

**Lane 2: The Clinical Lane**

This is where PHI lives. For most solo practitioners and small practices, this is Google Workspace with a signed Business Associate Agreement (BAA) from Google. After someone submits a clinical interest form in Lane 1, you review it manually and move the conversation into Lane 2 via secure Gmail and Google Drive. The full configuration walkthrough is here: [how to set up Google Workspace as your HIPAA clinical lane](/blog/google-workspace-hipaa-clinical-lane-setup).

The two lanes never merge in code. n8n never touches PHI. The app never stores PHI. Neither does any AI model in this stack, and that is the point of the split. A vendor that creates, receives, maintains, or transmits PHI on your behalf is a business associate, and an AI vendor is no exception. Sending PHI to a model with no signed BAA in place is a disclosure, not an experiment. Most consumer and free AI tiers are not offered under a BAA at all, and the enterprise tiers that are cover only the specific services and plan named in the agreement. Signing one does not finish the job either. A BAA binds the vendor. It does not transfer your own Privacy and Security Rule obligations, and it does not make a tool compliant on its own. The clinical lane is entirely manual and handled through your covered Google Workspace environment.

## What This Looks Like in Practice

Here is the actual flow used at Hunters Holistic Health:

1. A client submits a clinical interest form in the app. The form collects name, email, phone, service interest, and a brief description of what they are looking for. The description field has a visible disclaimer: "Please describe your interest in general terms only. Do not include lab results, diagnoses, or private health information."

2. n8n receives the webhook, logs the submission to a Google Sheet tab called Clinical Interest, and sends an email alert to the educator with name, email, category, and timestamp only. No description text in the alert.

3. The educator reviews the submission and decides whether to move forward.

4. If yes, the educator creates a client folder in Google Drive (inside the covered Google Workspace environment) and initiates contact via Google Workspace Gmail.

5. All subsequent clinical communication, lab uploads, and record storage happen inside Google Workspace. The app and n8n never see any of it.

## The Form Field Rules

The most common mistake is putting health-related free-text fields in Lane 1 forms. Here is the rule: any field where a user could reasonably type a diagnosis, a lab value, a medication name, or a health condition belongs in Lane 2, not Lane 1.

Lane 1 forms can safely collect:
- Name (first and last only, no DOB)
- Email address
- Phone number (optional)
- Service interest (dropdown, general categories)
- Preferred contact method
- Brief general description with a PHI disclaimer above the field

Lane 1 forms should never collect:
- Health history
- Current medications
- Lab results or values
- Diagnoses or conditions
- Treatment history

## The Google Workspace BAA

Before using Google Workspace for actual clinical files, you need a signed BAA with Google. This is done in the Google Workspace Admin Console under Account settings. Google publishes a HIPAA Included Functionality list that defines which services the BAA actually covers. Gmail, Drive, Docs, Sheets, and Meet have been on it, but the list is Google's to revise, so check the current version rather than trusting a blog post from last year. Two limits matter more than the list itself. Third party applications and add-ons are not included in the covered functionality, and neither the BAA nor the Cloud Data Processing Addendum extends to Additional Google Services. That second one catches people, because the Additional Services and AI feature toggles live in the same Admin Console you use to sign the BAA. If you turn one on and PHI flows through it, that traffic is outside your BAA. Google is also explicit that deciding whether you are subject to HIPAA, and whether you intend to put PHI into Google services, is your call and not theirs.

The Workspace configuration steps are:
- Signed BAA in the Admin Console
- MFA enabled on all staff accounts
- Drive sharing set to private by default
- External sharing restricted
- A standard client folder structure
- Basic internal policies for access control

None of this is technically complex. It is administrative work that takes a few hours to set up correctly. It is also not the whole obligation. If HIPAA applies to you, the Security Rule requires more than settings. A risk analysis under 45 CFR 164.308(a)(1)(ii)(A) is a required implementation specification, not an optional one, and 164.316 requires that your policies and procedures be written down and kept for six years. Tightening the Admin Console is the easy half. The documented risk analysis is the half that gets asked for first when something goes wrong.

## Why This Matters More Than You Think

The [FTC has separate enforcement authority](/blog/ftc-compliance-health-content-creators) from HHS (which enforces HIPAA). Even if you are not a HIPAA covered entity, the FTC can take action against companies that fail to protect health information under Section 5 of the FTC Act. The FTC Health Breach Notification Rule also applies to vendors of personal health records and related entities.

Building the two-layer architecture from the start protects you under both frameworks. It is not extra work. It is the right foundation.

## The Takeaway

The two-layer architecture is not complicated. It is a discipline. Keep PHI in the covered lane. Keep automation in the non-PHI lane. Never let them merge in code. Review any new feature against that rule before building it.

Every workflow covered in this curriculum is built around this architecture. [The intake system](/blog/n8n-intake-routing-health-practice), the appointment follow-up automation, [the supplement protocol builder](/blog/supplement-protocol-builder-n8n), and the pre-session brief all run through Lane 1. The clinical lane is separate, manual, and Google Workspace-based.

That is the architecture I would want to be able to explain if someone ever asked me to. Have your compliance officer or counsel review it against your own facts before you trust it with a real client.

## Related reading

- Read [how to set up Google Workspace as your HIPAA clinical lane](/blog/google-workspace-hipaa-clinical-lane-setup).
- Read [why running n8n on AWS under a signed BAA matters](/blog/n8n-aws-baa-healthcare-automation).
- Read [what FTC compliance actually requires for health content creators](/blog/ftc-compliance-health-content-creators).
- Ready to work together? [a done-for-you compliant AI workflow built for your practice](/services).
`,
  },
  {
    slug: 'vibe-coding-healthcare-professionals',
    title: 'Vibe Coding for Healthcare Professionals: A Practical Starting Point',
    excerpt: 'You do not need a computer science degree to build useful tools with AI. Here is what vibe coding actually means, what it can realistically produce, and where the limits are.',
    category: 'Vibe Coding',
    date: 'Jun 8, 2026',
    readTime: '7 min read',
    content: `
## What Vibe Coding Actually Is

Vibe coding is a term that describes building software by describing what you want in natural language and letting an AI coding assistant write the code. You provide the vision, the requirements, the constraints, and the feedback. The AI writes the implementation.

The term was coined by Andrej Karpathy in early 2025 and has since become shorthand for a broader shift in how non-developers can participate in software creation. For healthcare professionals, it represents a genuine opportunity to build tools that fit your specific workflow without waiting for a developer or paying for a generic SaaS subscription.

This post covers what vibe coding can realistically produce, what it cannot, and the specific workflow that was used to build a deployed functional medicine education platform without a traditional development background.

## What You Can Realistically Build

The honest answer is: more than you think, with important caveats.

In a single session with Claude Code, a non-developer with a clear vision and a well-written CLAUDE.md file can produce:

A functional web application with authentication, database integration, and multiple pages. This is not a prototype. It is deployable code that can go live on Vercel or Netlify within hours.

Automation workflows in n8n that route form submissions, send emails, and log data to Google Sheets. These require no coding at all, just configuration, but AI can help you design the workflow logic and write the webhook payloads.

Custom HTML reports that visualize client data. Blood pressure trends, weight charts, supplement adherence grids. These can be generated as shareable files that clients can open in any browser.

What you cannot realistically build without deeper involvement: complex real-time systems, custom mobile apps with native device integrations, or anything requiring deep infrastructure expertise. These are possible with vibe coding but require more iteration and a clearer understanding of what you are asking for.

## The CLAUDE.md File Is the Key

The single most important thing you can do before starting a vibe coding session is write a good CLAUDE.md file. This is a plain text file that lives in the root of your project folder and tells Claude Code everything it needs to know about your project.

A good CLAUDE.md includes:
- What the project is and who it is for
- The tech stack and why it was chosen
- The design system (colors, fonts, spacing rules)
- The compliance rules (no PHI in Lane 1, no em dashes, no Tailwind)
- The file structure and naming conventions
- What has already been built and what still needs to be done
- The writing style rules for any copy Claude generates

When Claude Code reads a thorough CLAUDE.md at the start of a session, it behaves like a senior developer who has been briefed on the project. When it does not have one, it makes assumptions that often conflict with your requirements.

## The Workflow That Actually Works

Here is the workflow used to build Hunters Holistic Health:

**Step 1: Define the project in plain language.** Write out what the app does, who uses it, and what the most important features are. Do not worry about technical terms. Write it the way you would explain it to a smart friend who is not a developer.

**Step 2: Research the compliance requirements before writing a single line of code.** For healthcare applications, this means understanding HIPAA, FTC endorsement guides, Apple App Store health guidelines, and any state-specific regulations. These constraints shape the architecture. You cannot add compliance as an afterthought.

**Step 3: Write the CLAUDE.md.** Include everything from Step 1 and Step 2. Add the design system, the writing style rules, and the hard stop rules (things Claude should never do without asking you first).

**Step 4: Start with the data model.** Before building any UI, define what data the app stores, how it is structured, and who can access what. For Supabase, this means writing the SQL schema and the Row Level Security policies first.

**Step 5: Build one feature at a time.** Do not ask Claude to build the entire app in one prompt. Build the authentication flow first. Then the dashboard. Then the first feature. Review each piece before moving to the next.

**Step 6: Use Fable 5 for heavy lifting, Claude Code for iteration.** Fable 5 (Claude's most powerful model) has a 1 million token context window and can hold your entire codebase, the CLAUDE.md, and reference documents all at once. Use it for the initial build and major refactors. Use Claude Code in VS Code for live iteration where you can see the browser in real time.

## The Limits You Need to Understand

Vibe coding produces code that works. It does not always produce code that is optimally structured, secure by default, or easy to maintain as the project grows. The larger the codebase gets, the more important it becomes to review what Claude produces rather than just accepting it.

The specific risks for healthcare applications:
- Claude may suggest storing data in a way that creates PHI exposure. This is why the HIPAA hard stop rule in CLAUDE.md is non-negotiable.
- Claude may generate copy that makes health claims. Review all user-facing text before publishing.
- Claude may use third-party libraries with security vulnerabilities. Run npm audit regularly.

None of these risks make vibe coding inappropriate for healthcare applications. They make the CLAUDE.md rules and the review process more important.

## The Takeaway

Vibe coding is a legitimate path to building useful tools for your practice. The barrier is not technical skill. It is the discipline to define what you want clearly, set the right constraints, and review what gets built before it goes live.

The CLAUDE.md file is the difference between a productive session and a frustrating one. Write it before you start. Update it as the project evolves. Treat it as the most important document in your project.

## Related reading

- Read [how to build your own patient-facing tools without a dev team](/blog/vibe-coding-healthcare-patient-tools).
- Read [how a full HIPAA-conscious health app got built with Claude Code](/blog/build-health-app-without-coding-claude).
- Read [Claude Code for absolute beginners](/blog/claude-code-absolute-beginners-guide).
- Ready to work together? [a custom build session where the tool gets built with you](/services).
`,
  },
  {
    slug: 'claude-code-exam-prep-cca-f-guide',
    title: 'How to Pass the CCAR-F Exam: A Complete Study Guide',
    excerpt: 'The Claude Certified Architect: Foundations exam tests five domains. What each one covers, where candidates lose points, and how to prepare efficiently.',
    category: 'Exam Prep',
    date: 'Jun 6, 2026',
    readTime: '11 min read',
    content: `
## What the CCAR-F Exam Actually Tests

The Claude Certified Architect: Foundations (CCAR-F) certification is Anthropic's entry-level certification for Claude Code practitioners. It tests whether you understand how to use Claude Code effectively, safely, and in alignment with Anthropic's documented best practices.

The exam is not a coding test. You will not be asked to write code. You will be asked to demonstrate that you understand the concepts, tools, workflows, and safety principles that govern how Claude Code operates.

This matters for healthcare professionals specifically because the agentic architecture domain, the heaviest on the exam, covers human-in-the-loop gating and programmatic enforcement patterns that map directly onto the compliance requirements you already work within.

## The Five Domains

**Domain 1: Agentic Architecture & Orchestration (27% of the exam, the heaviest domain)**

An agent is Claude running in a loop: call tools, get results, reason, call more tools, stop when done. The critical signal is stop_reason, not the content type of the response. This domain also covers multi-agent orchestration, subagent context isolation (subagents get zero automatic memory of the parent session), human-in-the-loop gating, fallback design, and RAG pipelines.

The most tested concept: for compliance-critical rules with financial or safety consequences, use programmatic hooks, not system prompt instructions. Prompts are probabilistic. Hooks are deterministic.

**Domain 2: Tool Design & MCP Integration (18%)**

MCP (the Model Context Protocol) is the standard for giving Claude access to external tools, and tool descriptions are the primary routing mechanism, not just documentation. This domain also tests stdio vs Streamable HTTP transport selection (SSE is deprecated), authentication patterns, and structured error handling in tool responses.

The most common miss: candidates still learn SSE as a current transport option. It was deprecated in the MCP spec, replaced by Streamable HTTP for remote or multi-client use. stdio stays correct for local, single-session development.

**Domain 3: Claude Code Configuration & Workflows (20%, more specific than most candidates expect)**

Claude Code is controlled through a hierarchy of config files, and this domain tests exact file paths, not general familiarity. Project memory lives at ./CLAUDE.md in the project root, committed to git, not inside the .claude/ folder. That folder holds settings, rules, and commands. This domain also covers the hooks event model, slash command frontmatter, and monorepo patterns.

**Domain 4: Prompt Engineering & Structured Output (20%)**

This domain tests when each prompting technique applies and its limits, It also covers model selection tradeoffs (Haiku for volume, Sonnet for most production work, Opus for the highest-consequence tasks) and validation retry loop design.

**Domain 5: Context Management & Reliability (15%)**

This is often the easiest set of points on the exam once you know the material. It tests context engineering: compaction, structured note taking, context rot, prompt caching with cache_control markers, token budget management, and provenance tracking across multiple sources.

## Where Most Candidates Lose Points

Based on the actual structure and weighting of the exam, the most common failure points are:

**Choosing prompts over programmatic enforcement.** This is the single most tested concept. When a business rule has financial or safety consequences, prompt instructions have a non-zero failure rate. The exam always wants a hook or a programmatic gate instead.

**Checking response content type instead of stop_reason.** A common code pattern checks response.content[0].type === 'text' to decide whether the agentic loop is done. This breaks in production because Claude can return text and a tool_use block in the same response. Always check stop_reason.

**Confusing SSE and stdio transports.** A confirmed Domain 2 topic. stdio is for local, single-client development. Streamable HTTP is for remote or multi-client use. Many candidates don't know SSE was deprecated.

**Assuming subagents inherit context.** Subagents start with zero automatic memory of the parent session or sibling agents. Every piece of information they need has to be explicitly passed in their prompt.

**Skipping context engineering and prompt caching.** Domain 5 is the smallest slice of the exam at 15 percent, which makes it the easiest to under study. The caching minimum is model dependent rather than a flat number, and cached prefixes carry a 5 minute TTL by default with a 1 hour option.

## How to Prepare Efficiently

The most efficient preparation path is:

1. Read the official Claude Code documentation completely. Every answer on the exam is sourced from this documentation. There is no trick content.

2. Work through practice questions by domain, not by difficulty. Identify which domains you are weakest in and focus there.

3. For each question you get wrong, find the specific documentation page it came from. Do not just memorize the correct answer. Understand why it is correct.

4. Pay special attention to Domain 1 (Agentic Architecture & Orchestration). At 27% of the exam, it carries more weight than any other domain, and its programmatic-enforcement concepts show up as distractors throughout the other domains too.

5. Do not rely on general AI knowledge. Claude Code has specific behaviors that differ from other AI tools. What is true for GPT-4 or Gemini may not be true for Claude Code.

The 226 practice questions in the CCAR-F Exam Prep product cover all five domains with full explanations and documentation citations. Every question was written against the official Anthropic documentation, not from memory or general AI knowledge.

## The Practical Value of the Certification

The CCAR-F certification signals to employers, clients, and collaborators that you understand Claude Code at a documented, tested level. For healthcare professionals building AI-powered tools, it is also a credibility signal that you have engaged seriously with the safety and compliance dimensions of AI development.

The exam is not difficult if you have read the documentation. The challenge is knowing which parts of the documentation are most heavily tested and how to apply the concepts to scenario-based questions.

That is exactly what the practice questions are designed to address.

## Related reading

- Read [Claude Code for absolute beginners](/blog/claude-code-absolute-beginners-guide).
- Read [Claude Code vs Cursor in 2026](/blog/claude-code-vs-cursor-2026).
- Read [the beginner vibe-coding tutorial: shipping a real app without writing code](/blog/vibe-coding-tutorial-beginners-2026).
- Ready to work together? [the 226 practice questions with official-doc citations](/exam-prep).
`,
  },
  {
    slug: 'n8n-intake-routing-health-practice',
    title: 'Building an n8n Intake Router for Your Health Practice',
    excerpt: 'A step-by-step guide to building the intake routing workflow that handles waitlist signups, support requests, feature feedback, and clinical inquiries without touching PHI.',
    category: 'Automation',
    date: 'Jun 4, 2026',
    readTime: '10 min read',
    content: `
## Why n8n for Healthcare Intake

n8n is a self-hosted workflow automation tool that gives you full control over your data flows. Unlike Zapier or Make, n8n runs on your own infrastructure, which means your webhook data never passes through a third-party server you do not control.

For healthcare-adjacent applications, this matters. Even if you are operating in the non-PHI lane (which you should be for intake automation), the principle of data minimization is good practice. The fewer third-party servers your data touches, the lower your exposure.

n8n is also free for self-hosted use. The Docker setup takes about 20 minutes and runs on any cloud provider or even a local machine.

## The Four-Submission Architecture

The intake system built for Hunters Holistic Health handles four distinct submission types, each routed to its own Google Sheet tab:

**Early Access (Waitlist):** Name, email, interests, background, biggest challenge. Routed to the Early Access tab. Email alert contains name, email, and timestamp only.

**Support Requests:** Name, email, reason for contact (dropdown), preferred contact method, optional message. Routed to the Support Requests tab. Email alert contains name, email, category, and timestamp.

**Feature Requests:** Feature description, category, importance rating, anonymous flag. Routed to the Feature Requests tab. No email alert (reviewed on a schedule).

**Clinical Inquiries:** Name, email, phone, service interest, brief description (with PHI disclaimer). Routed to the Clinical Interest tab. Email alert contains name, email, service interest, and timestamp. No description text in the alert.

## The n8n Workflow Structure

The workflow uses a single webhook trigger that receives all four submission types. A Switch node routes each submission to the appropriate branch based on the submissionType field.

Each branch has three nodes:
1. A Google Sheets Append node that adds the row to the correct tab
2. A Gmail Send node that sends the alert email (for submission types that require it)
3. A Respond to Webhook node that returns a 200 OK response

The webhook URL is stored as an environment variable in the app (VITE_N8N_WEBHOOK_URL). It is never hardcoded in the source code.

## Security: The Webhook Secret Token

Every webhook should have a shared secret token. This prevents anyone who discovers your webhook URL from submitting fabricated data.

In n8n, set a Header Auth credential with a secret token. In the app, include this token in the request headers:

\`\`\`
X-Webhook-Secret: your-secret-token-here
\`\`\`

Store the token in your environment variables, not in the source code.

## The Google Sheet Structure

The master Google Sheet has nine tabs in order:

1. Early Access
2. Support Requests
3. Feature Requests
4. Clinical Interest
5. Appointment Follow-Ups (added when Workflow 10 is built)
6. Triage Log (added when Workflow 12 is built)
7. Protocol Requests (added when Workflow 5 is built)
8. Pre-Session Briefs (added when Workflow 8 is built)
9. Lab Interest (added when Workflow 4 is built, Google Workspace BAA required)

The first four tabs are active from day one. The remaining five are added as each workflow is built.

## The Email Alert Rules

Email alerts are intentionally minimal. The rule is: name, email, category, and timestamp only. No description text, no health details, no free-form content from the user.

This rule serves two purposes. First, it keeps the alerts non-PHI by design. Second, it keeps the alerts actionable. An alert that contains a wall of text from a form submission is not useful. An alert that says "New clinical inquiry from Jane Doe (jane@example.com) at 2:14 PM" is immediately actionable.

## Testing With Fabricated Data

Before connecting real user submissions, test every workflow branch with fabricated data. n8n has a built-in test execution mode that lets you trigger the workflow manually with a test payload.

Use completely fictional names, email addresses, and content for all test submissions. Never use real client names or real health information in test data, even in a development environment.

## The Deployment Decision: Cloud vs. Local

For production use, n8n should run on a cloud server, not a local machine. A $6/month DigitalOcean droplet or equivalent is sufficient for a solo practice with low submission volume.

The alternative is n8n Cloud, which is a managed version that starts at $20/month. This is simpler to set up but means your webhook data passes through n8n's servers. For non-PHI intake data, this is acceptable. For anything approaching PHI, self-hosted is the right choice.

## The Takeaway

The n8n intake router is the operational backbone of the non-PHI automation layer. It takes about four hours to build from scratch, including the Google Sheets setup and the app integration. Once it is running, it handles intake routing automatically with no manual intervention required.

The architecture is portable. The same workflow structure, with minor modifications to the form fields and Sheet column names, can be deployed for any health educator, wellness practice, or small business. That portability is what makes it a sellable service.

## Related reading

- Read [why running n8n on AWS under a signed BAA matters](/blog/n8n-aws-baa-healthcare-automation).
- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Read [the full five-tool automation stack behind this business](/blog/my-automation-stack-pharmd-builds-with-ai).
- Ready to work together? [a scoped intake-router build for your practice](/services).
`,
  },
  {
    slug: 'ftc-compliance-health-content-creators',
    title: 'FTC Compliance for Health Content Creators: What Actually Matters',
    excerpt: 'The FTC updated its Endorsement Guides in 2023. "Results not typical" is no longer sufficient. Here is what you actually need to say and how to structure compliant testimonials.',
    category: 'Compliance',
    date: 'Jun 2, 2026',
    readTime: '8 min read',
    content: `
## Why FTC Compliance Matters More Than Most Health Creators Realize

Most health content creators know they need a disclaimer somewhere. Fewer understand that the FTC's 2023 updates to the Endorsement Guides fundamentally changed what is required, and that the old "results not typical" language is no longer sufficient.

The FTC has enforcement authority over unfair or deceptive acts and practices in commerce. Health claims, testimonials, and endorsements in commercial contexts all fall within this authority. The penalties for violations range from warning letters to civil penalties of up to $51,744 per violation.

This post covers the specific requirements that apply to health educators, supplement recommendations, and testimonial-based marketing.

## The 2023 Endorsement Guide Updates

The key changes in the 2023 updates:

**Material connections must be disclosed clearly and conspicuously.** If you receive a product for free, if you are paid to mention something, or if you have an affiliate relationship, that must be disclosed in a way that is hard to miss. A small asterisk at the bottom of a page does not satisfy this requirement.

**"Results not typical" is no longer sufficient.** If you feature a testimonial that describes results that are not typical, you must either have substantiation that the results are typical, or you must clearly disclose what typical results are. This is a significant change from the previous guidance.

**Endorsements must reflect honest opinions.** You cannot feature a testimonial from someone who was paid to give it without disclosing the payment. You cannot feature a testimonial that you know is not representative of typical results without the required disclosures.

**Social media disclosures must be in the post itself.** A disclosure in your bio or a separate post does not satisfy the requirement for a specific endorsement post. The disclosure must be in the same post as the endorsement.

## Prohibited Language for Health Educators

The following types of claims are prohibited for health educators and supplement recommendations:

**Disease claims:** Any statement that a product diagnoses, cures, treats, mitigates, or prevents a disease. "This supplement cures diabetes" is a drug claim that requires FDA approval. "This supplement supports healthy blood sugar levels" is a structure/function claim that may be permissible.

**Unsubstantiated efficacy claims:** Any claim about a product's effect that you cannot substantiate with competent and reliable scientific evidence.

**Deceptive testimonials:** Testimonials that are not representative of typical results, without the required disclosures.

## Compliant Language Patterns

The following patterns are compliant for health educators:

**Structure/function claims:** "Supports healthy [body function]," "promotes [normal physiological process]," "helps maintain [normal health state]." These describe how a nutrient or ingredient affects normal structure or function, not how it treats a disease.

**Educational framing:** "Research suggests that [nutrient] may play a role in [physiological process]. This is not medical advice. Consult your healthcare provider before making changes to your supplement regimen."

**Compliant testimonial structure:** "Sarah, a program participant, shared that she noticed [specific, verifiable result] after [specific timeframe]. Individual results vary. Sarah's experience may not be typical. Most participants in our program report [describe typical results based on actual data]."

## The Affiliate Disclosure Requirement

If you use affiliate links (Fullscript, Amazon, supplement brands), every post, page, or video that contains those links must include a clear disclosure. The FTC's guidance says the disclosure must be:

- Clear and conspicuous (not buried in fine print)
- In close proximity to the endorsement or link
- In language that consumers can understand

A compliant disclosure: "This page contains affiliate links. If you purchase through these links, I may earn a commission at no additional cost to you."

An insufficient disclosure: A small asterisk that links to a separate disclosure page.

## The Educator vs. Coach Distinction

Using the title "educator" rather than "coach" or "practitioner" provides some additional protection in FTC contexts. An educator shares information. A coach or practitioner implies a professional relationship with specific outcomes.

The FTC looks at the totality of the representation, not just the title. If your marketing implies that your program will produce specific health outcomes, the title "educator" does not protect you from FTC scrutiny of those implied claims.

The safe approach: describe what your program teaches, not what it will do for the client. "You will learn how to read your lab results" is safer than "You will optimize your health." The first is an educational outcome. The second is a health claim.

## Building Compliance Into Your Content System

The most practical approach is to build compliance into your content creation workflow rather than reviewing for compliance after the fact.

For every piece of content that includes a health claim, testimonial, or product recommendation, run it through these four questions:

1. Is this a structure/function claim or a disease claim? If it is a disease claim, rewrite it.
2. Is this testimonial representative of typical results? If not, add the required disclosure.
3. Is there a material connection that needs to be disclosed? If yes, add the disclosure in the content itself.
4. Is the educational framing clear? Does the content make clear that this is information, not medical advice?

This takes about two minutes per piece of content and eliminates the most common FTC compliance risks.

## The Takeaway

FTC compliance for health content creators is not complicated. It requires understanding the distinction between structure/function claims and disease claims, disclosing material connections clearly and conspicuously, and ensuring that testimonials are representative or properly qualified.

The 2023 updates raised the bar. "Results not typical" is no longer enough. Build the compliance review into your workflow from the start.

## Related reading

- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Read [building an AI meal analysis feature that stays inside educator scope](/blog/ai-meal-analysis-healthcare-compliance).
- Read [what ChatGPT is actually safe to use for in clinical work](/blog/chatgpt-healthcare-professionals-safe-use).
- Ready to work together? [a compliance review of your existing content and workflows](/services).
`,
  },
  {
    slug: 'stripe-setup-health-educator-platform',
    title: 'Setting Up Stripe for a Health Education Platform: The Complete Guide',
    excerpt: 'Stripe is the right payment processor for health education platforms. Here is how to set it up correctly, what to watch out for, and how to structure your products for compliance.',
    category: 'Business',
    date: 'May 30, 2026',
    readTime: '7 min read',
    content: `
## Why Stripe for Health Education

Stripe is the payment processor of choice for most digital product businesses for three reasons: it has the best developer experience, the most transparent pricing (2.9% plus 30 cents per transaction for standard cards), and the most robust compliance and fraud protection infrastructure.

For health education platforms specifically, Stripe has two additional advantages. First, it is not a healthcare payment processor, which means it does not require HIPAA compliance for standard educational product sales. Second, its webhook system integrates cleanly with n8n and other automation tools, allowing you to automate post-purchase workflows without custom backend code.

## What Stripe Can and Cannot Process

Stripe can process payments for:
- Digital courses and educational content
- One-time product purchases (exam prep, guides, templates)
- Subscription memberships for educational platforms
- Coaching and consulting services (when properly structured as educational services)

Stripe has restrictions on certain health-related products. Specifically, Stripe's terms of service prohibit using Stripe to sell products that make unsubstantiated health claims. This is consistent with FTC requirements and reinforces the importance of using compliant language in your product descriptions.

Stripe does not process payments for prescription medications, controlled substances, or products that require a prescription. This is not relevant for most health education platforms but worth noting.

## The Product Structure

For a health education platform with multiple offerings, the recommended Stripe product structure is:

**One-time products:** Create a separate Product in Stripe for each one-time purchase (exam prep, guides, templates). Each Product has one Price object with a fixed amount.

**Subscriptions:** Create a Product for each subscription tier (free, basic, professional, educator). Each Product has one or more Price objects (monthly and annual billing options).

**Bundles:** If you offer product bundles, create a separate Product for the bundle rather than trying to combine existing products. This simplifies reporting and refund handling.

## The Checkout Flow

The recommended checkout flow for a health education platform:

1. User clicks "Buy" or "Get Access" on the product page.
2. User is redirected to a Stripe Checkout session (hosted by Stripe, not your app).
3. User completes payment on Stripe's hosted page.
4. Stripe sends a webhook event to your n8n workflow.
5. n8n logs the purchase to Google Sheets, sends a confirmation email, and (if applicable) grants access in Supabase.
6. User is redirected to your success page.

Using Stripe's hosted Checkout page (rather than building a custom payment form) is strongly recommended. It handles PCI compliance automatically, supports all major payment methods, and has built-in fraud detection.

## The Webhook Integration

The Stripe webhook integration is the most technically complex part of the setup. Here is the structure:

In Stripe: Create a webhook endpoint pointing to your n8n webhook URL. Subscribe to the checkout.session.completed event.

In n8n: Create a workflow that triggers on the Stripe webhook. Verify the webhook signature (Stripe provides a signing secret for this). Extract the customer email, product ID, and amount from the event payload. Log to Google Sheets and send confirmation email.

The webhook signature verification is not optional. Without it, anyone who knows your webhook URL can send fake payment events to your n8n workflow.

## The Refund Policy

Stripe's default refund window is 90 days. Your refund policy should be clearly stated on your product pages and in your Terms of Service.

For digital products, a common policy is: full refund within 7 days of purchase if the product has not been accessed, no refund after access. This is enforceable through Stripe's dispute resolution process if you have documentation that the product was accessed.

## The Tax Situation

Digital products sold to customers in certain jurisdictions (EU, UK, Australia) may require you to collect and remit VAT or GST. Stripe Tax is a Stripe add-on that handles this automatically for an additional fee per transaction.

For US-based sales, digital educational products are generally not subject to sales tax in most states, but this varies by state and product type. Consult a tax professional for your specific situation.

## The Compliance Language in Product Descriptions

Every product description on your Stripe checkout page should include the educational disclaimer. Stripe displays your product description on the checkout page, so this is the last thing a customer sees before paying.

A compliant product description for an exam prep product: "226 practice questions for the CCAR-F certification exam. Educational content only. Not affiliated with Anthropic. Results depend on individual study effort."

A compliant product description for a health education subscription: "Monthly access to educational content on functional medicine concepts, AI workflows for health professionals, and related topics. Educational content only. Not medical advice."

## The Takeaway

Stripe setup for a health education platform takes about two hours from account creation to first live transaction. The most important decisions are the product structure, the webhook integration, and the compliance language in product descriptions.

The Stripe Checkout hosted page handles PCI compliance automatically. The webhook integration with n8n handles post-purchase automation. The compliance language in product descriptions protects you from Stripe's terms of service restrictions and FTC scrutiny.

## Related reading

- Read [using Google Apps Script as the entire backend for Pharmacy Decoder](/blog/google-apps-script-pharmacy-decoder-backend).
- Read [the full five-tool automation stack behind this business](/blog/my-automation-stack-pharmd-builds-with-ai).
- Read [the App Store approval path for a HIPAA-adjacent health app](/blog/apple-app-store-health-app-compliance).
- Ready to work together? [a full payment and platform setup for your health business](/services).
`,
  },
  {
    slug: 'blood-pressure-tracking-app-architecture',
    title: 'Building a Blood Pressure Tracker: Architecture Decisions That Matter',
    excerpt: 'The blood pressure tracker in Hunters Holistic Health is more than a chart. Here is how the educational framing, the data model, and the UI patterns were designed to stay in educator territory.',
    category: 'Build Notes',
    date: 'May 28, 2026',
    readTime: '8 min read',
    content: `
## Why Blood Pressure Tracking Is a Compliance Challenge

A blood pressure tracker sounds simple: store readings, display a trend chart. The compliance challenge is that blood pressure is a clinical measurement with established diagnostic thresholds. A 130/80 reading means something specific in clinical medicine, and so does 140/90. The 2025 AHA/ACC guideline calls the first stage 1 hypertension and the second stage 2. How you display that information in an educational app determines whether you are providing education or practicing medicine.

This post covers the architecture decisions made in building the blood pressure tracker for Hunters Holistic Health, with specific attention to the educational framing that keeps the feature in educator territory.

## The Data Model

The blood pressure log table in Supabase has the following structure:

- id (UUID, primary key)
- user_id (UUID, foreign key to auth.users)
- systolic (integer, 60 to 250 range check)
- diastolic (integer, 40 to 200 range check, because readings above 120 diastolic are the severe range and a constraint at 150 would silently reject exactly the readings that matter most)
- pulse (integer, optional, 30 to 200 range check)
- context (text, optional: "morning", "evening", "stressed", "did not rest five minutes first", "within 30 minutes of caffeine, smoking, or exercise")

Those last two context values exist because the AHA measurement instructions matter more than the chart does. A reading taken within 30 minutes of caffeine, smoking, or exercise, or without five minutes of quiet rest, is not comparable to the rest of the log, so the app flags it rather than silently averaging it in. The logging screen carries the short version of the AHA protocol: validated automatic upper arm cuff, correct cuff size, feet flat, arm supported at heart level, two readings one minute apart.
- notes (text, optional, 500 character limit)
- logged_at (timestamp with time zone)
- created_at (timestamp with time zone)

The range checks are enforced at the database level, not just the UI level. This prevents obviously erroneous data from being stored and reduces the risk of the chart displaying values that could be misinterpreted as clinical data.

Row Level Security ensures that users can only read and write their own records. The educator can read all records for their clients but cannot write to client records.

## The Chart Architecture

The trend chart uses Chart.js with a line chart type. The x-axis is time (logged_at), the y-axis is the reading value. Systolic and diastolic are displayed as separate lines.

The chart includes reference lines at 120/80 (the top of normal, which the 2025 AHA/ACC guideline defines as under 120 systolic and under 80 diastolic), at 130/80 (where stage 1 hypertension begins), at 140/90 (stage 2), and at 180/120 (the severe range that gets its own urgent action path). These reference lines are labeled as educational reference points, not diagnostic thresholds.

The color coding is intentional: readings below 120/80 are displayed in teal (the brand's positive color), readings of 120 to 129 systolic with diastolic under 80 are displayed in a light amber, readings of 130 to 139 systolic or 80 to 89 diastolic in a deeper amber, readings of 140 or higher systolic or 90 or higher diastolic in a muted red, and anything above 180/120 in a distinct color tied to the urgent action message. The colors are informational, not alarming.

## The Educational Framing Pattern

The most important architectural decision in the blood pressure tracker is the educational framing pattern. Every time a reading is displayed in a zone that might prompt concern, the UI shows educational context rather than a diagnostic label.

Instead of stamping "WARNING: HYPERTENSIVE CRISIS" on any reading over 140/90, which borrows an emergency label for a number the guideline calls stage 2 hypertension

The UI shows: "This reading falls above the 130/80 reference point in the 2025 AHA/ACC blood pressure categories. One reading is not a diagnosis, and the American Heart Association suggests retaking it after five minutes of quiet rest. If your readings keep landing here, that is worth a conversation with your own healthcare provider. Above 180/120 the app drops the color coding entirely and shows one message: this reading is in the severe range, contact your healthcare provider now, and call 911 if you also have chest pain, shortness of breath, weakness or numbness, vision changes, or trouble speaking. Here is what this means: [link to AHA educational resource]."

This pattern is applied consistently throughout the app. The rule is: educational context, not diagnostic labels. Reference points, not thresholds. Recommendations to consult a provider, not diagnoses.

## The "No DOB" Decision

The blood pressure tracker collects age, not date of birth. This is a deliberate data minimization decision. Age is useful context for a cardiovascular risk conversation, though it does not change the reference ranges themselves. The 2025 AHA/ACC guideline applies the same blood pressure categories to every adult regardless of age. Date of birth is more specific than necessary and creates a data point that, combined with other information, could be used to identify an individual.

The signup form collects first name, last name, age, and email. No date of birth, no address, no phone number (unless voluntarily provided in the clinical inquiry form). This is the minimum data needed to provide the educational service.

## The Shareable Report Feature

The blood pressure tracker includes a feature that allows the educator to generate a shareable HTML report for a specific client. The report includes the trend chart, a summary of recent readings, and educational context.

The report is generated as a static HTML file with the chart data embedded as JSON. It can be shared via a secure link (time-limited, generated by a Supabase Edge Function) or downloaded as a file.

The report includes a prominent disclaimer: "This report is for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Consult your healthcare provider for clinical interpretation of these readings."

## The Offline-First Architecture

The blood pressure log works offline. When a client logs a reading without an internet connection, the reading is stored in the browser's IndexedDB and synced to Supabase when the connection is restored. This is implemented as a Progressive Web App service worker.

The offline-first architecture is important for a daily logging feature. Clients check their blood pressure at home, often in the morning before they are fully engaged with their devices. If the app requires an internet connection to log a reading, the friction is high enough that many clients will skip it.

## The Takeaway

The blood pressure tracker is a case study in building a clinically adjacent feature while staying firmly in educator territory. The data model enforces reasonable ranges. The chart uses educational reference points rather than diagnostic thresholds. The UI framing provides educational context rather than diagnostic labels. The shareable report includes a prominent disclaimer.

Every decision in the architecture was made with the question: does this look like education or does this look like clinical practice? The answer should always be education.

## Related reading

- Read [building a supplement protocol generator with n8n and OpenAI](/blog/supplement-protocol-builder-n8n).
- Read [how a full HIPAA-conscious health app got built with Claude Code](/blog/build-health-app-without-coding-claude).
- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Ready to work together? [a custom tracker or intake tool for your practice](/services).
`,
  },
  {
    slug: 'google-workspace-hipaa-clinical-lane-setup',
    title: 'Setting Up Google Workspace as Your HIPAA Clinical Lane',
    excerpt: 'Google Workspace with a signed BAA is a practical, affordable clinical lane for solo practitioners. Here is the exact setup process and the configuration requirements.',
    category: 'HIPAA',
    date: 'May 26, 2026',
    readTime: '9 min read',
    content: `
## Why Google Workspace for the Clinical Lane

The clinical lane is where PHI lives. For solo practitioners and small practices, the most practical and affordable option for a HIPAA-compliant clinical lane is Google Workspace with a signed Business Associate Agreement.

Google Workspace Business Starter starts at $6 per user per month. The BAA is available at no additional cost and covers Gmail, Drive, Docs, Sheets, Meet, and several other services. This is a fraction of the cost of dedicated healthcare communication platforms like Spruce or Klara.

The tradeoff is that Google Workspace requires more configuration to be HIPAA-compliant than a purpose-built healthcare platform. The configuration is not technically complex, but it requires deliberate attention to the admin settings.

## The BAA Process

The BAA is signed in the Google Workspace Admin Console. The process:

1. Log in to admin.google.com as a super admin.
2. Navigate to Account settings, then Legal.
3. Find the Business Associate Amendment and review it.
4. Accept the BAA.

This takes about five minutes. Once accepted, the BAA applies to all covered services in your Google Workspace account. Google maintains a list of covered services at workspace.google.com/terms/health.

You must accept the BAA before using any covered service to store or transmit PHI. Using Gmail or Drive for PHI before accepting the BAA is a HIPAA violation, even if you later accept the BAA.

## The Required Configuration

After accepting the BAA, the following configuration changes are required:

**MFA on all accounts:** Every account in your Google Workspace organization must have multi-factor authentication enabled. In the Admin Console, navigate to Security, then 2-Step Verification, and enforce 2-Step Verification for all users.

**Drive sharing set to private by default:** In the Admin Console, navigate to Apps, then Google Workspace, then Drive and Docs, then Sharing settings. Set the default sharing setting to "Off - No sharing outside of [your domain]." This prevents files from being accidentally shared with external parties.

**Restrict external sharing:** In the same Sharing settings section, restrict external sharing to prevent users from sharing files with people outside your organization unless explicitly approved.

**Disable link sharing by default:** Set the default link sharing setting to "Restricted" so that Drive files are not accessible to anyone with a link unless sharing is explicitly enabled.

**Audit logging:** Enable Drive audit logging in the Admin Console so you have a record of who accessed which files and when. This is required for HIPAA compliance.

## The Client Folder Structure

The standard client folder structure for a solo practice:

\`\`\`
Clients/
  Client-[LastName]-[FirstName]-[ID]/
    01-Intake/
    02-Labs/
    03-Session-Notes/
    04-Care-Plan/
    05-Exports/
\`\`\`

Each client folder is created manually when a new client is onboarded. The folder is shared only with the specific client (if they need access) and any staff members who work with that client.

The ID in the folder name is a simple sequential number (001, 002, etc.) that allows you to reference clients in non-PHI contexts (like [n8n logs](/blog/n8n-aws-baa-healthcare-automation)) without using their name.

## The Five-Step Client Handoff Flow

When a client submits a clinical interest form in the app:

1. Review the submission in the Clinical Interest Google Sheet tab.
2. If proceeding, create a client folder in Google Drive using the standard structure.
3. Send an initial response from your Google Workspace Gmail account with next steps.
4. Collect any necessary documents (labs, records) via secure Google Drive sharing.
5. All subsequent clinical communication happens via Google Workspace Gmail and Drive.

The app and n8n never see any of the clinical communication or documents. The handoff from Lane 1 (app and n8n) to Lane 2 (Google Workspace) is entirely manual.

## What Google Workspace Does Not Cover

Google Workspace is not a complete HIPAA compliance solution. It covers the technical safeguards for the services listed in the BAA. It does not cover:

- Administrative safeguards (policies, training, risk assessments)
- Physical safeguards (device security, workstation controls)
- Business associate agreements with other vendors you use
- State-specific privacy law requirements (which may be stricter than HIPAA)

A complete HIPAA compliance program requires attention to all three categories of safeguards. Google Workspace handles the technical safeguards for your email and file storage. The administrative and physical safeguards are your responsibility.

## The Minimum Viable Compliance Program

For a solo practice just getting started, the minimum viable compliance program alongside Google Workspace is:

- A written privacy policy and notice of privacy practices
- A written security policy covering device security and access control
- Annual HIPAA training (there are free online resources for this)
- A risk assessment (a simple spreadsheet identifying potential risks and mitigations)
- Business associate agreements with any vendor who handles PHI on your behalf

This is not a substitute for legal counsel. A healthcare attorney can review your specific situation and identify any gaps. But this minimum program, combined with properly configured Google Workspace, is a reasonable starting point for a solo practice.

## The Takeaway

Google Workspace with a signed BAA is the most practical clinical lane option for solo practitioners and small practices. The setup takes about two hours. The ongoing maintenance is minimal. The cost is $6 per user per month.

The key is doing the configuration correctly before using it for PHI. Accept the BAA, enable MFA, restrict sharing, and set up the client folder structure. Then use it consistently for all clinical communication and document storage.

## Related reading

- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Read [why running n8n on AWS under a signed BAA matters](/blog/n8n-aws-baa-healthcare-automation).
- Read [the App Store approval path for a HIPAA-adjacent health app](/blog/apple-app-store-health-app-compliance).
- Ready to work together? [a full compliance-first workflow audit and build](/services).
`,
  },
  {
    slug: 'ai-meal-analysis-healthcare-compliance',
    title: 'Building an AI Meal Analysis Feature That Stays in Educator Territory',
    excerpt: 'AI meal analysis is one of the most requested features in health education apps. Here is how to build it in a way that provides genuine value without crossing into clinical practice.',
    category: 'Build Notes',
    date: 'May 22, 2026',
    readTime: '7 min read',
    content: `
## The Compliance Challenge With AI Meal Analysis

AI meal analysis is genuinely useful. A client photographs their meal, the AI identifies the foods, estimates macronutrients, and provides educational context. The challenge is that "educational context" can quickly slide into "dietary prescription" if the feature is not carefully designed.

The line between education and clinical practice in nutrition is drawn by the Academy of Nutrition and Dietetics and enforced by state dietitian practice acts. In most states, providing individualized dietary advice for the treatment of disease requires a license. Providing general nutrition education does not.

This post covers the architecture and framing decisions that keep an AI meal analysis feature on the right side of that line.

## The Backend Proxy Pattern

The AI meal analysis feature in Hunters Holistic Health uses a Vercel serverless function as a backend proxy for the OpenAI API. This is the correct architecture for two reasons.

First, it keeps the OpenAI API key server-side. If you call the OpenAI API directly from the browser, your API key is exposed in the client-side code and can be extracted by anyone who inspects the network traffic. A serverless function keeps the key in the server environment.

Second, it allows you to enforce the educational framing at the API layer. The system prompt sent to OpenAI is controlled by the serverless function, not the client. This means you can ensure that the AI always responds in educational terms, regardless of what the user asks.

## The System Prompt Design

The system prompt for the AI Meal Guard feature is the most important compliance decision in the feature. Here is the structure used in Hunters Holistic Health:

\`\`\`
You are a functional medicine nutrition educator. Your role is to provide educational information about the nutritional content of foods and general wellness principles.

You must follow these rules without exception:
1. Never provide individualized dietary prescriptions or treatment plans.
2. Never diagnose nutritional deficiencies or health conditions.
3. Never recommend specific supplement doses for treating a condition.
4. Always frame responses as educational information, not medical advice.
5. When a response might be interpreted as clinical advice, add: "This is educational information only. Consult a registered dietitian or your healthcare provider for personalized dietary guidance."
6. Do not use diagnostic language (e.g., "you have," "you are deficient in," "you should take X mg of").
7. Use educational language (e.g., "research suggests," "this food contains," "general wellness principles indicate").
\`\`\`

This system prompt is enforced at the serverless function level. The client sends a meal description or image. The serverless function adds the system prompt and sends the complete request to OpenAI. The response comes back through the serverless function to the client.

## The Rate Limiting and Cost Control

AI API calls are expensive relative to other app operations. Without rate limiting, a single active user could generate significant API costs in a short time.

The Vercel serverless function implements rate limiting using a simple in-memory counter (for development) or a Redis-based counter (for production). The limit is 10 meal analyses per user per day. This is sufficient for educational use and keeps costs predictable.

The cost per meal analysis at GPT-4o pricing is approximately $0.01 to $0.03 depending on the length of the response. At 10 analyses per user per day with 100 active users, the maximum daily cost is $30. This is manageable and scales linearly with usage.

## The UI Framing

The UI for the meal analysis feature reinforces the educational framing established in the system prompt. Key design decisions:

The feature is called "AI Meal Guard," not "AI Nutritionist" or "AI Dietitian." The name signals that it is a tool for awareness and education, not clinical guidance.

Every response from the AI includes a small disclaimer at the bottom: "This analysis is for educational purposes only. It does not constitute dietary advice or medical guidance."

The feature does not display a "nutrition score" or "health rating" for meals. Scoring implies clinical judgment. Instead, it displays educational information about the nutritional content of the foods identified.

The feature does not track cumulative nutritional intake over time (that would be a clinical nutrition tracking feature). It analyzes individual meals in isolation.

## The Image Analysis Option

The feature supports both text-based meal descriptions and image uploads. When a user uploads a meal photo, the serverless function sends it to OpenAI's vision API for food identification before generating the educational analysis.

Image uploads require additional consideration: the images are not stored. They are sent directly to the OpenAI API and the response is returned to the client. No meal images are stored in Supabase or any other storage system. This minimizes data retention and reduces the risk of sensitive information being stored unnecessarily.

## The Takeaway

An AI meal analysis feature can be built in a way that provides genuine educational value while staying firmly in educator territory. The key decisions are: backend proxy to control the system prompt, educational framing in the system prompt itself, UI language that reinforces the educational context, and no clinical scoring or cumulative tracking.

The feature is one of the most engaging in the app. Clients use it regularly. The compliance architecture makes it sustainable.

## Related reading

- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Read [building a supplement protocol generator with n8n and OpenAI](/blog/supplement-protocol-builder-n8n).
- Read [what FTC compliance actually requires for health content creators](/blog/ftc-compliance-health-content-creators).
- Ready to work together? [a custom AI feature built to stay inside educator scope](/services).
`,
  },
  {
    slug: 'supplement-protocol-builder-n8n',
    title: 'Building a Supplement Protocol Builder With n8n and OpenAI',
    excerpt: 'A supplement protocol builder automates one of the most time-consuming parts of a functional medicine educator\'s workflow. Here is how to build one that stays compliant.',
    category: 'Automation',
    date: 'May 20, 2026',
    readTime: '8 min read',
    content: `
## The Time Cost of Protocol Building

For functional medicine educators, researching general nutrition topics for client education is one of the most time-consuming parts of the workflow. Gathering background reading, checking what the published literature says, and formatting it for review can take 30 to 60 minutes. Individualized supplement recommendations are a separate activity. Those require a licensed clinician who knows the client, has their full medication list, and is responsible for their care. If you are not that clinician, this workflow produces reading material, not a protocol.

An AI-assisted research tool does not supply clinical judgment, and it does not confer it on the person running the workflow. It accelerates reading and formatting. If the output is going to inform what a specific client actually takes, a licensed clinician who knows that client has to make that call.

This post covers the n8n workflow that automates the supplement protocol building process, with specific attention to the compliance framing that keeps it in educator territory.

## The Workflow Architecture

The supplement protocol builder is Workflow 5 in the n8n roadmap. It runs inside the same n8n instance as the intake router, in a separate workflow tab.

The trigger is a form submission from the educator's dashboard (not from the client-facing app). The educator fills out a protocol request form with:

- Client reference ID (not name, to keep the n8n layer non-PHI)
- Health focus areas (dropdown: cardiovascular, metabolic, gut health, hormonal, immune, cognitive)
- Known medication categories (dropdown: statins, antihypertensives, anticoagulants, none, other)
- Dietary restrictions (dropdown: vegan, vegetarian, gluten-free, dairy-free, none)
- Protocol goals (free text, 200 character limit)

The form sends a webhook to n8n. n8n sends the data to the OpenAI API with a carefully designed system prompt. The response is formatted and sent to the educator via Gmail.

## The System Prompt Design

The system prompt for the protocol builder is the compliance-critical element. Here is the structure:

\`\`\`
You are a functional medicine nutrition researcher assisting a PharmD educator in reviewing supplement research for educational purposes.

Based on the health focus areas, medication categories, and dietary restrictions provided, generate an educational research summary covering:

1. General nutrition topics associated with the named area of interest, described in terms of normal body structure and function rather than in terms of a disease or condition. Do not present any nutrient as addressing, improving, or managing a named disease state
2. For each topic, state what the NIH Office of Dietary Supplements or NCCIH says, name that source, and link to it. Where those sources describe the evidence as limited, mixed, or insufficient, say so in those words. Do not state a consensus you cannot point to
3. Common food sources for each nutrient
4. General considerations when these nutrients are used alongside the specified medication categories (educational, not clinical)
5. Suggested questions the educator might explore with the client's healthcare provider

Format the output as a structured educational summary, not a prescription or treatment plan.

Important constraints:
- Do not recommend specific doses
- Do not diagnose conditions
- Where a nutrient and medication interaction is documented by an authoritative source, name it plainly and cite the source, so it can be verified
- Do not present any interaction statement as a clinical decision. Route every one of them to the client's prescriber or pharmacist for review
- Frame all content as educational research summary
- Include this disclaimer at the end: "This summary is for educational reference only. It does not constitute medical advice, diagnosis, or a treatment plan. These statements have not been evaluated by the Food and Drug Administration. No supplement mentioned here is intended to diagnose, treat, cure, or prevent any disease. Individualized recommendations require a licensed clinician who knows you, has your full medication list, and is responsible for your care. Review every item here with that clinician and with your prescriber or pharmacist before changing anything you take."
\`\`\`

## The Medication Interaction Layer

The medication interaction section is the part that needs the most scrutiny, not the least. A language model will produce interaction statements that read as authoritative and are simply wrong. Every interaction the model surfaces has to be checked against a validated reference such as the NIH Office of Dietary Supplements fact sheets or a licensed interaction database before anyone acts on it. A PharmD's pharmacology training is what makes that verification possible. Without a pharmacist or prescriber verifying the output, this section is a liability rather than a feature. The system prompt is designed to surface educational information about nutrient-drug interactions that a non-pharmacist educator would not know to look for.

The interaction categories covered:
- Statins and CoQ10, where NCCIH states the overall evidence does not support CoQ10 for statin-associated muscle pain. Include this as a commonly asked question with the evidence stated honestly, not as a recommendation
- Warfarin and vitamin K intake consistency, and warfarin and ginkgo, which NCCIH states may increase bleeding risk. For omega-3s, ODS notes that most research shows 3 to 6 g/day does not significantly affect anticoagulant status, but that patients should have their INR monitored periodically. Any of these goes to the prescribing clinician, not into a summary
- Potassium with ACE inhibitors, ARBs, or potassium-sparing diuretics. ODS documents that these reduce urinary potassium excretion and can cause hyperkalemia. This is a hard stop, not a consideration. Anyone on these drugs needs their prescriber to approve any potassium intake change
- Loop and thiazide diuretics and magnesium status, where ODS documents urinary magnesium loss with chronic treatment. Note that ODS lists no magnesium interaction with antihypertensives as a class
- CoQ10 and blood pressure, where NCCIH states CoQ10 probably does not have a meaningful effect
- Levothyroxine and calcium carbonate, where the FDA-approved label advises avoiding levothyroxine within 4 hours of the supplement, and levothyroxine and iron, which is a documented absorption interaction. ODS documents no selenium interaction with thyroid medication, so do not include one
- Metformin and B12 depletion

Calling something educational does not make it safe. Some of these are genuine hazards, and the potassium one in particular can be dangerous. The honest framing is this: the workflow surfaces topics that need a licensed clinician's attention, and it hands them to that clinician. It does not resolve them, and neither does an educator.

One more limit worth stating plainly. The intake form captures medication categories, not medications and doses. Category-level input cannot detect a real interaction. "Anticoagulants" does not distinguish warfarin, which is vitamin K sensitive, from a DOAC, which is not. "Antihypertensives" does not distinguish an ACE inhibitor, where potassium is a hyperkalemia risk, from a thiazide, where magnesium loss is the issue. Keeping the form free of PHI is the right call, and the cost of that call is that this tool cannot perform an interaction check at all. That check happens with the client's pharmacist or prescriber, who has the actual list. The output always includes the recommendation to review with the client's healthcare provider.

## Why There Is No Dispensary Link in This Workflow

An obvious next step would be to append a link to an affiliate supplement dispensary, and plenty of build guides do exactly that. This one does not, on purpose.

The output of this workflow is generated from a client's health focus areas and medication categories. Attaching a commission-earning product link to a document built from someone's health inputs puts a financial interest inside what is supposed to be educational material, and an FTC disclosure does not remove that interest, it only discloses it. Keep the two apart. General product education can live somewhere a client's medication list never went.

## The Google Sheets Logging

Every protocol request is logged to the Protocol Requests tab in the master Google Sheet. The log includes:

- Client reference ID
- Health focus areas
- Medication categories
- Dietary restrictions
- Protocol goals
- Timestamp

The log does not include the full protocol summary (that goes to Gmail). It is an operational record for tracking which clients have received protocol summaries and when.

## The Compliance Boundary

The supplement protocol builder operates entirely in Lane 1 (non-PHI). The client reference ID is a number, not a name. The health focus areas and medication categories are general categories, not specific diagnoses or medications.

The output is an educational research summary sent to the educator, not to the client. The educator reviews it, applies their clinical judgment, and decides what to share with the client and how.

This is the correct architecture. The AI does the research acceleration. The PharmD does the clinical judgment. The client receives the educator's curated guidance, not raw AI output.

## The Takeaway

The supplement protocol builder is one of the highest-value workflows in the n8n roadmap. In my own use it has cut the time I spend gathering background reading, though I have not measured that formally and your results will differ. It also raises interaction topics worth checking, and it has raised ones that turned out to be wrong. Treat the output as a list of things to verify, never as a list of things that are true.

The compliance architecture is straightforward: non-PHI inputs, educational output framing, educator review before client delivery, and clear affiliate disclosures. A pharmacology background is what lets me catch the interaction claims this tool gets wrong. If you do not have that background, the missing piece is not the workflow, it is the verification. Build the tool if it helps your reading, and route everything that touches a real client's medications to a licensed clinician who can check it.

## Related reading

- Read [building an AI meal analysis feature that stays inside educator scope](/blog/ai-meal-analysis-healthcare-compliance).
- Read [the n8n intake router pattern for a health practice](/blog/n8n-intake-routing-health-practice).
- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Ready to work together? [a purpose-built protocol tool for your educator workflow](/services).
`,
  },
  {
    slug: 'apple-app-store-health-app-compliance',
    title: 'Getting a Health App Approved on the Apple App Store: What You Need to Know',
    excerpt: 'Apple\'s App Store guidelines for health apps are specific and strictly enforced. Here is what guidelines 1.4.1 and 5.1.3 actually require and how to build for compliance from the start.',
    category: 'Compliance',
    date: 'May 18, 2026',
    readTime: '7 min read',
    content: `
## Why Apple App Store Compliance Is Different

The Apple App Store has some of the most specific and strictly enforced guidelines for health applications of any distribution platform. Apps that fail to meet these guidelines are rejected during review, and the review process can take days or weeks. Understanding the requirements before you build saves significant time and rework.

The two guidelines that matter most for health education apps are 1.4.1 (Medical) and 5.1.3 (Health and Health Research).

## Guideline 1.4.1: Medical Apps

Guideline 1.4.1 states that apps that could provide inaccurate data or information, or that could be used to make medical decisions, may be reviewed with extra scrutiny. Apps that are intended to provide medical diagnoses or treatment recommendations may require documentation from a licensed medical professional.

The key phrase is "intended to provide medical diagnoses or treatment recommendations." An app that is clearly educational in nature, with appropriate disclaimers, is not intended to provide medical diagnoses. The intent is established by the app's name, description, UI language, and the disclaimers present in the app.

Practical implications:
- The app name and description must clearly indicate educational intent
- The UI must not use diagnostic language
- Disclaimers must be present and prominent
- Any health metrics displayed must be framed as educational reference points

## Guideline 5.1.3: Health and Health Research

Guideline 5.1.3 covers apps that collect health data. The key requirements:

Apps must not use or disclose health data without prior user consent. This means an explicit consent screen before any health data collection begins.

Apps must not use health data for advertising or data mining. This means your analytics and advertising integrations must not have access to health data.

Apps that collect health data for research must comply with applicable laws and ethical standards. This is most relevant for apps that share data with researchers.

Apps must provide a clear privacy policy that explains what health data is collected, how it is used, and how it is protected.

## The PWA-First Strategy

For health education apps that are in early development, the Progressive Web App (PWA) approach is strategically sound for two reasons.

First, PWAs bypass the App Store review process entirely. A PWA is accessed through the browser, not the App Store. This allows you to launch, iterate, and gather user feedback without waiting for App Store approval.

Second, PWAs can be converted to native apps using tools like Capacitor once the app is stable and you are ready for App Store submission. The PWA serves as a working prototype that demonstrates the app's functionality and compliance posture to Apple reviewers.

The Hunters Holistic Health platform launched as a PWA. The App Store submission is a Phase 2 milestone, after the PWA has been tested with real users and the compliance posture has been validated.

## The Consent Architecture

For App Store compliance, the consent architecture must be explicit. Here is the pattern used in Hunters Holistic Health:

On first launch, before any health data collection, the app displays a consent screen that explains:
- What data is collected (blood pressure readings, daily logs, meal descriptions)
- How it is used (educational tracking and progress visualization)
- Who can see it (the user and their educator)
- How to delete it (account deletion removes all data within 30 days)
- That the data is not used for advertising or shared with third parties

The user must actively consent (tap "I Agree") before proceeding. The consent is logged with a timestamp in Supabase.

This consent architecture satisfies both Guideline 5.1.3 and GDPR/CPRA requirements for data collection consent.

## The Disclaimer Architecture

For Guideline 1.4.1 compliance, disclaimers must be present in multiple places:

- The App Store listing description
- The app's onboarding flow (before first use)
- The settings page
- Any screen that displays health metrics
- The Terms of Service

The disclaimer language: "This app is for educational purposes only. It does not provide medical advice, diagnosis, or treatment. The information provided is not a substitute for professional medical advice. Always consult your healthcare provider before making health decisions."

## The HealthKit Decision

Apple HealthKit integration is a significant compliance consideration. Apps that integrate with HealthKit are subject to additional review scrutiny and must comply with specific HealthKit usage requirements.

For a Phase 1 launch, HealthKit integration is not recommended. The added review complexity and the requirement to handle HealthKit data according to Apple's strict guidelines creates unnecessary risk during the initial launch phase.

HealthKit integration is a Phase 2 feature, after the app has been approved and is stable. At that point, the integration can be added incrementally with a focused review of the HealthKit-specific requirements.

## The Takeaway

Apple App Store compliance for health apps requires attention to four areas: educational intent in the app name and description, no diagnostic language in the UI, explicit consent before health data collection, and prominent disclaimers throughout the app.

The PWA-first strategy allows you to launch and iterate without App Store review constraints. When you are ready for App Store submission, the compliance architecture built into the PWA translates directly to the native app.

## Related reading

- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Read [how to set up Google Workspace as your HIPAA clinical lane](/blog/google-workspace-hipaa-clinical-lane-setup).
- Read [how a full HIPAA-conscious health app got built with Claude Code](/blog/build-health-app-without-coding-claude).
- Ready to work together? [a build engagement for a HIPAA-conscious health app](/services).
`,
  },
  {
    slug: 'vibe-coding-tutorial-beginners-2026',
    title: 'Vibe Coding for Beginners: How to Build a Real App Without Writing Code',
    excerpt: 'Vibe coding exploded in 2025 and is now the standard way non-engineers build software. Here is the complete 2026 beginner tutorial on how to go from idea to live app using plain English.',
    category: 'Vibe Coding',
    date: 'Jun 12, 2026',
    readTime: '9 min read',
    content: `
## What Vibe Coding Is (And What It Isn't)

Vibe coding is the process of building software by describing what you want in plain English, while an AI writes the actual code. You act as the product manager and designer; the AI acts as the engineering team.

This is not "no-code." No-code platforms force you to drag and drop elements within a proprietary system. Vibe coding generates actual, portable code (React, Python, SQL) that you own and can host anywhere.

## The 2026 Vibe Coding Stack

To start vibe coding today, you need two things: an AI coding assistant and a place to host your app.

**1. The AI Coding Assistant**
Claude Code (powered by Anthropic's Fable 5 or Opus models) and Cursor are the two industry standards in 2026. Claude Code operates directly in your terminal or via the Cowork interface, while Cursor is a fork of VS Code with AI built in. For absolute beginners, Claude Code's agentic workflow is often easier to manage.

**2. The Hosting Platform**
Vercel or Netlify. These platforms take the code your AI generates and put it live on the internet for free.

## The Step-by-Step Beginner Tutorial

### Step 1: The CLAUDE.md File (Your Secret Weapon)
Before you ask the AI to build anything, create a plain text file called \`CLAUDE.md\` in an empty folder. Write down exactly what you want to build, who it is for, the colors you want to use, and any strict rules (e.g., "Do not use Tailwind CSS"). This file acts as the AI's permanent memory.

### Step 2: The Data Model First
Do not start by asking the AI to "build a beautiful landing page." Start with the data. Tell the AI: *"I want to build a habit tracking app. What should the database structure look like?"* Let it generate the SQL or data models first.

### Step 3: Scaffold the Project
Tell the AI: *"Create a new Vite + React + TypeScript project in this folder and set up the basic routing for a login page, a dashboard, and a settings page."*

### Step 4: Build One Feature at a Time
This is where most beginners fail. They ask for the whole app at once. Instead, ask: *"Build just the login screen using the colors from my CLAUDE.md file."* Once that works, say: *"Now build the dashboard header."*

### Step 5: The "Fix It" Loop
When something breaks (and it will), do not try to fix the code yourself. Copy the error message from your screen and paste it to the AI: *"I got this error when clicking the submit button. Fix it."* The AI will read the error, find the bug, and rewrite the code.

## The Reality of Vibe Coding

Vibe coding is not magic. It requires patience, clear communication, and the ability to break big problems into small steps. But it entirely removes syntax errors and missing semicolons from the equation, allowing anyone with a logical mind to build real software.


## Related reading

- Read [Claude Code for absolute beginners](/blog/claude-code-absolute-beginners-guide).
- Read [the head-to-head on Cursor, Bolt, Replit, and Claude Code](/blog/best-vibe-coding-tools-2026-cursor-bolt-claude).
- Read [how a full HIPAA-conscious health app got built with Claude Code](/blog/build-health-app-without-coding-claude).
- Ready to work together? [the Claude Certified Architect: Foundations exam prep pack](/exam-prep).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'vibe-coding-healthcare-patient-tools',
    title: 'Vibe Coding for Healthcare Professionals: Build Your Own Patient Education Tools',
    excerpt: 'Stop paying for generic SaaS platforms that do not fit your practice. Here is how healthcare professionals are using vibe coding to build custom, HIPAA-conscious patient tools.',
    category: 'Vibe Coding',
    date: 'Jun 11, 2026',
    readTime: '8 min read',
    content: `
## The SaaS Trap in Healthcare

If you run a health or wellness practice, you likely pay for three to five different software subscriptions: one for booking, one for forms, one for course delivery, and one for client communication. None of them talk to each other perfectly, and none of them fit your exact clinical methodology.

Until recently, the only alternative was paying a development agency $30,000 to build a custom app. In 2026, vibe coding changes that math entirely.

## What Healthcare Professionals Can Build With Vibe Coding

Vibe coding (using AI to write code via plain English instructions) allows non-technical practitioners to build custom tools in a weekend. Here are three things you can build right now:

**1. Custom Intake Routers**
Instead of a generic Google Form, you can build a dynamic intake app that routes clinical inquiries to a secure Google Workspace lane, while routing general support questions to a standard email inbox.

**2. Patient Progress Dashboards**
If you teach a specific protocol (like a 30-day elimination diet), you can build a web app where patients log their daily adherence. You can have the AI generate Chart.js graphs so patients can visualize their own progress.

**3. AI-Assisted Protocol Generators**
You can build an internal tool where you input a patient's lab markers and symptoms, and the app generates a draft supplement protocol based *only* on your specific clinical rules and preferred brands.

## The Compliance Imperative

The biggest risk of vibe coding in healthcare is accidentally building a HIPAA violation. AI coding assistants do not know healthcare law. If you tell an AI to "build a database to store patient lab results," it will gladly build an unsecured, non-compliant database.

**The Golden Rule:** Use vibe coding to build the *educational* and *administrative* layers of your practice (Lane 1). Keep actual medical records, lab results, and diagnoses entirely out of the code, managing them manually in a covered environment like Google Workspace (Lane 2).

## Getting Started

You do not need to learn Python or React. You need to learn how to write a \`CLAUDE.md\` file that clearly defines your app's purpose, the two-layer architecture rules, and your design preferences. From there, you act as the clinical director, and the AI acts as your engineering team.


## Related reading

- Read [a practical vibe-coding starting point for healthcare professionals](/blog/vibe-coding-healthcare-professionals).
- Read [how a full HIPAA-conscious health app got built with Claude Code](/blog/build-health-app-without-coding-claude).
- Read [the architecture decisions behind the blood pressure tracker](/blog/blood-pressure-tracking-app-architecture).
- Ready to work together? [a patient tool built for your practice from scratch](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'best-vibe-coding-tools-2026-cursor-bolt-claude',
    title: 'The Best Vibe Coding Tools in 2026: Cursor, Bolt, Replit, and Claude Code Compared',
    excerpt: 'The vibe coding landscape has matured. Here is a definitive comparison of Cursor, Bolt.new, Replit, and Claude Code, and which one you should actually use based on your technical skill level.',
    category: 'Vibe Coding',
    date: 'Jun 10, 2026',
    readTime: '10 min read',
    content: `
## The 2026 Vibe Coding Landscape

The tools we use to build software with AI have fractured into distinct categories. Choosing the wrong tool for your skill level is the number one reason people give up on vibe coding.

Here is the definitive breakdown of the top four tools in 2026.

## 1. Claude Code (Best for Agentic Workflows)

Anthropic's Claude Code is a terminal-based and IDE-integrated agent. When powered by Fable 5, it is currently the most capable tool for complex, multi-file refactoring.

**Pros:**
- Massive 1M+ token context window. It can hold your entire codebase in its "memory."
- True agentic behavior. It plans, writes, tests, and fixes its own errors without you having to intervene at every step.
- Follows \`CLAUDE.md\` instructions more strictly than any other model.

**Cons:**
- Requires basic terminal knowledge to start.
- Slower on single-line edits than Cursor.

## 2. Cursor (Best for Fast Iteration)

Cursor is a fork of VS Code. It looks and feels exactly like a traditional code editor, but with AI deeply integrated into every keystroke.

**Pros:**
- "Cursor Tab" is magic. It predicts your next edit across multiple files instantly.
- Composer mode allows for excellent multi-file generation.
- Familiar interface for anyone who has ever used VS Code.

**Cons:**
- It is still fundamentally a code editor. You will see a lot of code, which can overwhelm absolute beginners.

## 3. Bolt.new (Best for Absolute Beginners and Prototypes)

Bolt (by StackBlitz) runs entirely in your browser. You type a prompt, and it spins up a full development environment, writes the code, and hosts the live preview in seconds.

**Pros:**
- Zero setup. No terminal, no local installations.
- Instant live previews.
- Perfect for building single-page apps or testing UI concepts.

**Cons:**
- Struggles with large, complex architectures.
- Exporting the code to a production environment can be clunky.

## 4. Replit Agent (Best for Cloud-Native Builders)

Replit has evolved from an online IDE into a full AI agent that writes, hosts, and deploys code in the cloud.

**Pros:**
- Integrated database and deployment. You don't have to wire up Supabase or Vercel separately.
- Excellent for Python scripts and backend automations.

**Cons:**
- You are locked into the Replit ecosystem for hosting.

## The Verdict

If you have **zero coding experience**, start with **Bolt.new**.
If you are building a **production app** and want an AI to do the heavy lifting, use **Claude Code**.
If you are **already a developer** looking to code 10x faster, use **Cursor**.


## Related reading

- Read [Claude Code vs Cursor in 2026](/blog/claude-code-vs-cursor-2026).
- Read [Claude Code for absolute beginners](/blog/claude-code-absolute-beginners-guide).
- Read [the beginner vibe-coding tutorial: shipping a real app without writing code](/blog/vibe-coding-tutorial-beginners-2026).
- Ready to work together? [the 226-question CCAR-F exam prep for Claude Code](/exam-prep).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'claude-code-absolute-beginners-guide',
    title: 'Claude Code for Absolute Beginners: What It Is and How to Start Today',
    excerpt: 'Claude Code is Anthropic’s most powerful tool for building software, but its interface can be intimidating. Here is the absolute beginner’s guide to getting started.',
    category: 'Claude Code',
    date: 'Jun 9, 2026',
    readTime: '7 min read',
    content: `
## What is Claude Code?

If you have used ChatGPT or the standard Claude.ai interface, you are used to a chatbot. You ask a question, it gives you text.

Claude Code is different. It is an *agent*. It does not just give you text; it actively reads the files on your computer, writes new code, creates folders, and runs terminal commands. It is the difference between asking an architect for a blueprint (Claude.ai) and hiring a general contractor to build the house (Claude Code).

## Why It Intimidates Beginners

Claude Code runs in the command line (the terminal). For non-technical users, seeing a black screen with text is terrifying. It feels like you are hacking the mainframe.

You aren't. The terminal is just a text-based way to talk to your computer, and Claude Code makes it incredibly simple.

## How to Start (Step-by-Step)

**Step 1: Install Node.js**
Claude Code requires Node.js to run. Go to nodejs.org, download the installer, and click "Next" until it finishes.

**Step 2: Open Your Terminal**
On a Mac, open the app called "Terminal". On Windows, open "Command Prompt".

**Step 3: Install Claude Code**
Type this exact command and press Enter:
\`npm install -g @anthropic-ai/claude-code\`

**Step 4: Authenticate**
Type \`claude\` and press Enter. It will open a browser window asking you to log in to your Anthropic account.

**Step 5: Start Building**
Create an empty folder on your desktop. Drag that folder onto your terminal window (this tells the terminal to look at that folder). Type \`claude\` again.

Now, just type what you want: *"Create a new HTML file with a beautiful, dark-mode landing page for my wellness coaching business."*

Claude Code will read the folder, create the file, write the HTML and CSS, and tell you when it is done.

## The One Rule You Must Follow

Always create a \`CLAUDE.md\` file in your folder before you start. Write your instructions, colors, and rules in that file. Claude Code automatically reads it every time it starts, ensuring it never forgets your brand guidelines or compliance rules.


## Related reading

- Read [the complete CCAR-F exam study guide](/blog/claude-code-exam-prep-cca-f-guide).
- Read [Claude Code vs Cursor in 2026](/blog/claude-code-vs-cursor-2026).
- Read [the beginner vibe-coding tutorial: shipping a real app without writing code](/blog/vibe-coding-tutorial-beginners-2026).
- Ready to work together? [the CCAR-F exam prep pack once you are past the basics](/exam-prep).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'claude-code-vs-cursor-2026',
    title: 'Claude Code vs Cursor: Which AI Coding Tool Should You Use in 2026?',
    excerpt: 'The two heavyweights of AI coding have different philosophies. Cursor is an editor with AI; Claude Code is an AI that edits. Here is how to choose between them.',
    category: 'Claude Code',
    date: 'Jun 8, 2026',
    readTime: '8 min read',
    content: `
## The Philosophy Difference

To understand the difference between Cursor and Claude Code, you have to understand their underlying philosophies.

**Cursor** is an IDE (Integrated Development Environment). It is a fork of VS Code. Its philosophy is: *You are the developer. You are driving the car. We are the advanced cruise control that keeps you in the lane and predicts your next turn.*

**Claude Code** is an autonomous agent. Its philosophy is: *You are the product manager. You tell us the destination. We will drive the car, navigate the traffic, and tell you when we arrive.*

## Where Cursor Wins

1. **Micro-edits:** If you are looking at a file and need to change a button color or fix a specific typo, Cursor's inline chat (Cmd+K) and Tab autocomplete are unmatched.
2. **Visual context:** Because it is an editor, you are always looking at your code. For people who know how to read code, this visual feedback loop is crucial.
3. **Familiarity:** If you already use VS Code, switching to Cursor takes zero effort. All your extensions and themes work perfectly.

## Where Claude Code Wins

1. **Massive Refactors:** If you need to change the entire routing structure of a 50-file application, Claude Code handles it better. You give it the instruction, and it systematically works through the codebase, finding dependencies and updating them.
2. **Following Strict Rules:** Claude Code's adherence to the \`CLAUDE.md\` file is legendary. If you put a strict compliance rule in that file (e.g., "Never use Tailwind"), Claude Code will enforce it across the entire project.
3. **Agentic Autonomy:** Claude Code will run a build command, see an error, read the error, rewrite the code to fix it, and run the build command again, all without you pressing a button.

## The Hybrid Approach (The Pro Move)

The best developers in 2026 do not choose one. They use both.

They use **Claude Code** (often via the Cowork interface) for the heavy lifting: scaffolding the initial project, writing the complex database schemas, and performing massive multi-file refactors.

Then, they open that folder in **Cursor** to do the final polish, tweak the CSS, and handle the visual layout where seeing the code line-by-line is helpful.

If you are a non-technical builder, lean heavily on Claude Code. It requires you to look at the code much less.


## Related reading

- Read [the head-to-head on Cursor, Bolt, Replit, and Claude Code](/blog/best-vibe-coding-tools-2026-cursor-bolt-claude).
- Read [the complete CCAR-F exam study guide](/blog/claude-code-exam-prep-cca-f-guide).
- Read [Claude Code for absolute beginners](/blog/claude-code-absolute-beginners-guide).
- Ready to work together? [the Claude Code certification prep pack](/exam-prep).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'build-health-app-without-coding-claude',
    title: 'How I Used Claude Code to Build a HIPAA-Conscious Health App (Without a Developer)',
    excerpt: 'I am a PharmD, not a software engineer. But using Claude Code, I built Hunters Holistic Health: a secure, two-layer educational health platform. Here is the exact process.',
    category: 'Claude Code',
    date: 'Jun 7, 2026',
    readTime: '9 min read',
    content: `
## The Developer Bottleneck

For years, healthcare professionals with great ideas for patient tools have faced a massive bottleneck: development costs. Building a secure, compliant web application costs tens of thousands of dollars. 

I bypassed that bottleneck entirely to build the Hunters Holistic Health (HHH) platform. I am a PharmD, not a software engineer. I used Claude Code.

## The Architecture of HHH

HHH is not a simple WordPress site. It is a React-based Progressive Web App (PWA) with a Supabase backend, a dynamic patient dashboard, a blood pressure trend tracker, an AI Meal Guard, and a complex n8n intake routing system.

More importantly, it is built on a strict two-layer architecture to manage HIPAA compliance:
- **Lane 1 (The App):** Handles non-PHI educational tracking and operational intake.
- **Lane 2 (Google Workspace):** A separate, manual lane for actual clinical records and PHI.

## The Claude Code Process

Here is exactly how I built it using Claude Code:

**1. The Master Prompt (CLAUDE.md)**
Before writing any code, I wrote a comprehensive \`CLAUDE.md\` file. I explicitly defined the two-layer architecture and added a "HIPAA Hard Stop" rule: *If any feature may create, transmit, or store individually identifiable health information, STOP and ask for confirmation.* This ensured the AI didn't accidentally build non-compliant database tables.

**2. The Data Layer First**
I instructed Claude Code to build the Supabase SQL schema first. We defined tables for daily logs and waitlist signups, strictly ensuring no fields asked for diagnoses or lab values.

**3. The Vibe Coding Loop**
I built the app one page at a time. I would type: *"Build the Blood Pressure Tracker page. Use Chart.js for the trend line. Remember the design tokens in tokens.css."* Claude Code would write the file, update the routing, and fix any TypeScript errors automatically.

**4. The n8n Integration**
Instead of writing complex backend routing, I had Claude Code build a webhook connection to n8n. Now, when someone fills out an intake form on the app, Claude's code sends it to my self-hosted n8n instance, which routes it to the correct Google Sheet without exposing data to third-party SaaS tools.

## The Lesson for Healthcare Professionals

You do not need to learn React. You need to learn system architecture and compliance constraints. If you can define *what* needs to be built and *what the rules are*, Claude Code can handle the *how*.

The HHH platform is live proof that domain experts can now build their own tools.


## Related reading

- Read [a practical vibe-coding starting point for healthcare professionals](/blog/vibe-coding-healthcare-professionals).
- Read [Claude Code for absolute beginners](/blog/claude-code-absolute-beginners-guide).
- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Ready to work together? [a built-for-you HIPAA-conscious app engagement](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'how-to-use-gemini-for-business-2026',
    title: 'How to Use Google Gemini for Your Business in 2026: A Practical Guide',
    excerpt: 'Gemini is deeply integrated into Google Workspace, but most businesses are only using 10% of its capability. Here is how to actually use Gemini to automate business operations.',
    category: 'Gemini',
    date: 'Jun 6, 2026',
    readTime: '8 min read',
    content: `
## The Google Workspace Advantage

If your business runs on Google Workspace (Gmail, Docs, Drive, Sheets), Google Gemini is your most powerful AI option. While ChatGPT and Claude require you to copy and paste data back and forth, Gemini lives inside the documents where your work already happens.

However, most business owners use Gemini as a glorified search engine. Here is how to use it as an operational engine in 2026.

## 1. The "Help Me Write" Command in Gmail

This is the most obvious but underutilized feature. Do not just ask Gemini to "write an email." Give it context. 

**Bad Prompt:** "Write an email to a client who hasn't paid."
**Good Prompt:** "Draft a firm but polite follow-up email to a client regarding invoice #104. Reference our late fee policy. Keep it under 4 sentences."

## 2. Synthesizing Meeting Notes in Google Docs

If you record meetings via Google Meet, Gemini can automatically generate transcripts. But the real power is in Docs. 

Open a new Doc, type \`@\`, and select Gemini. Prompt it: *"Summarize the transcript from yesterday's Q3 Planning meeting. Extract all action items and assign them to the names mentioned."*

## 3. Data Extraction in Google Sheets

Gemini in Sheets is transformative for small businesses. If you have a massive sheet of customer feedback or survey responses, you no longer need to read them all.

Highlight the column of text responses, open the Gemini side panel, and prompt: *"Categorize these 500 feedback responses into three columns: Feature Request, Bug Report, or Pricing Complaint. Then summarize the top 3 most common Bug Reports."*

## 4. The Drive-Wide Search

Gemini can search across your entire Google Drive simultaneously. Instead of opening five different PDFs to find a specific policy, open Gemini and ask: *"Based on the Employee Handbook PDF and the Q1 Benefits Doc in my Drive, what is our exact policy on rolling over PTO into the next calendar year?"*

Gemini will read the documents, synthesize the answer, and provide citations linking directly to the source files.

## The Security Caveat

If you are a healthcare professional or handle sensitive data, ensure you have the proper Google Workspace Enterprise tier and a signed BAA before allowing Gemini to scan drives containing PHI. Consumer-tier Gemini may use your data for training; Enterprise-tier Gemini does not.

## Related reading

- Read [what Gemini can and cannot do for a healthcare professional](/blog/gemini-healthcare-professionals-limits).
- Read [the head-to-head between ChatGPT, Gemini, and Perplexity](/blog/chatgpt-vs-gemini-vs-perplexity-2026).
- Read [NotebookLM for business vs. for studying: which mode fits your work](/blog/notebooklm-business-vs-studying).
- Ready to work together? [a 1-on-1 session to set up your AI stack for real work](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'notebooklm-business-vs-studying',
    title: 'NotebookLM for Business vs. Studying: Which Way Should You Use It?',
    excerpt: 'Google’s NotebookLM was designed for students, but it has become a secret weapon for businesses. Here is the difference in how to use it for studying versus operational workflows.',
    category: 'Gemini',
    date: 'Jun 5, 2026',
    readTime: '7 min read',
    content: `
## What is NotebookLM?

NotebookLM is an AI research assistant created by Google. Unlike ChatGPT, which relies on its vast training data to answer questions, NotebookLM *only* knows what you upload to it. You upload up to 50 documents (PDFs, text files, YouTube links), and it becomes an absolute expert on those specific sources.

It was originally marketed to students, but in 2026, businesses are using it just as heavily. The workflows, however, are entirely different.

## NotebookLM for Studying (The Academic Workflow)

For students, researchers, and professionals taking certification exams (like the CCAR-F), NotebookLM is a study engine.

**1. The Source Upload:** Upload all your syllabus PDFs, lecture transcripts, and slide decks into one Notebook.
**2. The Audio Overview:** This is NotebookLM's killer feature. It generates a highly realistic, 10-minute podcast of two AI hosts discussing your uploaded material. Listening to this on a commute is the best way to passively absorb dense material.
**3. The Quiz Generator:** Instead of just asking it to summarize, prompt NotebookLM: *"Act as a tough professor. Ask me 5 multiple-choice questions based on chapter 3 of the uploaded textbook. Do not give me the answers until I respond."*

## NotebookLM for Business (The Operational Workflow)

Businesses do not need study guides; they need instant access to trapped knowledge.

**1. The HR/Onboarding Oracle:** Upload your employee handbook, benefits guides, and SOPs into a Notebook. When a new hire asks, "How do I submit an expense report?", you don't have to find the PDF. You ask NotebookLM, and it gives you the exact process with a citation to page 14 of the SOP document.
**2. The Sales Call Analyzer:** Upload the transcripts of your 10 most successful sales calls and your 10 lost deals. Prompt it: *"Analyze these transcripts. What specific objections were raised in the lost deals that were successfully overcome in the won deals?"*
**3. The Content Repurposer:** Upload your last 5 blog posts or newsletters. Prompt it: *"Based ONLY on the tone and facts in these documents, write a 5-post LinkedIn sequence highlighting our core methodology."*

## The Limitation You Must Know

NotebookLM is brilliant, but it is siloed. It does not integrate via API to other tools like n8n or Zapier (yet). It is a closed workspace. Use it for synthesis and research, but do not expect it to automate your outbound emails.


## Related reading

- Read [a practical guide to using Gemini in a business workflow](/blog/how-to-use-gemini-for-business-2026).
- Read [why healthcare professionals are switching to Perplexity for research](/blog/perplexity-ai-research-healthcare).
- Read [the ranked list of AI tools worth paying for as a small business owner](/blog/best-ai-tools-small-business-owners-2026).
- Ready to work together? [a working session to build your own research workflow](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'gemini-healthcare-professionals-limits',
    title: 'Gemini for Healthcare Professionals: What It Can and Cannot Do',
    excerpt: 'Google Workspace is the backbone of many small health practices. But can you safely use Gemini AI within it? The answer depends entirely on your BAA and your use case.',
    category: 'Gemini',
    date: 'Jun 4, 2026',
    readTime: '8 min read',
    content: `
## The Appeal of Gemini in Healthcare

For small healthcare practices, functional medicine educators, and wellness coaches, Google Workspace is often the operational hub. You use Gmail for communication and Google Drive for secure file storage.

When Google integrated Gemini directly into Workspace, the appeal was obvious: an AI assistant that can read your emails and summarize your patient notes. But in healthcare, convenience must always bow to compliance.

## What Gemini CAN Do (Safely)

If you are using Gemini on non-PHI data (Lane 1 operations), it is incredibly powerful.

**1. Administrative Drafting:** You can use Gemini to draft standard operating procedures, employee onboarding documents, and marketing copy.
**2. Educational Content:** You can prompt Gemini to help structure a 30-day wellness curriculum or outline a workshop presentation.
**3. Non-Clinical Email Triage:** You can use Gemini to summarize vendor emails, software subscription notices, and general business correspondence.

## What Gemini CANNOT Do (Without Strict Setup)

You cannot use Gemini to summarize patient notes, analyze lab results, or draft clinical emails *unless* you have met very specific criteria.

If you type a patient's name and their symptoms into a consumer-tier Gemini prompt, you have likely committed a HIPAA violation (if you are a covered entity) or breached standard data privacy expectations. Consumer-tier AI models may use your inputs as training data.

## The Google Workspace BAA Exception

There is a safe way to use Gemini for clinical data, but it requires the Enterprise tier of Google Workspace.

1. You must have a paid Google Workspace Enterprise account.
2. You must sign the Business Associate Agreement (BAA) in the Google Admin Console.
3. You must ensure that the specific Gemini features you are using are covered under that BAA (Google frequently updates which specific AI sub-features are covered).

When properly configured under a BAA, Google explicitly states that Gemini Enterprise does not use your organization's data to train its public models. In this locked-down environment, you *can* use Gemini to synthesize clinical notes stored in your secure Drive.

## The Rule of Thumb

If you are a solo practitioner and do not want the administrative burden of managing Enterprise-tier permissions, stick to the two-layer architecture. Use Gemini for your marketing, your admin, and your education. Keep it entirely away from your clinical records.


## Related reading

- Read [what ChatGPT is actually safe to use for in clinical work](/blog/chatgpt-healthcare-professionals-safe-use).
- Read [why healthcare professionals are switching to Perplexity for research](/blog/perplexity-ai-research-healthcare).
- Read [the head-to-head between ChatGPT, Gemini, and Perplexity](/blog/chatgpt-vs-gemini-vs-perplexity-2026).
- Ready to work together? [a 1-on-1 to build a compliant AI stack for your practice](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'chatgpt-vs-gemini-vs-perplexity-2026',
    title: 'ChatGPT vs Gemini vs Perplexity in 2026: Which AI Tool Should You Actually Use?',
    excerpt: 'The AI landscape has settled into three distinct heavyweights. Stop paying for all three. Here is the definitive guide to which tool fits your specific workflow.',
    category: 'AI Tools',
    date: 'Jun 3, 2026',
    readTime: '9 min read',
    content: `
## The Big Three of 2026

If you are a professional trying to integrate AI into your daily workflow, you are likely overwhelmed by the options. ChatGPT, Google Gemini, and Perplexity AI dominate the market, but they are no longer interchangeable. They have evolved into highly specialized tools.

Here is how to choose.

## ChatGPT (Best for Creation and Reasoning)

ChatGPT (powered by OpenAI's latest models) remains the king of generative reasoning. 

**Use it when:**
- You need to write a blog post, draft a difficult email, or create a curriculum.
- You need a sounding board to reason through a complex business strategy.
- You are using the Advanced Voice Mode to practice a presentation or role-play a difficult conversation.

**Do not use it when:**
- You need highly accurate, up-to-the-second news or citations. While it can search the web, it is prone to hallucinating links.

## Perplexity AI (Best for Research and Truth)

Perplexity is not a chatbot; it is an answer engine. It searches the live internet, reads multiple sources, synthesizes the answer, and, crucially, provides footnote citations for every single claim it makes.

**Use it when:**
- You are researching a medical topic, a legal precedent, or a competitor.
- You need to verify facts and want to click through to the original source.
- You want to cut through SEO spam and get a direct answer.

**Do not use it when:**
- You want to write a creative essay or brainstorm abstract ideas. It is built for facts, not fiction.

## Google Gemini (Best for Workspace Integration)

Gemini's superpower is not its standalone chat interface; it is its integration into Google Docs, Sheets, Drive, and Gmail.

**Use it when:**
- Your entire business runs on Google Workspace.
- You need to summarize a 50-page PDF that is already saved in your Google Drive.
- You need to extract and categorize data from a massive Google Sheet.

**Do not use it when:**
- You are writing code (Claude Code and Cursor are vastly superior).

## The Verdict

If you are a **researcher, academic, or healthcare professional**, buy **Perplexity Pro**. The citations are non-negotiable for your work.
If you are a **creator, marketer, or strategist**, buy **ChatGPT Plus**.
If you are an **operations manager** living in spreadsheets, use **Gemini Advanced**.


## Related reading

- Read [what ChatGPT is actually safe to use for in clinical work](/blog/chatgpt-healthcare-professionals-safe-use).
- Read [what Gemini can and cannot do for a healthcare professional](/blog/gemini-healthcare-professionals-limits).
- Read [why healthcare professionals are switching to Perplexity for research](/blog/perplexity-ai-research-healthcare).
- Ready to work together? [a working session to pick the right tool for your workflow](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'perplexity-ai-research-healthcare',
    title: 'Perplexity AI for Research: Why Healthcare Professionals Are Switching',
    excerpt: 'ChatGPT hallucinates medical citations. Google Search is buried in SEO spam. Here is why Perplexity AI has become the default research tool for healthcare professionals in 2026.',
    category: 'AI Tools',
    date: 'Jun 2, 2026',
    readTime: '8 min read',
    content: `
## The Citation Problem

For the first two years of the generative AI boom, healthcare professionals faced a massive problem: AI models lied confidently. If you asked ChatGPT for clinical studies on a specific supplement protocol, it would invent studies, invent authors, and generate fake PubMed URLs.

This made traditional LLMs useless for serious clinical research or evidence-based writing. You always had to fall back to manual Google Scholar searches.

In 2026, Perplexity AI solved this problem.

## How Perplexity Actually Works

Perplexity is an "answer engine." When you ask it a question, it does not just predict the next word based on its training data. Instead, it:
1. Breaks your query down into multiple search terms.
2. Scans the live internet for the most authoritative sources.
3. Reads those sources in real-time.
4. Synthesizes an answer.
5. **Appends a footnote citation to every single sentence.**

If Perplexity says, "Vitamin D supplementation has been shown to reduce the risk of acute respiratory tract infections," there will be a little \`[1]\` next to the sentence. Clicking that \`[1]\` takes you directly to the NIH or PubMed study it pulled that fact from.

## The Pro Search Feature

For deep research, Perplexity's "Pro Search" is unmatched. When you trigger Pro Search, the AI will ask *you* clarifying questions before it searches.

If you ask, "What are the latest guidelines for continuous glucose monitoring?", Pro Search will pause and ask: "Are you looking for guidelines for Type 1 Diabetes, Type 2, or non-diabetic metabolic optimization?" It narrows the scope before it reads the literature.

## Academic Focus Mode

Perplexity includes a "Focus" feature that allows you to restrict its search universe. If you are writing a clinical protocol or a course for other practitioners, you can set the focus to "Academic." 

In this mode, Perplexity will ignore blogs, news sites, and consumer health portals (like WebMD). It will only pull answers and citations from peer-reviewed journals, academic papers, and official clinical guidelines.

## The Bottom Line

If you are writing patient education materials, building a course, or researching a complex case, you cannot afford hallucinated citations. Perplexity AI is the only tool that treats truth and attribution as its primary features.


## Related reading

- Read [what Gemini can and cannot do for a healthcare professional](/blog/gemini-healthcare-professionals-limits).
- Read [what ChatGPT is actually safe to use for in clinical work](/blog/chatgpt-healthcare-professionals-safe-use).
- Read [NotebookLM for business vs. for studying: which mode fits your work](/blog/notebooklm-business-vs-studying).
- Ready to work together? [a research-workflow session for your clinical or educator work](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'best-ai-tools-small-business-owners-2026',
    title: 'The Best AI Tools for Small Business Owners in 2026 (Ranked by Use Case)',
    excerpt: 'Stop buying random AI subscriptions. Here is the definitive, lean AI software stack for small business owners, categorized by exactly what problem they solve.',
    category: 'AI Tools',
    date: 'Jun 1, 2026',
    readTime: '9 min read',
    content: `
## The AI Subscription Fatigue

Small business owners are currently suffering from AI subscription fatigue. Every software vendor has slapped an "AI" label on their product and raised the price by $10 a month. 

You do not need 15 different AI tools. You need a lean stack of 3 to 4 tools that actually save you time or generate revenue. Here is the definitive 2026 stack, ranked by use case.

## 1. For Content and Strategy: ChatGPT Plus
**Cost:** $20/month
**Why:** It remains the best all-around thinker. Use it to draft newsletters, brainstorm marketing campaigns, write difficult client emails, and act as a sounding board for business strategy. 
**Pro Tip:** Use the "Custom Instructions" feature to feed it your brand voice and target audience so you don't have to explain your business every time you log in.

## 2. For Research and Truth: Perplexity Pro
**Cost:** $20/month
**Why:** When you need facts, not creative writing. Use it to research competitors, understand new tax regulations, or find highly specific industry statistics. Because it cites its sources, you can trust the data it provides.

## 3. For Operations and Spreadsheets: Google Gemini Advanced
**Cost:** Included in Google One AI Premium ($20/month)
**Why:** If you run your business on Google Workspace, this is mandatory. Use it to extract data from massive Google Sheets, summarize long PDFs in your Drive, and draft emails directly inside the Gmail compose window.

## 4. For Workflow Automation: n8n (Self-Hosted)
**Cost:** Free (if self-hosted) or $20/month (Cloud)
**Why:** Zapier is too expensive at scale. n8n is a visual automation builder that connects your apps together. Use it to automatically route lead forms to Google Sheets, send onboarding emails, and trigger Slack alerts when a high-value client books a call.

## 5. For Building Custom Apps: Claude Code
**Cost:** Pay-per-use (API)
**Why:** If you have outgrown off-the-shelf software and want to build a custom client portal, dashboard, or internal tool, you no longer need to hire a developer. Claude Code allows you to "vibe code" real applications using plain English.

## The Rule for Small Businesses

Do not buy an AI tool to "see what it can do." Identify a bottleneck in your business (e.g., "I spend 4 hours a week summarizing sales calls"), and buy the specific tool that solves that bottleneck.


## Related reading

- Read [a practical guide to using Gemini in a business workflow](/blog/how-to-use-gemini-for-business-2026).
- Read [NotebookLM for business vs. for studying: which mode fits your work](/blog/notebooklm-business-vs-studying).
- Read [the head-to-head between ChatGPT, Gemini, and Perplexity](/blog/chatgpt-vs-gemini-vs-perplexity-2026).
- Ready to work together? [a 1-on-1 session to set up your AI stack end to end](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'ai-workshops-schools-hospitals-guide',
    title: 'How to Bring AI Workshops Into Your School or Hospital: A Practical Guide',
    excerpt: 'Healthcare systems and educational institutions know they need AI literacy, but most generic training fails. Here is how to structure an AI workshop that actually changes organizational behavior.',
    category: 'Workshops',
    date: 'May 30, 2026',
    readTime: '8 min read',
    content: `
## The Generic Training Problem

Right now, schools and hospitals are panicking about AI. Their response is usually to hire a generic tech consultant to give a one-hour PowerPoint presentation on "The Future of ChatGPT." 

The staff leaves the room entertained, but they return to their desks with no idea how to safely apply AI to their specific daily workflows. Generic training fails because AI is not a generic tool; its value is highly context-dependent.

If you are an administrator looking to bring AI training to your organization, here is how to structure a workshop that actually works.

## 1. Separate the Lanes Immediately

In a healthcare or clinical education setting, the very first thing an AI workshop must teach is the Two-Layer Architecture. 

Staff must understand the difference between **Lane 1** (administrative, educational, non-PHI) and **Lane 2** (clinical, PHI, secure). If you do not establish these boundaries in the first 15 minutes, staff will either be too terrified of compliance to use the tools at all, or they will accidentally paste patient data into a public LLM.

## 2. Teach Prompt Engineering as Clinical Reasoning

Do not teach "prompt hacks." Teach structured reasoning. 

Healthcare professionals are already trained to use structured communication (like SBAR: Situation, Background, Assessment, Recommendation). Teach them to prompt AI the exact same way. Give the AI the Situation, provide the Background constraints, ask for an Assessment, and demand a Recommendation format. 

When you map AI skills onto existing clinical frameworks, adoption skyrockets.

## 3. Focus on "Trapped Knowledge"

The highest-ROI use case for organizations is not writing emails; it is unlocking trapped knowledge. 

A strong workshop should include a live demonstration of tools like NotebookLM or secure enterprise instances of Gemini. Show the staff how to upload a 200-page institutional policy manual and instantly query it for specific procedural answers. This demonstrates immediate, tangible value that saves hours of administrative searching.

## 4. Address the Hallucination Risk Head-On

Do not pretend AI is perfect. A credible workshop must dedicate significant time to the hallucination problem (AI confidently inventing facts). 

Teach staff how to use citation-based engines like Perplexity for research, rather than generative engines like ChatGPT. Teach them the "Trust but Verify" workflow: use AI for synthesis, but demand primary source citations for any clinical or policy claim.

## Hiring the Right Speaker

When hiring someone to lead this workshop, look for a practitioner, not just a technologist. A developer can explain how a neural network functions. A PharmD or clinical educator can explain how to integrate that neural network into a busy practice while navigating HIPAA constraints.


## Related reading

- Read [what schools are actually doing about AI literacy for healthcare students](/blog/teaching-ai-literacy-healthcare-students).
- Read [what ChatGPT is actually safe to use for in clinical work](/blog/chatgpt-healthcare-professionals-safe-use).
- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Ready to work together? [book a workshop for your school, hospital, or department](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'teaching-ai-literacy-healthcare-students',
    title: 'Teaching AI Literacy to Healthcare Students: What Schools Are Getting Wrong',
    excerpt: 'Nursing, pharmacy, and medical schools are treating AI as a cheating tool to be banned. They should be treating it as a clinical instrument that must be mastered safely.',
    category: 'Workshops',
    date: 'May 28, 2026',
    readTime: '9 min read',
    content: `
## The Prohibition Reflex

The default reaction of most higher education institutions to generative AI has been prohibition. Nursing schools, pharmacy programs, and medical colleges have deployed AI-detection software and updated honor codes to ban the use of tools like ChatGPT.

This is a profound failure of educational responsibility. 

The students currently sitting in these programs will graduate into a healthcare system where AI is deeply integrated into electronic health records, diagnostic imaging, and administrative workflows. Banning AI in the classroom is like banning calculators in a physics lab. It does not preserve academic integrity; it ensures professional incompetence.

## AI is a Clinical Instrument

We teach healthcare students how to use stethoscopes, how to read ECGs, and how to query clinical databases like UpToDate. We teach them the capabilities of these instruments, and more importantly, we teach them the limitations and failure modes.

AI must be taught the same way. It is a clinical and administrative instrument.

If a pharmacy student does not understand the difference between a generative model (which can hallucinate drug interactions) and a deterministic clinical database, they are dangerous. Schools must teach AI literacy, not AI avoidance.

## What a Healthcare AI Curriculum Must Include

A responsible AI literacy curriculum for healthcare students must cover four pillars:

**1. The Architecture of Hallucination**
Students must understand *why* LLMs hallucinate. They need to know that a generative AI is predicting the next most likely word, not querying a database of truth. This fundamental understanding is the only way to inoculate them against blindly trusting AI output.

**2. Privacy and the PHI Boundary**
Students must be taught the exact boundaries of HIPAA as it relates to cloud-based software. They need to know the difference between a consumer-tier AI (which may train on their inputs) and a BAA-covered enterprise environment.

**3. Synthesis vs. Diagnosis**
Students should be taught how to use AI safely for synthesis (e.g., "Summarize these three pages of dense pathophysiological text into bullet points") while strictly avoiding it for diagnosis (e.g., "Here are the patient's symptoms, what is the disease?").

**4. The Citation Requirement**
Students must be trained to use citation-backed AI tools (like Perplexity) and must be required to trace AI-generated claims back to primary, peer-reviewed literature.

## The Role of the Educator

The role of the clinical educator is no longer just to transfer knowledge. The internet already did that. The role of the educator is to teach discernment, critical thinking, and the safe application of powerful tools.

Schools that embrace this will produce the healthcare leaders of the next decade. Schools that rely on AI detectors will produce graduates who are obsolete on day one.


## Related reading

- Read [the playbook for bringing AI workshops into your school or hospital](/blog/ai-workshops-schools-hospitals-guide).
- Read [what ChatGPT is actually safe to use for in clinical work](/blog/chatgpt-healthcare-professionals-safe-use).
- Read [what Gemini can and cannot do for a healthcare professional](/blog/gemini-healthcare-professionals-limits).
- Ready to work together? [a scoped curriculum built for your program](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
  {
    slug: 'chatgpt-healthcare-professionals-safe-use',
    title: 'ChatGPT for Healthcare Professionals: What Is Actually Safe to Use It For',
    excerpt: 'Can you use ChatGPT in your practice? Yes, but only if you understand the strict boundary between administrative leverage and clinical risk. Here is the definitive guide to safe use.',
    category: 'Workshops',
    date: 'May 25, 2026',
    readTime: '8 min read',
    content: `
## The Confusion Around ChatGPT in Healthcare

Ask five healthcare professionals if you can use ChatGPT in practice, and you will get five different answers. Some say it is a massive HIPAA violation. Others use it every day to write patient emails.

The truth is nuanced. ChatGPT is neither inherently safe nor inherently dangerous; it is highly dependent on *what* you put into it and *which tier* of the software you are using.

## The Tier Distinction

First, you must understand the difference between the versions of ChatGPT.

**Consumer ChatGPT (Free or Plus):** This is the version 99% of people use. By default, OpenAI may use the data you type into these versions to train their future models. **You cannot put any Protected Health Information (PHI) into this tier.** Doing so is a direct violation of privacy standards and HIPAA.

**ChatGPT Enterprise / ChatGPT for Healthcare:** OpenAI offers enterprise tiers covered by a Business Associate Agreement (BAA). In these locked-down environments, data is not used for training, and the platform meets HIPAA security standards. 

If you are a solo practitioner using the $20/month Plus version, you are in the consumer tier. Act accordingly.

## Safe Use Cases (The Administrative Lane)

If you are using consumer-tier ChatGPT, you can still gain massive leverage by keeping it strictly in the administrative lane.

**1. Patient Education Materials**
Prompt: *"Explain the mechanism of action of SSRIs at an 8th-grade reading level. Use an analogy about a recycling plant."*
Why it's safe: There is no patient data here. You are using the AI to translate complex clinical concepts into accessible language.

**2. Standard Operating Procedures (SOPs)**
Prompt: *"Draft an SOP for how our front desk should handle a patient who arrives 15 minutes late to a 30-minute appointment."*
Why it's safe: Purely operational.

**3. Marketing and Outreach**
Prompt: *"Write a 3-part email sequence for our clinic's new weight management program. Focus on the holistic approach."*
Why it's safe: General business marketing.

## Unsafe Use Cases (The Clinical Lane)

Never use consumer-tier ChatGPT for the following:

**1. Clinical Summaries**
Unsafe: *"Summarize these notes for John Doe: [Patient Notes]."*
Why: You just uploaded PHI to a consumer AI model.

**2. Diagnostic Assistance**
Unsafe: *"A 45-year-old female presents with..."*
Why: Even if you anonymize the data (remove the name), providing a highly specific clinical history can sometimes be reverse-engineered, and relying on a general LLM for diagnostic reasoning carries immense liability risk.

**3. Specific Treatment Protocols**
Unsafe: *"Write a supplement protocol for my patient with Hashimoto's and these specific lab values: [Labs]."*
Why: You are mixing anonymized clinical data with generative AI, which can hallucinate interactions or contraindications.

## The Golden Rule

If the task involves a specific patient, it belongs in your secure, BAA-covered environment (like an enterprise EHR or Google Workspace). If the task involves general education, business operations, or marketing, ChatGPT is your best tool.


## Related reading

- Read [the two-layer architecture that keeps PHI out of your automation lane](/blog/hipaa-conscious-ai-workflows-healthcare).
- Read [what Gemini can and cannot do for a healthcare professional](/blog/gemini-healthcare-professionals-limits).
- Read [why healthcare professionals are switching to Perplexity for research](/blog/perplexity-ai-research-healthcare).
- Ready to work together? [a 1-on-1 session to set up a safe AI stack in your practice](/services).

> **Ready to learn more or bring this to your team?** Reach out at [hello@icanteachyouai.com](mailto:hello@icanteachyouai.com) or join the waitlist at [icanteachyouai.com/waitlist](https://icanteachyouai.com/waitlist).
    `,
  },
];
