import { useAuthStore } from '../lib/store/auth';
import { Calendar, CheckSquare, ShoppingCart, Users, Settings, Bell } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuthStore();
  const familyName = user?.user_metadata?.family_name || 'Your Family';

  const menuItems = [
    {
      icon: Calendar,
      title: 'Calendar',
      description: 'Schedule and track family events',
      color: 'bg-blue-500'
    },
    {
      icon: CheckSquare,
      title: 'Tasks',
      description: 'Manage family tasks and chores',
      color: 'bg-green-500'
    },
    {
      icon: ShoppingCart,
      title: 'Shopping Lists',
      description: 'Create and share shopping lists',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Family Members',
      description: 'Manage family profiles and roles',
      color: 'bg-yellow-500'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'View and manage alerts',
      color: 'bg-red-500'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure family preferences',
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to {familyName}'s Hub
        </h1>
        <p className="text-gray-600">
          Manage your family's activities and stay connected
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 text-left"
          >
            <div className={`inline-flex items-center justify-cen