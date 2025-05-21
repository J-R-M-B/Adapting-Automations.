import { useState } from 'react';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { 
  MailCheck,
  LayoutDashboard, 
  Settings, 
  FileText, 
  Users, 
  BarChart, 
  Zap, 
  Download, 
  Plus,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { NewsletterLayoutTab } from '../../components/newsletter/NewsletterLayoutTab';
import { NewsletterSubscribersTab } from '../../components/newsletter/NewsletterSubscribersTab';
import { NewsletterSettingsTab } from '../../components/newsletter/NewsletterSettingsTab';


export function Newsletter() {
  const [activeTab, setActiveTab] = useState<'layout' | 'subscribers' | 'settings'>('layout');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Left Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-16 p-8 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative p-6 rounded-xl bg-gradient-to-r from-[#0f1629]/80 to-[#1e1b4b]/80 border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_70%)]" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              <span className="flex items-center gap-2">
                <MailCheck className="w-8 h-8 text-purple-400" />
                Newsletter Management
              </span>
            </h1>
            <p className="text-gray-400">
              Create and manage your newsletter campaigns
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-lg border border-purple-500/30">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('layout')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'layout'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  Layout
                </button>
                <button
                  onClick={() => setActiveTab('subscribers')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'subscribers'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  Subscribers
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'layout' && <NewsletterLayoutTab />}
        {activeTab === 'subscribers' && <NewsletterSubscribersTab />}
        {activeTab === 'settings' && <NewsletterSettingsTab />}
      </div>
    </div>
  );
}