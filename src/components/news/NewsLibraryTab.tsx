import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown, 
  X, 
  Edit, 
  Save, 
  AlertCircle, 
  FileText,
  Tag,
  Clock,
  ArrowUpDown,
  Trash2,
  CheckSquare,
  Square,
  ChevronUp,
  BookOpen,
  FileImage,
  Video
} from 'lucide-react';
import toast from 'react-hot-toast';

// Types
interface NewsArticle {
  id: string;
  subject: string;
  mood: 'positive' | 'neutral' | 'negative';
  introduction: string;
  developments: string;
  implications: string;
  timestamp: string;
}

interface WrittenArticle {
  id: string;
  subject: string;
  header: string;
  article: string;
  image?: string;
  video?: string;
  timestamp: string;
  type?: string;
  mood: string;
  created_at: string;
}

type NewsType = 'updates' | 'general news' | 'general business news' | 'financial - stocks news' | 'legal - law news' | 'geo politics news' | 'mainstream news' | 'independent news' | 'social media news';

export function NewsLibraryTab() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [writtenArticles, setWrittenArticles] = useState<WrittenArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [filteredWrittenArticles, setFilteredWrittenArticles] = useState<WrittenArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingWritten, setIsLoadingWritten] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedWrittenArticle, setSelectedWrittenArticle] = useState<WrittenArticle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState<Partial<NewsArticle>>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedArticleIds, setSelectedArticleIds] = useState<string[]>([]);
  const [selectedWrittenArticleIds, setSelectedWrittenArticleIds] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectAllWrittenChecked, setSelectAllWrittenChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'articles'>('news');
  
  // Available news types
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
  
  // Filter states
  const [filters, setFilters] = useState({
    subject: '',
    mood: '',
    newsTypes: [] as NewsType[],
    dateFrom: '',
    dateTo: ''
  });

  // Sort states
  const [sortField, setSortField] = useState<keyof NewsArticle>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Modal ref for click outside handling
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
    fetchWrittenArticles();
  }, [user]);

  // Apply filters when filter states or search term changes
  useEffect(() => {
    applyFiltersAndSearch();
    applyWrittenFiltersAndSearch();
  }, [articles, writtenArticles, filters, searchTerm, sortField, sortDirection]);

  // Update selectAllChecked when selectedArticleIds changes
  useEffect(() => {
    setSelectAllChecked(selectedArticleIds.length > 0 && selectedArticleIds.length === filteredArticles.length);
    setSelectAllWrittenChecked(selectedWrittenArticleIds.length > 0 && selectedWrittenArticleIds.length === filteredWrittenArticles.length);
  }, [selectedArticleIds, filteredArticles]);

  // Handle click outside modal to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeArticleModal();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch articles from Supabase
  const fetchArticles = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  // Fetch written articles from Supabase
  const fetchWrittenArticles = async () => {
    setIsLoadingWritten(true);
    try {
      const { data, error } = await supabase
        .from('written_articles')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      
      setWrittenArticles(data || []);
      setFilteredWrittenArticles(data || []);
    } catch (error) {
      console.error('Error fetching written articles:', error);
      toast.error('Failed to load written articles');
    } finally {
      setIsLoadingWritten(false);
    }
  };

  // Apply filters and search
  const applyFiltersAndSearch = () => {
    let result = [...articles];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(article => 
        article.subject.toLowerCase().includes(term) ||
        article.introduction.toLowerCase().includes(term) ||
        article.developments.toLowerCase().includes(term) ||
        article.implications.toLowerCase().includes(term)
      );
    }
    
    // Apply subject filter
    if (filters.subject) {
      result = result.filter(article => 
        article.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }
    
    // Apply mood filter
    if (filters.mood) {
      result = result.filter(article => 
        article.mood === filters.mood
      );
    }
    
    // Apply news types filter
    if (filters.newsTypes.length > 0) {
      result = result.filter(article => {
        // Check if the article's subject contains any of the selected news types
        return filters.newsTypes.some(type => 
          article.subject.toLowerCase().includes(type.toLowerCase())
        );
      });
    }
    
    // Apply date range filters
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter(article => 
        new Date(article.timestamp) >= fromDate
      );
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59); // End of the day
      result = result.filter(article => 
        new Date(article.timestamp) <= toDate
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    setFilteredArticles(result);
    
    // Update selected articles when filtered articles change
    setSelectedArticleIds(prevSelected => 
      prevSelected.filter(id => result.some(article => article.id === id))
    );
  };

  // Apply filters and search for written articles
  const applyWrittenFiltersAndSearch = () => {
    let result = [...writtenArticles];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(article => 
        article.subject.toLowerCase().includes(term) ||
        article.header.toLowerCase().includes(term) ||
        article.article.toLowerCase().includes(term)
      );
    }
    
    // Apply subject filter
    if (filters.subject) {
      result = result.filter(article => 
        article.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }
    
    // Apply mood filter
    if (filters.mood) {
      result = result.filter(article => 
        article.mood === filters.mood
      );
    }
    
    // Apply news types filter
    if (filters.newsTypes.length > 0) {
      result = result.filter(article => {
        // Check if the article's type matches any of the selected news types
        return filters.newsTypes.some(type => 
          article.type?.toLowerCase() === type.toLowerCase()
        );
      });
    }
    
    // Apply date range filters
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter(article => 
        new Date(article.timestamp) >= fromDate
      );
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59); // End of the day
      result = result.filter(article => 
        new Date(article.timestamp) <= toDate
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField as keyof WrittenArticle];
      const bValue = b[sortField as keyof WrittenArticle];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    setFilteredWrittenArticles(result);
    
    // Update selected articles when filtered articles change
    setSelectedWrittenArticleIds(prevSelected => 
      prevSelected.filter(id => result.some(article => article.id === id))
    );
  };

  // Handle sort toggle
  const handleSort = (field: keyof NewsArticle) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Open article modal
  const openArticle = (article: NewsArticle, event: React.MouseEvent) => {
    // Check if the click was on a checkbox or button
    const target = event.target as HTMLElement;
    if (
      target.closest('.article-checkbox') || 
      target.closest('.article-delete-btn') ||
      target.closest('.article-edit-btn')
    ) {
      return;
    }
    
    setSelectedArticle(article);
    setEditedArticle({});
    setIsEditing(false);
  };

  // Close article modal
  const closeArticleModal = () => {
    if (isEditing && Object.keys(editedArticle).length > 0) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        setSelectedArticle(null);
        setEditedArticle({});
        setIsEditing(false);
      }
    } else {
      setSelectedArticle(null);
      setEditedArticle({});
      setIsEditing(false);
    }
  };

  // Close written article modal
  const closeWrittenArticleModal = () => {
    setSelectedWrittenArticle(null);
  };

  // Handle article edit
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save edited article
  const saveArticle = async () => {
    if (!selectedArticle) return;
    
    try {
      const { error } = await supabase
        .from('news_articles')
        .update({
          ...editedArticle
        })
        .eq('id', selectedArticle.id);
      
      if (error) throw error;
      
      // Update local state
      setArticles(prev => 
        prev.map(article => 
          article.id === selectedArticle.id 
            ? { ...article, ...editedArticle } 
            : article
        )
      );
      
      // Update selected article
      setSelectedArticle(prev => prev ? { ...prev, ...editedArticle } : null);
      
      setIsEditing(false);
      setEditedArticle({});
      toast.success('Article updated successfully');
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Failed to update article');
    }
  };

  // Delete single article
  const deleteArticle = async (id: string) => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setArticles(prev => prev.filter(article => article.id !== id));
      setSelectedArticleIds(prev => prev.filter(articleId => articleId !== id));
      
      // Close modal if the deleted article was selected
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
      
      toast.success('Article deleted successfully');
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete single written article
  const deleteWrittenArticle = async (id: string) => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('written_articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setWrittenArticles(prev => prev.filter(article => article.id !== id));
      setSelectedWrittenArticleIds(prev => prev.filter(articleId => articleId !== id));
      
      // Close modal if the deleted article was selected
      if (selectedWrittenArticle?.id === id) {
        setSelectedWrittenArticle(null);
      }
      
      toast.success('Article deleted successfully');
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete multiple articles
  const deleteSelectedArticles = async () => {
    if (selectedArticleIds.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedArticleIds.length} selected articles?`)) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .in('id', selectedArticleIds);
      
      if (error) throw error;
      
      // Update local state
      setArticles(prev => prev.filter(article => !selectedArticleIds.includes(article.id)));
      setSelectedArticleIds([]);
      
      // Close modal if the selected article was deleted
      if (selectedArticle && selectedArticleIds.includes(selectedArticle.id)) {
        setSelectedArticle(null);
      }
      
      toast.success(`${selectedArticleIds.length} articles deleted successfully`);
    } catch (error) {
      console.error('Error deleting articles:', error);
      toast.error('Failed to delete articles');
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete multiple written articles
  const deleteSelectedWrittenArticles = async () => {
    if (selectedWrittenArticleIds.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedWrittenArticleIds.length} selected articles?`)) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('written_articles')
        .delete()
        .in('id', selectedWrittenArticleIds);
      
      if (error) throw error;
      
      // Update local state
      setWrittenArticles(prev => prev.filter(article => !selectedWrittenArticleIds.includes(article.id)));
      setSelectedWrittenArticleIds([]);
      
      // Close modal if the selected article was deleted
      if (selectedWrittenArticle && selectedWrittenArticleIds.includes(selectedWrittenArticle.id)) {
        setSelectedWrittenArticle(null);
      }
      
      toast.success(`${selectedWrittenArticleIds.length} articles deleted successfully`);
    } catch (error) {
      console.error('Error deleting articles:', error);
      toast.error('Failed to delete articles');
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle selection of an article
  const toggleArticleSelection = (id: string) => {
    setSelectedArticleIds(prev => 
      prev.includes(id) 
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  // Toggle selection of a written article
  const toggleWrittenArticleSelection = (id: string) => {
    setSelectedWrittenArticleIds(prev => 
      prev.includes(id) 
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  // Toggle select all articles
  const toggleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedArticleIds([]);
    } else {
      setSelectedArticleIds(filteredArticles.map(article => article.id));
    }
    setSelectAllChecked(!selectAllChecked);
  };

  // Toggle select all written articles
  const toggleSelectAllWritten = () => {
    if (selectAllWrittenChecked) {
      setSelectedWrittenArticleIds([]);
    } else {
      setSelectedWrittenArticleIds(filteredWrittenArticles.map(article => article.id));
    }
    setSelectAllWrittenChecked(!selectAllWrittenChecked);
  };

  // Handle news type filter toggle
  const toggleNewsTypeFilter = (type: NewsType) => {
    setFilters(prev => ({
      ...prev,
      newsTypes: prev.newsTypes.includes(type)
        ? prev.newsTypes.filter(t => t !== type)
        : [...prev.newsTypes, type]
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      subject: '',
      mood: '',
      newsTypes: [],
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-6">
        <button
          onClick={() => setActiveTab('news')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'news' 
              ? 'border-purple-500 text-purple-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Raw News
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-6 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'articles' 
              ? 'border-purple-500 text-purple-400' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          Written Articles
        </button>
      </div>

      {/* Search and Filters */}
      <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
        
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 transition-all"
            >
              <Filter className="w-5 h-5 text-gray-400" />
              <span>Filter</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Sort Button */}
            <button
              onClick={() => handleSort('timestamp')}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-purple-500/30 transition-all"
            >
              <ArrowUpDown className="w-5 h-5 text-gray-400" />
              <span>{sortDirection === 'desc' ? 'Newest First' : 'Oldest First'}</span>
            </button>
            
            {/* Batch Delete Button - Only show when articles are selected */}
            {selectedArticleIds.length > 0 && (
              <button
                onClick={deleteSelectedArticles}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 transition-all"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Selected ({selectedArticleIds.length})</span>
              </button>
            )}
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="p-4 bg-gray-900/70 rounded-lg border border-gray-800 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filter Articles</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                    placeholder="Filter by subject"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
                
                {/* Mood Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mood
                  </label>
                  <select
                    name="mood"
                    value={filters.mood}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">All Moods</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
              </div>
              
              {/* News Types Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  News Types
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {newsTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.newsTypes.includes(type)}
                        onChange={() => toggleNewsTypeFilter(type)}
                        className="rounded border-gray-700 text-purple-500 focus:ring-purple-500/20"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Range Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date From
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateFrom"
                      value={filters.dateFrom}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date To
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateTo"
                      value={filters.dateTo}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* Active Filters Display */}
              {(filters.subject || filters.mood || filters.newsTypes.length > 0 || filters.dateFrom || filters.dateTo) && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">Active filters:</div>
                  <div className="flex flex-wrap gap-2">
                    {filters.subject && (
                      <div className="px-2 py-1 bg-gray-800 rounded-full text-xs flex items-center gap-1">
                        Subject: {filters.subject}
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, subject: '' }))}
                          className="p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {filters.mood && (
                      <div className="px-2 py-1 bg-gray-800 rounded-full text-xs flex items-center gap-1">
                        Mood: {filters.mood}
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, mood: '' }))}
                          className="p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {filters.newsTypes.map(type => (
                      <div key={type} className="px-2 py-1 bg-gray-800 rounded-full text-xs flex items-center gap-1">
                        Type: {type}
                        <button 
                          onClick={() => toggleNewsTypeFilter(type)}
                          className="p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {filters.dateFrom && (
                      <div className="px-2 py-1 bg-gray-800 rounded-full text-xs flex items-center gap-1">
                        From: {filters.dateFrom}
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, dateFrom: '' }))}
                          className="p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {filters.dateTo && (
                      <div className="px-2 py-1 bg-gray-800 rounded-full text-xs flex items-center gap-1">
                        To: {filters.dateTo}
                        <button 
                          onClick={() => setFilters(prev => ({ ...prev, dateTo: '' }))}
                          className="p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Results Count and Batch Selection */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Select All Checkbox */}
              {(activeTab === 'news' ? filteredArticles.length > 0 : filteredWrittenArticles.length > 0) && (
                <label className="flex items-center gap-2 cursor-pointer">
                  {(activeTab === 'news' ? selectAllChecked : selectAllWrittenChecked) ? (
                    <CheckSquare 
                      className="w-5 h-5 text-purple-400 article-checkbox" 
                      onClick={activeTab === 'news' ? toggleSelectAll : toggleSelectAllWritten}
                    />
                  ) : (
                    <Square 
                      className="w-5 h-5 text-gray-400 article-checkbox" 
                      onClick={activeTab === 'news' ? toggleSelectAll : toggleSelectAllWritten}
                    />
                  )}
                  <span className="text-sm text-gray-300">Select All</span>
                </label>
              )}
              
              <div className="text-sm text-gray-400">
                {activeTab === 'news' 
                  ? `${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'} found`
                  : `${filteredWrittenArticles.length} ${filteredWrittenArticles.length === 1 ? 'article' : 'articles'} found`
                }
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              {filters.subject || filters.mood || filters.newsTypes.length > 0 || filters.dateFrom || filters.dateTo || searchTerm ? (
                <span className="flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  Filters applied
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      
      {/* Articles Grid */}
      <div className="relative fade-in-animation">
        {activeTab === 'news' ? (
          <>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-10 h-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No articles found.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search terms.</p>
                {(filters.subject || filters.mood || filters.newsTypes.length > 0 || filters.dateFrom || filters.dateTo || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20 inline-flex items-center gap-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <div 
                    key={article.id}
                    onClick={(e) => openArticle(article, e)}
                    className="relative p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-all cursor-pointer group hover:shadow-lg hover:shadow-purple-500/5"
                  >
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.2)]" />
                    </div>
                    
                    <div className="relative">
                      {/* Selection Checkbox */}
                      <div className="absolute top-0 left-0 p-2 article-checkbox z-10">
                        {selectedArticleIds.includes(article.id) ? (
                          <CheckSquare 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleArticleSelection(article.id);
                            }}
                            className="w-5 h-5 text-purple-400 cursor-pointer"
                          />
                        ) : (
                          <Square 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleArticleSelection(article.id);
                            }}
                            className="w-5 h-5 text-gray-400 cursor-pointer opacity-70 group-hover:opacity-100"
                          />
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-0 right-0 p-2 flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticle(article);
                            setEditedArticle({});
                            setIsEditing(true);
                          }}
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/30 text-blue-400 opacity-0 group-hover:opacity-100 transition-all article-edit-btn"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this article?')) {
                              deleteArticle(article.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 opacity-0 group-hover:opacity-100 transition-all article-delete-btn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-4 line-clamp-1 pt-6">{article.subject}</h3>
                      
                      <div className="flex gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                          article.mood === 'positive' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          article.mood === 'negative' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {article.mood}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(article.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {article.introduction}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-sm text-purple-400 group-hover:underline">
                          Read more
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {isLoadingWritten ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-10 h-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
              </div>
            ) : filteredWrittenArticles.length === 0 ? (
              <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No written articles found.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search terms.</p>
                {(filters.subject || filters.mood || filters.newsTypes.length > 0 || filters.dateFrom || filters.dateTo || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20 inline-flex items-center gap-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWrittenArticles.map((article) => (
                  <div 
                    key={article.id}
                    onClick={(e) => openWrittenArticle(article, e)}
                    className="relative p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-all cursor-pointer group hover:shadow-lg hover:shadow-purple-500/5"
                  >
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(147,51,234,0.2)]" />
                    </div>
                    
                    <div className="relative">
                      {/* Selection Checkbox */}
                      <div className="absolute top-0 left-0 p-2 article-checkbox z-10">
                        {selectedWrittenArticleIds.includes(article.id) ? (
                          <CheckSquare 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWrittenArticleSelection(article.id);
                            }}
                            className="w-5 h-5 text-purple-400 cursor-pointer"
                          />
                        ) : (
                          <Square 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWrittenArticleSelection(article.id);
                            }}
                            className="w-5 h-5 text-gray-400 cursor-pointer opacity-70 group-hover:opacity-100"
                          />
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-0 right-0 p-2 flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this article?')) {
                              deleteWrittenArticle(article.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 opacity-0 group-hover:opacity-100 transition-all article-delete-btn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-4 line-clamp-1 pt-6">{article.header}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                          article.mood === 'positive' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          article.mood === 'negative' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {article.mood}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(article.timestamp).toLocaleDateString()}
                        </span>
                        {article.type && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/20">
                            {article.type}
                          </span>
                        )}
                        {article.image && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                            <FileImage className="w-3 h-3" />
                            Image
                          </span>
                        )}
                        {article.video && (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            Video
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {article.article.substring(0, 150)}...
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-sm text-purple-400 group-hover:underline">
                          Read more
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Batch Delete Button for Written Articles */}
            {selectedWrittenArticleIds.length > 0 && (
              <div className="fixed bottom-8 right-8 z-10">
                <button
                  onClick={deleteSelectedWrittenArticles}
                  disabled={isDeleting}
                  className="px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Selected ({selectedWrittenArticleIds.length})</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            ref={modalRef}
            className="relative bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 rounded-xl border border-purple-500/30 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={closeArticleModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Article Content */}
            <div className="pt-6">
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={editedArticle.subject ?? selectedArticle.subject}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mood
                    </label>
                    <select
                      name="mood"
                      value={editedArticle.mood ?? selectedArticle.mood}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    >
                      <option value="positive">Positive</option>
                      <option value="neutral">Neutral</option>
                      <option value="negative">Negative</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Introduction
                    </label>
                    <textarea
                      name="introduction"
                      value={editedArticle.introduction ?? selectedArticle.introduction}
                      onChange={handleEditChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Developments
                    </label>
                    <textarea
                      name="developments"
                      value={editedArticle.developments ?? selectedArticle.developments}
                      onChange={handleEditChange}
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Implications
                    </label>
                    <textarea
                      name="implications"
                      value={editedArticle.implications ?? selectedArticle.implications}
                      onChange={handleEditChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedArticle({});
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveArticle}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold">{selectedArticle.subject}</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/20 flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this article?')) {
                            deleteArticle(selectedArticle.id);
                            closeArticleModal();
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      selectedArticle.mood === 'positive' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      selectedArticle.mood === 'negative' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {selectedArticle.mood}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                      {new Date(selectedArticle.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-2">Introduction</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedArticle.introduction}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold mb-2">Developments</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedArticle.developments}</p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-semibold mb-2">Implications</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedArticle.implications}</p>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Written Article Modal */}
      {selectedWrittenArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="relative bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 rounded-xl border border-purple-500/30 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={closeWrittenArticleModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Article Content */}
            <div className="pt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold">{selectedWrittenArticle.header}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this article?')) {
                          deleteWrittenArticle(selectedWrittenArticle.id);
                          closeWrittenArticleModal();
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                    selectedWrittenArticle.mood === 'positive' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    selectedWrittenArticle.mood === 'negative' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {selectedWrittenArticle.mood}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                    {new Date(selectedWrittenArticle.timestamp).toLocaleString()}
                  </span>
                  {selectedWrittenArticle.type && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300">
                      {selectedWrittenArticle.type}
                    </span>
                  )}
                </div>
                
                {selectedWrittenArticle.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={selectedWrittenArticle.image} 
                      alt={selectedWrittenArticle.header}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </div>
                )}
                
                {selectedWrittenArticle.video && (
                  <div className="rounded-lg overflow-hidden">
                    <iframe
                      src={selectedWrittenArticle.video}
                      className="w-full aspect-video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedWrittenArticle.article}
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mt-6 pt-6 border-t border-gray-800">
                  <p>Original subject: {selectedWrittenArticle.subject}</p>
                  <p>Created: {new Date(selectedWrittenArticle.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Batch Delete Button for Raw Articles */}
      {activeTab === 'news' && selectedArticleIds.length > 0 && (
        <div className="fixed bottom-8 right-8 z-10">
          <button
            onClick={deleteSelectedArticles}
            disabled={isDeleting}
            className="px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 transition-all flex items-center gap-2 shadow-lg"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete Selected ({selectedArticleIds.length})</span>
          </button>
        </div>
      )}
    </div>
  );
}