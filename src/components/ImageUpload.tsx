import React, { useState, useCallback } from 'react';
import { Upload, Image, AlertCircle, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onImageUpload(selectedFile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Upload Retinal Image
        </h1>
        <p className="text-lg text-gray-600">
          Upload a high-quality retinal fundus image for AI-powered analysis
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        {!selectedFile ? (
          <div
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-full">
                <Upload className="h-12 w-12 text-blue-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Drop your retinal image here
                </h3>
                <p className="text-gray-600 mb-6">
                  or click to browse your files
                </p>
                
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Choose File
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>Supported formats: JPG, PNG, JPEG</p>
                <p>Maximum file size: 10MB</p>
                <p>Recommended: High-resolution fundus photography</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-green-800 font-semibold">Image uploaded successfully</p>
                <p className="text-green-600 text-sm">{selectedFile.name}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="relative">
                  <img
                    src={previewUrl || ''}
                    alt="Retinal image preview"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Image Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Filename:</span>
                    <span className="text-gray-900 font-medium">{selectedFile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="text-gray-900 font-medium">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="text-gray-900 font-medium">{selectedFile.type}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={handleAnalyze}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  >
                    <Image className="h-5 w-5" />
                    <span>Start AI Analysis</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Choose Different Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Important Notes
              </h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Ensure the retinal image is well-focused and properly illuminated</li>
                <li>• Images should be captured using standard fundus photography protocols</li>
                <li>• Poor quality images may result in inaccurate analysis</li>
                <li>• All uploaded images are processed securely and confidentially</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};