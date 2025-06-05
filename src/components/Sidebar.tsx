
import React from 'react';
import { BarChart3, Activity, Smile, CheckSquare, BookOpen, DollarSign, User, Settings, Home, Menu, Bell } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const trackerItems = [
    { id: 'learning', label: 'Learning', icon: BarChart3, color: 'text-blue-500' },
    { id: 'fitness', label: 'Fitness', icon: Activity, color: 'text-green-500' },
    { id: 'mood', label: 'Mood', icon: Smile, color: 'text-yellow-500' },
    { id: 'productivity', label: 'Tasks', icon: CheckSquare, color: 'text-purple-500' },
    { id: 'reading', label: 'Reading', icon: BookOpen, color: 'text-orange-500' },
    { id: 'finance', label: 'Finance', icon: DollarSign, color: 'text-emerald-500' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-lg shadow-2xl transition-all duration-300 z-30 ${isOpen ? 'w-64' : 'w-16'} overflow-y-auto`}>
  <div className="p-4 min-h-full flex flex-col">

        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MyLife Dashboard
            </h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon size={20} />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {isOpen && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Access
            </h3>
            <div className="space-y-2">
              {trackerItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Icon size={16} className={item.color} />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isOpen && (
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white">
            <h4 className="font-semibold mb-2">Daily Motivation</h4>
            <p className="text-sm opacity-90">
              "The only way to do great work is to love what you do." - Steve Jobs
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
