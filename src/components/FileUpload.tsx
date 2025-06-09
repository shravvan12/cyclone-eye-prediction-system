
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useDataStore } from '@/store/dataStore';
import { toast } from 'sonner';

export const FileUpload = () => {
  const { dataset, setDataset, setPreprocessed } = useDataStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => 
          line.split(',').map(cell => {
            const trimmed = cell.trim();
            const num = parseFloat(trimmed);
            return isNaN(num) ? trimmed : num;
          })
        );

        setDataset(data, headers);
        setPreprocessed(false);
        toast.success('Dataset uploaded successfully!');
      } catch (error) {
        console.error('Error parsing CSV:', error);
        toast.error('Failed to parse CSV file');
      }
    };
    reader.readAsText(file);
  }, [setDataset, setPreprocessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-blue-400 bg-blue-50/10'
            : 'border-slate-600 hover:border-slate-500'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <Upload className="h-12 w-12 text-slate-400" />
          <div className="text-slate-300">
            {isDragActive ? (
              <p>Drop the CSV file here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium">Upload Cyclone Dataset</p>
                <p className="text-sm text-slate-400 mt-1">
                  Drag and drop a CSV file, or click to select
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {dataset && (
        <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
          <CheckCircle className="h-5 w-5" />
          <span>Dataset loaded successfully</span>
        </div>
      )}
    </div>
  );
};
