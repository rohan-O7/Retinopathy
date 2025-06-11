import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { Dashboard } from './components/Dashboard';

export interface AnalysisData {
  id: string;
  imageUrl: string;
  timestamp: Date;
  conditions: {
    diabeticRetinopathy: {
      severity: 'None' | 'Mild' | 'Moderate' | 'Severe' | 'Proliferative';
      confidence: number;
    };
    cataract: {
      present: boolean;
      severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
      confidence: number;
    };
    cornealIssues: {
      present: boolean;
      type: string[];
      confidence: number;
    };
  };
  heatmapUrl: string;
  patientSummary: string;
  clinicalNotes: string;
  surgicalPlan?: string;
  followUpTimeline: string[];
}

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload' | 'results'>('dashboard');
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setCurrentView('results');
    
    // Simulate AI analysis process
    const imageUrl = URL.createObjectURL(file);
    
    // Mock analysis data
    setTimeout(() => {
      const mockAnalysis: AnalysisData = {
        id: Date.now().toString(),
        imageUrl,
        timestamp: new Date(),
        conditions: {
          diabeticRetinopathy: {
            severity: 'Moderate',
            confidence: 87.3
          },
          cataract: {
            present: true,
            severity: 'Mild',
            confidence: 74.8
          },
          cornealIssues: {
            present: false,
            type: [],
            confidence: 92.1
          }
        },
        heatmapUrl: imageUrl, // In real implementation, this would be the generated heatmap
        patientSummary: "Your retinal scan shows signs of moderate diabetic retinopathy and mild cataract formation. These conditions are manageable with proper treatment and monitoring. We recommend regular follow-ups and lifestyle adjustments to prevent progression.",
        clinicalNotes: "Fundus examination reveals multiple microaneurysms and scattered hard exudates consistent with moderate non-proliferative diabetic retinopathy (NPDR). Early cortical cataract changes noted in the anterior lens capsule. No signs of macular edema or neovascularization observed. Recommend HbA1c optimization and ophthalmologic follow-up in 3-4 months.",
        surgicalPlan: "Current conditions do not require immediate surgical intervention. Monitor progression of cataract; consider phacoemulsification if visual acuity decreases below 20/40 or patient reports significant visual impairment.",
        followUpTimeline: [
          "2-3 weeks: Follow up with primary care physician for diabetes management",
          "6-8 weeks: Diabetic education consultation",
          "3-4 months: Next ophthalmologic examination",
          "6 months: Comprehensive eye exam with OCT imaging",
          "12 months: Annual diabetic retinopathy screening"
        ]
      };
      
      setAnalysisData(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleNewAnalysis = () => {
    setCurrentView('upload');
    setAnalysisData(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
        onNewAnalysis={handleNewAnalysis}
        onBackToDashboard={handleBackToDashboard}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && (
          <Dashboard onStartAnalysis={() => setCurrentView('upload')} />
        )}
        
        {currentView === 'upload' && (
          <ImageUpload onImageUpload={handleImageUpload} />
        )}
        
        {currentView === 'results' && (
          <AnalysisResults 
            analysisData={analysisData}
            isAnalyzing={isAnalyzing}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </main>
    </div>
  );
}

export default App;