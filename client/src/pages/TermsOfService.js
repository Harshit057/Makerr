import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="terms-of-service">
      <div className="container">
        <div className="terms-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: July 5, 2025</p>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by Makerr ("Company," "we," "our," or "us"), 
              you ("Client," "you," or "your") agree to be bound by these Terms of Service ("Terms"). 
              If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Description of Services</h2>
            <p>Makerr provides a range of technology and business services including, but not limited to:</p>
            <ul>
              <li>Web development and mobile application development</li>
              <li>User interface and user experience design</li>
              <li>Search engine optimization and digital marketing</li>
              <li>Cyber security consulting and implementation</li>
              <li>Graphic design and video editing services</li>
              <li>Business consulting and automation solutions</li>
              <li>System integration and maintenance services</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Service Agreement and Scope</h2>
            <h3>3.1 Project Scope</h3>
            <p>
              Each project will be governed by a separate Service Agreement that outlines the specific scope, 
              deliverables, timeline, and payment terms. These Terms of Service apply to all projects unless 
              specifically modified in the Service Agreement.
            </p>

            <h3>3.2 Changes to Scope</h3>
            <p>
              Any changes to the agreed project scope must be documented in writing and may result in 
              additional charges and timeline adjustments.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Payment Terms</h2>
            <h3>4.1 Fees and Payment Schedule</h3>
            <p>
              Payment terms will be specified in each Service Agreement. Generally, our payment structure includes:
            </p>
            <ul>
              <li>Initial deposit (typically 30-50% of total project cost)</li>
              <li>Milestone payments during project development</li>
              <li>Final payment upon project completion and delivery</li>
            </ul>

            <h3>4.2 Late Payments</h3>
            <p>
              Payments not received within 30 days of the due date may incur a late fee of 1.5% per month 
              or the maximum allowed by law, whichever is less.
            </p>

            <h3>4.3 Refunds</h3>
            <p>
              Refunds will be considered on a case-by-case basis. Generally, work completed and delivered 
              is non-refundable. Refund policies will be outlined in the specific Service Agreement.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Client Responsibilities</h2>
            <p>To ensure successful project completion, clients agree to:</p>
            <ul>
              <li>Provide clear and complete project requirements</li>
              <li>Supply necessary content, materials, and access credentials in a timely manner</li>
              <li>Respond to requests for feedback and approvals within agreed timeframes</li>
              <li>Make payments according to the agreed schedule</li>
              <li>Respect intellectual property rights of third parties</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Intellectual Property Rights</h2>
            <h3>6.1 Client Content</h3>
            <p>
              Clients retain ownership of all content, materials, and intellectual property provided to us. 
              Clients grant us a license to use such materials solely for the purpose of delivering the agreed services.
            </p>

            <h3>6.2 Deliverables</h3>
            <p>
              Upon full payment, clients will own the deliverables created specifically for their project. 
              However, we retain rights to any pre-existing tools, frameworks, methodologies, and general 
              know-how used in the project.
            </p>

            <h3>6.3 Portfolio Use</h3>
            <p>
              We reserve the right to showcase completed projects in our portfolio and marketing materials, 
              unless specifically agreed otherwise in writing.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Confidentiality</h2>
            <p>
              We understand that clients may share confidential information during the course of our engagement. 
              We agree to:
            </p>
            <ul>
              <li>Keep all client information confidential</li>
              <li>Use client information solely for the purpose of delivering services</li>
              <li>Implement reasonable security measures to protect confidential information</li>
              <li>Return or destroy confidential information upon request</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>8. Warranties and Disclaimers</h2>
            <h3>8.1 Service Warranty</h3>
            <p>
              We warrant that our services will be performed in a professional and workmanlike manner 
              in accordance with industry standards.
            </p>

            <h3>8.2 Disclaimer</h3>
            <p>
              Except as expressly stated, our services are provided "as is" without warranty of any kind. 
              We disclaim all warranties, express or implied, including but not limited to warranties of 
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h3>8.3 Third-Party Services</h3>
            <p>
              We are not responsible for the performance, availability, or security of third-party services, 
              platforms, or tools that may be integrated into your project.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, our total liability for any claims arising from 
              or related to our services shall not exceed the total amount paid by the client for the 
              specific project giving rise to the claim. We shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Project Timeline and Delays</h2>
            <h3>10.1 Timeline Estimates</h3>
            <p>
              Project timelines are estimates based on the agreed scope and client cooperation. 
              Actual delivery dates may vary due to project complexity, change requests, or client delays.
            </p>

            <h3>10.2 Force Majeure</h3>
            <p>
              We shall not be liable for delays or failures in performance due to circumstances beyond 
              our reasonable control, including but not limited to natural disasters, government actions, 
              or technical failures of third-party services.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Termination</h2>
            <h3>11.1 Termination by Client</h3>
            <p>
              Clients may terminate the engagement at any time with written notice. Upon termination, 
              the client is responsible for payment of all work completed up to the termination date.
            </p>

            <h3>11.2 Termination by Company</h3>
            <p>
              We may terminate the engagement if the client fails to make payments when due, breaches 
              these Terms, or if we determine that continuing the engagement is not in our best interest.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Support and Maintenance</h2>
            <p>
              Post-launch support and maintenance services are available separately and are not included 
              in the initial project cost unless specifically stated in the Service Agreement. Support 
              terms and pricing will be outlined in a separate agreement.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Indemnification</h2>
            <p>
              Client agrees to indemnify and hold us harmless from any claims, damages, or expenses 
              arising from the client's content, materials, or instructions, or from the client's 
              breach of these Terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>14. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes arising from these Terms 
              or our services will be resolved through:
            </p>
            <ul>
              <li>First, good faith negotiations between the parties</li>
              <li>If negotiations fail, binding arbitration in Lucknow, Uttar Pradesh</li>
              <li>As a last resort, litigation in the courts of Lucknow, Uttar Pradesh</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>15. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective upon 
              posting the updated Terms on our website. Continued use of our services after changes 
              constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>16. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions 
              will continue in full force and effect.
            </p>
          </section>

          <section className="terms-section">
            <h2>17. Entire Agreement</h2>
            <p>
              These Terms, together with any applicable Service Agreement, constitute the entire 
              agreement between the parties and supersede all prior agreements and understandings.
            </p>
          </section>

          <section className="terms-section">
            <h2>18. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> info.makerr@gmail.com</p>
              <p><strong>Phone:</strong> +91 8957688223</p>
              <p><strong>Address:</strong> Lucknow, Uttar Pradesh 226010, India</p>
            </div>
            <p>
              By using our services, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
