import { useState } from 'react';
import { 
  Building2, Mail, Phone, User, DollarSign, Briefcase, 
  Settings, Plus, X, ArrowRight, Lightbulb, Target, Workflow
} from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  budget: number;
  needsAnalysis: boolean;
  industry: string;
  companyDescription: string;
  automationGoal: string;
  systems: string[];
}

const industries = [
  'Technology',
  'Manufacturing',
  'Healthcare',
  'Finance',
  'Retail',
  'Education',
  'Professional Services',
  'Real Estate',
  'Construction',
  'Transportation',
  'Other'
];

export function ConsultationForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    budget: 5000,
    needsAnalysis: false,
    industry: '',
    companyDescription: '',
    automationGoal: '',
    systems: ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSystemChange = (index: number, value: string) => {
    const newSystems = [...formData.systems];
    newSystems[index] = value;
    setFormData(prev => ({ ...prev, systems: newSystems }));
  };

  const addSystem = () => {
    setFormData(prev => ({ ...prev, systems: [...prev.systems, ''] }));
  };

  const removeSystem = (index: number) => {
    const newSystems = formData.systems.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, systems: newSystems }));
  };

  const formatBudget = (value: number) => {
    return value >= 20000 ? '$20,000+' : `$${value.toLocaleString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert into Supabase
      const { error } = await supabase.from('schedule_call_submissions').insert({
        user_id: user?.id || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.companyName || null,
        solution_type: formData.industry,
        preferred_date: new Date().toISOString().split('T')[0], // Current date as fallback
        preferred_time: '09:00', // Default time as fallback
        message: formData.companyDescription + '\n\n' + formData.automationGoal
      });

      if (error) throw error;

      toast.success('Consultation request submitted successfully!');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phone: '',
        budget: 5000,
        needsAnalysis: false,
        industry: '',
        companyDescription: '',
        automationGoal: '',
        systems: ['']
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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

        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-400" />
                Budget Range
              </h3>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">$500</span>
                  <span className="font-medium">{formatBudget(formData.budget)}</span>
                  <span className="text-gray-400">$20,000+</span>
                </div>
                <input
                  type="range"
                  name="budget"
                  min="500"
                  max="20000"
                  step="500"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <label className="flex items-start gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 cursor-pointer group hover:bg-purple-500/20 transition-all">
                <input
                  type="checkbox"
                  name="needsAnalysis"
                  checked={formData.needsAnalysis}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-gray-700 text-purple-500 focus:ring-purple-500/20"
                />
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-purple-400" />
                    I'm not sure what processes to automate yet
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Our technical consultant can analyze your workflow and identify automation opportunities
                  </p>
                </div>
              </label>
            </div>

            {/* Business Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Business Details
              </h3>

              <div className="space-y-6">
                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-400">
                    Select the primary sector your business operates in
                  </p>
                </div>

                {/* Company Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What does your company produce or provide? *
                  </label>
                  <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    placeholder="Brief description of your main products/services"
                  />
                </div>

                {/* Automation Goal */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Which process would you like to automate? *
                  </label>
                  <textarea
                    name="automationGoal"
                    value={formData.automationGoal}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    placeholder="Describe the specific task or workflow you want to optimize"
                  />
                </div>

                {/* Current Software Stack */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Current Software Stack
                  </label>
                  <div className="space-y-3">
                    {formData.systems.map((system, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="relative flex-grow">
                          <input
                            type="text"
                            value={system}
                            onChange={(e) => handleSystemChange(index, e.target.value)}
                            placeholder={`System ${index + 1}`}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          />
                          <Settings className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {index === 0 ? (
                          <button
                            type="button"
                            onClick={addSystem}
                            className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
                          >
                            <Plus className="w-5 h-5 text-purple-400" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeSystem(index)}
                            className="p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                          >
                            <X className="w-5 h-5 text-red-400" />
                          </button>
                        )}
                      </div>
                    ))}
                    <p className="text-sm text-gray-400">
                      List the key systems you'd like to integrate with
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}