
import React from 'react';
import { Button } from '@/components/ui/button';
import { useDataStore } from '@/store/dataStore';
import { simulateModelTraining } from '@/utils/modelUtils';
import { toast } from 'sonner';
import { Brain, TreePine, Settings, CheckCircle } from 'lucide-react';

export const ModelTraining = () => {
  const { 
    dataset, 
    isPreprocessed, 
    isLoading, 
    setPreprocessed, 
    setLoading, 
    setModelMetrics,
    models
  } = useDataStore();

  const handlePreprocess = () => {
    if (!dataset) {
      toast.error('Please upload a dataset first');
      return;
    }

    setLoading(true);
    
    // Simulate preprocessing
    setTimeout(() => {
      setPreprocessed(true);
      setLoading(false);
      toast.success('Data preprocessing completed!');
    }, 2000);
  };

  const handleTrainKNN = () => {
    setLoading(true);
    
    setTimeout(() => {
      const metrics = simulateModelTraining('knn');
      setModelMetrics('knn', metrics);
      setLoading(false);
      toast.success('KNN model trained successfully!');
    }, 3000);
  };

  const handleTrainDecisionTree = () => {
    setLoading(true);
    
    setTimeout(() => {
      const metrics = simulateModelTraining('decisionTree');
      setModelMetrics('decisionTree', metrics);
      setLoading(false);
      toast.success('Decision Tree model trained successfully!');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Preprocessing */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-slate-700/30 rounded-lg">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-blue-400" />
          <div>
            <h3 className="font-medium text-white">Data Preprocessing</h3>
            <p className="text-sm text-slate-400">
              Clean and prepare data for training
            </p>
          </div>
        </div>
        <Button
          onClick={handlePreprocess}
          disabled={!dataset || isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isPreprocessed ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Preprocessed
            </>
          ) : (
            'Preprocess Data'
          )}
        </Button>
      </div>

      {/* Model Training */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* KNN Model */}
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="h-6 w-6 text-purple-400" />
            <div>
              <h3 className="font-medium text-white">K-Nearest Neighbors</h3>
              <p className="text-sm text-slate-400">Instance-based learning</p>
            </div>
          </div>
          
          {models.knn && (
            <div className="mb-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Accuracy:</span>
                <span className="text-green-400">{models.knn.accuracy.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">F1 Score:</span>
                <span className="text-blue-400">{models.knn.f1Score.toFixed(2)}%</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleTrainKNN}
            disabled={!isPreprocessed || isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {models.knn ? 'Retrain KNN' : 'Train KNN Model'}
          </Button>
        </div>

        {/* Decision Tree Model */}
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <TreePine className="h-6 w-6 text-green-400" />
            <div>
              <h3 className="font-medium text-white">Decision Tree</h3>
              <p className="text-sm text-slate-400">Rule-based classification</p>
            </div>
          </div>

          {models.decisionTree && (
            <div className="mb-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Accuracy:</span>
                <span className="text-green-400">{models.decisionTree.accuracy.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">F1 Score:</span>
                <span className="text-blue-400">{models.decisionTree.f1Score.toFixed(2)}%</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleTrainDecisionTree}
            disabled={!isPreprocessed || isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {models.decisionTree ? 'Retrain Decision Tree' : 'Train Decision Tree'}
          </Button>
        </div>
      </div>
    </div>
  );
};
