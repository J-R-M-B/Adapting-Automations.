import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './lib/auth';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { Home } from './pages/Home';
import { Solutions } from './pages/Solutions';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Login } from './pages/Login';
import { SuccessPage } from './pages/SuccessPage';
import { CancelPage } from './pages/CancelPage';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { AccountSettings } from './pages/AccountSettings';
import { AccountManagement } from './pages/AccountManagement';
import { SocialMedia } from './pages/dashboard/SocialMedia';
import { Newsletter } from './pages/dashboard/Newsletter';
import { News } from './pages/dashboard/News';
import { Submissions } from './pages/dashboard/Submissions';
import { PhoneAgent } from './pages/dashboard/PhoneAgent';
import { Analytics } from './pages/dashboard/Analytics';
import { Toaster } from 'react-hot-toast';
import { AnalyticsTracker } from './components/AnalyticsTracker';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <AnalyticsTracker /> {/* Add analytics tracker here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Consulting page route temporarily removed */}
          {/* <Route path="/consulting" element={<Consulting />} /> */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/social-media" 
            element={
              <RequireAuth>
                <SocialMedia />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/newsletter" 
            element={
              <RequireAuth>
                <Newsletter />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/news" 
            element={
              <RequireAuth>
                <News />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/submissions" 
            element={
              <RequireAuth>
                <Submissions />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/phone-agent" 
            element={
              <RequireAuth>
                <PhoneAgent />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/settings" 
            element={
              <RequireAuth>
                <AccountSettings />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/accounts" 
            element={
              <RequireAuth>
                <AccountManagement />
              </RequireAuth>
            } 
          />
          <Route 
            path="/dashboard/analytics" 
            element={
              <RequireAuth>
                <Analytics />
              </RequireAuth>
            } 
          />
        </Routes>
        <Footer />
        <CookieConsent />
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;