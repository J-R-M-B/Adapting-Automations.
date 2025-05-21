import { useState } from 'react';
import { 
  LayoutGrid, Wrench, Globe
} from 'lucide-react';
import { SolutionsBanner } from '../components/ui/solutions-banner';
import { solutionsData } from '../data/solutionsData';
import { Solution } from '../types/solutions';
import { OverviewTab } from '../components/tabs/OverviewTab';
import { SolutionDetailTab } from '../components/tabs/SolutionDetailTab';
import { ScheduleCallForm } from '../components/tabs/ScheduleCallForm';
import { ChatbotSolutionTab } from '../components/tabs/ChatbotSolutionTab';
import { PhoneAgentSolutionTab } from '../components/tabs/PhoneAgentSolutionTab';
import { WebsiteSolutionTab } from '../components/tabs/WebsiteSolutionTab';
import { SocialMediaSolutionTab } from '../components/tabs/SocialMediaSolutionTab';
import { OutreachSolutionTab } from '../components/tabs/OutreachSolutionTab';
import { CustomSolutionTab } from '../components/tabs/CustomSolutionTab';
import { SolutionsBackground } from '../components/ui/solutions-background';
import { WebsiteFeatureRequestPopup } from '../components/WebsiteFeatureRequestPopup';

export function Solutions() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isCallFormOpen, setIsCallFormOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<string | undefined>(undefined);

  // Sort solutions to put website first
  const sortedSolutions = [...solutionsData].sort((a, b) => {
    if (a.id === 'website') return -1;
    if (b.id === 'website') return 1;
    return 0;
  });

  const handleSelectSolution = (solutionId: string) => {
    setActiveTab(solutionId);
  };

  const handleScheduleCall = (solutionId?: string) => {
    setSelectedSolution(solutionId);
    setIsCallFormOpen(true);
  };

  const getActiveSolution = (): Solution | undefined => {
    return activeTab ? solutionsData.find(s => s.id === activeTab) : undefined;
  };

  const renderActiveTab = () => {
    if (!activeTab) {
      return (
        <OverviewTab 
          solutions={sortedSolutions} 
          onSelectSolution={handleSelectSolution} 
        />
      );
    }

    if (activeTab === 'custom') {
      return (
        <CustomSolutionTab
          onRequestCustomSolution={() => handleScheduleCall('custom')}
        />
      );
    }

    const activeSolution = getActiveSolution();
    if (!activeSolution) return null;

    switch (activeTab) {
      case 'chatbot':
        return (
          <ChatbotSolutionTab
            solution={activeSolution}
            onRequestCustomSolution={() => handleScheduleCall(activeTab)}
          />
        );
      case 'phone-agent':
        return (
          <PhoneAgentSolutionTab
            solution={activeSolution}
            onRequestCustomSolution={() => handleScheduleCall(activeTab)}
          />
        );
      case 'website':
        return (
          <WebsiteSolutionTab
            solution={activeSolution}
            onRequestCustomSolution={() => handleScheduleCall(activeTab)}
          />
        );
      case 'social-media':
        return (
          <SocialMediaSolutionTab
            solution={activeSolution}
            onRequestCustomSolution={() => handleScheduleCall(activeTab)}
          />
        );
      case 'outreach':
        return (
          <OutreachSolutionTab
            solution={activeSolution}
            onRequestCustomSolution={() => handleScheduleCall(activeTab)}
          />
        );
      default:
        return (
          <SolutionDetailTab 
            solution={activeSolution} 
            onRequestCustomSolution={() => handleScheduleCall(activeTab)} 
          />
        );
    }
  };

  return (
    <SolutionsBackground>
      {/* Banner with Sparkles Effect */}
      <SolutionsBanner />

      {/* Main Content */}
      <div className="relative py-12 overflow-hidden w-full">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => setActiveTab(null)}
              className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Overview</span>
            </button>
            
            {sortedSolutions.map((solution) => (
              <div key={solution.id} className="relative group">
                {solution.id === 'website' && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs font-bold bg-blue-500 px-2 py-0.5 rounded-full text-white">New</span>
                  </div>
                )}
                <button
                  onClick={() => setActiveTab(activeTab === solution.id ? null : solution.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === solution.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                      : solution.id === 'website'
                        ? 'bg-blue-500/20 text-white border border-blue-500/40 hover:border-blue-500/60'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-purple-500/20 hover:border-purple-500/40'
                  }`}
                >
                  <solution.icon className="w-4 h-4" />
                  <span>{solution.id === 'website' ? 'Webdesign' : solution.title}</span>
                  {solution.id === 'website' && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                  )}
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveTab(activeTab === 'custom' ? null : 'custom')}
              className={`px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-2 whitespace-nowrap border border-purple-500/30 hover:border-purple-500/50 ${
                activeTab === 'custom'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Custom Solutions</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="min-h-[600px]">
            {renderActiveTab()}
          </div>

          {/* Feature Request Popup */}
          <WebsiteFeatureRequestPopup />

          {/* Schedule Call Form */}
          <ScheduleCallForm 
            isOpen={isCallFormOpen} 
            onClose={() => setIsCallFormOpen(false)}
            initialSolution={selectedSolution}
          />
        </div>
      </div>
    </SolutionsBackground>
  );
}