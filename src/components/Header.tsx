import React from 'react';
import { Stethoscope, Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            <Heart className="w-4 h-4 text-red-500 absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">MediAssist</h1>
            <p className="text-sm text-slate-600">AI-Powered Healthcare Assistant</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-800">24/7 Available</p>
            <p className="text-xs text-slate-600">Emergency? Call 911</p>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;