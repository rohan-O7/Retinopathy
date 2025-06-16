import React from 'react';
import { Brain, Eye, Image, FileText } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  const steps = [
    { icon: Image, label: "Processing Image", delay: 0 },
    { icon: Eye, label: "Vision Model Analysis", delay: 1000 },
    { icon: Brain, label: "Generating Explanations", delay: 2000 },
    { icon: FileText, label: "Creating Reports", delay: 2500 }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-3xl shadow-xl p-12 text-center">
        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            AI Analysis in Progress
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our advanced AI models are analyzing your retinal image...
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 animate-pulse"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 rounded-full">
                <step.icon className="h-8 w-8 text-blue-300" />
              </div>
              <p className="text-sm font-medium text-gray-300">{step.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            What's happening behind the scenes:
          </h3>
          <div className="text-left space-y-2 text-sm text-blue-200">
            <p>• Vision Transformer models analyzing retinal structures</p>
            <p>• Convolutional Neural Networks detecting pathological features</p>
            <p>• Grad-CAM generating attention heatmaps for explainability</p>
            <p>• Large Language Models creating comprehensive reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};
