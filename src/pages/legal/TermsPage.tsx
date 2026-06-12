import styles from './Legal.module.css';

const EFFECTIVE_DATE = 'June 12, 2026';
const COMPANY = "Hunter's Holistic Health LLC";
const SITE = 'I Can Teach You AI';
const DOMAIN = 'icanteachyouai.com';
const EMAIL = 'hello@icanteachyouai.com';
const ADDRESS = '[ADDRESS LINE 1], [CITY, STATE ZIP]';

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <article className={styles.article}>
            <div className={styles.header}>
              <span className={styles.kicker}>Legal</span>
              <h1 className={styles.h1}>Terms of Service</h1>
              <p className={styles.meta}>Effective Date: {EFFECTIVE_DATE} | Last Updated: {EFFECTIVE_DATE}</p>
            </div>

            <div className={styles.disclaimer}>
              Please read these Terms of Service carefully before using {SITE}. By accessing or using this website, you agree to be bound by these terms. If you do not agree, do not use this website.
            </div>

            <section className={styles.section}>
              <h2>1. Agreement to Terms</h2>
              <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and {COMPANY} ("Company," "we," "us," or "our"), the operator of {SITE} at {DOMAIN} ("Platform"). By accessing or using the Platform in any manner, including browsing, registering, purchasing, or downloading content, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference.</p>
              <p>We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the "Last Updated" date and, where appropriate, by sending an email to registered users. Your continued use of the Platform after any modification constitutes your acceptance of the revised Terms. If you do not agree to the modified Terms, you must discontinue use of the Platform.</p>
            </section>

            <section className={styles.section}>
              <h2>2. Nature of Services and Educational Disclaimer</h2>
              <p>{SITE} is an educational platform operated by Dr. Shallanda Hunter, PharmD. The Platform provides educational content, courses, tools, and resources related to artificial intelligence, workflow automation, healthcare technology, and related topics.</p>
              <p><strong>PharmD is an academic credential, not a professional license in this context.</strong> The designation "PharmD" indicates a Doctor of Pharmacy degree and is used to signal academic and clinical training. It does not indicate that any services provided through this Platform constitute the practice of pharmacy, medicine, or any other licensed healthcare profession.</p>
              <p><strong>Nothing on this Platform constitutes medical advice, diagnosis, treatment, or a patient-provider relationship.</strong> All content is provided for educational and informational purposes only. You should not rely on any content on this Platform as a substitute for professional medical, legal, financial, or other professional advice.</p>
              <p>Always consult a qualified healthcare provider before making decisions about your health, medications, supplements, or treatment. Always consult a qualified attorney before making decisions about legal compliance, business structure, or regulatory requirements.</p>
            </section>

            <section className={styles.section}>
              <h2>3. Eligibility</h2>
              <p>You must be at least 18 years of age to use this Platform. By using the Platform, you represent and warrant that you are at least 18 years old, that you have the legal capacity to enter into a binding agreement, and that your use of the Platform does not violate any applicable law or regulation in your jurisdiction.</p>
              <p>The Platform is intended for users in the United States. We make no representation that the Platform is appropriate or available in other jurisdictions. If you access the Platform from outside the United States, you do so at your own risk and are responsible for compliance with local laws.</p>
            </section>

            <section className={styles.section}>
              <h2>4. Account Registration and Security</h2>
              <p>Certain features of the Platform require account registration. When registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              <p>You agree to notify us immediately at {EMAIL} if you suspect any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to maintain account security.</p>
              <p>We collect first name, last name, age (not date of birth), and email address during registration. We do not collect date of birth, physical address, or other unnecessary personal information. See our Privacy Policy for full details on data collection and use.</p>
              <p>You may not create more than one account per person. We reserve the right to terminate duplicate accounts.</p>
            </section>

            <section className={styles.section}>
              <h2>5. Purchases, Subscriptions, and Billing</h2>
              <p>Certain content and features on the Platform are available for purchase. All purchases are processed through Stripe, a third-party payment processor. By making a purchase, you agree to Stripe's terms of service and privacy policy in addition to these Terms.</p>
              <p><strong>One-Time Purchases:</strong> Digital products (such as exam prep materials, guides, and templates) are sold as one-time purchases. Upon successful payment, you receive a non-exclusive, non-transferable license to access the purchased content for personal, non-commercial use.</p>
              <p><strong>Subscriptions:</strong> Subscription products renew automatically at the end of each billing period unless cancelled. You may cancel your subscription at any time through your account settings or by contacting us at {EMAIL}. Cancellation takes effect at the end of the current billing period. We do not provide refunds for partial subscription periods.</p>
              <p><strong>Refund Policy:</strong> For digital products, we offer a full refund within 7 days of purchase if the product has not been accessed. Once a digital product has been accessed, no refund will be issued. To request a refund, contact {EMAIL} within the refund window with your order number.</p>
              <p><strong>Price Changes:</strong> We reserve the right to change prices at any time. Price changes to subscription products will be communicated with at least 30 days notice before taking effect.</p>
            </section>

            <section className={styles.section}>
              <h2>6. Intellectual Property</h2>
              <p>All content on the Platform, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of {COMPANY} or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.</p>
              <p>The ROOTS Framework, I Can Teach You AI, and Hunters Holistic Health are trademarks of {COMPANY}. You may not use these marks without prior written permission.</p>
              <p>You are granted a limited, non-exclusive, non-transferable license to access and use the Platform and its content for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content from the Platform without our prior written consent.</p>
              <p><strong>DMCA Notice:</strong> If you believe that content on the Platform infringes your copyright, please send a written notice to {EMAIL} with the subject line "DMCA Notice" including: a description of the copyrighted work, the URL of the allegedly infringing content, your contact information, and a statement of good faith belief that the use is not authorized.</p>
            </section>

            <section className={styles.section}>
              <h2>7. User-Generated Content</h2>
              <p>If the Platform allows you to post, submit, or share content (including in community features, feedback forms, or testimonials), you grant {COMPANY} a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, adapt, publish, translate, and distribute that content in connection with the Platform.</p>
              <p>You represent and warrant that you own or have the necessary rights to the content you submit, that the content does not violate any third-party rights, and that the content does not contain false, misleading, or defamatory statements.</p>
              <p>We reserve the right to remove any user-generated content at our discretion without notice.</p>
            </section>

            <section className={styles.section}>
              <h2>8. FTC Compliance and Endorsements</h2>
              <p>In accordance with the Federal Trade Commission's Endorsement Guides (16 C.F.R. Part 255, as updated in 2023), we disclose the following:</p>
              <p><strong>Affiliate Relationships:</strong> This Platform may contain affiliate links to third-party products and services, including but not limited to Fullscript, Amazon, and supplement brands. When you purchase through these links, we may earn a commission at no additional cost to you. All affiliate relationships are disclosed at the point of recommendation.</p>
              <p><strong>Testimonials:</strong> Any testimonials or case studies on this Platform reflect the experiences of specific individuals. Individual results vary. We do not guarantee that you will achieve the same or similar results. Where testimonials describe results that may not be typical, we disclose what typical results are based on available data.</p>
              <p><strong>Sponsored Content:</strong> Any sponsored content or paid partnerships will be clearly identified as such.</p>
              <p><strong>Supplement Statements:</strong> Any statements about supplements or nutritional products have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
            </section>

            <section className={styles.section}>
              <h2>9. Acceptable Use Policy</h2>
              <p>You agree not to use the Platform to:</p>
              <ul>
                <li>Violate any applicable law, regulation, or third-party rights</li>
                <li>Transmit any content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Collect or harvest any personally identifiable information from the Platform without authorization</li>
                <li>Use automated means (bots, scrapers, crawlers) to access the Platform without our prior written consent</li>
                <li>Attempt to gain unauthorized access to any portion of the Platform or its related systems</li>
                <li>Interfere with or disrupt the integrity or performance of the Platform</li>
                <li>Reproduce, sell, or commercially exploit any content from the Platform without our prior written consent</li>
                <li>Share your account credentials with any third party</li>
                <li>Use the Platform for any purpose that competes with our business without our prior written consent</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>10. Third-Party Services and Links</h2>
              <p>The Platform integrates with and links to third-party services including Stripe (payment processing), Supabase (database), OpenAI (AI features), Fullscript (supplement dispensary), and others. Your use of these third-party services is governed by their respective terms of service and privacy policies. We are not responsible for the practices of any third-party services.</p>
              <p>The Platform may contain links to third-party websites. These links are provided for convenience only. We do not endorse, control, or assume responsibility for the content or practices of any linked websites.</p>
            </section>

            <section className={styles.section}>
              <h2>11. Disclaimer of Warranties</h2>
              <p>THE PLATFORM AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY.</p>
              <p>WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE DO NOT WARRANT THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY CONTENT ON THE PLATFORM.</p>
            </section>

            <section className={styles.section}>
              <h2>12. Limitation of Liability</h2>
              <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {COMPANY.toUpperCase()} AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM.</p>
              <p>OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE PLATFORM SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO US IN THE TWELVE MONTHS PRECEDING THE CLAIM OR (B) ONE HUNDRED DOLLARS ($100).</p>
            </section>

            <section className={styles.section}>
              <h2>13. Indemnification</h2>
              <p>You agree to indemnify, defend, and hold harmless {COMPANY} and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Platform.</p>
            </section>

            <section className={styles.section}>
              <h2>14. Dispute Resolution and Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.</p>
              <p><strong>Informal Resolution:</strong> Before initiating any formal dispute, you agree to contact us at {EMAIL} and attempt to resolve the dispute informally for at least 30 days.</p>
              <p><strong>Binding Arbitration:</strong> If informal resolution fails, any dispute arising out of or relating to these Terms or the Platform shall be resolved by binding arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules. The arbitration shall take place in Texas. The arbitrator's decision shall be final and binding.</p>
              <p><strong>Class Action Waiver:</strong> You agree that any arbitration or legal proceeding shall be conducted on an individual basis and not as a class, collective, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration.</p>
            </section>

            <section className={styles.section}>
              <h2>15. Termination</h2>
              <p>We reserve the right to suspend or terminate your account and access to the Platform at any time, with or without cause, with or without notice. Upon termination, your right to use the Platform ceases immediately.</p>
              <p>You may terminate your account at any time by contacting us at {EMAIL}. Upon account termination, your personal data will be deleted within 30 days, except as required by law or for legitimate business purposes.</p>
            </section>

            <section className={styles.section}>
              <h2>16. General Provisions</h2>
              <p><strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and {COMPANY} regarding the Platform and supersede all prior agreements.</p>
              <p><strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
              <p><strong>Waiver:</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.</p>
              <p><strong>Assignment:</strong> You may not assign your rights under these Terms without our prior written consent. We may assign our rights without restriction.</p>
              <p><strong>Force Majeure:</strong> We shall not be liable for any failure to perform our obligations where such failure results from causes beyond our reasonable control.</p>
            </section>

            <section className={styles.section}>
              <h2>17. Contact Information</h2>
              <p>For questions about these Terms, please contact us:</p>
              <div className={styles.contactBlock}>
                <p><strong>{COMPANY}</strong></p>
                <p>{ADDRESS}</p>
                <p>Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
                <p>Website: {DOMAIN}</p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
