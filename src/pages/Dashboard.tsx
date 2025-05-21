import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { 
  LayoutDashboard, 
  BarChart, 
  Users, 
  Clock, 
  Calendar, 
  ArrowUpRight,
  CheckCircle,
  Zap
} from 'lucide-react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Link } from 'react-router-dom';
import { SubscriptionStatus } from '../components/SubscriptionStatus';

function Dashboard() {
  const { user } = useAuth();
  
  // Stats for the dashboard
  const stats = [
    { 
      label: 'Active Projects', 
      value: '3', 
      icon: Zap, 
      color: 'purple',
      change: '+1 this week',
      isPositive: true
    },
    { 
      label: 'Scheduled Posts', 
      value: '12', 
      icon: Calendar, 
      color: 'blue',
      change: '4 today',
      isPositive: true
    },
    { 
      label: 'Total Users', 
      value: '28', 
      icon: Users, 
      color: 'green',
      change: '+3 this month',
      isPositive: true
    },
    { 
      label: 'Uptime', 
      value: '99.9%', 
      icon: Clock, 
      color: 'orange',
      change: 'Last 30 days',
      isPositive: true
    }
  ];

  // Recent activities
  const activities = [
    {
      id: 1,
      action: 'Post scheduled',
      description: 'LinkedIn post scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      platform: 'linkedin'
    },
    {
      id: 2,
      action: 'Newsletter sent',
      description: 'Weekly newsletter sent to 156 subscribers',
      time: '5 hours ago',
      platform: 'email'
    },
    {
      id: 3,
      action: 'New subscriber',
      description: 'john.doe@example.com subscribed to your newsletter',
      time: '1 day ago',
      platform: 'email'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Left Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-16 p-8 transition-all duration-300">
        {/* Welcome Section */}
        <div className="relative p-6 rounded-xl bg-gradient-to-r from-[#0f1629]/80 to-[#1e1b4b]/80 border border-purple-500/30 overflow-hidden mb-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_70%)]" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Welcome back, {user?.email?.split('@')[0]}
            </h1>
            <p className="text-gray-400">
              Here's an overview of your dashboard
            </p>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="mb-8">
          <SubscriptionStatus />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
              
              <div className="relative flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-400">
                    <ArrowUpRight className={`w-3 h-3 ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
            
            <div className="relative">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium group-hover:text-purple-300 transition-colors">{activity.action}</h3>
                        <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  View all activity
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
            
            <div className="relative">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <Link 
                  to="/dashboard/social-media"
                  className="block p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <h3 className="font-medium">Schedule Social Post</h3>
                  <p className="text-sm text-gray-400 mt-1">Create and schedule content across platforms</p>
                </Link>
                
                <Link 
                  to="/dashboard/newsletter"
                  className="block p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-blue-500/30 hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10" 
                >
                  <h3 className="font-medium">Manage Newsletter</h3>
                  <p className="text-sm text-gray-400 mt-1">Create and manage newsletter content</p>
                </Link>
                
                <Link 
                  to="/consulting"
                  className="block p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <h3 className="font-medium">Consulting Services</h3>
                  <p className="text-sm text-gray-400 mt-1">Explore our AI consulting packages</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
          
          <div className="relative">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              System Status
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Social Media', status: 'Operational', color: 'green' },
                { name: 'Chatbot', status: 'Operational', color: 'green' },
                { name: 'Phone Agent', status: 'Operational', color: 'green' },
                { name: 'Website', status: 'Operational', color: 'green' }
              ].map((service, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <h3 className="font-medium mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${service.color}-500`}></div>
                    <span className="text-sm text-gray-400">{service.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Dashboard };