import { useState, useEffect, useRef } from 'react';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { 
  Phone, 
  BarChart, 
  FileText, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Play, 
  Pause, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  MessageSquare, 
  User, 
  Clock, 
  ThumbsUp, 
  ThumbsDown, 
  Smile, 
  AlertCircle, 
  CheckCircle, 
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import toast from 'react-hot-toast';

// Types
interface PhoneCallRecord {
  id: string;
  caller_name: string;
  caller_number: string;
  call_duration: string;
  transcript: string;
  summary?: string;
  analyses_summary?: string;
  success_evaluation?: string;
  audio_id?: string;
  positivity?: number;
  emotion?: string;
  clarity?: number;
  relevance_responses?: number;
  goal_achievement?: number;
  created_at?: string;
  audio_path?: string;
}

interface OutboundCall {
  id: string;
  name: string;
  phone: string;
  scheduled_time: string;
  purpose: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'failed' | 'cancelled';
}

interface AnalyticsSummary {
  avgPositivity: number;
  topEmotions: { emotion: string; count: number }[];
  avgClarity: number;
  avgRelevance: number;
  avgGoalAchievement: number;
  avgCallDuration: string;
  totalCalls: number;
}

export function PhoneAgent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'outbound'>('overview');
  const [callRecords, setCallRecords] = useState<PhoneCallRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<PhoneCallRecord[]>([]);
  const [outboundCalls, setOutboundCalls] = useState<OutboundCall[]>([]);
  const [selectedCall, setSelectedCall] = useState<PhoneCallRecord | null>(null);
  const [showCallDetails, setShowCallDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'created_at',
    direction: 'desc'
  });
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    avgPositivity: 0,
    topEmotions: [],
    avgClarity: 0,
    avgRelevance: 0,
    avgGoalAchievement: 0,
    avgCallDuration: '0m 0s',
    totalCalls: 0
  });
  const [showNewOutboundModal, setShowNewOutboundModal] = useState(false);
  const [newOutboundCall, setNewOutboundCall] = useState<Omit<OutboundCall, 'id'>>({
    name: '',
    phone: '',
    scheduled_time: '',
    purpose: '',
    notes: '',
    status: 'scheduled'
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch call records on component mount
  useEffect(() => {
    if (user) {
      fetchCallRecords();
    }
  }, [user]);

  // Update filtered records when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = callRecords.filter(record => 
        record.caller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.caller_number.includes(searchTerm) ||
        (record.transcript && record.transcript.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(callRecords);
    }
  }, [searchTerm, callRecords]);

  // Calculate analytics when call records change
  useEffect(() => {
    if (callRecords.length > 0) {
      calculateAnalytics();
    }
  }, [callRecords]);

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Fetch call records from Supabase
  const fetchCallRecords = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('phone_call_records')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCallRecords(data || []);
      setFilteredRecords(data || []);
    } catch (error) {
      console.error('Error fetching call records:', error);
      toast.error('Failed to load call records');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate analytics from call records
  const calculateAnalytics = () => {
    // Skip if no records
    if (callRecords.length === 0) return;

    // Count emotions
    const emotions: Record<string, number> = {};
    let totalPositivity = 0;
    let totalClarity = 0;
    let totalRelevance = 0;
    let totalGoalAchievement = 0;
    let totalDurationSeconds = 0;
    let validPositivityCount = 0;
    let validClarityCount = 0;
    let validRelevanceCount = 0;
    let validGoalCount = 0;

    callRecords.forEach(record => {
      // Count emotions
      if (record.emotion) {
        emotions[record.emotion] = (emotions[record.emotion] || 0) + 1;
      }

      // Sum metrics
      if (record.positivity !== undefined && record.positivity !== null) {
        totalPositivity += record.positivity;
        validPositivityCount++;
      }
      
      if (record.clarity !== undefined && record.clarity !== null) {
        totalClarity += record.clarity;
        validClarityCount++;
      }
      
      if (record.relevance_responses !== undefined && record.relevance_responses !== null) {
        totalRelevance += record.relevance_responses;
        validRelevanceCount++;
      }
      
      if (record.goal_achievement !== undefined && record.goal_achievement !== null) {
        totalGoalAchievement += record.goal_achievement;
        validGoalCount++;
      }

      // Calculate duration in seconds
      if (record.call_duration) {
        const durationParts = record.call_duration.match(/(\d+)m\s+(\d+)s/);
        if (durationParts && durationParts.length === 3) {
          const minutes = parseInt(durationParts[1]);
          const seconds = parseInt(durationParts[2]);
          totalDurationSeconds += (minutes * 60) + seconds;
        }
      }
    });

    // Get top 3 emotions
    const topEmotions = Object.entries(emotions)
      .map(([emotion, count]) => ({ emotion, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Calculate averages
    const avgPositivity = validPositivityCount > 0 ? Math.round(totalPositivity / validPositivityCount) : 0;
    const avgClarity = validClarityCount > 0 ? Math.round(totalClarity / validClarityCount) : 0;
    const avgRelevance = validRelevanceCount > 0 ? Math.round(totalRelevance / validRelevanceCount) : 0;
    const avgGoalAchievement = validGoalCount > 0 ? Math.round(totalGoalAchievement / validGoalCount) : 0;
    
    // Calculate average duration
    const avgDurationSeconds = callRecords.length > 0 ? Math.round(totalDurationSeconds / callRecords.length) : 0;
    const avgMinutes = Math.floor(avgDurationSeconds / 60);
    const avgSeconds = avgDurationSeconds % 60;
    const avgCallDuration = `${avgMinutes}m ${avgSeconds}s`;

    setAnalytics({
      avgPositivity,
      topEmotions,
      avgClarity,
      avgRelevance,
      avgGoalAchievement,
      avgCallDuration,
      totalCalls: callRecords.length
    });
  };

  // Sort records
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    const sortedRecords = [...filteredRecords].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredRecords(sortedRecords);
  };

  // View call details
  const handleViewCallDetails = async (call: PhoneCallRecord) => {
    setSelectedCall(call);
    setShowCallDetails(true);
    
    // If there's an audio path, fetch the audio file
    if (call.audio_path) {
      try {
        const { data, error } = await supabase.storage
          .from('tel.recs')
          .download(call.audio_path);
        
        if (error) throw error;
        
        // Create a URL for the audio blob
        const url = URL.createObjectURL(data);
        setAudioUrl(url);
      } catch (error) {
        console.error('Error fetching audio file:', error);
        toast.error('Failed to load audio file');
        setAudioUrl(null);
      }
    } else {
      setAudioUrl(null);
    }
  };

  // Handle audio playback
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle audio events
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Handle creating a new outbound call
  const handleCreateOutboundCall = () => {
    // In a real implementation, this would save to a database
    const newCall: OutboundCall = {
      id: Math.random().toString(36).substring(2, 9),
      ...newOutboundCall
    };
    
    setOutboundCalls([...outboundCalls, newCall]);
    setShowNewOutboundModal(false);
    setNewOutboundCall({
      name: '',
      phone: '',
      scheduled_time: '',
      purpose: '',
      notes: '',
      status: 'scheduled'
    });
    
    toast.success('Outbound call scheduled successfully');
  };

  // Render the overview tab
  const renderOverviewTab = () => {
    return (
      <div className="space-y-8">
        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Call Volume */}
          <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Call Volume</h3>
              <Phone className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold">{analytics.totalCalls}</div>
            <div className="text-sm text-gray-400 mt-2">Total calls processed</div>
          </div>
          
          {/* Average Duration */}
          <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Average Duration</h3>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold">{analytics.avgCallDuration}</div>
            <div className="text-sm text-gray-400 mt-2">Average call length</div>
          </div>
          
          {/* Top Emotions */}
          <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Emotions</h3>
              <Smile className="w-5 h-5 text-yellow-400" />
            </div>
            {analytics.topEmotions.length > 0 ? (
              <div className="space-y-2">
                {analytics.topEmotions.map((emotion, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="capitalize">{emotion.emotion}</span>
                    <span className="text-sm text-gray-400">{emotion.count} calls</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No emotion data available</div>
            )}
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
          <h3 className="text-lg font-semibold mb-6">Performance Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Positivity */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Positivity</span>
                <span className="text-sm font-medium">{analytics.avgPositivity}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${analytics.avgPositivity}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">Caller sentiment positivity</div>
            </div>
            
            {/* Clarity */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Clarity</span>
                <span className="text-sm font-medium">{analytics.avgClarity}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${analytics.avgClarity}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">Agent communication clarity</div>
            </div>
            
            {/* Relevance */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Relevance</span>
                <span className="text-sm font-medium">{analytics.avgRelevance}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${analytics.avgRelevance}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">Response relevance to queries</div>
            </div>
            
            {/* Goal Achievement */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Goal Achievement</span>
                <span className="text-sm font-medium">{analytics.avgGoalAchievement}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${analytics.avgGoalAchievement}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">Caller goals achieved</div>
            </div>
          </div>
        </div>
        
        {/* Recent Calls */}
        <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Calls</h3>
            <button 
              onClick={() => setActiveTab('records')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              View all
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : callRecords.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Phone className="w-12 h-12 mx-auto mb-4 text-gray-500 opacity-50" />
              <p>No call records found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {callRecords.slice(0, 5).map((record) => (
                <div 
                  key={record.id}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition-all cursor-pointer"
                  onClick={() => handleViewCallDetails(record)}
                >
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{record.caller_name}</h4>
                      <div className="text-sm text-gray-400 mt-1">{record.caller_number}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{record.call_duration}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {record.created_at ? new Date(record.created_at).toLocaleDateString() : 'Unknown date'}
                      </div>
                    </div>
                  </div>
                  
                  {record.emotion && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                        record.emotion.toLowerCase().includes('positive') || 
                        record.emotion.toLowerCase().includes('satisfied') || 
                        record.emotion.toLowerCase().includes('happy')
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : record.emotion.toLowerCase().includes('negative') || 
                            record.emotion.toLowerCase().includes('frustrated') || 
                            record.emotion.toLowerCase().includes('angry')
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {record.emotion}
                      </div>
                      
                      {record.success_evaluation && (
                        <div className={`px-2 py-0.5 text-xs rounded-full ${
                          record.success_evaluation.toLowerCase().includes('successful')
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : record.success_evaluation.toLowerCase().includes('partial')
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {record.success_evaluation.split(' - ')[0]}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render the records tab
  const renderRecordsTab = () => {
    return (
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, number, or transcript..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
          <button className="px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span>Filter</span>
          </button>
          <button className="px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5 text-gray-400" />
            <span>Export</span>
          </button>
        </div>
        
        {/* Call Records Table */}
        <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]"></div>
          
          <div className="relative">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Call Records
            </h3>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Phone className="w-12 h-12 mx-auto mb-4 text-gray-500 opacity-50" />
                <p>No call records found</p>
                {searchTerm && <p className="text-sm mt-2">Try adjusting your search criteria</p>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-3 text-left">
                        <button 
                          onClick={() => handleSort('caller_name')}
                          className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                        >
                          Caller
                          {sortConfig.key === 'caller_name' && (
                            sortConfig.direction === 'asc' 
                              ? <ChevronUp className="w-4 h-4" /> 
                              : <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">Phone Number</th>
                      <th className="px-4 py-3 text-left">
                        <button 
                          onClick={() => handleSort('call_duration')}
                          className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                        >
                          Duration
                          {sortConfig.key === 'call_duration' && (
                            sortConfig.direction === 'asc' 
                              ? <ChevronUp className="w-4 h-4" /> 
                              : <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left">Emotion</th>
                      <th className="px-4 py-3 text-left">Success</th>
                      <th className="px-4 py-3 text-left">
                        <button 
                          onClick={() => handleSort('created_at')}
                          className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                        >
                          Date
                          {sortConfig.key === 'created_at' && (
                            sortConfig.direction === 'asc' 
                              ? <ChevronUp className="w-4 h-4" /> 
                              : <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr 
                        key={record.id} 
                        className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors cursor-pointer"
                        onClick={() => handleViewCallDetails(record)}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <User className="w-4 h-4 text-purple-400" />
                            </div>
                            <span>{record.caller_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">{record.caller_number}</td>
                        <td className="px-4 py-4">{record.call_duration}</td>
                        <td className="px-4 py-4">
                          {record.emotion && (
                            <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                              record.emotion.toLowerCase().includes('positive') || 
                              record.emotion.toLowerCase().includes('satisfied') || 
                              record.emotion.toLowerCase().includes('happy')
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : record.emotion.toLowerCase().includes('negative') || 
                                  record.emotion.toLowerCase().includes('frustrated') || 
                                  record.emotion.toLowerCase().includes('angry')
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}>
                              {record.emotion}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {record.success_evaluation && (
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              record.success_evaluation.toLowerCase().includes('successful')
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : record.success_evaluation.toLowerCase().includes('partial')
                                  ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {record.success_evaluation.split(' - ')[0]}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-gray-400">
                          {record.created_at ? new Date(record.created_at).toLocaleDateString() : 'Unknown'}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCallDetails(record);
                            }}
                            className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render the outbound tab
  const renderOutboundTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Scheduled Outbound Calls</h3>
          <button
            onClick={() => setShowNewOutboundModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Call
          </button>
        </div>
        
        {/* Outbound Calls Table */}
        <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]"></div>
          
          <div className="relative">
            {outboundCalls.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-500 opacity-50" />
                <p>No outbound calls scheduled</p>
                <button
                  onClick={() => setShowNewOutboundModal(true)}
                  className="mt-4 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  Schedule Your First Call
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="px-4 py-3 text-left">Contact</th>
                      <th className="px-4 py-3 text-left">Phone Number</th>
                      <th className="px-4 py-3 text-left">Scheduled Time</th>
                      <th className="px-4 py-3 text-left">Purpose</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outboundCalls.map((call) => (
                      <tr key={call.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-400" />
                            </div>
                            <span>{call.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">{call.phone}</td>
                        <td className="px-4 py-4">{new Date(call.scheduled_time).toLocaleString()}</td>
                        <td className="px-4 py-4">{call.purpose}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                            call.status === 'scheduled'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : call.status === 'completed'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : call.status === 'failed'
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                          }`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
                <Phone className="w-8 h-8 text-purple-400" />
                Phone Agent
              </span>
            </h1>
            <p className="text-gray-400">
              Manage and analyze your AI phone agent calls
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-lg border border-purple-500/30">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <BarChart className="w-4 h-4" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('records')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'records'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Records
                </button>
                <button
                  onClick={() => setActiveTab('outbound')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'outbound'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Outbound
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="fade-in-animation">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'records' && renderRecordsTab()}
          {activeTab === 'outbound' && renderOutboundTab()}
        </div>
      </div>

      {/* Call Details Modal */}
      {showCallDetails && selectedCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowCallDetails(false);
              setSelectedCall(null);
              setIsPlaying(false);
              if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
                setAudioUrl(null);
              }
            }}
          />
          
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 border border-purple-500/30">
              <button
                onClick={() => {
                  setShowCallDetails(false);
                  setSelectedCall(null);
                  setIsPlaying(false);
                  if (audioUrl) {
                    URL.revokeObjectURL(audioUrl);
                    setAudioUrl(null);
                  }
                }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Call Details</h2>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm">
                    {selectedCall.created_at ? new Date(selectedCall.created_at).toLocaleString() : 'Unknown date'}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedCall.call_duration}
                  </div>
                  {selectedCall.emotion && (
                    <div className={`px-3 py-1 rounded-full text-sm capitalize ${
                      selectedCall.emotion.toLowerCase().includes('positive') || 
                      selectedCall.emotion.toLowerCase().includes('satisfied') || 
                      selectedCall.emotion.toLowerCase().includes('happy')
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : selectedCall.emotion.toLowerCase().includes('negative') || 
                          selectedCall.emotion.toLowerCase().includes('frustrated') || 
                          selectedCall.emotion.toLowerCase().includes('angry')
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {selectedCall.emotion}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Caller Information</h3>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium">{selectedCall.caller_name}</div>
                        <div className="text-sm text-gray-400">{selectedCall.caller_number}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Call Metrics</h3>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Positivity:</span>
                      <span className="text-sm font-medium">{selectedCall.positivity || 'N/A'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Clarity:</span>
                      <span className="text-sm font-medium">{selectedCall.clarity || 'N/A'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Relevance:</span>
                      <span className="text-sm font-medium">{selectedCall.relevance_responses || 'N/A'}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Goal Achievement:</span>
                      <span className="text-sm font-medium">{selectedCall.goal_achievement || 'N/A'}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Call Recording</h3>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    {audioUrl ? (
                      <div>
                        <div className="flex items-center justify-center mb-3">
                          <button
                            onClick={toggleAudio}
                            className="w-12 h-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 flex items-center justify-center transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 text-purple-400" />
                            ) : (
                              <Play className="w-6 h-6 text-purple-400" />
                            )}
                          </button>
                        </div>
                        <audio 
                          ref={audioRef}
                          src={audioUrl} 
                          onEnded={handleAudioEnded}
                          className="hidden"
                        />
                        <div className="text-center text-sm text-gray-400">
                          {isPlaying ? 'Playing audio...' : 'Click to play audio'}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-400">
                        <p>No audio recording available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Call Summary</h3>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 h-full">
                    {selectedCall.summary ? (
                      <p className="text-sm">{selectedCall.summary}</p>
                    ) : (
                      <p className="text-sm text-gray-400">No summary available</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Analysis Summary</h3>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 h-full">
                    {selectedCall.analyses_summary ? (
                      <p className="text-sm">{selectedCall.analyses_summary}</p>
                    ) : (
                      <p className="text-sm text-gray-400">No analysis available</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Call Transcript</h3>
                <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 max-h-80 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap font-sans">{selectedCall.transcript}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Outbound Call Modal */}
      {showNewOutboundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowNewOutboundModal(false)}
          />
          
          <div className="relative w-full max-w-md">
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 border border-purple-500/30">
              <button
                onClick={() => setShowNewOutboundModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-xl font-semibold mb-6">Schedule Outbound Call</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateOutboundCall();
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    value={newOutboundCall.name}
                    onChange={(e) => setNewOutboundCall({...newOutboundCall, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newOutboundCall.phone}
                    onChange={(e) => setNewOutboundCall({...newOutboundCall, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Scheduled Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newOutboundCall.scheduled_time}
                    onChange={(e) => setNewOutboundCall({...newOutboundCall, scheduled_time: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Purpose
                  </label>
                  <select
                    value={newOutboundCall.purpose}
                    onChange={(e) => setNewOutboundCall({...newOutboundCall, purpose: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    required
                  >
                    <option value="">Select purpose</option>
                    <option value="Appointment Reminder">Appointment Reminder</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Sales Call">Sales Call</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={newOutboundCall.notes}
                    onChange={(e) => setNewOutboundCall({...newOutboundCall, notes: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewOutboundModal(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors"
                  >
                    Schedule Call
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}