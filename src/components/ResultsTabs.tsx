import React, { useState } from 'react';
import { AnalysisData } from '../App';
import { User, Stethoscope, Scissors, Calendar, Brain } from 'lucide-react';
import { usePatient } from '../context/usePatient.ts';

interface ResultsTabsProps {
  analysisData: AnalysisData;
}

export const ResultsTabs: React.FC<ResultsTabsProps> = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState('heatmap');
  const { patients } = usePatient();

  const tabs = [
    { id: 'heatmap', label: 'AI Visualization', icon: Brain },
    { id: 'patient', label: 'Patient Summary', icon: User },
    { id: 'clinical', label: 'Clinical Notes', icon: Stethoscope },
    { id: 'surgical', label: 'Surgical Plan', icon: Scissors },
    { id: 'timeline', label: 'Follow-up', icon: Calendar }
  ];

  return (
    <div className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden text-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 bg-gray-800 border-b-2 border-blue-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Patient Info */}
      {patients.length > 0 && (
        <div className="p-6 border-b border-gray-700 bg-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300">
            <div><span className="font-medium">Name:</span> {patients[0].name}</div>
            <div><span className="font-medium">Age:</span> {patients[0].age}</div>
            <div><span className="font-medium">Gender:</span> {patients[0].gender}</div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Explainable AI Visualization</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Original Image</h4>
                <img
                  src={analysisData.imageUrl}
                  alt="Original retinal image"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">AI Attention Heatmap</h4>
                <div className="relative">
                  <img
                    src={analysisData.heatmapUrl}
                    alt="Grad-CAM heatmap"
                    className="w-full h-64 object-cover rounded-xl shadow-md opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">AI Model Explanation</h4>
              <p className="text-gray-300 leading-relaxed">
                The heatmap visualization shows areas where our AI model focused its attention during analysis...
              </p>
            </div>
          </div>
        )}

        {activeTab === 'patient' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Patient-Friendly Summary</h3>
            <div className="bg-blue-950 border-l-4 border-blue-400 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <User className="h-6 w-6 text-blue-300 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-200 mb-3">Your Eye Health Summary</h4>
                  <p className="text-blue-300 leading-relaxed text-lg">{analysisData.patientSummary}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clinical' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Clinical Documentation</h3>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Stethoscope className="h-6 w-6 text-gray-300 mt-1" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-3">Clinical Findings</h4>
                  <p className="text-gray-300 font-mono text-sm whitespace-pre-line">{analysisData.clinicalNotes}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'surgical' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Surgical Planning</h3>
            {analysisData.surgicalPlan ? (
              <div className="bg-yellow-900 border-l-4 border-yellow-300 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Scissors className="h-6 w-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-200 mb-3">Surgical Assessment</h4>
                    <p className="text-yellow-300">{analysisData.surgicalPlan}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-900 border border-green-600 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-green-800 p-4 rounded-full">
                    <Scissors className="h-8 w-8 text-green-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-green-200">
                    No Immediate Surgical Intervention Required
                  </h4>
                  <p className="text-green-300 max-w-2xl">
                    Based on the current analysis...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Follow-up Timeline</h3>
            <div className="space-y-4">
              {analysisData.followUpTimeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                  <Calendar className="h-5 w-5 text-gray-300" />
                </div>
              ))}
            </div>

            <div className="bg-blue-950 border border-blue-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-200 mb-3">Important Reminders</h4>
              <ul className="text-blue-300 space-y-2 text-sm">
                <li>• Set calendar reminders...</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
