import { Link } from 'react-router-dom';
import { Mail, MapPin, Building2, FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Simple black background with purple radial gradient */}
      <div className="relative bg-black py-16">
        {/* Purple radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_70%)]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column - Navigation Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-purple-400">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/solutions', label: 'Solutions' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 relative group"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center Column - Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-purple-400">Stay Updated</h3>
              <form className="space-y-4">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-lg border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-shadow duration-300" />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Right Column - Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-purple-400">Contact Us</h3>
              <div className="space-y-4 text-gray-400">
                <p className="font-semibold text-white">Adapting Automations</p>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-400 mt-1" />
                  <a 
                    href="mailto:contact@adaptingautomations.com"
                    className="hover:text-purple-400 transition-colors duration-300"
                  >
                    contact@adaptingautomations.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                  <p>Balledonk 14a<br />Heeswijk-Dinther<br />Noord-Brabant, Nederland</p>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-purple-400 mt-1" />
                  <div className="flex items-center gap-2">
                    <span>Registration Number:</span>
                    <span className="font-mono">90072707</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Adapting Automations. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link 
                  to="/privacy"
                  className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms"
                  className="text-gray-500 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}