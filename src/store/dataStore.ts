
import { create } from 'zustand';

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface DataStore {
  dataset: any[][] | null;
  headers: string[] | null;
  isPreprocessed: boolean;
  isLoading: boolean;
  models: {
    knn: ModelMetrics | null;
    decisionTree: ModelMetrics | null;
  };
  
  setDataset: (data: any[][], headers: string[]) => void;
  setPreprocessed: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setModelMetrics: (model: 'knn' | 'decisionTree', metrics: ModelMetrics) => void;
  reset: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  dataset: null,
  headers: null,
  isPreprocessed: false,
  isLoading: false,
  models: {
    knn: null,
    decisionTree: null,
  },

  setDataset: (data, headers) => set({ dataset: data, headers }),
  setPreprocessed: (value) => set({ isPreprocessed: value }),
  setLoading: (value) => set({ isLoading: value }),
  setModelMetrics: (model, metrics) => 
    set((state) => ({
      models: {
        ...state.models,
        [model]: metrics,
      },
    })),
  reset: () => set({
    dataset: null,
    headers: null,
    isPreprocessed: false,
    isLoading: false,
    models: { knn: null, decisionTree: null },
  }),
}));
