import { useState } from 'react';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { 
  Newspaper, 
  Filter, 
  Search, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Save,
  BookOpen,
  Database,
  Settings,
  PlayCircle
} from 'lucide-react';
import { NewsGatheringTab } from '../../components/news/NewsGatheringTab';
import { NewsLibraryTab } from '../../components/news/NewsLibraryTab';
import { NewsOperatingTab } from '../../components/news/NewsOperatingTab';

export function News() {
  const [activeTab, setActiveTab] = useState<'gathering' | 'library' | 'operating'>('gathering');

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
                <Newspaper className="w-8 h-8 text-purple-400" />
                News Management
              </span>
            </h1>
            <p className="text-gray-400">
              Configure, collect, and manage news content
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-lg border border-purple-500/30">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('gathering')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'gathering'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  Gathering
                </button>
                <button
                  onClick={() => setActiveTab('library')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'library'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Library
                </button>
                <button
                  onClick={() => setActiveTab('operating')}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    activeTab === 'operating'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  Operating
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="fade-in-animation">
          {activeTab === 'gathering' && <NewsGatheringTab />}
          {activeTab === 'library' && <NewsLibraryTab />}
          {activeTab === 'operating' && <NewsOperatingTab />}
        </div>
      </div>
    </div>
  );
}