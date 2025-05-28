import { useState } from 'react';
import { 
  X, ArrowRight, User, Mail, Phone, Building2, MessageSquare,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import toast from 'react-hot-toast';

interface WebsiteOfferClaimFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WebsiteOfferClaimForm({ isOpen, onClose }: WebsiteOfferClaimFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name.trim()) throw new Error('Name is required');
      if (!formData.email.trim()) throw new Error('Email is required');

      // Submit to Supabase
      const { error: supabaseError } = await supabase
        .from('website_offer_claims')
        .insert({
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          message: formData.message || null
        });

      if (supabaseError) throw supabaseError;

      // Show success message
      setIsSuccess(true);
      toast.success('Your offer claim has been submitted successfully!');
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting offer claim:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      toast.error('Failed to submit your offer claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg">
        <div className="relative p-6 rounded-xl overflow-hidden">
          {/* Golden gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-amber-700/30 rounded-xl border-2 border-amber-500/50"></div>
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-300 opacity-20 blur-xl"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-amber-500/20 via-yellow-400/40 to-amber-500/20"></div>
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-amber-500/20 via-yellow-400/40 to-amber-500/20"></div>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-6 h-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-400/70">
              <path d="M12 2L2 12M2 2L2 12L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-2 right-2 w-6 h-6 rotate-90">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-400/70">
              <path d="M12 2L2 12M2 2L2 12L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-2 left-2 w-6 h-6 -rotate-90">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-400/70">
              <path d="M12 2L2 12M2 2L2 12L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 rotate-180">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-400/70">
              <path d="M12 2L2 12M2 2L2 12L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-amber-800 hover:text-amber-600 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="relative z-10 py-4 px-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-amber-900">Claim Your Special Offer</h2>
              <p className="text-amber-800 mt-2">Complete Business Website for just €800</p>
            </div>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-amber-900">Offer Claimed Successfully!</h3>
                <p className="text-amber-800 text-center">
                  Thank you for claiming this offer. We'll contact you shortly to get started on your website.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-amber-50 border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-amber-900"
                      placeholder="John Doe"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-amber-50 border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-amber-900"
                      placeholder="your@email.com"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-amber-50 border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-amber-900"
                      placeholder="+1 (555) 123-4567"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Company Name (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-amber-50 border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-amber-900"
                      placeholder="Your Company"
                    />
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Additional Information (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-amber-50 border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all text-amber-900 resize-none"
                      placeholder="Tell us about your website needs..."
                    ></textarea>
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-amber-400" />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 
                    bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 
                    text-amber-900 font-semibold px-5 py-2 shadow-lg shadow-amber-500/20 border border-amber-400/50
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Claim This Offer'}
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-center text-amber-700 text-xs mt-2">
                  Limited time offer. No payment required now.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}