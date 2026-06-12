import styles from './Legal.module.css';

const EFFECTIVE_DATE = 'June 12, 2026';
const COMPANY = "Hunter's Holistic Health LLC";
const EMAIL = 'hello@icanteachyouai.com';
const ADDRESS = '[ADDRESS LINE 1], [CITY, STATE ZIP]';

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <article className={styles.article}>
            <div className={styles.header}>
              <span className={styles.kicker}>Legal</span>
              <h1 className={styles.h1}>Privacy Policy</h1>
              <p className={styles.meta}>Effective Date: {EFFECTIVE_DATE} | Last Updated: {EFFECTIVE_DATE}</p>
            </div>

            <div className={styles.disclaimer}>
              This Privacy Policy describes how {COMPANY} ("we," "us," or "our") collects, uses, and shares information about you when you use I Can Teach You AI and related services. Please read it carefully.
            </div>

            <section className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p><strong>Information You Provide Directly:</strong></p>
              <ul>
                <li><strong>Account Registration:</strong> First name, last name, age (not date of birth), and email address. We deliberately do not collect date of birth, physical address, or other unnecessary personal information.</li>
                <li><strong>Waitlist Submissions:</strong> Email address, background information, interests, and goals as provided in the waitlist form.</li>
                <li><strong>Support Requests:</strong> Name, email, reason for contact, and any message content you provide.</li>
                <li><strong>Feature Requests:</strong> Feature description, category, and importance rating. Feature requests may be submitted anonymously.</li>
                <li><strong>Purchase Information:</strong> Payment information is collected and processed by Stripe. We receive a transaction confirmation and your email address but do not store your full payment card details.</li>
                <li><strong>Communications:</strong> When you contact us by email or through our forms, we retain those communications to respond to your inquiry and improve our services.</li>
              </ul>

              <p><strong>Information Collected Automatically:</strong></p>
              <ul>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, and other interaction data collected through standard web analytics.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type, screen resolution, and language settings.</li>
                <li><strong>Log Data:</strong> IP address, access times, referring URLs, and error logs.</li>
                <li><strong>Cookies:</strong> We use essential cookies for session management and authentication. We do not use advertising cookies or third-party tracking cookies. See Section 7 for details.</li>
              </ul>

              <p><strong>Information from Third Parties:</strong></p>
              <ul>
                <li><strong>Stripe:</strong> Transaction confirmation, email address, and billing country associated with purchases.</li>
                <li><strong>Supabase:</strong> Authentication tokens and session data for logged-in users.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve the Platform and its features</li>
                <li>Process transactions and send related information (receipts, confirmations)</li>
                <li>Send administrative communications (account updates, security notices, policy changes)</li>
                <li>Send marketing communications about our products and services, where you have consented or where permitted by law (you may opt out at any time)</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage patterns to improve the Platform</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Comply with legal obligations</li>
                <li>Enforce our Terms of Service</li>
              </ul>
              <p>We do not sell your personal information to third parties. We do not use your information for advertising targeting or data brokering.</p>
            </section>

            <section className={styles.section}>
              <h2>3. How We Share Your Information</h2>
              <p>We share your information only in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> We share information with third-party vendors who perform services on our behalf, including payment processing (Stripe), database hosting (Supabase), email delivery, and analytics. These vendors are contractually obligated to use your information only to provide services to us and to protect it appropriately.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, subpoena, or other legal process, or if we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on the Platform of any change in ownership or uses of your information.</li>
                <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>4. Data Retention</h2>
              <p>We retain your information for as long as necessary to provide the services and fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr><th>Data Type</th><th>Retention Period</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Account information</td><td>Duration of account plus 30 days after deletion request</td></tr>
                    <tr><td>Purchase records</td><td>7 years (tax and legal compliance)</td></tr>
                    <tr><td>Support communications</td><td>3 years</td></tr>
                    <tr><td>Waitlist submissions</td><td>2 years or until product launch</td></tr>
                    <tr><td>Usage analytics</td><td>2 years (aggregated, anonymized)</td></tr>
                    <tr><td>Log data</td><td>90 days</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.section}>
              <h2>5. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul>
                <li>Encryption of data in transit using TLS 1.3</li>
                <li>Encryption of data at rest in our database</li>
                <li>Row-level security policies that ensure users can only access their own data</li>
                <li>Multi-factor authentication for administrative access</li>
                <li>Regular security reviews and dependency updates</li>
              </ul>
              <p>No method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.</p>
            </section>

            <section className={styles.section}>
              <h2>6. AI Features and Data Processing</h2>
              <p>The Platform includes AI-powered features (such as the AI Meal Guard) that use the OpenAI API. When you use these features:</p>
              <ul>
                <li>Your input (meal descriptions or images) is sent to OpenAI's API through our secure backend proxy. Your input is not sent directly from your browser to OpenAI.</li>
                <li>We do not store your meal descriptions or images after the AI response is returned to you.</li>
                <li>OpenAI may retain API inputs and outputs in accordance with their data retention policies. We recommend reviewing OpenAI's privacy policy for details.</li>
                <li>AI-generated responses are for educational purposes only and do not constitute medical or dietary advice.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>7. Cookies and Tracking Technologies</h2>
              <p>We use the following types of cookies:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the Platform to function. These include session cookies for authentication and security tokens. You cannot opt out of essential cookies without disabling the Platform entirely.</li>
                <li><strong>Analytics Cookies:</strong> We use privacy-respecting analytics to understand how the Platform is used. These cookies do not track you across other websites and do not identify you personally.</li>
              </ul>
              <p>We do not use advertising cookies, third-party tracking cookies, or cookies that build advertising profiles. We do not participate in cross-site tracking.</p>
              <p>You can control cookies through your browser settings. Disabling essential cookies will prevent you from logging in or accessing protected features.</p>
            </section>

            <section className={styles.section}>
              <h2>8. Your Rights and Choices</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request that we delete your personal information. You can initiate account deletion from your account settings. We will delete your data within 30 days, except as required by law.</li>
                <li><strong>Portability:</strong> Request a machine-readable copy of your personal information.</li>
                <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from marketing emails at any time using the unsubscribe link in any email or by contacting us at {EMAIL}.</li>
                <li><strong>Restriction:</strong> Request that we restrict processing of your information in certain circumstances.</li>
              </ul>
              <p>To exercise any of these rights, contact us at {EMAIL}. We will respond within 30 days. We may need to verify your identity before processing your request.</p>
            </section>

            <section className={styles.section}>
              <h2>9. California Privacy Rights (CCPA/CPRA)</h2>
              <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):</p>
              <ul>
                <li><strong>Right to Know:</strong> You have the right to know what personal information we collect, use, disclose, and sell.</li>
                <li><strong>Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions.</li>
                <li><strong>Right to Correct:</strong> You have the right to correct inaccurate personal information.</li>
                <li><strong>Right to Opt-Out of Sale:</strong> We do not sell personal information. You do not need to opt out.</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
                <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> We do not use sensitive personal information for purposes beyond those necessary to provide the services.</li>
              </ul>
              <p>To submit a California privacy request, contact us at {EMAIL} with the subject line "California Privacy Request."</p>
            </section>

            <section className={styles.section}>
              <h2>10. Nevada Privacy Rights</h2>
              <p>Nevada residents may opt out of the sale of their personal information. We do not sell personal information. Nevada residents may still submit an opt-out request by contacting us at {EMAIL}.</p>
            </section>

            <section className={styles.section}>
              <h2>11. European Economic Area and UK Users (GDPR)</h2>
              <p>If you are located in the European Economic Area (EEA) or the United Kingdom, you have additional rights under the General Data Protection Regulation (GDPR) and UK GDPR:</p>
              <p><strong>Legal Basis for Processing:</strong> We process your personal information on the following legal bases: (a) performance of a contract (to provide the services you requested); (b) legitimate interests (to improve our services, prevent fraud, and communicate with you); (c) consent (for marketing communications); and (d) legal obligation (to comply with applicable laws).</p>
              <p><strong>Data Transfers:</strong> Your information may be transferred to and processed in the United States, which may not provide the same level of data protection as your home country. We use appropriate safeguards (such as Standard Contractual Clauses) for such transfers.</p>
              <p><strong>Right to Lodge a Complaint:</strong> You have the right to lodge a complaint with your local data protection authority.</p>
              <p>To exercise your GDPR rights, contact us at {EMAIL}.</p>
            </section>

            <section className={styles.section}>
              <h2>12. Children's Privacy</h2>
              <p>The Platform is not directed to children under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information promptly. If you believe we have collected information from a child under 18, please contact us at {EMAIL}.</p>
            </section>

            <section className={styles.section}>
              <h2>13. Third-Party Sub-Processors</h2>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr><th>Sub-Processor</th><th>Purpose</th><th>Location</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Stripe</td><td>Payment processing</td><td>United States</td></tr>
                    <tr><td>Supabase</td><td>Database and authentication</td><td>United States</td></tr>
                    <tr><td>OpenAI</td><td>AI features (Meal Guard)</td><td>United States</td></tr>
                    <tr><td>Vercel</td><td>Web hosting and serverless functions</td><td>United States</td></tr>
                    <tr><td>Google Workspace</td><td>Email and operational communications</td><td>United States</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.section}>
              <h2>14. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of material changes by updating the "Last Updated" date and, where appropriate, by sending an email to registered users. Your continued use of the Platform after any changes constitutes your acceptance of the revised Privacy Policy.</p>
            </section>

            <section className={styles.section}>
              <h2>15. Contact Us</h2>
              <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
              <div className={styles.contactBlock}>
                <p><strong>{COMPANY}</strong></p>
                <p>Attn: Privacy</p>
                <p>{ADDRESS}</p>
                <p>Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
