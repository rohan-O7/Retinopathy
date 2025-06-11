import React, { useState } from 'react';
import { AnalysisData } from '../App';
import { User, Stethoscope, Scissors, Calendar, Image, Brain } from 'lucide-react';

interface ResultsTabsProps {
  analysisData: AnalysisData;
}

export const ResultsTabs: React.FC<ResultsTabsProps> = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState('heatmap');

  const tabs = [
    { id: 'heatmap', label: 'AI Visualization', icon: Brain },
    { id: 'patient', label: 'Patient Summary', icon: User },
    { id: 'clinical', label: 'Clinical Notes', icon: Stethoscope },
    { id: 'surgical', label: 'Surgical Plan', icon: Scissors },
    { id: 'timeline', label: 'Follow-up', icon: Calendar }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Explainable AI Visualization</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Original Image</h4>
                <div className="relative">
                  <img
                    src={analysisData.imageUrl}
                    alt="Original retinal image"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Attention Heatmap</h4>
                <div className="relative">
                  <img
                    src={analysisData.heatmapUrl}
                    alt="Grad-CAM heatmap"
                    className="w-full h-64 object-cover rounded-xl shadow-lg opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-xl"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">AI Model Explanation</h4>
              <p className="text-gray-700 leading-relaxed">
                The heatmap visualization shows areas where our AI model focused its attention during analysis. 
                Red and yellow regions indicate areas of high attention, typically corresponding to pathological 
                features or areas of clinical significance. This explainable AI approach helps clinicians 
                understand the model's decision-making process and increases trust in automated diagnoses.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'patient' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Patient-Friendly Summary</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <User className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">Your Eye Health Summary</h4>
                  <p className="text-blue-800 leading-relaxed text-lg">
                    {analysisData.patientSummary}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">What This Means</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Early detection allows for better treatment outcomes</li>
                  <li>• Regular monitoring can prevent progression</li>
                  <li>• Lifestyle changes can significantly help</li>
                  <li>• Modern treatments are highly effective</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Schedule follow-up appointment</li>
                  <li>• Discuss treatment options with your doctor</li>
                  <li>• Monitor blood sugar levels regularly</li>
                  <li>• Maintain healthy lifestyle habits</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Questions to Ask</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• What are my treatment options?</li>
                  <li>• How often should I have eye exams?</li>
                  <li>• Are there dietary changes I should make?</li>
                  <li>• What symptoms should I watch for?</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clinical' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Clinical Documentation</h3>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Stethoscope className="h-6 w-6 text-gray-600 mt-1" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Clinical Findings</h4>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line font-mono text-sm">
                    {analysisData.clinicalNotes}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Diagnostic Codes</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ICD-10:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">E11.311</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CPT:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">92250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SNOMED:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">4855003</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Optimize glycemic control (HbA1c &lt; 7%)</li>
                  <li>• Blood pressure management</li>
                  <li>• Lipid profile monitoring</li>
                  <li>• Ophthalmology follow-up in 3-4 months</li>
                  <li>• Patient education on diabetic eye disease</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'surgical' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Surgical Planning</h3>
            
            {analysisData.surgicalPlan ? (
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Scissors className="h-6 w-6 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-900 mb-3">Surgical Assessment</h4>
                      <p className="text-yellow-800 leading-relaxed">
                        {analysisData.surgicalPlan}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Pre-operative Considerations</h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• Complete ophthalmologic examination</li>
                      <li>• Biometry and IOL calculations</li>
                      <li>• Assess for diabetic macular edema</li>
                      <li>• Optimize systemic conditions</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Post-operative Monitoring</h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• Day 1, 1 week, 1 month follow-ups</li>
                      <li>• Monitor for complications</li>
                      <li>• Continue diabetic retinopathy surveillance</li>
                      <li>• Visual acuity assessment</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Scissors className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-green-900">No Immediate Surgical Intervention Required</h4>
                  <p className="text-green-800 max-w-2xl">
                    Based on the current analysis, surgical intervention is not immediately necessary. 
                    Continue with conservative management and regular monitoring as outlined in the follow-up timeline.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Follow-up Timeline</h3>
            
            <div className="space-y-4">
              {analysisData.followUpTimeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 bg-white border border-gray-200 rounded-xl p-6">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{item}</p>
                  </div>
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">Important Reminders</h4>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li>• Set calendar reminders for all follow-up appointments</li>
                <li>• Contact your healthcare provider if you experience vision changes</li>
                <li>• Maintain consistent diabetes management between visits</li>
                <li>• Keep a record of your blood sugar levels and blood pressure</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};