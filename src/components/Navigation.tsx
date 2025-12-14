import React from 'react';
import { Home, MessageCircle, FileText, Pill, MapPin } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'symptoms', label: 'Symptoms', icon: MessageCircle },
    { id: 'prescription', label: 'Prescriptions', icon: FileText },
    { id: 'medicine', label: 'Medicine', icon: Pill },
    { id: 'doctors', label: 'Find Doctors', icon: MapPin },
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;