import React, { useState } from 'react';
import { Search, Pill, AlertTriangle, Info, ShieldCheck, Clock } from 'lucide-react';

const MedicineRecommendations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicineInfo, setMedicineInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchMedicine = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    // Simulate medicine database search
    setTimeout(() => {
      setMedicineInfo({
        name: searchTerm,
        genericName: 'Ibuprofen',
        brand: 'Advil, Motrin, Nurofen',
        category: 'NSAIDs (Nonsteroidal Anti-inflammatory Drugs)',
        uses: [
          'Pain relief (headache, muscle pain, toothache)',
          'Fever reduction',
          'Inflammation reduction',
          'Arthritis symptoms'
        ],
        dosage: {
          adults: '200-400mg every 4-6 hours (max 1200mg/day)',
          children: 'Consult pediatrician - typically 10mg/kg every 6-8 hours'
        },
        sideEffects: {
          common: ['Stomach upset', 'Nausea', 'Heartburn', 'Dizziness'],
          serious: ['Stomach bleeding', 'Kidney problems', 'Liver damage', 'Allergic reactions']
        },
        interactions: [
          'Blood thinners (warfarin) - increased bleeding risk',
          'ACE inhibitors - reduced effectiveness',
          'Alcohol - increased stomach bleeding risk',
          'Lithium - increased lithium levels'
        ],
        contraindications: [
          'Active stomach ulcers',
          'Severe kidney or liver disease',
          'Bleeding disorders',
          'Third trimester of pregnancy'
        ],
        alternatives: [
          {
            name: 'Acetaminophen (Tylenol)',
            reason: 'Less stomach irritation, good for fever and pain'
          },
          {
            name: 'Aspirin',
            reason: 'Similar anti-inflammatory effects, but higher bleeding risk'
          },
          {
            name: 'Naproxen (Aleve)',
            reason: 'Longer-lasting relief, fewer daily doses needed'
          }
        ],
        warnings: [
          'Do not exceed recommended dose',
          'Take with food to reduce stomach irritation',
          'Stop use if rash, stomach pain, or unusual symptoms occur',
          'Consult doctor if symptoms persist beyond 3 days'
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchMedicine();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <Pill className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Medicine Information & Recommendations</h2>
            <p className="text-slate-600">Search for medicine information, interactions, and alternatives</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search Medicine
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter medicine name (e.g., Ibuprofen, Aspirin, Tylenol...)"
              className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={searchMedicine}
              disabled={!searchTerm.trim() || isLoading}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </div>

        {/* Quick Search Suggestions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Ibuprofen', 'Acetaminophen', 'Aspirin', 'Naproxen'].map((medicine) => (
            <button
              key={medicine}
              onClick={() => {
                setSearchTerm(medicine);
                setTimeout(searchMedicine, 100);
              }}
              className="p-3 border border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 text-slate-700 text-sm font-medium transition-colors duration-200"
            >
              {medicine}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Information */}
      {medicineInfo && (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{medicineInfo.name}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Generic Name: <span className="font-medium text-slate-800">{medicineInfo.genericName}</span></p>
                  <p className="text-slate-600">Brand Names: <span className="font-medium text-slate-800">{medicineInfo.brand}</span></p>
                </div>
                <div>
                  <p className="text-slate-600">Category: <span className="font-medium text-slate-800">{medicineInfo.category}</span></p>
                </div>
              </div>
            </div>

            {/* Uses */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Common Uses</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {medicineInfo.uses.map((use: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">{use}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosage */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Recommended Dosage</h4>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p className="text-slate-700"><strong>Adults:</strong> {medicineInfo.dosage.adults}</p>
                <p className="text-slate-700"><strong>Children:</strong> {medicineInfo.dosage.children}</p>
              </div>
            </div>
          </div>

          {/* Side Effects */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold text-slate-800">Side Effects</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Common Side Effects</h4>
                <div className="space-y-2">
                  {medicineInfo.sideEffects.common.map((effect: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700 text-sm">{effect}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Serious Side Effects</h4>
                <div className="space-y-2">
                  {medicineInfo.sideEffects.serious.map((effect: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700 text-sm">{effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactions & Contraindications */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ShieldCheck className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-slate-800">Drug Interactions</h3>
              </div>
              <div className="space-y-3">
                {medicineInfo.interactions.map((interaction: string, index: number) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">{interaction}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-slate-800">Contraindications</h3>
              </div>
              <div className="space-y-2">
                {medicineInfo.contraindications.map((contraindication: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700 text-sm">{contraindication}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alternatives */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Alternative Medications</h3>
            <div className="space-y-4">
              {medicineInfo.alternatives.map((alt: any, index: number) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">{alt.name}</h4>
                  <p className="text-slate-600 text-sm">{alt.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-bold text-amber-800">Important Warnings</h3>
            </div>
            <div className="space-y-2">
              {medicineInfo.warnings.map((warning: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800 text-sm">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineRecommendations;