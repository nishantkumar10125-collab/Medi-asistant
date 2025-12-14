import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SymptomChecker from './components/SymptomChecker';
import PrescriptionAnalyzer from './components/PrescriptionAnalyzer';
import MedicineRecommendations from './components/MedicineRecommendations';
import DoctorFinder from './components/DoctorFinder';
import Hero from './components/Hero';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'symptoms':
        return <SymptomChecker />;
      case 'prescription':
        return <PrescriptionAnalyzer />;
      case 'medicine':
        return <MedicineRecommendations />;
      case 'doctors':
        return <DoctorFinder />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;