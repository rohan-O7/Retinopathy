import React from 'react';
import { Eye, Upload, BarChart3, Home } from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'upload' | 'results';
  onNavigate: (view: 'dashboard' | 'upload' | 'results') => void;
  onNewAnalysis: () => void;
  onBackToDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate, 
  onNewAnalysis, 
  onBackToDashboard 
}) => {
  return (
    <header className="bg-black shadow-md border-b border-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl">
              <Eye className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SightGaurdian AI</h1>
              <p className="text-sm text-white">Advanced Retinal Analysis Platform</p>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            <button
              onClick={onBackToDashboard}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={onNewAnalysis}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                currentView === 'upload'
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-white hover:bg-white hover:text-black'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>New Analysis</span>
            </button>

            <button
              onClick={() => onNavigate('results')}
              disabled={currentView !== 'results'}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                currentView === 'results'
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-white opacity-50 cursor-not-allowed'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Results</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
