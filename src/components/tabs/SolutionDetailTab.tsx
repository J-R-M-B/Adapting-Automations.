import { 
  CheckCircle2, ArrowUpRight, Settings, Workflow, Zap, ArrowRight, Phone
} from 'lucide-react';
import { Solution } from '../../types/solutions';
import { BarChart } from '../ui/bar-chart';

interface SolutionDetailTabProps {
  solution: Solution;
  onRequestCustomSolution: () => void;
}

export function SolutionDetailTab({ solution, onRequestCustomSolution }: SolutionDetailTabProps) {
  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-lg bg-purple-500/20">
          <solution.icon className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold">{solution.title}</h2>
      </div>

      <p className="text-gray-300 mb-8">{solution.description}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Benefits & Metrics */}
        <div className="space-y-8">
          <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29]">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-400" /> Key Benefits
            </h3>
            <ul className="space-y-2">
              {solution.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29]">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart className="w-5 h-5 text-purple-400" /> Performance Metrics
            </h3>
            <ul className="space-y-2">
              {solution.metrics.map((metric, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowUpRight className="w-4 h-4 text-green-400 mt-1" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specs & Integrations */}
        <div className="space-y-8">
          <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29]">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" /> Specifications
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Timeline:</span>
                <span>{solution.specs.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Complexity:</span>
                <span>{solution.specs.complexity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Maintenance:</span>
                <span>{solution.specs.maintenance}</span>
              </div>
            </div>
          </div>

          <div className="relative p-6 rounded-xl bg-gray-900/50 border-2 border-[#2A0A29]">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-purple-400" /> Integrations
            </h3>
            <ul className="space-y-2">
              {solution.integrations.map((integration, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-purple-400 mt-1" />
                  <span>{integration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={onRequestCustomSolution}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center gap-2"
        >
          Schedule a Call
          <Phone className="w-5 h-5" />
        </button>
        <p className="text-gray-400 mt-4 text-center max-w-2xl">
          Everyone is welcome to schedule a call to discuss your needs and explore how our solutions can benefit your company. 
          There are no strings attached, and scheduling a call is completely non-binding.
        </p>
      </div>
    </div>
  );
}