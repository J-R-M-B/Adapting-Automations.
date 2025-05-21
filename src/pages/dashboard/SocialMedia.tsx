import { useState, useEffect } from 'react';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  SendHorizonal,
  Settings,
  Plus,
  X,
  Calendar,
  Clock,
  Repeat,
  Power,
  ChevronRight,
  FileText,
  BarChart,
  MessageSquare,
  Cog
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import toast from 'react-hot-toast';
import { Switch } from '../../components/ui/switch';

// Types for our social media data
type Platform = 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'telegram';
type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
type PostMode = 'manual' | 'automated';
type PostType = 'custom' | 'newsletter' | 'rss' | 'ai-generated';

interface SlotSettings {
  isActive: boolean;
  isRepeating: boolean;
  mode: PostMode;
  postType?: PostType;
  schedule?: {
    time: string;
    frequency: string;
  };
}

export function SocialMedia() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'planning' | 'content' | 'newsletter' | 'settings'>('planning');
  const [selectedSlot, setSelectedSlot] = useState<{
    day: WeekDay;
    platform: Platform;
    row: number;
  } | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [slotStates, setSlotStates] = useState<Record<string, SlotSettings>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Platform configuration
  const platforms: { id: Platform; name: string; icon: any; color: string }[] = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'rgb(10, 102, 194)' },
    { id: 'twitter', name: 'X', icon: Twitter, color: 'rgb(0, 0, 0)' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'rgb(225, 48, 108)' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'rgb(24, 119, 242)' },
    { id: 'telegram', name: 'Telegram', icon: SendHorizonal, color: 'rgb(0, 136, 204)' },
  ];

  const weekDays: WeekDay[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  // Load settings from database on mount
  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      const { data, error: supabaseError } = await supabase
        .from('social_settings')
        .select('*')
        .eq('user_id', user?.id);

      if (supabaseError) {
        throw supabaseError;
      }

      // Convert database records to slot states
      const newSlotStates: Record<string, SlotSettings> = {};
      data?.forEach(record => {
        const key = `${record.day}-${record.platform}-${record.row || 1}`;
        newSlotStates[key] = record.settings;
      });
      
      setSlotStates(newSlotStates);
    } catch (error) {
      console.error('Error loading settings:', error);
      setError(error instanceof Error ? error.message : 'Failed to load settings');
      toast.error('Failed to load settings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSlotSettings = async (
    day: WeekDay, 
    platform: Platform,
    row: number,
    settings: Partial<SlotSettings>
  ) => {
    if (!user) return;

    const slotKey = `${day}-${platform}-${row}`;
    const currentSettings = slotStates[slotKey] || {
      isActive: false,
      isRepeating: false,
      mode: 'manual' as PostMode
    };

    const updatedSettings = {
      ...currentSettings,
      ...settings
    };

    setIsSaving(true);
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      const { error: supabaseError } = await supabase
        .from('social_settings')
        .upsert({
          user_id: user.id,
          platform: platform,
          day: day,
          row: row,
          settings: updatedSettings
        }, {
          onConflict: 'user_id,platform,day,row'
        });

      if (supabaseError) {
        throw supabaseError;
      }

      setSlotStates(prev => ({
        ...prev,
        [slotKey]: updatedSettings
      }));

      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
      
      // Revert state on error
      setSlotStates(prev => ({
        ...prev,
        [slotKey]: currentSettings
      }));
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenSettings = (day: WeekDay, platform: Platform, row: number) => {
    setSelectedSlot({ day, platform, row });
    setShowSettingsModal(true);
  };

  const TimeSlotCell = ({ platform, day, row }: { platform: Platform; day: WeekDay; row: number }) => {
    const slotKey = `${day}-${platform}-${row}`;
    const slotState = slotStates[slotKey] || { 
      isActive: false,
      isRepeating: false,
      mode: 'manual' as PostMode,
      postType: 'custom' as PostType
    };

    return (
      <div 
        className={`
          relative p-4 rounded-lg
          ${slotState.isActive ? 'bg-gradient-to-b from-gray-800/90 to-gray-900/90' : 'bg-gradient-to-b from-gray-900/90 to-black/90'}
          group transition-all duration-300
          border border-purple-500/20
          hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]
        `}
      >
        <div className="flex flex-col h-full gap-3">
          {/* Post Type Indicator */}
          <div className={`
            px-3 py-1.5 rounded-lg text-xs font-medium
            ${slotState.postType === 'newsletter' 
              ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-purple-300 border border-purple-500/30' 
              : slotState.postType === 'ai-generated'
              ? 'bg-gradient-to-r from-green-500/30 to-blue-500/30 text-green-300 border border-green-500/30'
              : slotState.postType === 'rss'
              ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-300 border border-orange-500/30'
              : 'bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-300 border border-gray-700'
            }
            flex items-center justify-between shadow-sm backdrop-blur-sm
          `}>
            <span className="text-xs">
              {slotState.postType === 'custom' ? 'Custom' : 
               slotState.postType === 'newsletter' ? 'Newsletter' :
               slotState.postType === 'rss' ? 'RSS Feed' :
               slotState.postType === 'ai-generated' ? 'AI Generated' : 'Custom'}
            </span>
            {slotState.schedule?.time && (
              <span className="text-xs">{slotState.schedule.time}</span>
            )}
          </div>

          {/* Settings Button */}
          <div className="flex justify-end mt-auto">
            <button 
              onClick={() => handleOpenSettings(day, platform, row)}
              className="p-2 rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 transition-all duration-300 border border-gray-700 hover:border-purple-500/30 group-hover:shadow-sm"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Switches */}
          <div className="mt-auto space-y-2">
            {/* Active/Inactive Switch */}
            <div className="p-2 rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-purple-500/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <Switch
                  checked={slotState.isActive}
                  onCheckedChange={(checked) => {
                    updateSlotSettings(day, platform, row, { isActive: checked });
                  }}
                />
                <span className={`text-xs font-medium ${
                  slotState.isActive ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {slotState.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Repeat Switch */}
            <div className="p-2 rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700 hover:border-purple-500/20 transition-all duration-300">
              <div className="flex items-center justify-between">
                <Switch
                  checked={slotState.isRepeating}
                  onCheckedChange={(checked) => {
                    updateSlotSettings(day, platform, row, { isRepeating: checked });
                  }}
                />
                <span className={`text-xs font-medium ${
                  slotState.isRepeating ? 'text-purple-400' : 'text-gray-400'
                }`}>
                  {slotState.isRepeating ? 'Weekly' : "One-time"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSocialSubtab = () => {
    // Show loading state
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => loadSettings()}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    switch(activeTab) {
      case 'planning':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Content Calendar</h2>
            <p className="text-gray-400 mb-6">
              Plan and schedule your social media content across all platforms
            </p>
            
            {/* Platform Sections */}
            {platforms.map((platform) => (
              <div key={platform.id} className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <platform.icon 
                    className="w-6 h-6" 
                    style={{ color: platform.color }} 
                  />
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                </div>
                
                {/* Calendar Grid */}
                <div className="overflow-x-auto">
                  <div className="min-w-[900px]">
                    {/* Days Header */}
                    <div className="grid grid-cols-8 gap-4 mb-4">
                      <div className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-b from-gray-800/90 to-gray-900/90 border border-purple-500/20">
                        <span className="font-semibold text-gray-300">Time Slot</span>
                      </div>
                      
                      {weekDays.map((day) => (
                        <div 
                          key={day} 
                          className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-b from-gray-800/90 to-gray-900/90 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)] transition-all"
                        >
                          <span className="font-semibold text-gray-300">{day}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Time Slots */}
                    {[1, 2, 3, 4, 5, 6].map((row) => (
                      <div key={row} className="grid grid-cols-8 gap-4 mb-4">
                        {/* Row Label */}
                        <div className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-b from-gray-800/90 to-gray-900/90 border border-purple-500/20">
                          <span className="font-semibold text-gray-300">Slot {row}</span>
                        </div>
                        
                        {/* Day Cells */}
                        {weekDays.map((day) => (
                          <TimeSlotCell 
                            key={`${platform.id}-${day}-${row}`}
                            platform={platform.id}
                            day={day}
                            row={row}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'content':
        return (
          <div className="space-y-10">
            <h2 className="text-2xl font-bold mb-4">Content Management</h2>
            <p className="text-gray-400 mb-6">
              Create and manage content for each social media platform
            </p>
            
            <div className="text-center py-12 text-gray-400">
              Content management module will be implemented in a future update
            </div>
          </div>
        );

      case 'newsletter':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Newsletter Configuration</h2>
            <p className="text-gray-400 mb-6">
              Configure how your newsletters are generated and distributed
            </p>

            <div className="text-center py-12 text-gray-400">
              Newsletter configuration module will be implemented in a future update
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Social Media Settings</h2>
            <p className="text-gray-400 mb-6">
              Configure your social media settings and connections
            </p>

            <div className="text-center py-12 text-gray-400">
              Settings module will be implemented in a future update
            </div>
          </div>
        );
      
      default:
        return null;
    }
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
              Social Media Dashboard
            </h1>
            <p className="text-gray-400">
              Manage and schedule your social media content across all platforms
            </p>
          </div>
        </div>

        {/* Social Media Subtabs */}
        <div className="flex mb-8 border-b border-gray-800">
          {[
            { id: 'planning', label: 'Planning', icon: Calendar },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'newsletter', label: 'Newsletter', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Cog }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Subtab Content */}
        {renderSocialSubtab()}

        {/* Settings Modal */}
        {showSettingsModal && selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowSettingsModal(false)}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-2xl">
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 border-2 border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    Configure Post Settings
                    <span className="text-sm text-gray-400 ml-2">
                      {selectedSlot.day} • Slot {selectedSlot.row} • {platforms.find(p => p.id === selectedSlot.platform)?.name}
                    </span>
                  </h3>
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Post Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      Post Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'custom', label: 'Custom Post', icon: FileText },
                        { id: 'newsletter', label: 'Newsletter', icon: MessageSquare },
                        { id: 'rss', label: 'RSS Feed', icon: FileText },
                        { id: 'ai-generated', label: 'AI Generated', icon: Settings }
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => {
                            updateSlotSettings(selectedSlot.day, selectedSlot.platform, selectedSlot.row, {
                              postType: type.id as PostType
                            });
                          }}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            slotStates[`${selectedSlot.day}-${selectedSlot.platform}-${selectedSlot.row}`]?.postType === type.id
                              ? 'bg-purple-500/20 border border-purple-500/30 text-white'
                              : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                            <type.icon className="w-4 h-4 text-purple-400" />
                          </div>
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Settings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Schedule
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="time"
                        className="px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500"
                        value={slotStates[`${selectedSlot.day}-${selectedSlot.platform}-${selectedSlot.row}`]?.schedule?.time || ''}
                        onChange={(e) => {
                          updateSlotSettings(selectedSlot.day, selectedSlot.platform, selectedSlot.row, {
                            schedule: {
                              ...slotStates[`${selectedSlot.day}-${selectedSlot.platform}-${selectedSlot.row}`]?.schedule,
                              time: e.target.value
                            }
                          });
                        }}
                      />
                      <select
                        className="px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500"
                        value={slotStates[`${selectedSlot.day}-${selectedSlot.platform}-${selectedSlot.row}`]?.schedule?.frequency || 'once'}
                        onChange={(e) => {
                          updateSlotSettings(selectedSlot.day, selectedSlot.platform, selectedSlot.row, {
                            schedule: {
                              ...slotStates[`${selectedSlot.day}-${selectedSlot.platform}-${selectedSlot.row}`]?.schedule,
                              frequency: e.target.value
                            }
                          });
                        }}
                      >
                        <option value="once">Once</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                  </div>

                  {/* Toggle Switches */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center gap-3">
                        <Power className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="font-medium">Active Status</p>
                          <p className="text-sm text-gray-400">Enable or disable this time slot</p>
                        </div>
                      </div>
                      <Switch
                        checked={slotStates[`${selectedSlot.day}-${selectedSlot.platform}-${selectedSlot.row}`]?.isActive || false}
                        onCheckedChange={(checked) => {
                          updateSlotSettings(selectedSlot.day, selectedSlot.platform, selectedSlot.row, { isActive: checked });
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center gap-3">
                        <Repeat className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="font-medium">Recurring Post</p>
                          <p className="text-sm text-gray-400">Repeat this post weekly</p>
                        </div>
                      </div>
                      <Switch
                        checked={slotStates[`${selectedSlot.day}-${selectedSlot.platform}-${selectedSlot.row}`]?.isRepeating || false}
                        onCheckedChange={(checked) => {
                          updateSlotSettings(selectedSlot.day, selectedSlot.platform, selectedSlot.row, { isRepeating: checked });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      setShowSettingsModal(false);
                      toast.success('Settings saved successfully');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}