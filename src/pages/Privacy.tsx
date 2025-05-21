interface Section {
  id: string;
  title: string;
  content: string | string[];
}

export function Privacy() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: [
        'Welcome to Adapting Automations (hereinafter referred to as "we," "us," or "our"). We are committed to protecting your personal data and respecting your privacy in accordance with the EU General Data Protection Regulation (GDPR) and applicable Dutch law.',
        'This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our website and services. Please read this Privacy Policy carefully. By using our website and services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.'
      ]
    },
    {
      id: 'who-we-are',
      title: '2. Who We Are',
      content: [
        'Company Name: Adapting Automations',
        'Address: Balledonk 14a, Heeswijk-Dinther, 5473 BE, The Netherlands',
        'Chamber of Commerce (KvK) Registration Number: 90072707',
        'Email: contact@adaptingautomations.com',
        'For any questions or concerns regarding this Privacy Policy or how we handle your data, please contact us at the email address above.'
      ]
    },
    {
      id: 'scope',
      title: '3. Scope of This Policy',
      content: [
        'This Privacy Policy applies to data we collect when you:',
        '1. Visit or interact with our website (including any forms).',
        '2. Use our AI automation services, including subscriptions for maintenance, credits, or updates.',
        '3. Communicate with us via email or other channels.'
      ]
    },
    {
      id: 'data-collection',
      title: '4. What Data We Collect',
      content: [
        '4.1 Personal Data You Provide Voluntarily',
        'We collect and store personal data that you provide to us when filling in forms on our website, subscribing to our services, or communicating with us directly. This may include:',
        '• Name',
        '• Email address',
        '• Phone number',
        'We do not collect or store payment details on our servers. If payments are processed, they are handled through third-party payment processors that maintain their own privacy and security practices.',
        '4.2 Automatically Collected Data',
        'At this time, we do not actively collect IP addresses, browser information, or navigation data for analytics. However, we reserve the right to use analytics or cookies in the future to improve our services. Should we do so, we will update this Privacy Policy accordingly and obtain any necessary consents.',
        '4.3 Data Collected Through Third-Party Services',
        'Our website is created with bolt.new, runs on Stackblitz, and is hosted by Netlify, with our database on Supabase (SQL database). These third-party providers may log certain technical data (e.g., IP addresses, device information) to ensure the security and stability of their services. Any data they collect is governed by their respective privacy policies.'
      ]
    },
    {
      id: 'data-use',
      title: '5. How We Use Your Data',
      content: [
        'We use the personal data we collect for the following purposes:',
        '1. Service Provision:',
        '   To provide our AI automation services, manage subscriptions (maintenance, credits, updates), respond to your inquiries, and process any requests you make.',
        '2. Communication:',
        '   To respond to your questions or requests, and to keep you updated about changes or improvements to our services.',
        '3. Website Functionality:',
        '   To ensure our website functions properly, provide access to online forms, and improve user experience.',
        '4. Legal Compliance:',
        '   To comply with applicable laws, regulations, and guidelines set by government authorities, including the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).'
      ]
    },
    {
      id: 'legal-bases',
      title: '6. Legal Bases for Processing',
      content: [
        'Under the GDPR, we rely on the following legal bases to process your personal data:',
        '• Consent: When you voluntarily submit personal data through our contact forms or sign up for our subscriptions.',
        '• Contract: When processing is necessary for the performance of a contract with you (e.g., providing subscribed services).',
        '• Legitimate Interests: For maintaining our website and ensuring it operates securely and effectively (e.g., limited logging by our hosting or database providers).'
      ]
    },
    {
      id: 'data-retention',
      title: '7. Data Retention',
      content: [
        'We will retain your personal data only for as long as is necessary to fulfill the purposes for which it was collected or as required by law. Specifically:',
        '• Contact Information: Stored as long as you have an active subscription or if necessary for business and legal purposes (e.g., accounting records), unless you request deletion earlier.',
        '• Account Information (if any): Deleted upon your request or after we no longer need it to provide our services.',
        'If you wish to have your personal data deleted sooner, please contact us at contact@adaptingautomations.com.'
      ]
    },
    {
      id: 'data-sharing',
      title: '8. Data Sharing and Transfers',
      content: [
        'We do not sell or rent your personal data to third parties.',
        'However, we may share your data with:',
        '1. Service Providers:',
        '   • Netlify (Hosting)',
        '   • Stackblitz (Development environment)',
        '   • Supabase (Database)',
        '2. Legal Compliance:',
        '   If required by law or to respond to legal process, we may share data with law enforcement agencies, regulators, courts, or other governmental authorities.'
      ]
    },
    {
      id: 'data-protection',
      title: '9. How We Protect Your Data',
      content: 'We take appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.'
    },
    {
      id: 'gdpr-rights',
      title: '10. Your Rights Under GDPR',
      content: [
        'Under the GDPR, you have various rights regarding your personal data, including:',
        '• Right of Access',
        '• Right to Rectification',
        '• Right to Erasure ("Right to be Forgotten")',
        '• Right to Restrict Processing',
        '• Right to Data Portability',
        '• Right to Object',
        '• Right to Withdraw Consent'
      ]
    },
    {
      id: 'changes',
      title: '11. Changes to This Privacy Policy',
      content: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised "Last updated" date.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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