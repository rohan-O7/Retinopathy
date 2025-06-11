import React, { useState } from 'react';
import { AnalysisData } from '../App';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultsTabs } from './ResultsTabs';
import { Download, Repeat, Globe } from 'lucide-react';

interface AnalysisResultsProps {
  analysisData: AnalysisData | null;
  isAnalyzing: boolean;
  onNewAnalysis: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  analysisData, 
  isAnalyzing, 
  onNewAnalysis 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  if (isAnalyzing) {
    return <LoadingSpinner />;
  }

  if (!analysisData) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">No analysis data available</p>
      </div>
    );
  }

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF
    alert('PDF report generation would be implemented here');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Analysis Results
            </h1>
            <p className="text-gray-600">
              Generated on {analysisData.timestamp.toLocaleDateString()} at {analysisData.timestamp.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
              </select>
            </div>
            
            <button
              onClick={handleDownloadReport}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download PDF</span>
            </button>
            
            <button
              onClick={onNewAnalysis}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Repeat className="h-5 w-5" />
              <span>New Analysis</span>
            </button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Diabetic Retinopathy</h3>
            <p className="text-red-800 text-2xl font-bold mb-1">
              {analysisData.conditions.diabeticRetinopathy.severity}
            </p>
            <p className="text-red-600 text-sm">
              Confidence: {analysisData.conditions.diabeticRetinopathy.confidence}%
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Cataract</h3>
            <p className="text-blue-800 text-2xl font-bold mb-1">
              {analysisData.conditions.cataract.severity}
            </p>
            <p className="text-blue-600 text-sm">
              Confidence: {analysisData.conditions.cataract.confidence}%
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Corneal Issues</h3>
            <p className="text-green-800 text-2xl font-bold mb-1">
              {analysisData.conditions.cornealIssues.present ? 'Detected' : 'None'}
            </p>
            <p className="text-green-600 text-sm">
              Confidence: {analysisData.conditions.cornealIssues.confidence}%
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <ResultsTabs analysisData={analysisData} />
    </div>
  );
};