import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Plus } from 'lucide-react';
import Papa from 'papaparse';
import type { Keyword } from '../types';

interface KeywordUploadProps {
  onKeywordsUploaded: (keywords: Keyword[]) => void;
}

export function KeywordUpload({ onKeywordsUploaded }: KeywordUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      Papa.parse(file, {
        complete: (results) => {
          const keywords = results.data
            .filter((row: any) => row.length > 0 && row[0])
            .map((row: any) => ({
              term: row[0],
              volume: row[1] ? parseInt(row[1]) : undefined,
              difficulty: row[2] ? parseInt(row[2]) : undefined,
            }));
          onKeywordsUploaded(keywords);
        },
        header: false,
      });
    });
  }, [onKeywordsUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium text-gray-700">
          {isDragActive ? 'Drop your keywords file here' : 'Drag & drop your keywords CSV file here'}
        </p>
        <p className="mt-2 text-sm text-gray-500">or click to select a file</p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Manual Keyword Entry</h3>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Keyword
          </button>
        </div>
      </div>
    </div>
  );
}