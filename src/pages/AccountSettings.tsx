import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { User, Settings2, Mail, Lock, User as UserIcon, Building2, MapPin, Phone, Globe, Bell, Moon, Sun, AlertCircle, CheckCircle } from 'lucide-react';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import toast from 'react-hot-toast';

interface UserSettings {
  language_preference: string;
  theme: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

interface UserDetails {
  first_name: string;
  last_name: string;
  company_name?: string;
  country?: string;
  phone?: string;
}

export function AccountSettings() {
  const { user, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');

  // Profile Form State
  const [profileForm, setProfileForm] = useState<UserDetails>({
    first_name: '',
    last_name: '',
    company_name: '',
    country: '',
    phone: ''
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<UserSettings>({
    language_preference: 'en',
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  });

  // Load user data
  useEffect(() => {
    if (user && userData) {
      // Load profile data
      setProfileForm({
        first_name: userData.details.first_name || '',
        last_name: userData.details.last_name || '',
        company_name: userData.details.company_name || '',
        country: userData.details.country || '',
        phone: userData.details.phone || ''
      });

      // Load settings
      setSettingsForm({
        language_preference: userData.settings.language_preference || 'en',
        theme: userData.settings.theme || 'dark',
        notifications: {
          ...userData.settings.notifications
        }
      });

      setIsLoading(false);
    }
  }, [user, userData]);

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Empty phone is valid
    try {
      return isValidPhoneNumber(phone);
    } catch {
      return false;
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Validate phone number if provided
      if (profileForm.phone && !validatePhone(profileForm.phone)) {
        throw new Error('Invalid phone number format');
      }

      // Update user details
      const { error: detailsError } = await supabase
        .from('user_details')
        .update({
          first_name: profileForm.first_name,
          last_name: profileForm.last_name,
          company_name: profileForm.company_name,
          country: profileForm.country,
          phone: profileForm.phone
        })
        .eq('user_id', user?.id);

      if (detailsError) throw detailsError;

      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          first_name: profileForm.first_name,
          last_name: profileForm.last_name
        }
      });

      if (metadataError) throw metadataError;

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          language_preference: settingsForm.language_preference,
          theme: settingsForm.theme,
          notifications: settingsForm.notifications
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="ml-16 max-w-4xl px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings2 className="w-8 h-8 text-purple-400" />
            Account Settings
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'preferences'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            Preferences
          </button>
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
            <div className="absolute inset-0 rounded-2xl opacity-50">
              <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
            </div>

            <div className="relative">
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profileForm.first_name}
                        onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profileForm.last_name}
                        onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        required
                      />
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profileForm.company_name}
                        onChange={(e) => setProfileForm({ ...profileForm, company_name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profileForm.country}
                        onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 cursor-not-allowed"
                        disabled
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Preferences Settings */}
        {activeTab === 'preferences' && (
          <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 backdrop-blur-sm overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
            <div className="absolute inset-0 rounded-2xl opacity-50">
              <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
            </div>

            <div className="relative">
              <form onSubmit={handleSettingsSubmit} className="space-y-8">
                {/* Language Preferences */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    Language Preferences
                  </h3>
                  <select
                    value={settingsForm.language_preference}
                    onChange={(e) => setSettingsForm({ ...settingsForm, language_preference: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="en">English</option>
                    <option value="nl">Dutch</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>

                {/* Theme Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    {settingsForm.theme === 'dark' ? (
                      <Moon className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-purple-400" />
                    )}
                    Theme
                  </h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="light"
                        checked={settingsForm.theme === 'light'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, theme: e.target.value })}
                        className="w-4 h-4 text-purple-500 border-gray-700 focus:ring-purple-500/20"
                      />
                      Light
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="dark"
                        checked={settingsForm.theme === 'dark'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, theme: e.target.value })}
                        className="w-4 h-4 text-purple-500 border-gray-700 focus:ring-purple-500/20"
                      />
                      Dark
                    </label>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-400" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settingsForm.notifications.email}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          notifications: {
                            ...settingsForm.notifications,
                            email: e.target.checked
                          }
                        })}
                        className="w-4 h-4 rounded text-purple-500 border-gray-700 focus:ring-purple-500/20"
                      />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive updates and alerts via email</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settingsForm.notifications.push}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          notifications: {
                            ...settingsForm.notifications,
                            push: e.target.checked
                          }
                        })}
                        className="w-4 h-4 rounded text-purple-500 border-gray-700 focus:ring-purple-500/20"
                      />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-400">Receive real-time updates in your browser</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settingsForm.notifications.marketing}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          notifications: {
                            ...settingsForm.notifications,
                            marketing: e.target.checked
                          }
                        })}
                        className="w-4 h-4 rounded text-purple-500 border-gray-700 focus:ring-purple-500/20"
                      />
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-gray-400">Receive news, updates, and promotional content</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Preferences'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}