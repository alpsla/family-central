import { Calendar, CheckSquare, ShoppingCart, Users, Settings, Bell } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  {
    icon: Calendar,
    title: 'Calendar',
    description: 'Schedule and track family events',
    color: 'bg-blue-500',
    href: '/calendar'
  },
  {
    icon: CheckSquare,
    title: 'Tasks',
    description: 'Manage family tasks and chores',
    color: 'bg-green-500',
    href: '/tasks'
  },
  {
    icon: ShoppingCart,
    title: 'Shopping Lists',
    description: 'Create and share shopping lists',
    color: 'bg-purple-500',
    href: '/shopping'
  },
  {
    icon: Users,
    title: 'Family Members',
    description: 'Manage family profiles and roles',
    color: 'bg-yellow-500',
    href: '/family'
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'View and manage alerts',
    color: 'bg-red-500',
    href: '/notifications'
  },
  {
    icon: Settings,
    title: 'Settings',
    description: 'Configure family preferences',
    color: 'bg-gray-500',
    href: '/settings'
  }
];

export default function MenuGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            to={item.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 text-left w-full"
          >
            <div className="flex items-center space-x-4">
              <div className={`${item.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}