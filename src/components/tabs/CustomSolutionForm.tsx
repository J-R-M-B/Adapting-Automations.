import { useState } from 'react';
import { 
  X, ArrowRight, Lightbulb, Target, Clock, 
  DollarSign, CheckCircle2, ArrowUpRight, Phone
} from 'lucide-react';

interface CustomSolutionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomSolutionForm({ isOpen, onClose }: CustomSolutionFormProps) {
  const [formData, setFormData] = useState({
    concept: '',
    industry: '',
    budget: 5000,
    timeline: '3months',
    outcomes: new Set<string>()
  });

  if (!isOpen) return null;

  const handleOutcomeToggle = (outcome: string) => {
    const newOutcomes = new Set(formData.outcomes);
    if (newOutcomes.has(outcome)) {
      newOutcomes.delete(outcome);
    } else {
      newOutcomes.add(outcome);
    }
    setFormData({ ...formData, outcomes: newOutcomes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 p-8 border-2 border-[#2A0A29]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Phone className="text-purple-400" /> Schedule a Call
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Let's discuss your needs and explore how our solutions can benefit your company. 
            There are no strings attached, and scheduling a call is completely non-binding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden border-2 border-[#2A0A29]">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
            <div className="absolute inset-0 rounded-2xl opacity-50">
              <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
            </div>

            <div className="relative space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What would you like to automate?
                </label>
                <input
                  type="text"
                  value={formData.concept}
                  onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Describe your automation idea"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="">Select your industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Budget Range
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                    className="flex-grow h-2 rounded-lg appearance-none bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 cursor-pointer"
                  />
                  <span className="text-gray-300 min-w-[100px]">
                    €{formData.budget.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="1month">Within 1 month</option>
                  <option value="3months">1-3 months</option>
                  <option value="6months">3-6 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Desired Outcomes
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Cost Reduction',
                    'Increased Efficiency',
                    'Better Accuracy',
                    'Faster Processing',
                    'Customer Satisfaction',
                    'Data Insights'
                  ].map((outcome) => (
                    <button
                      key={outcome}
                      onClick={() => handleOutcomeToggle(outcome)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        formData.outcomes.has(outcome)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {outcome}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2">
                Schedule a Call
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-gray-400 text-sm text-center">
                No strings attached. Scheduling a call is completely non-binding.
              </p>
            </div>
          </div>

          {/* Ideation Section */}
          <div className="space-y-8">
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden border-2 border-[#2A0A29]">
              <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
              <div className="absolute inset-0 rounded-2xl opacity-50">
                <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
              </div>

              <div className="relative">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="text-purple-400" /> Automation Ideas
                </h3>
                <div className="space-y-4">
                  {[
                    'Customer support automation',
                    'Document processing & analysis',
                    'Inventory management',
                    'Sales pipeline automation',
                    'HR process automation',
                    'Data entry & validation'
                  ].map((idea, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                      <span className="flex-grow">{idea}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden border-2 border-[#2A0A29]">
              <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
              <div className="absolute inset-0 rounded-2xl opacity-50">
                <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
              </div>

              <div className="relative">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="text-purple-400" /> Key Benefits
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Clock, text: '60% time savings on average' },
                    { icon: DollarSign, text: '40% cost reduction' },
                    { icon: CheckCircle2, text: '99.9% accuracy rate' },
                    { icon: Lightbulb, text: 'Enhanced user experience' }
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50"
                    >
                      <benefit.icon className="w-5 h-5 text-purple-400" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}