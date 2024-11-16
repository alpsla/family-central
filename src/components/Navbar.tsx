import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X, UserCircle, LogOut, Calendar, CheckSquare, ShoppingCart, Users } from 'lucide-react';
import { useAuthStore } from '../lib/store/auth';
import type { User } from '../lib/auth/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const navLinks = [
    { icon: Calendar, label: 'Calendar', href: '/calendar' },
    { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
    { icon: ShoppingCart, label: 'Shopping', href: '/shopping' },
    { icon: Users, label: 'Members', href: '/family' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    setIsOpen(false);
  };

  const getUserDisplayName = (user: User | null) => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email.split('@')[0];
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
            {isAuthenticated && (
              <div className="flex items-center space-x-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <UserCircle className="h-5 w-5" />
                  <span className="font-medium">
                    {getUserDisplayName(user)}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                {location.pathname !== '/auth' && (
                  <button
                    onClick={() => navigate('/auth')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </>
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
              {isAuthenticated && (
                <>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-2 py-1"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-2 px-2 py-1 text-gray-700">
                      <UserCircle className="h-5 w-5" />
                      <span className="font-medium">
                        {getUserDisplayName(user)}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-2 flex items-center space-x-2 w-full bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}

              {!isAuthenticated && location.pathname !== '/auth' && (
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}