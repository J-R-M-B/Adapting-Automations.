import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative z-[100]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-5 h-5 text-purple-400" />
        <span className="text-white">English</span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute right-0 mt-2 w-56 rounded-lg bg-gray-900 shadow-lg border border-purple-500/30
          transform transition-all duration-200 origin-top-right z-[100]
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
        `}
      >
        <div className="py-2 px-1">
          {/* Static language options without functionality */}
          {['English', 'Dutch', 'German', 'French', 'Spanish'].map((language) => (
            <button
              key={language}
              className={`
                w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg
                ${language === 'English'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-300 hover:bg-purple-500/10 hover:text-white'
                }
                transition-colors duration-200
              `}
            >
              <span>{language}</span>
              {language === 'English' && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}