import { useState } from 'react';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { 
  Mail, 
  Users, 
  Settings, 
  Database, 
  BarChart, 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Send,
  Target
} from 'lucide-react';

export function Outreach() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'templates' | 'settings'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Left Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative p-6 rounded-xl bg-gradient-to-r from-[#0f1629]/80 to-[#1e1b4b]/80 border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_70%)]" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              <span className="flex items-center gap-2">
                <Mail className="w-8 h-8 text-purple-400" />
                Outreach Management
              </span>
            </h1>
            <p className="text-gray-400">
              Manage your email outreach campaigns
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-lg border border-purple-500/30">
              <div className="flex">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'campaigns', label: 'Campaigns' },
                  { id: 'templates', label: 'Templates' },
                  { id: 'settings', label: 'Settings' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 fade-in-animation">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Emails Sent', value: '12,486', icon: Send, color: 'purple' },
                { label: 'Open Rate', value: '42%', icon: Mail, color: 'blue' },
                { label: 'Response Rate', value: '18%', icon: Zap, color: 'green' },
                { label: 'Active Campaigns', value: '3', icon: Target, color: 'orange' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                  
                  <div className="relative flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl font-semibold">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Campaigns */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
              
              <div className="relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Active Campaigns
                  </h2>
                  
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                    <Plus className="w-4 h-4" />
                    New Campaign
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Q2 Lead Generation', status: 'active', progress: 65, emails: 4500, opens: 1890, responses: 756 },
                    { name: 'Product Launch', status: 'active', progress: 30, emails: 2200, opens: 968, responses: 352 },
                    { name: 'Follow-up Sequence', status: 'paused', progress: 80, emails: 1800, opens: 720, responses: 234 }
                  ].map((campaign, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-sm ${campaign.status === 'active' ? 'text-green-400' : 'text-yellow-400'} bg-${campaign.status === 'active' ? 'green' : 'yellow'}-500/10 px-2 py-0.5 rounded-full`}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-400">{campaign.progress}% complete</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
                            <BarChart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${campaign.status === 'active' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} rounded-full`} 
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Emails Sent</p>
                          <p className="font-medium">{campaign.emails.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Opens</p>
                          <p className="font-medium">{campaign.opens.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Responses</p>
                          <p className="font-medium">{campaign.responses.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
              
              <div className="relative">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Recent Leads
                </h2>
                
                <div className="space-y-4">
                  {[
                    { name: 'John Smith', email: 'john.smith@example.com', company: 'Acme Inc.', status: 'new' },
                    { name: 'Sarah Johnson', email: 'sarah.j@example.com', company: 'Tech Solutions', status: 'contacted' },
                    { name: 'Michael Brown', email: 'michael.b@example.com', company: 'Global Services', status: 'responded' }
                  ].map((lead, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{lead.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-400">{lead.email}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-400">{lead.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lead.status === 'new' && (
                          <span className="flex items-center gap-1 text-blue-400 text-sm bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            New Lead
                          </span>
                        )}
                        {lead.status === 'contacted' && (
                          <span className="flex items-center gap-1 text-yellow-400 text-sm bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                            Contacted
                          </span>
                        )}
                        {lead.status === 'responded' && (
                          <span className="flex items-center gap-1 text-green-400 text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                            Responded
                          </span>
                        )}
                        <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    View all leads
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-8 fade-in-animation">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Campaign Management</h2>
            <p className="text-gray-400 mb-8">
              Create and manage your outreach campaigns
            </p>
            
            {/* Campaigns content would go here */}
            <div className="text-center py-12 text-gray-400">
              Campaign management module content will be implemented in a future update
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-8 fade-in-animation">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Email Templates</h2>
            <p className="text-gray-400 mb-8">
              Create and manage email templates
            </p>
            
            {/* Templates content would go here */}
            <div className="text-center py-12 text-gray-400">
              Email templates module content will be implemented in a future update
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8 fade-in-animation">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Outreach Settings</h2>
            <p className="text-gray-400 mb-8">
              Configure your outreach settings
            </p>
            
            {/* Settings content would go here */}
            <div className="text-center py-12 text-gray-400">
              Settings module content will be implemented in a future update
            </div>
          </div>
        )}
      </div>
    </div>
  );
}