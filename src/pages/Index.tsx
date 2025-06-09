
import React from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DataPreview } from '@/components/DataPreview';
import { ModelTraining } from '@/components/ModelTraining';
import { PredictionForm } from '@/components/PredictionForm';
import { MetricsComparison } from '@/components/MetricsComparison';
import { useDataStore } from '@/store/dataStore';
import { AlertTriangle } from 'lucide-react';

const Index = () => {
  const { dataset, isPreprocessed } = useDataStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="text-orange-500 h-8 w-8" />
            <h1 className="text-3xl font-bold text-white">
              Cyclone Detection System
            </h1>
            <AlertTriangle className="text-orange-500 h-8 w-8" />
          </div>
          <p className="text-center text-slate-300 mt-2">
            Advanced Machine Learning for Weather Prediction
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* File Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            📂 Dataset Upload
          </h2>
          <FileUpload />
        </div>

        {/* Data Preview */}
        {dataset && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🔍 Data Preview
            </h2>
            <DataPreview />
          </div>
        )}

        {/* Model Training */}
        {dataset && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🧠 Model Training
            </h2>
            <ModelTraining />
          </div>
        )}

        {/* Metrics Comparison */}
        {isPreprocessed && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              📊 Model Performance
            </h2>
            <MetricsComparison />
          </div>
        )}

        {/* Prediction Form */}
        {isPreprocessed && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🧪 Cyclone Prediction
            </h2>
            <PredictionForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
