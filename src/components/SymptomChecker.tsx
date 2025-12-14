import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send, AlertTriangle, CheckCircle, Clock, User } from 'lucide-react';

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setSymptoms(symptoms + (symptoms ? ' ' : '') + 'Voice input: chest pain and dizziness for the past 2 hours');
        setIsRecording(false);
      }, 3000);
    }
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        severity: 'moderate',
        possibleConditions: [
          {
            name: 'Cardiovascular Stress',
            probability: '65%',
            description: 'Combination of chest pain and dizziness may indicate cardiovascular stress or anxiety.'
          },
          {
            name: 'Dehydration',
            probability: '25%',
            description: 'Mild dehydration can cause dizziness and chest discomfort.'
          },
          {
            name: 'Anxiety/Panic',
            probability: '40%',
            description: 'Anxiety attacks commonly present with chest pain and dizziness.'
          }
        ],
        recommendations: [
          'Seek immediate medical attention if chest pain worsens',
          'Monitor symptoms and note any changes',
          'Stay hydrated and rest in a comfortable position',
          'Consider calling emergency services if symptoms persist'
        ],
        urgency: 'Consult healthcare provider within 2-4 hours'
      });
      setIsLoading(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-amber-600 bg-amber-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Symptom Checker</h2>
            <p className="text-slate-600">Describe your symptoms for AI-powered analysis</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Describe Your Symptoms
          </label>
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="E.g., I have chest pain and dizziness that started 2 hours ago..."
              className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
            
            {/* Voice Input Button */}
            <button
              onClick={toggleRecording}
              className={`absolute bottom-4 right-4 p-2 rounded-full transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          
          {isRecording && (
            <p className="text-sm text-red-600 mt-2 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              Recording... Speak clearly about your symptoms
            </p>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeSymptoms}
          disabled={!symptoms.trim() || isLoading}
          className="w-full md:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Analyze Symptoms</span>
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Analysis Results</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(analysis.severity)}`}>
                {analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1)} Priority
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-slate-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{analysis.urgency}</span>
            </div>
          </div>

          {/* Possible Conditions */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Possible Conditions</h4>
            <div className="space-y-3">
              {analysis.possibleConditions.map((condition: any, index: number) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-slate-800">{condition.name}</h5>
                    <span className="text-sm font-medium text-blue-600">{condition.probability}</span>
                  </div>
                  <p className="text-sm text-slate-600">{condition.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Recommendations</h4>
            <div className="space-y-2">
              {analysis.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-amber-800 mb-1">Important Disclaimer</h5>
                <p className="text-sm text-amber-700">
                  This analysis is for informational purposes only and should not replace professional medical advice. 
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;