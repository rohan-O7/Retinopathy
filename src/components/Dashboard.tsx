import React from 'react';
import { Upload, Eye, Brain, FileText, Globe, Calendar } from 'lucide-react';

interface DashboardProps {
  onStartAnalysis: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartAnalysis }) => {
  const features = [
    {
      icon: Eye,
      title: "Advanced Vision Models",
      description: "State-of-the-art ViT and CNN models for precise retinal analysis"
    },
    {
      icon: Brain,
      title: "Explainable AI",
      description: "Grad-CAM heatmaps and detailed explanations for transparent diagnostics"
    },
    {
      icon: FileText,
      title: "Comprehensive Reports",
      description: "Patient-friendly summaries and detailed clinical documentation"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Reports available in multiple languages for global accessibility"
    }
  ];

  const conditions = [
    {
      name: "Diabetic Retinopathy",
      description: "Early detection and severity grading",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Cataract Detection",
      description: "Automated lens opacity assessment",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Corneal Analysis",
      description: "Comprehensive anterior segment evaluation",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered Retinal Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Advanced machine learning models provide comprehensive retinal health assessment 
          with explainable AI insights and multilingual reporting capabilities.
        </p>
        <button
          onClick={onStartAnalysis}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto"
        >
          <Upload className="h-6 w-6" />
          <span>Start New Analysis</span>
        </button>
      </div>

      {/* Condition Detection Cards */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Condition Detection Capabilities
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {conditions.map((condition, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-3 bg-gradient-to-r ${condition.color}`}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {condition.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {condition.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Platform Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Process */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Analysis Workflow
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Image Upload", desc: "Secure retinal image submission" },
            { step: 2, title: "AI Processing", desc: "Vision model analysis and detection" },
            { step: 3, title: "Explanation", desc: "Heatmap generation and captioning" },
            { step: 4, title: "Reporting", desc: "Multi-format report generation" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};