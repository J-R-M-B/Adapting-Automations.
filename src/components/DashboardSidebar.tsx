import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  LayoutDashboard,
  Share2,
  MailCheck,
  Settings,
  UserCog,
  FileText,
  Users,
  Newspaper,
  Phone,
  BarChart
} from 'lucide-react';

const SIDEBAR_WIDTH = 72;
const SIDEBAR_WIDTH_EXPANDED = 300;
const TRANSITION_DURATION = 300;

export function DashboardSidebar() {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Reset active item when location changes
  useEffect(() => {
    setActiveItemIndex(null);
  }, [location]);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard Overview',
      path: '/dashboard'
    },
    {
      icon: Share2,
      label: 'Social Media',
      path: '/dashboard/social-media',
    },
    {
      icon: MailCheck,
      label: 'Newsletter',
      path: '/dashboard/newsletter',
    },
    {
      icon: Newspaper,
      label: 'News',
      path: '/dashboard/news',
    },
    {
      icon: Phone,
      label: 'Phone Agent',
      path: '/dashboard/phone-agent',
    },
    {
      icon: FileText,
      label: 'Submissions',
      path: '/dashboard/submissions',
    },
    {
      icon: BarChart,
      label: 'Analytics',
      path: '/dashboard/analytics',
    }
  ];

  // Add admin-only menu items
  const adminItems = [
    {
      icon: Users,
      label: 'Account Management',
      path: '/dashboard/accounts'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/dashboard/settings'
    }
  ];

  return (
    <div
      ref={sidebarRef}
      style={{ width: isExpanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH }}
      className="bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 h-screen fixed left-0 top-20 border-r border-purple-500/20 transition-all duration-300 overflow-hidden z-30 group shadow-lg shadow-black/20"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.03),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.03),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
      </div>
      
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-2 top-4 p-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-all duration-200 z-10 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-sm hover:shadow-purple-500/10"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>

      <div className="p-4 pt-12">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const isHovered = activeItemIndex === index;

            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setActiveItemIndex(index)}
                onMouseLeave={() => setActiveItemIndex(null)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group/item overflow-hidden
                  ${isActive
                     ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-400 shadow-sm shadow-purple-500/10'
                     : 'text-gray-300 hover:bg-purple-500/10 hover:text-white hover:shadow-sm hover:shadow-purple-500/5'
                  }
                `}
              >
                {/* Animated hover effect */}
                {(isActive || isHovered) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse" />
                )}
                
                {/* Left border indicator for active item */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-blue-500 rounded-r" />
                )}
                
                <div className="relative z-10 flex items-center justify-center w-5 h-5 min-w-5">
                  <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive || isHovered ? 'scale-110' : ''}`} />
                </div>
                
                <span 
                  className={`
                    flex-grow whitespace-nowrap overflow-hidden transition-all duration-300
                    ${!isExpanded ? 'opacity-0 w-0 translate-x-4' : 'opacity-100 w-auto translate-x-0'}
                  `}
                >
                  {item.label}
                </span>
                
                <ChevronRight 
                  className={`
                    w-4 h-4 transition-all duration-200
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-70'} 
                    ${!isExpanded ? 'hidden' : ''}
                  `} 
                />
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-800">
            {adminItems.map((item, index) => {
              const itemIndex = index + menuItems.length;
              const isActive = location.pathname === item.path;
              const isHovered = activeItemIndex === itemIndex;
              
              return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setActiveItemIndex(itemIndex)}
                onMouseLeave={() => setActiveItemIndex(null)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group/item overflow-hidden
                  ${isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-400 shadow-sm shadow-purple-500/10'
                    : 'text-gray-300 hover:bg-purple-500/10 hover:text-white hover:shadow-sm hover:shadow-purple-500/5'
                   }
                `}
              >
                {/* Animated hover effect */}
                {(isActive || isHovered) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse" />
                )}
                
                {/* Left border indicator for active item */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-blue-500 rounded-r" />
                )}
                
                <div className="relative z-10 flex items-center justify-center w-5 h-5 min-w-5">
                  <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive || isHovered ? 'scale-110' : ''}`} />
                </div>
                
                <span 
                  className={`
                    flex-grow whitespace-nowrap overflow-hidden transition-all duration-300
                    ${!isExpanded ? 'opacity-0 w-0 translate-x-4' : 'opacity-100 w-auto translate-x-0'}
                  `}
                >
                  {item.label}
                </span>
                
                <ChevronRight 
                  className={`
                    w-4 h-4 transition-all duration-200
                    ${isActive ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-70'} 
                    ${!isExpanded ? 'hidden' : ''}
                  `} 
                />
              </Link>
            )})}
          </div>
        </nav>
      </div>
    </div>
  );
}