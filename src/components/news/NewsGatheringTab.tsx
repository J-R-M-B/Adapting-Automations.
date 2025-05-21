import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { 
  Plus, 
  Settings, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  AlertCircle,
  Database,
  FileSpreadsheet,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

// Types
interface NewsSet {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  num_articles: number;
  news_type: NewsType;
  mood: Mood;
  created_at: string;
  updated_at?: string;
}

type NewsType = 'updates' | 'general news' | 'general business news' | 'financial - stocks news' | 'legal - law news' | 'geo politics news' | 'mainstream news' | 'independent news' | 'social media news';
type Mood = 'positive' | 'neutral' | 'negative';

// Initial form state
const initialFormState = {
  name: '',
  subject: '',
  num_articles: 5,
  news_type: 'general news' as NewsType,
  mood: 'neutral' as Mood
};

export function NewsGatheringTab() {
  const { user } = useAuth();
  const [newsSets, setNewsSets] = useState<NewsSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingSetId, setEditingSetId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // News types options
  const newsTypes: NewsType[] = [
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

  // Mood options
  const moods: Mood[] = ['positive', 'neutral', 'negative'];

  // Fetch news sets on component mount
  useEffect(() => {
    fetchNewsSets();
  }, [user]);

  // Fetch news sets from Supabase
  const fetchNewsSets = async () => {
    if (!user) return;
    
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!user) throw new Error('You must be logged in to save news sets');
      
      // Validate form
      if (!formData.name) throw new Error('Name is required');
      if (!formData.subject) throw new Error('Subject is required');
      if (formData.num_articles < 1) throw new Error('Number of articles must be at least 1');

      if (editingSetId) {
        // Update existing set
        const { error } = await supabase
          .from('news_sets')
          .update({
            name: formData.name,
            subject: formData.subject,
            num_articles: formData.num_articles,
            news_type: formData.news_type,
            mood: formData.mood,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingSetId);

        if (error) throw error;
        toast.success('News set updated successfully');
      } else {
        // Create new set
        const { error } = await supabase
          .from('news_sets')
          .insert({
            user_id: user.id,
            name: formData.name,
            subject: formData.subject,
            num_articles: formData.num_articles,
            news_type: formData.news_type,
            mood: formData.mood
          });

        if (error) throw error;
        toast.success('News set created successfully');
      }

      // Reset form and fetch updated sets
      setFormData(initialFormState);
      setEditingSetId(null);
      setShowForm(false);
      fetchNewsSets();
    } catch (error) {
      console.error('Error saving news set:', error);
      setError(error instanceof Error ? error.message : 'Failed to save news set');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle editing a news set
  const handleEdit = (set: NewsSet) => {
    setFormData({
      name: set.name,
      subject: set.subject,
      num_articles: set.num_articles,
      news_type: set.news_type,
      mood: set.mood
    });
    setEditingSetId(set.id);
    setShowForm(true);
    setError(null);
  };

  // Handle deleting a news set
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_sets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('News set deleted successfully');
      fetchNewsSets();
    } catch (error) {
      console.error('Error deleting news set:', error);
      toast.error('Failed to delete news set');
    }
  };

  return (
    <div className="space-y-8">
      {/* Configuration Block */}
      <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
        
        <div className="relative">
          {/* Header with action button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" />
              News Set Configuration
            </h2>
            
            {!showForm ? (
              <button
                onClick={() => {
                  setFormData(initialFormState);
                  setEditingSetId(null);
                  setShowForm(true);
                  setError(null);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <Plus className="w-4 h-4" />
                New News Set
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSetId(null);
                  setError(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>

          {/* Configuration Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              {/* Set Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Set Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="My News Set"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="E.g., Artificial Intelligence, Climate Change"
                />
              </div>

              {/* Number of Articles */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Articles *
                </label>
                <input
                  type="number"
                  name="num_articles"
                  value={formData.num_articles}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="50"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              {/* News Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  News Type *
                </label>
                <select
                  name="news_type"
                  value={formData.news_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  {newsTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mood */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mood *
                </label>
                <div className="flex gap-4">
                  {moods.map((mood) => (
                    <label key={mood} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mood"
                        value={mood}
                        checked={formData.mood === mood}
                        onChange={handleInputChange}
                        className="text-purple-500 focus:ring-purple-500/20 border-gray-700"
                      />
                      <span className="capitalize">{mood}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex items-center justify-center gap-2 transition-all ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                <Save className="w-4 h-4" />
                {editingSetId ? 'Update News Set' : 'Save News Set'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* News Sets List */}
      <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
        
        <div className="relative">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            Saved News Sets
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-10 h-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
            </div>
          ) : newsSets.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
              <FileSpreadsheet className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No news sets found.</p>
              <p className="text-gray-500 text-sm mt-2">Create a new set to start gathering news.</p>
              <button
                onClick={() => {
                  setFormData(initialFormState);
                  setEditingSetId(null);
                  setShowForm(true);
                  setError(null);
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20 flex items-center gap-2 mx-auto transition-colors"
              >
                <Plus className="w-4 h-4" />
                New News Set
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {newsSets.map((set) => (
                <div 
                  key={set.id}
                  className="p-5 rounded-lg border border-gray-800 bg-gray-900/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{set.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(set)}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(set.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subject:</span>
                      <span className="font-medium">{set.subject}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Articles:</span>
                      <span className="font-medium">{set.num_articles}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Type:</span>
                      <span className="font-medium capitalize">{set.news_type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Mood:</span>
                      <span className="font-medium capitalize">{set.mood}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Created: {new Date(set.created_at).toLocaleDateString()}</span>
                      {set.updated_at && (
                        <span>Updated: {new Date(set.updated_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}