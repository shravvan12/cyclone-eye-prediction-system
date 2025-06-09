
import React from 'react';
import { useDataStore } from '@/store/dataStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const MetricsComparison = () => {
  const { models } = useDataStore();

  if (!models.knn && !models.decisionTree) {
    return (
      <div className="text-center py-8 text-slate-400">
        <p>Train at least one model to see performance metrics</p>
      </div>
    );
  }

  const data = [
    {
      metric: 'Accuracy',
      KNN: models.knn?.accuracy || 0,
      'Decision Tree': models.decisionTree?.accuracy || 0,
    },
    {
      metric: 'Precision',
      KNN: models.knn?.precision || 0,
      'Decision Tree': models.decisionTree?.precision || 0,
    },
    {
      metric: 'Recall',
      KNN: models.knn?.recall || 0,
      'Decision Tree': models.decisionTree?.recall || 0,
    },
    {
      metric: 'F1 Score',
      KNN: models.knn?.f1Score || 0,
      'Decision Tree': models.decisionTree?.f1Score || 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['accuracy', 'precision', 'recall', 'f1Score'].map((metric) => (
          <div key={metric} className="bg-slate-700/30 p-4 rounded-lg">
            <h4 className="text-slate-400 text-sm font-medium mb-2 capitalize">
              {metric === 'f1Score' ? 'F1 Score' : metric}
            </h4>
            <div className="space-y-2">
              {models.knn && (
                <div className="flex justify-between items-center">
                  <span className="text-purple-400 text-sm">KNN:</span>
                  <span className="text-white font-medium">
                    {models.knn[metric as keyof typeof models.knn].toFixed(1)}%
                  </span>
                </div>
              )}
              {models.decisionTree && (
                <div className="flex justify-between items-center">
                  <span className="text-green-400 text-sm">Tree:</span>
                  <span className="text-white font-medium">
                    {models.decisionTree[metric as keyof typeof models.decisionTree].toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Chart */}
      <div className="bg-slate-700/30 p-4 rounded-lg">
        <h4 className="text-white font-medium mb-4">Model Performance Comparison</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="metric" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#374151',
                border: '1px solid #4B5563',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Legend />
            <Bar dataKey="KNN" fill="#8B5CF6" />
            <Bar dataKey="Decision Tree" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
