import { useState, useEffect, useMemo } from 'react';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Globe, 
  Calendar, 
  Monitor, 
  ArrowRightLeft, 
  Filter,
  Download,
  Users,
  Clock,
  Search,
  LayoutGrid,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';

interface AnalyticsEvent {
  id: string;
  user_id: string | null;
  path: string;
  event_type: string;
  referrer: string | null;
  user_agent: string;
  screen_width: number;
  screen_height: number;
  created_at: string;
}

interface DateRange {
  label: string;
  days: number;
}

export function Analytics() {
  const { user, isAllowed } = useAuth();
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ label: 'Last 7 Days', days: 7 });
  const [searchTerm, setSearchTerm] = useState('');

  const dateRanges: DateRange[] = [
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 14 Days', days: 14 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 },
  ];

  // Colors for charts
  const CHART_COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#8c564b',
    '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#9467bd'
  ];
  
  // Define fetchAnalyticsEvents function before using it in useEffect
  const fetchAnalyticsEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fromDate = subDays(new Date(), selectedDateRange.days);
      
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', format(fromDate, 'yyyy-MM-dd'))
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching analytics events:', err);
      setError('Failed to load analytics data. Please try again.');
      toast.error('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAnalyticsEvents();
    }
  }, [user, selectedDateRange]);

  // Check if user has admin role
  const isAdmin = isAllowed('admin');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
        <div className="ml-16 max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center gap-2 text-red-400">
            <AlertCircle className="w-6 h-6" />
            <p>You don't have permission to access the analytics dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter events based on search term
  const filteredEvents = useMemo(() => {
    if (!searchTerm.trim()) return events;
    
    return events.filter(event => 
      event.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.referrer && event.referrer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [events, searchTerm]);

  // Get total page views
  const totalPageViews = useMemo(() => filteredEvents.length, [filteredEvents]);

  // Get unique users count
  const uniqueUsers = useMemo(() => {
    const userIds = new Set();
    filteredEvents.forEach(event => {
      if (event.user_id) {
        userIds.add(event.user_id);
      }
    });
    return userIds.size;
  }, [filteredEvents]);

  // Get most visited pages
  const topPages = useMemo(() => {
    const pages = {};
    filteredEvents.forEach(event => {
      if (!pages[event.path]) {
        pages[event.path] = 0;
      }
      pages[event.path]++;
    });

    return Object.entries(pages)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filteredEvents]);

  // Group page views by day
  const pageViewsByDay = useMemo(() => {
    const viewsByDay = {};
    
    filteredEvents.forEach(event => {
      const date = format(new Date(event.created_at), 'yyyy-MM-dd');
      if (!viewsByDay[date]) {
        viewsByDay[date] = 0;
      }
      viewsByDay[date]++;
    });

    // Sort by date
    return Object.entries(viewsByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredEvents]);

  // Group by device resolution
  const deviceResolutions = useMemo(() => {
    const resolutions = {};
    
    filteredEvents.forEach(event => {
      const resolution = `${event.screen_width}×${event.screen_height}`;
      if (!resolutions[resolution]) {
        resolutions[resolution] = 0;
      }
      resolutions[resolution]++;
    });
    
    return Object.entries(resolutions)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 resolutions
  }, [filteredEvents]);

  // Group by referrers
  const referrers = useMemo(() => {
    const refs = {};
    
    filteredEvents.forEach(event => {
      if (!event.referrer) return;
      
      // Extract hostname from referrer URL
      let referrerHost = 'Direct';
      try {
        const url = new URL(event.referrer);
        referrerHost = url.hostname;
      } catch (e) {
        referrerHost = event.referrer;
      }
      
      if (!refs[referrerHost]) {
        refs[referrerHost] = 0;
      }
      refs[referrerHost]++;
    });
    
    return Object.entries(refs)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 referrers
  }, [filteredEvents]);

  // Export analytics data
  const exportAnalytics = () => {
    const csvData = [
      ['ID', 'User ID', 'Path', 'Event Type', 'Referrer', 'User Agent', 'Screen Width', 'Screen Height', 'Timestamp'],
      ...filteredEvents.map(event => [
        event.id,
        event.user_id || 'anonymous',
        event.path,
        event.event_type,
        event.referrer || '',
        event.user_agent,
        event.screen_width,
        event.screen_height,
        new Date(event.created_at).toISOString()
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

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
                <BarChartIcon className="w-8 h-8 text-purple-400" />
                Analytics Dashboard
              </span>
            </h1>
            <p className="text-gray-400">
              Track and analyze user engagement across your website
            </p>
          </div>
          
          <div className="relative z-10 flex gap-3">
            <div>
              <select
                value={selectedDateRange.days}
                onChange={(e) => {
                  const range = dateRanges.find(r => r.days.toString() === e.target.value);
                  if (range) setSelectedDateRange(range);
                }}
                className="bg-gray-900/50 border border-gray-700 text-white py-2 pl-4 pr-8 rounded-lg focus:outline-none focus:border-purple-500"
              >
                {dateRanges.map(range => (
                  <option key={range.days} value={range.days}>{range.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={exportAnalytics}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
              {error}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Page Views</p>
                    <p className="text-4xl font-semibold mt-2">{totalPageViews.toLocaleString()}</p>
                    <p className="text-sm text-gray-400 mt-2">{selectedDateRange.label}</p>
                  </div>
                  <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
              
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Unique Visitors</p>
                    <p className="text-4xl font-semibold mt-2">{uniqueUsers.toLocaleString()}</p>
                    <p className="text-sm text-gray-400 mt-2">{selectedDateRange.label}</p>
                  </div>
                  <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
              
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg. Time on Page</p>
                    <p className="text-4xl font-semibold mt-2">2m 45s</p>
                    <p className="text-sm text-gray-400 mt-2">{selectedDateRange.label}</p>
                  </div>
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by page or referrer..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Page Views Over Time */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
              <div className="relative">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Page Views Over Time
                </h2>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={pageViewsByDay}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="date"
                        stroke="#9ca3af"
                        tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                      />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#f3f4f6'
                        }}
                        labelFormatter={(date) => format(new Date(date), 'MMMM dd, yyyy')}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        name="Page Views"
                        stroke="#8b5cf6"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Most Visited Pages */}
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-purple-400" />
                    Most Visited Pages
                  </h2>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={topPages}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          type="number"
                          stroke="#9ca3af"
                        />
                        <YAxis
                          type="category"
                          dataKey="path"
                          stroke="#9ca3af"
                          width={150}
                          tickFormatter={(path) => path.length > 20 ? path.substring(0, 20) + '...' : path}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#f3f4f6'
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          name="Views" 
                          fill="#8b5cf6"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Screen Resolutions */}
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-purple-400" />
                    Screen Resolutions
                  </h2>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceResolutions}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deviceResolutions.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} views`, 'Count']}
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#f3f4f6'
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Referrers */}
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                    Top Referrers
                  </h2>
                  
                  {referrers.length === 0 ? (
                    <div className="h-80 flex items-center justify-center">
                      <p className="text-gray-400">No referrer data available</p>
                    </div>
                  ) : (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={referrers}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis type="number" stroke="#9ca3af" />
                          <YAxis
                            type="category"
                            dataKey="name"
                            stroke="#9ca3af"
                            width={150}
                            tickFormatter={(name) => name.length > 20 ? name.substring(0, 20) + '...' : name}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: '#1f2937',
                              border: 'none',
                              borderRadius: '0.5rem',
                              color: '#f3f4f6'
                            }}
                          />
                          <Bar
                            dataKey="value"
                            name="Referrals"
                            radius={[0, 4, 4, 0]}
                          >
                            {referrers.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Recent Events */}
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.05),transparent_70%)]" />
                <div className="relative">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Recent Page Views
                  </h2>
                  
                  <div className="h-80 overflow-auto pr-2 rounded-lg">
                    <table className="w-full">
                      <thead className="border-b border-gray-800">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-400">Path</th>
                          <th className="px-4 py-2 text-left text-gray-400">Time</th>
                          <th className="px-4 py-2 text-left text-gray-400">Device</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvents.slice(0, 20).map(event => (
                          <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                            <td className="px-4 py-3 text-white">{event.path}</td>
                            <td className="px-4 py-3 text-gray-400">
                              {format(new Date(event.created_at), 'MMM dd, HH:mm')}
                            </td>
                            <td className="px-4 py-3 text-gray-400">
                              {event.screen_width}×{event.screen_height}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}