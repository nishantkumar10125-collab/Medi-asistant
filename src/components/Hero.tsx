import React from 'react';
import { Mic, Upload, Pill, MapPin, ArrowRight } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const features = [
    {
      icon: Mic,
      title: 'Voice Symptom Checker',
      description: 'Describe your symptoms by voice or text for AI analysis',
      action: () => setActiveSection('symptoms'),
      color: 'bg-blue-500',
    },
    {
      icon: Upload,
      title: 'Prescription Analyzer',
      description: 'Upload prescriptions and lab reports for detailed analysis',
      action: () => setActiveSection('prescription'),
      color: 'bg-teal-500',
    },
    {
      icon: Pill,
      title: 'Medicine Guide',
      description: 'Get medicine information and interaction warnings',
      action: () => setActiveSection('medicine'),
      color: 'bg-green-500',
    },
    {
      icon: MapPin,
      title: 'Find Specialists',
      description: 'Locate nearby doctors and specialists for your needs',
      action: () => setActiveSection('doctors'),
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
          Your AI-Powered
          <span className="text-blue-600 block">Healthcare Assistant</span>
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Get instant symptom analysis, prescription insights, medicine recommendations, 
          and find the right healthcare professionals near you.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-12 max-w-2xl mx-auto">
          <p className="text-amber-800 font-medium">
            ⚠️ Important: This tool provides informational support only and should not replace professional medical advice.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              onClick={feature.action}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-slate-200 group"
            >
              <div className="p-6">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl text-white p-8 mb-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Always Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">AI-Powered</div>
            <div className="text-blue-100">Advanced Analysis</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">Secure</div>
            <div className="text-blue-100">Privacy Protected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;