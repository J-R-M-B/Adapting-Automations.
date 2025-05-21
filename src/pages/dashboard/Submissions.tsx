import { useState } from 'react';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { 
  FileText, 
  Mail, UserCog,
  Settings, 
  Filter, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  User,
  MessageSquare,
  Edit,
  Check,
  X as XIcon
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import toast from 'react-hot-toast';

interface FeatureRequest {
  id: string;
  name: string;
  email: string;
  company: string | null;
  request_type: string;
  description: string;
  status: string;
  admin_notes: string | null;
  admin_response: string | null;
  created_at: string;
}

export function Submissions() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'contact' | 'consultation' | 'newsletter' | 'feature' | 'settings'>('contact');
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FeatureRequest | null>(null);
  const [responseText, setResponseText] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);

  useEffect(() => {
    if (activeTab === 'feature') {
      fetchFeatureRequests();
    }
  }, [activeTab]);

  const fetchFeatureRequests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_feature_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeatureRequests(data || []);
    } catch (error) {
      console.error('Error fetching feature requests:', error);
      toast.error('Failed to load feature requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('website_feature_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setFeatureRequests(prev => 
        prev.map(req => req.id === id ? { ...req, status } : req)
      );
      
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleOpenResponseModal = (request: FeatureRequest) => {
    setSelectedRequest(request);
    setResponseText(request.admin_response || '');
    setAdminNotes(request.admin_notes || '');
    setShowResponseModal(true);
  };

  const handleSaveResponse = async () => {
    if (!selectedRequest) return;
    
    try {
      const { error } = await supabase
        .from('website_feature_requests')
        .update({ 
          admin_response: responseText,
          admin_notes: adminNotes,
          status: 'responded'
        })
        .eq('id', selectedRequest.id);

      if (error) throw error;
      
      // Update local state
      setFeatureRequests(prev => 
        prev.map(req => req.id === selectedRequest.id ? { 
          ...req, 
          admin_response: responseText,
          admin_notes: adminNotes,
          status: 'responded'
        } : req)
      );
      
      setShowResponseModal(false);
      toast.success('Response saved successfully');
    } catch (error) {
      console.error('Error saving response:', error);
      toast.error('Failed to save response');
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
              <span className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-purple-400" />
                Submissions Management
              </span>
            </h1>
            <p className="text-gray-400">
              Manage form submissions and inquiries
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-lg border border-purple-500/30">
              <div className="flex">
                {[
                  { id: 'contact', label: 'Contact Forms' },
                  { id: 'consultation', label: 'Consultations' },
                  { id: 'newsletter', label: 'Newsletter' },
                  { id: 'settings', label: 'Settings' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
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
        {activeTab === 'contact' && (
          <div className="space-y-8 fade-in-animation">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search submissions..."
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

            {/* Contact Form Submissions */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
              
              <div className="relative">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  Contact Form Submissions
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[
                        { name: 'John Smith', email: 'john.smith@example.com', subject: 'Product Inquiry', date: '2025-03-15', status: 'new' },
                        { name: 'Sarah Johnson', email: 'sarah.j@example.com', subject: 'Support Request', date: '2025-03-14', status: 'read' },
                        { name: 'Michael Brown', email: 'michael.b@example.com', subject: 'Partnership Opportunity', date: '2025-03-12', status: 'replied' }
                      ].map((submission, index) => (
                        <tr key={index} className="hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <User className="h-5 w-5 text-purple-400" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{submission.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{submission.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{submission.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{submission.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {submission.status === 'new' && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                New
                              </span>
                            )}
                            {submission.status === 'read' && (
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                Read
                              </span>
                            )}
                            {submission.status === 'replied' && (
                              <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                Replied
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                                <Mail className="w-4 h-4 text-gray-400" />
                              </button>
                              <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Showing 3 of 24 submissions
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm">
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'consultation' && (
          <div className="space-y-8 fade-in-animation">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Consultation Requests</h2>
            <p className="text-gray-400 mb-8">
              Manage consultation and call requests
            </p>
            
            {/* Consultation content would go here */}
            <div className="text-center py-12 text-gray-400">
              Consultation requests module content will be implemented in a future update
            </div>
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="space-y-8 fade-in-animation">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Newsletter Subscribers</h2>
            <p className="text-gray-400 mb-8">
              Manage newsletter subscribers
            </p>
            
            {/* Newsletter content would go here */}
            <div className="text-center py-12 text-gray-400">
              Newsletter subscribers module content will be implemented in a future update
            </div>
          </div>
        )}

        {activeTab === 'feature' && (
          <div className="space-y-8 fade-in-animation">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Feature Requests</h2>
                <p className="text-gray-400 mb-8">
                  Manage website feature requests and inquiries
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={fetchFeatureRequests}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>
            
            {/* Feature Requests Table */}
            <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)]" />
              
              <div className="relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Feature Requests
                  </h2>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search requests..."
                      className="w-64 pl-9 pr-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                    />
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : featureRequests.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No feature requests found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {featureRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-800/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                  <User className="h-5 w-5 text-purple-400" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">{request.name}</div>
                                  {request.company && (
                                    <div className="text-sm text-gray-400">{request.company}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{request.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {request.request_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={request.status}
                                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                className="px-2 py-1 text-xs rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                              >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="responded">Responded</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {new Date(request.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleOpenResponseModal(request)}
                                  className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                                >
                                  <Edit className="w-4 h-4 text-blue-400" />
                                </button>
                                <button
                                  onClick={() => {
                                    // View details functionality
                                  }}
                                  className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors"
                                >
                                  <MessageSquare className="w-4 h-4 text-purple-400" />
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
            
            {/* Response Modal */}
            {showResponseModal && selectedRequest && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowResponseModal(false)} />
                <div className="relative w-full max-w-3xl p-6 rounded-lg bg-gray-900 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4">Respond to Request</h3>
                  
                  <div className="mb-6 p-4 rounded-lg bg-gray-800/50">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="font-medium">{selectedRequest.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-medium">{selectedRequest.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Request Type</p>
                        <p className="font-medium capitalize">{selectedRequest.request_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Date</p>
                        <p className="font-medium">{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Description</p>
                      <p className="mt-1 p-2 rounded bg-gray-900/50">{selectedRequest.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Admin Notes (Internal Only)
                      </label>
                      <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="Internal notes about this request..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Response to User
                      </label>
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="Your response to the user..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => setShowResponseModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveResponse}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors"
                    >
                      Save Response
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8 fade-in-animation">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">Submission Settings</h2>
            <p className="text-gray-400 mb-8">
              Configure form submission settings
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