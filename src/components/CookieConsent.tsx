import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      {/* Backdrop blur and overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content container */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0f1629]/95 to-[#0a0a1f]/95 backdrop-blur-sm overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className="absolute inset-0 rounded-2xl border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
          </div>

          {/* Energy wave effects */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
          </div>

          {/* Content */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <Cookie className="w-12 h-12 text-purple-400" />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2 text-white">Cookie Settings</h2>
              <p className="text-gray-300 mb-4">
                We use cookies to enhance your browsing experience and analyze our traffic. 
                Please choose whether you consent to our use of cookies.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleConsent(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  Accept All Cookies
                </button>
                <button
                  onClick={() => handleConsent(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                >
                  Decline
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close cookie settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}