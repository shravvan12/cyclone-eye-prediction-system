
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDataStore } from '@/store/dataStore';
import { simulatePrediction } from '@/utils/modelUtils';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const inputFields = [
  { key: 'seaTemp', label: 'Sea Surface Temperature (°C)', placeholder: '28.5' },
  { key: 'pressure', label: 'Atmospheric Pressure (hPa)', placeholder: '1013.25' },
  { key: 'humidity', label: 'Humidity (%)', placeholder: '75.0' },
  { key: 'windShear', label: 'Wind Shear (m/s)', placeholder: '5.2' },
  { key: 'vorticity', label: 'Vorticity (s⁻¹)', placeholder: '0.001' },
  { key: 'latitude', label: 'Latitude (°)', placeholder: '15.5' },
  { key: 'oceanDepth', label: 'Ocean Depth (m)', placeholder: '3000' },
  { key: 'coastDistance', label: 'Distance to Coast (km)', placeholder: '150' },
];

export const PredictionForm = () => {
  const { models } = useDataStore();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    result: boolean;
    confidence: number;
  } | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setInputValues(prev => ({ ...prev, [key]: value }));
  };

  const handlePredict = async () => {
    if (!models.knn) {
      toast.error('Please train the KNN model first');
      return;
    }

    const missingFields = inputFields.filter(field => !inputValues[field.key]);
    if (missingFields.length > 0) {
      toast.error('Please fill in all input fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate prediction
    setTimeout(() => {
      const result = simulatePrediction(inputValues);
      setPrediction(result);
      setIsLoading(false);
      
      if (result.result) {
        toast.error('🌪️ Cyclone detected! Alert authorities!');
      } else {
        toast.success('✅ No cyclone threat detected');
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key} className="text-slate-300">
              {field.label}
            </Label>
            <Input
              id={field.key}
              type="number"
              step="any"
              placeholder={field.placeholder}
              value={inputValues[field.key] || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        ))}
      </div>

      {/* Predict Button */}
      <div className="flex justify-center">
        <Button
          onClick={handlePredict}
          disabled={isLoading || !models.knn}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
        >
          {isLoading ? (
            <>
              <Activity className="h-5 w-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 mr-2" />
              Predict Cyclone
            </>
          )}
        </Button>
      </div>

      {/* Prediction Result */}
      {prediction && (
        <div className={`p-6 rounded-lg border-2 ${
          prediction.result 
            ? 'bg-red-900/30 border-red-500 text-red-100' 
            : 'bg-green-900/30 border-green-500 text-green-100'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {prediction.result ? (
              <AlertTriangle className="h-8 w-8 text-red-400" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-400" />
            )}
            <div>
              <h3 className="text-xl font-bold">
                {prediction.result ? '⚠️ CYCLONE DETECTED' : '✅ NO CYCLONE THREAT'}
              </h3>
              <p className="text-sm opacity-90">
                Confidence: {prediction.confidence.toFixed(1)}%
              </p>
            </div>
          </div>
          
          {prediction.result && (
            <div className="bg-red-800/30 p-3 rounded border border-red-600">
              <p className="font-medium">🚨 EMERGENCY ACTIONS REQUIRED:</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Alert local authorities immediately</li>
                <li>• Issue evacuation warnings to coastal areas</li>
                <li>• Activate emergency response protocols</li>
                <li>• Monitor weather conditions continuously</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
