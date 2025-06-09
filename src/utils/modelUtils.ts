
import { ModelMetrics } from '@/store/dataStore';

export const simulateModelTraining = (modelType: 'knn' | 'decisionTree'): ModelMetrics => {
  // Simulate realistic model performance with some randomness
  const basePerformance = {
    knn: {
      accuracy: 85 + Math.random() * 10,
      precision: 82 + Math.random() * 12,
      recall: 78 + Math.random() * 15,
      f1Score: 80 + Math.random() * 12,
    },
    decisionTree: {
      accuracy: 78 + Math.random() * 12,
      precision: 75 + Math.random() * 15,
      recall: 73 + Math.random() * 17,
      f1Score: 74 + Math.random() * 14,
    },
  };

  return basePerformance[modelType];
};

export const simulatePrediction = (inputValues: Record<string, string>) => {
  // Simple simulation based on input values
  const seaTemp = parseFloat(inputValues.seaTemp || '0');
  const pressure = parseFloat(inputValues.pressure || '1013');
  const humidity = parseFloat(inputValues.humidity || '50');
  const windShear = parseFloat(inputValues.windShear || '0');
  
  // Simplified cyclone detection logic
  let riskScore = 0;
  
  // High sea temperature increases risk
  if (seaTemp > 26.5) riskScore += 25;
  
  // Low pressure increases risk
  if (pressure < 1000) riskScore += 30;
  
  // High humidity increases risk
  if (humidity > 70) riskScore += 20;
  
  // Low wind shear increases risk
  if (windShear < 10) riskScore += 25;
  
  // Add some randomness
  riskScore += Math.random() * 20;
  
  const isCyclone = riskScore > 50;
  const confidence = Math.min(95, Math.max(60, riskScore + Math.random() * 20));
  
  return {
    result: isCyclone,
    confidence: confidence,
  };
};
