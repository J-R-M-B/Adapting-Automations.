interface Section {
  id: string;
  title: string;
  content: string | string[];
}

export function Terms() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: 'These Terms of Service ("Terms") govern your access to and use of the services provided by Adapting Automations ("we," "us," or "our"). By using our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.'
    },
    {
      id: 'applicability',
      title: '2. Applicability',
      content: 'These Terms apply to all current and future offers, agreements, and services provided by Adapting Automations, unless explicitly stated otherwise.'
    },
    {
      id: 'offers',
      title: '3. Offers and Quotations',
      content: 'All offers and quotations provided by Adapting Automations are non-binding until accepted. Once an offer is accepted, it becomes binding, subject to unforeseen changes in circumstances. Unless otherwise stated, offers and quotations are valid for 14 days.'
    },
    {
      id: 'formation',
      title: '4. Formation of Agreement',
      content: 'A legally binding agreement is formed when a written agreement is reached between Adapting Automations and the client, either through email, contract, or any other form of written communication.'
    },
    {
      id: 'execution',
      title: '5. Execution of Services',
      content: 'The delivery of our services varies per project and may involve providing implementation code, transferring information, or managing specific processes on the client\'s behalf. Clients are responsible for providing necessary information and/or creating accounts when required to facilitate service delivery. Adapting Automations will use commercially reasonable efforts to deliver services with due care and skill.'
    },
    {
      id: 'delivery',
      title: '6. Delivery and Risk',
      content: 'The risk for delivered products or services transfers to the client upon delivery, installation, or acceptance, whichever occurs first. For custom-made software or no-code automations without a maintenance contract, Adapting Automations offers support for 90 days after delivery to resolve any issues if something stops working or breaks. After this period, Adapting Automations is no longer responsible unless a maintenance agreement is in place.'
    },
    {
      id: 'acceptance',
      title: '7. Acceptance',
      content: 'There is no formal acceptance system for our services. The services are deemed accepted upon delivery or once the client begins using the delivered services.'
    },
    {
      id: 'duration',
      title: '8. Duration and Termination',
      content: 'The agreement will continue until the client cancels their subscription, or, in the case of a non-subscription project, when the system has been delivered and accepted by the client.'
    },
    {
      id: 'confidentiality',
      title: '9. Confidentiality',
      content: 'Both parties agree to maintain full confidentiality regarding the specific methods, technologies, and processes used to create or operate the services provided by Adapting Automations. Clients are permitted to discuss the functionality of the delivered services, but not the details of how the system works or how it was created.'
    },
    {
      id: 'intellectual-property',
      title: '10. Intellectual Property',
      content: 'All intellectual property rights related to the services provided by Adapting Automations, including but not limited to code, designs, and methodologies, remain the exclusive property of Adapting Automations. Clients are strictly prohibited from reproducing, copying, replicating, selling, sublicensing, distributing, or disclosing proprietary information related to the services provided.'
    },
    {
      id: 'liability',
      title: '11. Limitation of Liability',
      content: [
        'To the fullest extent permitted by Dutch law, Adapting Automations shall not be liable for any direct, indirect, incidental, consequential, or special damages, including but not limited to loss of profits, revenue, data, or business opportunities, arising from the use of or inability to use our services.',
        'Adapting Automations is not liable for any damages resulting from circumstances beyond its control, including but not limited to natural disasters, strikes, pandemics, technical failures, or other force majeure events. In the event of any issues with our services, Adapting Automations will make commercially reasonable efforts to resolve the problem but cannot guarantee that all issues will be resolved.'
      ]
    },
    {
      id: 'privacy',
      title: '12. Privacy and Data Processing',
      content: 'Adapting Automations complies with the General Data Protection Regulation (GDPR) and Dutch privacy laws. We handle personal data in accordance with our Privacy Policy. Clients are encouraged to review our Privacy Policy for more information on how personal data is collected, used, and protected.'
    },
    {
      id: 'dispute',
      title: '13. Dispute Resolution',
      content: 'In the event of a dispute, both parties agree to first attempt to resolve the issue through direct communication, clearly outlining the nature of the dispute and discussing who is in the right. If no agreement can be reached through communication, the dispute will be taken to court and resolved in a legal manner under Dutch law.'
    },
    {
      id: 'governing-law',
      title: '14. Governing Law and Jurisdiction',
      content: 'These Terms are governed by and construed in accordance with the laws of the Netherlands. Any disputes arising from or related to these Terms or our services shall be resolved exclusively in the competent courts of the Netherlands.'
    },
    {
      id: 'miscellaneous',
      title: '15. Miscellaneous Provisions',
      content: [
        '• Transfer of Rights: Clients may not transfer their rights or obligations under these Terms to a third party without the prior written consent of Adapting Automations.',
        '• Severability: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.',
        '• Entire Agreement: These Terms, together with any written agreement between the parties, constitute the entire agreement between Adapting Automations and the client, superseding any prior agreements or understandings.'
      ]
    },
    {
      id: 'contact',
      title: '16. Contact Information',
      content: [
        'If you have any questions about these Terms, please contact us at:',
        '• Adapting Automations',
        '• Email: contact@adaptingautomations.com',
        '• Registered Address: Balledonk 14a, Heeswijk-Dinther, 5473 BE, The Netherlands',
        '\nBy using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: February 25, 2025</p>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <nav>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {sections.map(section => (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-24 p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold mb-6">{section.title}</h2>
              <div className="space-y-4">
                {Array.isArray(section.content) ? (
                  section.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 p-6 rounded-lg bg-purple-900/20 backdrop-blur-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="text-gray-300">
            <p>Adapting Automations</p>
            <p>Email: contact@adaptingautomations.com</p>
            <p>Registered Address: Balledonk 14a, Heeswijk-Dinther, 5473 BE, The Netherlands</p>
          </div>
        </div>
      </div>
    </div>
  );
}