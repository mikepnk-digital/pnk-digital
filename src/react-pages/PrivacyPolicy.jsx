import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Mail, MapPin } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { fadeInUp } from '../utils/animations';

export function PrivacyPolicy() {
  const lastUpdated = '16 January 2026';

  return (
    <>
      <Section padding="page-header" maxWidth="4xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-cyan transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
                <Shield className="text-neon-cyan" size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Privacy Policy
              </h1>
            </div>

            <p className="text-text-secondary">
              Last updated: {lastUpdated}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-10 text-text-secondary">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  1. Introduction
                </h2>
                <p className="mb-4 leading-relaxed">
                  PNK Digital ("we", "us", or "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website, use our services, or interact with us.
                </p>
                <p className="mb-4 leading-relaxed">
                  This policy complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. We are the data controller responsible for your personal data.
                </p>
                <p className="leading-relaxed">
                  Please read this policy carefully to understand our practices regarding your personal data. By using our website or services, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </section>

              {/* Contact Information */}
              <section className="bg-midnight/50 rounded-2xl p-6 border border-white/5">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  2. Data Controller Contact Information
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-neon-cyan" />
                    <span>Email: privacy@pnk-digital.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-neon-cyan" />
                    <span>Address: PNK Digital, United Kingdom</span>
                  </div>
                </div>
              </section>

              {/* What Data We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  3. Personal Data We Collect
                </h2>
                <p className="mb-4 leading-relaxed">
                  We may collect and process the following categories of personal data:
                </p>

                <h3 className="text-lg font-semibold text-text-primary mt-6 mb-3">
                  3.1 Information You Provide to Us
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Identity Data:</strong> Name, job title, company name</li>
                  <li><strong className="text-text-primary">Contact Data:</strong> Email address, telephone number, business address</li>
                  <li><strong className="text-text-primary">Project Data:</strong> Information about your project requirements, budget, and timeline preferences submitted through our project builder</li>
                  <li><strong className="text-text-primary">Communication Data:</strong> Any correspondence you have with us including enquiries and feedback</li>
                </ul>

                <h3 className="text-lg font-semibold text-text-primary mt-6 mb-3">
                  3.2 Information Collected Automatically
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Technical Data:</strong> IP address, browser type and version, operating system, device information</li>
                  <li><strong className="text-text-primary">Usage Data:</strong> Pages visited, time spent on pages, navigation paths, referral source</li>
                  <li><strong className="text-text-primary">Cookie Data:</strong> Information collected through cookies and similar technologies (see Section 9)</li>
                </ul>
              </section>

              {/* How We Use Your Data */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  4. How We Use Your Personal Data
                </h2>
                <p className="mb-4 leading-relaxed">
                  We will only use your personal data when the law allows us to. Under UK GDPR, we must have a valid legal basis for processing your data. The table below sets out the purposes for which we process your data and our legal basis:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-4">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">Purpose</th>
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">Legal Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-3 px-4">To respond to your enquiries and provide quotes</td>
                        <td className="py-3 px-4">Legitimate interests / Contract performance</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">To deliver our services and manage our relationship with you</td>
                        <td className="py-3 px-4">Contract performance</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">To send marketing communications (with your consent)</td>
                        <td className="py-3 px-4">Consent</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">To improve our website and services</td>
                        <td className="py-3 px-4">Legitimate interests</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">To comply with legal obligations</td>
                        <td className="py-3 px-4">Legal obligation</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">To protect our rights and prevent fraud</td>
                        <td className="py-3 px-4">Legitimate interests</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  5. Who We Share Your Data With
                </h2>
                <p className="mb-4 leading-relaxed">
                  We may share your personal data with the following categories of recipients:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Service Providers:</strong> Third-party companies that help us operate our business, including hosting providers, email services, analytics providers, and payment processors</li>
                  <li><strong className="text-text-primary">Professional Advisers:</strong> Lawyers, accountants, and insurers who provide professional services to us</li>
                  <li><strong className="text-text-primary">Regulatory Authorities:</strong> Government bodies, regulators, and law enforcement where required by law</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes.
                </p>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  6. International Transfers
                </h2>
                <p className="mb-4 leading-relaxed">
                  Some of our service providers may be located outside the United Kingdom. Whenever we transfer your personal data internationally, we ensure appropriate safeguards are in place to protect your data, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Transfers to countries with an adequacy decision from the UK Government</li>
                  <li>Standard Contractual Clauses approved by the UK Information Commissioner's Office (ICO)</li>
                  <li>Binding Corporate Rules where applicable</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Please contact us if you want further information on the specific mechanisms used when transferring your personal data internationally.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  7. Data Retention
                </h2>
                <p className="mb-4 leading-relaxed">
                  We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including to satisfy any legal, accounting, or reporting requirements.
                </p>
                <p className="mb-4 leading-relaxed">
                  To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the data, the potential risk of harm from unauthorised use or disclosure, the purposes for processing, and legal requirements.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Enquiry data:</strong> Retained for 2 years from last contact unless we enter into a business relationship</li>
                  <li><strong className="text-text-primary">Client data:</strong> Retained for 7 years after the end of our business relationship (for legal and accounting purposes)</li>
                  <li><strong className="text-text-primary">Website analytics:</strong> Retained for 26 months</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section className="bg-neon-cyan/5 rounded-2xl p-6 border border-neon-cyan/20">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  8. Your Legal Rights
                </h2>
                <p className="mb-4 leading-relaxed">
                  Under UK data protection law, you have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong className="text-text-primary">Right of Access:</strong> You can request a copy of the personal data we hold about you (commonly known as a "subject access request").
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Rectification:</strong> You can request correction of inaccurate or incomplete personal data we hold about you.
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Erasure:</strong> You can request deletion of your personal data where there is no good reason for us to continue processing it.
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Restrict Processing:</strong> You can request suspension of processing of your personal data in certain circumstances.
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Data Portability:</strong> You can request transfer of your personal data to you or a third party in a structured, machine-readable format.
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Object:</strong> You can object to processing of your personal data where we are relying on legitimate interests or for direct marketing purposes.
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Withdraw Consent:</strong> Where we rely on consent to process your data, you can withdraw that consent at any time.
                  </li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  To exercise any of these rights, please contact us at <a href="mailto:privacy@pnk-digital.com" className="text-neon-cyan hover:underline">privacy@pnk-digital.com</a>. We will respond to your request within one month. There is no fee for making a request unless it is manifestly unfounded or excessive.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  9. Cookies and Tracking Technologies
                </h2>
                <p className="mb-4 leading-relaxed">
                  Our website uses cookies and similar tracking technologies to distinguish you from other users, improve your experience, and analyse how our website is used.
                </p>

                <h3 className="text-lg font-semibold text-text-primary mt-6 mb-3">
                  Types of Cookies We Use
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">Strictly Necessary Cookies:</strong> Essential for the website to function properly. You cannot opt out of these.</li>
                  <li><strong className="text-text-primary">Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous information.</li>
                  <li><strong className="text-text-primary">Functional Cookies:</strong> Remember your preferences and choices to provide enhanced features.</li>
                  <li><strong className="text-text-primary">Marketing Cookies:</strong> Track your activity across websites to deliver relevant advertising (only used with your consent).</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  10. Data Security
                </h2>
                <p className="mb-4 leading-relaxed">
                  We have implemented appropriate technical and organisational security measures to protect your personal data against accidental loss, unauthorised access, alteration, or disclosure. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit using TLS/SSL</li>
                  <li>Secure hosting with reputable service providers</li>
                  <li>Access controls limiting who can access personal data</li>
                  <li>Regular security assessments and updates</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  While we strive to protect your personal data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but will notify you and relevant authorities of any data breach in accordance with our legal obligations.
                </p>
              </section>

              {/* Third-Party Links */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  11. Third-Party Links
                </h2>
                <p className="leading-relaxed">
                  Our website may contain links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy policies. We encourage you to read the privacy policy of every website you visit.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  12. Children's Privacy
                </h2>
                <p className="leading-relaxed">
                  Our services are not intended for children under the age of 18. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us and we will take steps to delete such information.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  13. Changes to This Privacy Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this page periodically to stay informed about how we protect your data.
                </p>
              </section>

              {/* Complaints */}
              <section className="bg-midnight/50 rounded-2xl p-6 border border-white/5">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  14. Complaints
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you have any concerns about how we handle your personal data, please contact us first so we can try to resolve the issue.
                </p>
                <p className="leading-relaxed">
                  You also have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK supervisory authority for data protection issues:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong className="text-text-primary">Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">www.ico.org.uk</a></p>
                  <p><strong className="text-text-primary">Telephone:</strong> 0303 123 1113</p>
                  <p><strong className="text-text-primary">Address:</strong> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
                </div>
              </section>
            </div>
          </motion.div>
      </Section>
    </>
  );
}
