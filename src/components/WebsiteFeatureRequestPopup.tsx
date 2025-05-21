import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Send, 
  User, 
  Mail, 
  Building2, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  X,
  Lightbulb
} from 'lucide-react';
import toast from 'react-hot-toast';

const requestTypes = [
  'Feature Request',
  'Custom Solution',
  'Integration Question',
  'Pricing Inquiry',
  'Technical Question',
  'Other'
];

export function WebsiteFeatureRequestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requestType: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name.trim()) throw new Error('Name is required');
      if (!formData.email.trim()) throw new Error('Email is required');
      if (!formData.requestType) throw new Error('Request type is required');
      if (!formData.description.trim()) throw new Error('Description is required');

      // Submit to Supabase
      const { error: supabaseError } = await supabase
        .from('website_feature_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          request_type: formData.requestType,
          description: formData.description
        });

      if (supabaseError) throw supabaseError;

      // Show success message
      setIsSuccess(true);
      toast.success('Your request has been submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        requestType: '',
        description: ''
      });

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting request:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast.error('Failed to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    setIsSuccess(false);
    setError(null);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto my-16">
      {/* Feature Request Block */}
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30 overflow-hidden">
        {/* Animated gradient effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.1),transparent_70%)]"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-20 h-20 rounded-full bg-purple-500/10 blur-xl"></div>
          <div className="absolute bottom-10 left-20 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold">Have a Feature in Mind?</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Whether you're looking for a specific feature, have a question about what's possible, or need a custom solution for your business, our team is here to help. Submit your request and we'll get back to you with a personalized response.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                <span>Get expert advice on what's possible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                <span>Request custom features for your website</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5" />
                <span>Receive a personalized response from our team</span>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-auto">
            <button
              onClick={openModal}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 group"
            >
              <span>Submit Your Request</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 backdrop-blur-sm overflow-hidden">
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

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative">
                <h2 className="text-2xl font-bold mb-6">Request a Feature or Ask a Question</h2>
                
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Request Submitted!</h3>
                    <p className="text-gray-300 text-center max-w-md mb-6">
                      Thank you for your request. Our team will review it and get back to you soon.
                    </p>
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="Your name"
                            required
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="your@email.com"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="Your company"
                          />
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      {/* Request Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Request Type *
                        </label>
                        <div className="relative">
                          <select
                            name="requestType"
                            value={formData.requestType}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                            required
                          >
                            <option value="">Select request type</option>
                            {requestTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description *
                      </label>
                      <div className="relative">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={5}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          placeholder="Describe your request or question in detail..."
                          required
                        ></textarea>
                        <FileText className="absolute left-3 top-6 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Request</span>
                        </>
                      )}
                    </button>

                    <p className="text-sm text-gray-400 text-center">
                      We'll review your request and respond as soon as possible.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}