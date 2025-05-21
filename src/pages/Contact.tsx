import { useState } from 'react';
import { MapPin, Mail, Phone, Copy, Check, Building2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to webhook
      await fetch('https://hook.eu2.make.com/b4oxd6e27jakrnsk6u1rawhyjlay0kp5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Action": "Contact",
          ...formData
        })
      });

      // Store in Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-400">Get in touch with our team</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative">
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
              <div className="absolute inset-0 rounded-2xl opacity-50">
                <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
              </div>

              {/* Energy wave effects */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
              </div>

              {/* Form Content */}
              <div className="relative">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
              <div className="absolute inset-0 rounded-2xl opacity-50">
                <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
              </div>

              <div className="relative space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  {/* Company Name */}
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group">
                    <Building2 className="w-6 h-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="font-semibold">Adapting Automations</h3>
                      <p className="text-gray-400">Registration Number: 90072707</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group">
                    <MapPin className="w-6 h-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-400">Balledonk 14a</p>
                      <p className="text-gray-400">Heeswijk-Dinther</p>
                      <p className="text-gray-400">Noord-Brabant, Nederland</p>
                    </div>
                  </div>

                  {/* Email */}
                  <button
                    onClick={() => copyToClipboard('contact@adaptingautomations.com', 'email')}
                    className="w-full flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <Mail className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-grow text-left">
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-400">contact@adaptingautomations.com</p>
                    </div>
                    {copiedField === 'email' ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors group">
                    <Phone className="w-6 h-6 text-purple-400 mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-400">Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}