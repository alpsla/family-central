import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X, UserCircle } from 'lucide-react';
import { useAuthStore } from '../lib/store/auth';
import type { User } from '../lib/auth/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/auth');
    }
    setIsOpen(false);
  };

  const getUserDisplayName = (user: User | null) => {
    if (!user) return '';
    
    // Try user_metadata first
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }

    // Then try direct properties
    const parts = [];
    if (user.familyName) parts.push(user.familyName);
    if (user.name) parts.push(user.name);
    
    // Fallback to email
    return parts.length > 0 ? parts.join(' • ') : user.email.split('@')[0];
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">FamilyHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#community">Community</NavLink>
            <NavLink href="#about">About</NavLink>
            
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 text-gray-700">
                <UserCircle className="h-5 w-5" />
                <span className="font-medium">
                  {getUserDisplayName(user)}
                </span>
              </div>
            )}
            
            {location.pathname !== '/auth' && (
              <button
                onClick={handleAuthClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isAuthenticated ? 'Sign Out' : 'Sign In'}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#community">Community</MobileNavLink>
              <MobileNavLink href="#about">About</MobileNavLink>
              {isAuthenticated && user && (
                <div className="flex items-center space-x-2 px-2 py-1 text-gray-700">
                  <UserCircle className="h-5 w-5" />
                  <span className="font-medium">
                    {getUserDisplayName(user)}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-100">
                {location.pathname !== '/auth' && (
                  <button
                    onClick={handleAuthClick}
                    className="block w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    {isAuthenticated ? 'Sign Out' : 'Sign In'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-gray-900 transition-colors block px-2 py-1"
    >
      {children}
    </a>
  );
}