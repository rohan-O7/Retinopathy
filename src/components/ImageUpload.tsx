import React, { useState, useCallback } from 'react';
import { Upload, Image, CheckCircle } from 'lucide-react';
import { usePatient } from '../context/usePatient.ts';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  image: File;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const { addPatient } = usePatient();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
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
    if (selectedFile && name && age && gender) {
      onImageUpload(selectedFile);
      addPatient({ name, age, gender, image: selectedFile });

      setName('');
      setAge('');
      setGender('');
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      alert("Please fill all fields and upload an image.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 text-white">
      {/* Left: Image Upload Box */}
      <div className="bg-zinc-900 rounded-3xl shadow-2xl p-8">
        {!selectedFile ? (
          <div
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-zinc-800'
                : 'border-zinc-700 hover:border-blue-400 hover:bg-zinc-800'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-blue-900 p-6 rounded-full">
                <Upload className="h-12 w-12 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Drop your retinal image here
                </h3>
                <p className="text-gray-400 mb-6">
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
              <div className="text-sm text-gray-400 space-y-1">
                <p>Supported formats: JPG, PNG, JPEG</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-900 border border-green-700 rounded-xl p-4 flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-green-300 font-semibold">Image uploaded successfully</p>
                <p className="text-green-400 text-sm">{selectedFile.name}</p>
              </div>
            </div>

            <div>
              <img
                src={previewUrl || ''}
                alt="Retinal preview"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            <button
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="w-full border border-zinc-600 text-white py-3 rounded-xl font-medium hover:bg-zinc-800 transition-colors"
            >
              Choose Different Image
            </button>
          </div>
        )}
      </div>

      {/* Right: Form Box */}
      <div className="bg-zinc-900 rounded-3xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">Patient Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 bg-zinc-800 border border-zinc-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient's name"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full mt-1 bg-zinc-800 border border-zinc-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full mt-1 bg-zinc-800 border border-zinc-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
        >
          <Image className="h-5 w-5" />
          <span>Start AI Analysis</span>
        </button>
      </div>
    </div>
  );
};
