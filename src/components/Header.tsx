import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { useTranslation } from 'react-i18next';
import { AccountModal } from './AccountModal';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.logo-button')) {
        setIsMenuOpen(false);
      }
      if (isProfileOpen && !target.closest('.profile-menu') && !target.closest('.profile-button')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isProfileOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
      setIsProfileOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationLinks = [
    { path: '/', label: 'Home' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    // Consulting link removed temporarily
    // { path: '/consulting', label: 'Consulting' },
  ];

  return (
    <header className="h-20 bg-black z-[100]">
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center text-white hover:opacity-80 transition-opacity logo-button h-full"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <img src="/Assets/Logo TR (P1) G.png" alt="Logo" className="h-[40px] object-contain" />
          </button>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navigationLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`
                relative px-4 h-10 flex items-center text-lg font-medium text-white
                transition-all duration-200 nav-link hover:text-purple-400
                ${location.pathname === path ? 'is-active text-purple-400' : ''} whitespace-nowrap
              `}
            >
              {label}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-all duration-300 nav-glow" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative profile-menu">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition-all duration-200 profile-button"
              >
                <User className="w-5 h-5 text-purple-400" />
                <span className="text-white">{user.email?.split('@')[0]}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 shadow-lg py-1 border border-purple-500/30 z-[200]">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              Account
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={`
            fixed inset-y-0 left-0 w-64 bg-black/95 backdrop-blur-lg shadow-xl
            transform transition-transform duration-300 ease-in-out z-[150]
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          onKeyDown={handleKeyDown}
        >
          <div className="mobile-menu flex flex-col h-full pt-20">
            <nav className="flex-1 px-4 py-6">
              <div className="space-y-2">
                {navigationLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`
                      block px-4 py-3 text-lg rounded-lg text-white
                      hover:bg-purple-500/10 transition-all duration-200
                      ${location.pathname === path ? 'bg-purple-500/20 text-purple-400' : ''}
                    `}
                  >
                    {label}
                  </Link>
                ))}

                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-lg rounded-lg text-white hover:bg-purple-500/10 transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-lg rounded-lg text-white hover:bg-purple-500/10 transition-all duration-200 flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAccountModalOpen(true);
                    }}
                    className="w-full px-4 py-3 text-lg rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                  >
                    Account
                  </button>
                )}
              </div>
            </nav>

            <div className="px-4 py-6 border-t border-white/10">
              <Link 
                to="/privacy"
                className="block px-4 py-3 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms"
                className="block px-4 py-3 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[140]"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Account Modal */}
        <AccountModal
          isOpen={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
        />
      </div>
    </header>
  );
}