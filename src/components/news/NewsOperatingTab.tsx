import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { 
  FileSpreadsheet, 
  Plus, 
  Calendar, 
  Clock, 
  X, 
  Save,
  Edit2,
  Trash2,
  Filter,
  Search,
  Settings,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  BarChart,
  Zap,
  Sliders,
  BookOpen,
  Languages,
  Info,
  FileText,
  CheckSquare,
  Square
} from 'lucide-react';
import toast from 'react-hot-toast';

// Types
interface NewsSet {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  num_articles: number;
  news_type: string;
  mood: string;
}

interface NewsArticle {
  id: string;
  subject: string;
  mood: string;
  introduction: string;
  developments: string;
  implications: string;
  timestamp: string;
  type?: string;
}

interface Sequence {
  id: string;
  user_id: string;
  name: string;
  frequency: 'weekly' | 'monthly';
  days: number[] | string[]; // Numbers 1-31 for monthly, day names for weekly
  sets: string[]; // Array of news_set IDs
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ArticleSettings {
  style: 'professional' | 'funny' | 'serious' | 'casual' | 'dramatic';
  length: 'short' | 'medium' | 'long';
  customInstructions: string;
  language: 'english' | 'dutch' | 'german' | 'french' | 'spanish' | 'russian';
}

export function NewsOperatingTab() {
  const { user } = useAuth();
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [newsSets, setNewsSets] = useState<NewsSet[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLoadingSequences, setIsLoadingSequences] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isLoadingSets, setIsLoadingSets] = useState(true);
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [editingSequence, setEditingSequence] = useState<Sequence | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newsTypeFilter, setNewsTypeFilter] = useState<string[]>([]);
  const [showNewsTypeFilters, setShowNewsTypeFilters] = useState(false);
  const [articleSettings, setArticleSettings] = useState<ArticleSettings>({
    style: 'professional',
    length: 'medium',
    customInstructions: '',
    language: 'english'
  });
  const [selectedSetIds, setSelectedSetIds] = useState<string[]>([]);
  const [newSequence, setNewSequence] = useState<Omit<Sequence, 'id' | 'created_at' | 'updated_at'>>({
    user_id: user?.id || '',
    name: '',
    frequency: 'weekly',
    days: [],
    sets: [],
    is_active: false
  });
  const [stats, setStats] = useState({
    totalSets: 0,
    totalSequences: 0,
    activeSequences: 0,
    upcomingSequences: 0
  });

  // Available news types options
  const newsTypes = [
    'updates',
    'general news', 
    'general business news',
    'financial - stocks news',
    'legal - law news',
    'geo politics news',
    'mainstream news',
    'independent news',
    'social media news'
  ];
  
  const articleStyles = [
    { value: 'professional', label: 'Professional' },
    { value: 'funny', label: 'Funny' },
    { value: 'serious', label: 'Serious' },
    { value: 'casual', label: 'Casual' },
    { value: 'dramatic', label: 'Dramatic' }
  ];
  
  const articleLengths = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' }
  ];
  
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'dutch', label: 'Dutch' },
    { value: 'german', label: 'German' },
    { value: 'french', label: 'French' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'russian', label: 'Russian' }
  ];
  
  // Ref for sequence modal
  const sequenceModalRef = useRef<HTMLDivElement>(null);
  
  // Fetch data on component mount
  useEffect(() => {
    if (user) {
      fetchSequences();
      fetchNewsSets();
      fetchArticles();
    }
  }, [user]);
  
  // Filter articles when search term or news type filter changes
  useEffect(() => {
    const filtered = articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.introduction.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = newsTypeFilter.length === 0 || 
        (article.type && newsTypeFilter.includes(article.type));
      
      return matchesSearch && matchesType;
    });
    
    setFilteredArticles(filtered);
  }, [articles, searchTerm, newsTypeFilter]);
  
  // Update stats when data changes
  useEffect(() => {
    const now = new Date();
    
    const activeSeqs = sequences.filter(seq => seq.is_active).length;
    
    // Simple way to count upcoming sequences - in a real app this would be more sophisticated
    // Here we're just counting active sequences as "upcoming" for demonstration purposes
    const upcomingSeqs = activeSeqs;
    
    setStats({
      totalSets: newsSets.length,
      totalSequences: sequences.length,
      activeSequences: activeSeqs,
      upcomingSequences: upcomingSeqs
    });
  }, [sequences, newsSets]);
  
  // Handle click outside sequence modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sequenceModalRef.current && !sequenceModalRef.current.contains(e.target as Node)) {
        setShowSequenceModal(false);
        setEditingSequence(null);
        resetNewSequence();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const resetNewSequence = () => {
    setNewSequence({
      user_id: user?.id || '',
      name: '',
      frequency: 'weekly',
      days: [],
      sets: [],
      is_active: false
    });
    setSelectedSetIds([]);
  };
  
  const fetchSequences = async () => {
    if (!user) return;
    
    setIsLoadingSequences(true);
    try {
      const { data, error } = await supabase
        .from('news_sequences')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSequences(data || []);
    } catch (error) {
      console.error('Error fetching sequences:', error);
      toast.error('Failed to load sequences');
    } finally {
      setIsLoadingSequences(false);
    }
  };
  
  const fetchNewsSets = async () => {
    if (!user) return;
    
    setIsLoadingSets(true);
    try {
      const { data, error } = await supabase
        .from('news_sets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNewsSets(data || []);
    } catch (error) {
      console.error('Error fetching news sets:', error);
      toast.error('Failed to load news sets');
    } finally {
      setIsLoadingSets(false);
    }
  };
  
  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      setArticles(data || []);
      setFilteredArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load articles');
    } finally {
      setIsLoadingArticles(false);
    }
  };
  
  const handleCreateOrUpdateSequence = async () => {
    if (!user) return;
    
    if (!newSequence.name) {
      toast.error('Please enter a sequence name');
      return;
    }
    
    if (newSequence.days.length === 0) {
      toast.error('Please select at least one day');
      return;
    }
    
    if (selectedSetIds.length === 0) {
      toast.error('Please select at least one news set');
      return;
    }
    
    try {
      if (editingSequence) {
        // Update existing sequence
        const { error } = await supabase
          .from('news_sequences')
          .update({
            name: newSequence.name,
            frequency: newSequence.frequency,
            days: newSequence.days,
            sets: selectedSetIds,
            is_active: newSequence.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingSequence.id);
        
        if (error) throw error;
        toast.success('Sequence updated successfully');
      } else {
        // Create new sequence
        const { error } = await supabase
          .from('news_sequences')
          .insert({
            user_id: user.id,
            name: newSequence.name,
            frequency: newSequence.frequency,
            days: newSequence.days,
            sets: selectedSetIds,
            is_active: newSequence.is_active
          });
        
        if (error) throw error;
        toast.success('Sequence created successfully');
      }
      
      // Reset form and close modal
      setShowSequenceModal(false);
      setEditingSequence(null);
      resetNewSequence();
      fetchSequences();
    } catch (error) {
      console.error('Error saving sequence:', error);
      toast.error('Failed to save sequence');
    }
  };
  
  const handleToggleSequenceActive = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('news_sequences')
        .update({ is_active: !currentState })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setSequences(prev => prev.map(seq => 
        seq.id === id ? { ...seq, is_active: !currentState } : seq
      ));
      
      toast.success(`Sequence ${!currentState ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error toggling sequence status:', error);
      toast.error('Failed to update sequence');
    }
  };
  
  const handleDeleteSequence = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_sequences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setSequences(prev => prev.filter(seq => seq.id !== id));
      toast.success('Sequence deleted successfully');
    } catch (error) {
      console.error('Error deleting sequence:', error);
      toast.error('Failed to delete sequence');
    }
  };
  
  const handleEditSequence = (sequence: Sequence) => {
    setEditingSequence(sequence);
    setNewSequence({
      user_id: sequence.user_id,
      name: sequence.name,
      frequency: sequence.frequency,
      days: sequence.days,
      sets: sequence.sets,
      is_active: sequence.is_active
    });
    setSelectedSetIds(sequence.sets);
    setShowSequenceModal(true);
  };
  
  const handleDayToggle = (day: string | number) => {
    setNewSequence(prev => {
      const isDaySelected = prev.days.includes(day);
      
      if (isDaySelected) {
        return {
          ...prev,
          days: prev.days.filter(d => d !== day)
        };
      } else {
        return {
          ...prev,
          days: [...prev.days, day]
        };
      }
    });
  };
  
  const handleSetToggle = (setId: string) => {
    if (selectedSetIds.includes(setId)) {
      setSelectedSetIds(prev => prev.filter(id => id !== setId));
    } else {
      setSelectedSetIds(prev => [...prev, setId]);
    }
  };
  
  const handleNewsTypeFilterToggle = (type: string) => {
    setNewsTypeFilter(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const handleArticleSelection = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleGenerateArticle = async () => {
    if (!selectedArticle) {
      toast.error('Please select an article first');
      return;
    }
    
    try {
      // Prepare the payload with article ID and settings
      const payload = {
        articleId: selectedArticle.id,
        settings: articleSettings
      };
      
      // Send POST request to Make.com webhook
      const response = await fetch('https://hook.eu2.make.com/jg44ho8i7qyejy9iy5tkumi5tsbbydda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      toast.success('Article generation started. Check Make.com for results.');
    } catch (error) {
      console.error('Error generating article:', error);
      toast.error('Failed to generate article. Please try again.');
    }
    
    console.log('Generating article with settings:', {
      article: selectedArticle,
      settings: articleSettings
    });
  };
  
  const renderDaySelector = () => {
    if (newSequence.frequency === 'weekly') {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      
      return (
        <div className="grid grid-cols-7 gap-2">
          {weekdays.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayToggle(day)}
              className={`p-2 rounded-lg text-center text-sm ${
                newSequence.days.includes(day)
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      );
    } else {
      // Monthly - days 1-31
      return (
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayToggle(day)}
              className={`p-2 rounded-lg text-center text-sm ${
                newSequence.days.includes(day)
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      );
    }
  };
  
  const getUpcomingDays = (sequence: Sequence) => {
    if (sequence.frequency === 'weekly') {
      // Simply return the days of the week
      return (sequence.days as string[]).join(', ');
    } else {
      // For monthly, return the next occurrence
      const now = new Date();
      const currentDay = now.getDate();
      
      // Find the next day in the sequence
      const days = sequence.days as number[];
      const nextDays = days.filter(day => day > currentDay);
      
      if (nextDays.length > 0) {
        const nextDay = nextDays[0];
        const nextDate = new Date(now.getFullYear(), now.getMonth(), nextDay);
        return nextDate.toLocaleDateString();
      } else if (days.length > 0) {
        // If no days left this month, show the first day of next month
        const nextDate = new Date(now.getFullYear(), now.getMonth() + 1, days[0]);
        return nextDate.toLocaleDateString();
      } else {
        return 'No days selected';
      }
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Sequences Block */}
      <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]"></div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Sequence Management
            </h2>
            
            <button
              onClick={() => {
                resetNewSequence();
                setShowSequenceModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" />
              Create Sequence
            </button>
          </div>
          
          {isLoadingSequences ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : sequences.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No sequences found</p>
              <p className="text-gray-500 text-sm mt-2">Create a sequence to schedule your news sets</p>
              <button
                onClick={() => {
                  resetNewSequence();
                  setShowSequenceModal(true);
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20 flex items-center gap-2 mx-auto transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Sequence
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="px-4 py-3 text-gray-400">Sequence Name</th>
                    <th className="px-4 py-3 text-gray-400">Frequency</th>
                    <th className="px-4 py-3 text-gray-400">Days/Dates</th>
                    <th className="px-4 py-3 text-gray-400">Sets Count</th>
                    <th className="px-4 py-3 text-gray-400">Status</th>
                    <th className="px-4 py-3 text-gray-400">Next Run</th>
                    <th className="px-4 py-3 text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sequences.map((sequence) => (
                    <tr key={sequence.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                      <td className="px-4 py-3">{sequence.name}</td>
                      <td className="px-4 py-3 capitalize">{sequence.frequency}</td>
                      <td className="px-4 py-3">
                        {sequence.days.length > 3
                          ? `${sequence.days.slice(0, 3).join(', ')}...`
                          : sequence.days.join(', ')}
                      </td>
                      <td className="px-4 py-3">{sequence.sets.length}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          sequence.is_active
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {sequence.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {sequence.is_active ? getUpcomingDays(sequence) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleToggleSequenceActive(sequence.id, sequence.is_active)}
                            className={`p-2 rounded-lg ${
                              sequence.is_active
                                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                            } transition-colors`}
                          >
                            {sequence.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleEditSequence(sequence)}
                            className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSequence(sequence.id)}
                            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                          >
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
      
      {/* Article Creation Block */}
      <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]"></div>
        
        <div className="relative">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-purple-400" />
            Article Creation
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
            {/* Left Side - Articles Library (35% width) */}
            <div className="w-full lg:w-[35%] flex flex-col h-full">
              {/* Search and Filter */}
              <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                  />
                </div>
                <div className="relative ml-2">
                  <button
                    onClick={() => setShowNewsTypeFilters(!showNewsTypeFilters)}
                    className="p-2 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 transition-colors"
                  >
                    <Filter className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showNewsTypeFilters && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg bg-gray-900 shadow-lg py-2 px-3 z-10 border border-gray-700">
                      <div className="text-sm font-medium mb-2">Filter by News Type</div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto">
                        {newsTypes.map((type) => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newsTypeFilter.includes(type)}
                              onChange={() => handleNewsTypeFilterToggle(type)}
                              className="rounded border-gray-700 text-purple-500 focus:ring-purple-500/20"
                            />
                            <span className="text-gray-300 text-sm capitalize">{type}</span>
                          </label>
                        ))}
                      </div>
                      {newsTypeFilter.length > 0 && (
                        <button
                          onClick={() => setNewsTypeFilter([])}
                          className="text-xs text-purple-400 hover:text-purple-300 transition-colors mt-2"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Articles List */}
              <div className="flex-grow bg-gray-900/30 rounded-lg border border-gray-800 overflow-y-auto">
                {isLoadingArticles ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <FileText className="w-12 h-12 text-gray-600 mb-4" />
                    <p className="text-gray-400">No articles found</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="space-y-1 p-1">
                    {filteredArticles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => handleArticleSelection(article)}
                        className={`p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer ${
                          selectedArticle?.id === article.id ? 'bg-gray-800 border border-purple-500/50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium mb-1 line-clamp-1">{article.subject}</h4>
                          <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                            article.mood === 'positive' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            article.mood === 'negative' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {article.mood}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">{article.introduction}</p>
                        <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                          <span>{article.type || 'Unspecified'}</span>
                          <span>{new Date(article.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Side - Article Creation Settings (65% width) */}
            <div className="w-full lg:w-[65%] bg-gray-900/30 rounded-lg border border-gray-800 p-6 overflow-y-auto">
              <div className="space-y-6">
                {selectedArticle ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        Selected Article
                      </h3>
                      <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                        <h4 className="font-medium text-lg mb-2">{selectedArticle.subject}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                            selectedArticle.mood === 'positive' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            selectedArticle.mood === 'negative' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {selectedArticle.mood}
                          </span>
                          {selectedArticle.type && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 capitalize">
                              {selectedArticle.type}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mb-2 line-clamp-3">{selectedArticle.introduction}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-purple-400" />
                      Article Generation Settings
                    </h3>
                    
                    {/* Article Style */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Article Style
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
                        {articleStyles.map(style => (
                          <button
                            key={style.value}
                            type="button"
                            onClick={() => setArticleSettings(prev => ({ ...prev, style: style.value as any }))}
                            className={`p-3 rounded-lg text-center ${
                              articleSettings.style === style.value
                                ? 'bg-purple-500/30 border border-purple-500/30 text-white'
                                : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Article Length */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Article Length
                      </label>
                      <div className="flex gap-3">
                        {articleLengths.map(length => (
                          <button
                            key={length.value}
                            type="button"
                            onClick={() => setArticleSettings(prev => ({ ...prev, length: length.value as any }))}
                            className={`flex-1 p-3 rounded-lg text-center ${
                              articleSettings.length === length.value
                                ? 'bg-purple-500/30 border border-purple-500/30 text-white'
                                : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {length.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Custom Instructions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Custom Instructions
                      </label>
                      <textarea
                        value={articleSettings.customInstructions}
                        onChange={(e) => setArticleSettings(prev => ({ ...prev, customInstructions: e.target.value }))}
                        placeholder="Enter any specific instructions for the AI..."
                        className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all h-24 resize-none"
                      ></textarea>
                    </div>
                    
                    {/* Language Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Language
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {languages.map(lang => (
                          <button
                            key={lang.value}
                            type="button"
                            onClick={() => setArticleSettings(prev => ({ ...prev, language: lang.value as any }))}
                            className={`p-3 rounded-lg text-center ${
                              articleSettings.language === lang.value
                                ? 'bg-purple-500/30 border border-purple-500/30 text-white'
                                : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={handleGenerateArticle}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 mt-4"
                    >
                      <Zap className="w-5 h-5" />
                      Generate Article
                    </button>
                    
                    <div className="p-4 rounded-lg bg-gray-900/70 border border-purple-500/20 flex items-start gap-3 mt-2">
                      <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-300">
                        <p>Article will be processed by your Make.com scenario using the selected settings. The scenario will use the raw article content and transform it according to your preferences.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <BookOpen className="w-16 h-16 text-gray-600 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Article Selected</h3>
                    <p className="text-gray-400">Select an article from the library to configure generation settings</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Analytics Block */}
      <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]"></div>
        
        <div className="relative">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <BarChart className="w-5 h-5 text-purple-400" />
            Analytics & Schedule
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Sets</p>
                  <p className="text-2xl font-semibold">{stats.totalSets}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Sequences</p>
                  <p className="text-2xl font-semibold">{stats.totalSequences}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Sequences</p>
                  <p className="text-2xl font-semibold">{stats.activeSequences}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-800">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">Upcoming Sequences</p>
                  <p className="text-2xl font-semibold">{stats.upcomingSequences}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Schedule Calendar View */}
          <div className="p-4 rounded-lg bg-gray-900/70 border border-gray-800">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
              Sequence Schedule
            </h3>
            
            {sequences.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-400">No active sequences to display</p>
                <p className="text-gray-500 text-sm mt-1">Create and activate sequences to see them in the calendar</p>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {/* Calendar Header */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Grid - This would be dynamically generated in a real app */}
                {Array(28).fill(0).map((_, index) => {
                  // Sample data - in a real app, this would be calculated based on real dates
                  const hasEvent = [3, 8, 15, 22].includes(index);
                  return (
                    <div 
                      key={index} 
                      className={`p-2 border border-gray-800 rounded-lg min-h-16 ${
                        hasEvent ? 'bg-purple-500/10' : ''
                      }`}
                    >
                      <div className="text-right text-xs text-gray-500 mb-1">
                        {index + 1}
                      </div>
                      {hasEvent && (
                        <div className="bg-purple-500/20 text-purple-400 p-1 rounded text-xs text-center">
                          Sequence Active
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sequence Modal */}
      {showSequenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            ref={sequenceModalRef}
            className="relative bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 rounded-xl border border-purple-500/30 p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => {
                setShowSequenceModal(false);
                setEditingSequence(null);
                resetNewSequence();
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-semibold mb-6 pr-8">
              {editingSequence ? 'Edit Sequence' : 'Create New Sequence'}
            </h2>
            
            <div className="space-y-6">
              {/* Sequence Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sequence Name
                </label>
                <input
                  type="text"
                  value={newSequence.name}
                  onChange={(e) => setNewSequence(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My News Sequence"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              </div>
              
              {/* Frequency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Frequency
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={newSequence.frequency === 'weekly'}
                      onChange={() => setNewSequence(prev => ({ ...prev, frequency: 'weekly', days: [] }))}
                      className="text-purple-500 focus:ring-purple-500/20"
                    />
                    <span>Weekly</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={newSequence.frequency === 'monthly'}
                      onChange={() => setNewSequence(prev => ({ ...prev, frequency: 'monthly', days: [] }))}
                      className="text-purple-500 focus:ring-purple-500/20"
                    />
                    <span>Monthly</span>
                  </label>
                </div>
              </div>
              
              {/* Day Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {newSequence.frequency === 'weekly' ? 'Select Days' : 'Select Dates'}
                </label>
                {renderDaySelector()}
              </div>
              
              {/* News Sets Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select News Sets
                </label>
                
                {isLoadingSets ? (
                  <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : newsSets.length === 0 ? (
                  <div className="text-center py-4 bg-gray-900/50 rounded-lg border border-gray-800">
                    <p className="text-gray-400">No news sets found</p>
                    <p className="text-gray-500 text-sm mt-1">Create news sets first</p>
                  </div>
                ) : (
                  <div className="max-h-48 overflow-y-auto bg-gray-900/50 rounded-lg border border-gray-800 p-1">
                    {newsSets.map((set) => (
                      <div
                        key={set.id}
                        className={`p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                          selectedSetIds.includes(set.id) ? 'bg-purple-500/20 border border-purple-500/30' : ''
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{set.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-400 capitalize">{set.news_type}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-400 capitalize">{set.mood}</span>
                            </div>
                          </div>
                          <label className="cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSetIds.includes(set.id)}
                              onChange={() => handleSetToggle(set.id)}
                              className="sr-only"
                            />
                            {selectedSetIds.includes(set.id) ? (
                              <CheckSquare className="w-5 h-5 text-purple-400" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-400" />
                            )}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Active Status */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <div>
                  <h4 className="font-medium">Active Status</h4>
                  <p className="text-sm text-gray-400 mt-1">Enable to activate this sequence</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSequence.is_active}
                    onChange={() => setNewSequence(prev => ({ ...prev, is_active: !prev.is_active }))}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    newSequence.is_active ? 'bg-purple-500' : 'bg-gray-700'
                  }`}>
                    <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform ${
                      newSequence.is_active ? 'translate-x-5' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
              </div>
              
              {/* Save Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleCreateOrUpdateSequence}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingSequence ? 'Update Sequence' : 'Save Sequence'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}