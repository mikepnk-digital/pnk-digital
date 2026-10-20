import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Mail, MapPin } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { fadeInUp } from '../utils/animations';
import { EMAIL } from '../config/site';

export function TermsOfService() {
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
              <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center">
                <FileText className="text-neon-purple" size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Terms of Service
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
                  These Terms of Service ("Terms") govern your use of the PNK Digital website and services. By accessing our website or engaging our services, you agree to be bound by these Terms.
                </p>
                <p className="mb-4 leading-relaxed">
                  PNK Digital is a company registered in England and Wales. These Terms are governed by English law and subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
                <p className="leading-relaxed">
                  Please read these Terms carefully before using our services. If you do not agree to these Terms, you must not use our website or services.
                </p>
              </section>

              {/* Definitions */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  2. Definitions
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-text-primary">"We", "Us", "Our"</strong> refers to PNK Digital</li>
                  <li><strong className="text-text-primary">"You", "Your", "Client"</strong> refers to the person or entity using our website or engaging our services</li>
                  <li><strong className="text-text-primary">"Services"</strong> refers to website development, application development, software tools, AI consulting, AI integration, and ongoing support services provided by PNK Digital</li>
                  <li><strong className="text-text-primary">"Website"</strong> refers to the PNK Digital website at this domain</li>
                  <li><strong className="text-text-primary">"Deliverables"</strong> refers to all work product, code, designs, and materials created as part of our Services</li>
                  <li><strong className="text-text-primary">"Project"</strong> refers to the specific scope of work agreed between us and you</li>
                </ul>
              </section>

              {/* Contact Information */}
              <section className="bg-midnight/50 rounded-2xl p-6 border border-white/5">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  3. Contact Information
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-neon-purple" />
                    <span>Email: {EMAIL}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-neon-purple" />
                    <span>Address: PNK Digital, United Kingdom</span>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  4. Our Services
                </h2>
                <p className="mb-4 leading-relaxed">
                  PNK Digital provides digital development and AI consulting services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Website design and development</li>
                  <li>Web and mobile application development</li>
                  <li>Custom software tools and solutions</li>
                  <li>AI consulting and strategy</li>
                  <li>AI integration and implementation</li>
                  <li>Ongoing maintenance and support</li>
                </ul>
                <p className="leading-relaxed">
                  The specific scope, deliverables, timeline, and pricing for any project will be set out in a separate proposal or statement of work agreed between us.
                </p>
              </section>

              {/* Quotations and Proposals */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  5. Quotations and Proposals
                </h2>
                <p className="mb-4 leading-relaxed">
                  Any quotation or proposal provided by us is valid for 30 days from the date of issue unless otherwise stated. Quotations are estimates based on the information provided and may be subject to change if project requirements change.
                </p>
                <p className="mb-4 leading-relaxed">
                  A binding contract is formed when you accept our proposal in writing (including by email) or make payment of any deposit requested.
                </p>
                <p className="leading-relaxed">
                  We reserve the right to decline any project at our discretion.
                </p>
              </section>

              {/* Payment Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  6. Payment Terms
                </h2>
                <p className="mb-4 leading-relaxed">
                  Payment terms will be specified in the proposal or statement of work. Unless otherwise agreed:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>A deposit of 50% is required before work commences</li>
                  <li>The remaining balance is due upon project completion, before final delivery</li>
                  <li>For larger projects, milestone payments may be agreed</li>
                  <li>Invoices are payable within 14 days of the invoice date</li>
                </ul>
                <p className="mb-4 leading-relaxed">
                  All prices are quoted in GBP (£) and are exclusive of VAT unless otherwise stated. VAT will be added where applicable at the prevailing rate.
                </p>
                <p className="leading-relaxed">
                  We reserve the right to charge interest on overdue payments at 8% above the Bank of England base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.
                </p>
              </section>

              {/* Client Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  7. Client Responsibilities
                </h2>
                <p className="mb-4 leading-relaxed">
                  To enable us to deliver the Services effectively, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information and materials required for the project</li>
                  <li>Respond to requests for information, feedback, and approvals in a timely manner</li>
                  <li>Ensure you have the right to use any content, images, or materials you provide to us</li>
                  <li>Designate a primary point of contact with authority to make decisions on the project</li>
                  <li>Provide access to any existing systems, accounts, or platforms necessary for the project</li>
                  <li>Review and test deliverables within the agreed timeframes</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  Delays caused by failure to meet these responsibilities may result in project timeline extensions and may incur additional charges.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="bg-neon-purple/5 rounded-2xl p-6 border border-neon-purple/20">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  8. Intellectual Property Rights
                </h2>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  8.1 Client Materials
                </h3>
                <p className="mb-4 leading-relaxed">
                  You retain ownership of all content, materials, and intellectual property you provide to us ("Client Materials"). You grant us a non-exclusive licence to use Client Materials solely for the purpose of delivering the Services.
                </p>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  8.2 Deliverables
                </h3>
                <p className="mb-4 leading-relaxed">
                  Upon receipt of full payment, we assign to you all intellectual property rights in the bespoke Deliverables created specifically for your project, except for:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong className="text-text-primary">Pre-existing materials:</strong> Any tools, code libraries, frameworks, or materials we owned prior to the project</li>
                  <li><strong className="text-text-primary">Third-party materials:</strong> Any third-party software, libraries, fonts, images, or content incorporated into the Deliverables (which are subject to their respective licences)</li>
                  <li><strong className="text-text-primary">General knowledge:</strong> Skills, techniques, and general know-how developed during the project</li>
                </ul>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  8.3 Portfolio Rights
                </h3>
                <p className="leading-relaxed">
                  We reserve the right to showcase completed work in our portfolio, case studies, and marketing materials, unless you request otherwise in writing.
                </p>
              </section>

              {/* Confidentiality */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  9. Confidentiality
                </h2>
                <p className="mb-4 leading-relaxed">
                  Both parties agree to keep confidential any proprietary or sensitive information disclosed during the course of the project. This includes business strategies, technical specifications, pricing, and any information marked as confidential.
                </p>
                <p className="leading-relaxed">
                  This obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law.
                </p>
              </section>

              {/* Project Changes */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  10. Project Changes and Variations
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you request changes to the agreed scope of work, we will provide a change request outlining the impact on timeline and cost. Changes will only be implemented once you have approved the change request in writing.
                </p>
                <p className="leading-relaxed">
                  Minor clarifications and refinements within the original scope are included. However, significant changes, additions, or revisions beyond the agreed scope will be treated as variations and charged accordingly.
                </p>
              </section>

              {/* Warranties and Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  11. Warranties and Limitations
                </h2>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  11.1 Our Warranties
                </h3>
                <p className="mb-4 leading-relaxed">
                  We warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Services will be performed with reasonable skill and care</li>
                  <li>Deliverables will materially conform to the agreed specifications</li>
                  <li>We have the right to provide the Services and grant the licences described in these Terms</li>
                </ul>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  11.2 Limitation of Liability
                </h3>
                <p className="mb-4 leading-relaxed">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Our total liability for any claims arising from or related to the Services shall not exceed the total fees paid by you for the relevant project</li>
                  <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities</li>
                  <li>We are not liable for any delays or failures caused by circumstances beyond our reasonable control</li>
                </ul>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  11.3 Your Warranties
                </h3>
                <p className="leading-relaxed">
                  You warrant that you have the right to use and provide to us all Client Materials, and that such materials do not infringe any third-party rights.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  12. Termination
                </h2>
                <p className="mb-4 leading-relaxed">
                  Either party may terminate the contract:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>By giving 14 days' written notice to the other party</li>
                  <li>Immediately if the other party commits a material breach that is not remedied within 14 days of written notice</li>
                  <li>Immediately if the other party becomes insolvent or enters administration</li>
                </ul>
                <p className="mb-4 leading-relaxed">
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You shall pay for all work completed up to the date of termination</li>
                  <li>We will provide you with all completed Deliverables and work in progress (subject to payment)</li>
                  <li>Any deposits paid are non-refundable unless we terminate without cause</li>
                </ul>
              </section>

              {/* Website Use */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  13. Website Terms of Use
                </h2>
                <p className="mb-4 leading-relaxed">
                  When using our website, you agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the website in any way that is unlawful, fraudulent, or harmful</li>
                  <li>Attempt to gain unauthorised access to our systems or networks</li>
                  <li>Introduce viruses, trojans, or other malicious code</li>
                  <li>Use automated systems to scrape or extract data from the website</li>
                  <li>Reproduce, duplicate, or copy any part of the website without permission</li>
                  <li>Use the website in a manner that could damage, disable, or impair the website</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  We reserve the right to restrict access to the website at our discretion.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  14. Third-Party Services
                </h2>
                <p className="mb-4 leading-relaxed">
                  Our Services may involve the use of third-party services, platforms, or tools (such as hosting providers, payment processors, or software libraries). These are subject to their own terms and conditions.
                </p>
                <p className="leading-relaxed">
                  We are not responsible for the availability, performance, or terms of any third-party services, though we will use reasonable efforts to select reputable providers.
                </p>
              </section>

              {/* Force Majeure */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  15. Force Majeure
                </h2>
                <p className="leading-relaxed">
                  Neither party shall be liable for any failure or delay in performing their obligations where such failure or delay results from circumstances beyond their reasonable control, including but not limited to: acts of God, natural disasters, war, terrorism, riots, pandemic, government actions, power failures, or internet outages.
                </p>
              </section>

              {/* Dispute Resolution */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  16. Dispute Resolution
                </h2>
                <p className="mb-4 leading-relaxed">
                  If a dispute arises, both parties agree to attempt to resolve the matter through good faith negotiation before pursuing formal proceedings.
                </p>
                <p className="leading-relaxed">
                  If the dispute cannot be resolved through negotiation within 30 days, either party may pursue mediation or legal proceedings. These Terms are governed by English law, and any legal proceedings shall be brought in the courts of England and Wales.
                </p>
              </section>

              {/* Consumer Rights */}
              <section className="bg-midnight/50 rounded-2xl p-6 border border-white/5">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  17. Consumer Rights
                </h2>
                <p className="mb-4 leading-relaxed">
                  If you are a consumer (an individual acting outside your trade, business, or profession), you have certain statutory rights under UK consumer protection laws, including the Consumer Rights Act 2015.
                </p>
                <p className="mb-4 leading-relaxed">
                  Nothing in these Terms affects your statutory rights as a consumer. Where any provision of these Terms conflicts with your statutory rights, your statutory rights shall prevail.
                </p>
                <p className="leading-relaxed">
                  For digital content, you have the right to expect that services are performed with reasonable care and skill, and that digital content is of satisfactory quality, fit for purpose, and as described.
                </p>
              </section>

              {/* General Provisions */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  18. General Provisions
                </h2>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  18.1 Entire Agreement
                </h3>
                <p className="mb-4 leading-relaxed">
                  These Terms, together with any proposal or statement of work, constitute the entire agreement between us and supersede any prior agreements or representations.
                </p>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  18.2 Severability
                </h3>
                <p className="mb-4 leading-relaxed">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
                </p>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  18.3 Waiver
                </h3>
                <p className="mb-4 leading-relaxed">
                  Failure to enforce any provision of these Terms shall not constitute a waiver of that provision or any other provision.
                </p>

                <h3 className="text-lg font-semibold text-text-primary mt-4 mb-3">
                  18.4 Assignment
                </h3>
                <p className="leading-relaxed">
                  You may not assign or transfer your rights under these Terms without our prior written consent. We may assign our rights and obligations to a successor or affiliate.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  19. Changes to These Terms
                </h2>
                <p className="leading-relaxed">
                  We may update these Terms from time to time. Any changes will be posted on this page with an updated "Last updated" date. For existing projects, the Terms in effect at the time of engagement will continue to apply unless otherwise agreed. We encourage you to review these Terms periodically.
                </p>
              </section>

              {/* Related Policies */}
              <section className="bg-midnight/50 rounded-2xl p-6 border border-white/5">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  20. Related Policies
                </h2>
                <p className="mb-4 leading-relaxed">
                  Please also review our other policies which form part of your relationship with us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Link to="/privacy-policy" className="text-neon-cyan hover:underline">
                      Privacy Policy
                    </Link>
                    {' '}- How we collect, use, and protect your personal data
                  </li>
                </ul>
              </section>
            </div>
          </motion.div>
      </Section>
    </>
  );
}
