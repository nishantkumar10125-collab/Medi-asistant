import React, { useState, useRef } from 'react';
import { Upload, FileText, Eye, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const PrescriptionAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
    }
  };

  const analyzeDocument = async () => {
    if (!file) return;
    
    setIsLoading(true);
    
    // Simulate document analysis
    setTimeout(() => {
      setAnalysis({
        documentType: 'Prescription',
        medications: [
          {
            name: 'Metformin 500mg',
            dosage: '500mg twice daily',
            purpose: 'Type 2 Diabetes management',
            sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
            interactions: ['Alcohol may increase risk of lactic acidosis'],
            instructions: 'Take with meals to reduce stomach upset'
          },
          {
            name: 'Lisinopril 10mg',
            dosage: '10mg once daily',
            purpose: 'Blood pressure control',
            sideEffects: ['Dry cough', 'Dizziness', 'Fatigue'],
            interactions: ['NSAIDs may reduce effectiveness'],
            instructions: 'Take at the same time each day, preferably in the morning'
          },
          {
            name: 'Atorvastatin 20mg',
            dosage: '20mg at bedtime',
            purpose: 'Cholesterol management',
            sideEffects: ['Muscle pain', 'Liver enzyme elevation'],
            interactions: ['Grapefruit juice should be avoided'],
            instructions: 'Take in the evening for best effectiveness'
          }
        ],
        labTests: [
          {
            name: 'HbA1c',
            value: '7.2%',
            range: 'Normal: <5.7%',
            status: 'elevated',
            meaning: 'Average blood sugar over past 2-3 months. Indicates diabetes management needs improvement.'
          },
          {
            name: 'Total Cholesterol',
            value: '240 mg/dL',
            range: 'Desirable: <200 mg/dL',
            status: 'high',
            meaning: 'High cholesterol levels increase risk of heart disease.'
          }
        ],
        warnings: [
          'Monitor for signs of muscle pain with Atorvastatin',
          'Check blood glucose regularly while on Metformin',
          'Report persistent dry cough to your doctor'
        ],
        followUp: 'Lab work recommended in 3 months to monitor progress'
      });
      setIsLoading(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50';
      case 'elevated': 
      case 'high': return 'text-red-600 bg-red-50';
      case 'low': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-8 h-8 text-teal-600" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Prescription & Lab Report Analyzer</h2>
            <p className="text-slate-600">Upload prescriptions or lab reports for detailed analysis</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
          />
          
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors duration-200 cursor-pointer"
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">
              Click to upload your prescription or lab report
            </p>
            <p className="text-sm text-slate-500">
              Supports PDF, JPG, PNG files (Max 10MB)
            </p>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-800">{file.name}</p>
                  <p className="text-sm text-slate-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              
              <button
                onClick={analyzeDocument}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Medications */}
          {analysis.medications && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Prescribed Medications</h3>
              <div className="space-y-4">
                {analysis.medications.map((med: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800">{med.name}</h4>
                        <p className="text-blue-600 font-medium">{med.dosage}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                        {med.purpose}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-slate-700 mb-1">Instructions:</p>
                        <p className="text-slate-600">{med.instructions}</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-700 mb-1">Common Side Effects:</p>
                        <ul className="text-slate-600 list-disc list-inside">
                          {med.sideEffects.map((effect: string, i: number) => (
                            <li key={i}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {med.interactions.length > 0 && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="font-medium text-amber-800 mb-1">⚠️ Important Interactions:</p>
                        <ul className="text-amber-700 text-sm">
                          {med.interactions.map((interaction: string, i: number) => (
                            <li key={i}>• {interaction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lab Results */}
          {analysis.labTests && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Lab Test Results</h3>
              <div className="space-y-4">
                {analysis.labTests.map((test: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-slate-800">{test.name}</h4>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(test.status)}`}>
                        {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="font-medium text-slate-700">Your Result:</p>
                        <p className="text-slate-600 font-mono">{test.value}</p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">Reference Range:</p>
                        <p className="text-slate-600">{test.range}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">{test.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings and Follow-up */}
          <div className="grid md:grid-cols-2 gap-6">
            {analysis.warnings && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-slate-800">Important Warnings</h3>
                </div>
                <div className="space-y-2">
                  {analysis.warnings.map((warning: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-slate-700">{warning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.followUp && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-800">Follow-up Care</h3>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{analysis.followUp}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionAnalyzer;