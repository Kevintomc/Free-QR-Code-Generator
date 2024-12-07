import React, { useState } from 'react';
import { SAMPLE_IMAGES } from '../utils/sampleImages';
import { Image as ImageIcon, UploadCloud, Trash2 } from 'lucide-react';

interface ImageSelectorProps {
  selectedUrl: string;
  onImageSelect: (url: string) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  selectedUrl,
  onImageSelect,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setUploadedImage(imageUrl);
        onImageSelect(imageUrl); // Pass the uploaded image URL to the parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage(null); // Remove the uploaded image
    if (selectedUrl === uploadedImage) {
      onImageSelect(''); // Clear the selected image if it was the uploaded one
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        <h3 className="text-sm font-medium text-gray-700">Sample Images</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {SAMPLE_IMAGES.map((image) => (
          <button
            key={image.id}
            onClick={() => onImageSelect(image.url)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
              selectedUrl === image.url
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image.url}
              alt={image.label}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <p className="text-xs text-white">{image.label}</p>
            </div>
          </button>
        ))}

        {/* Render uploaded image */}
        {uploadedImage && (
          <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 transition-all">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex justify-between items-center">
              <p className="text-xs text-white">Uploaded Image</p>
              <button
                onClick={handleDeleteImage}
                className="text-red-500 hover:text-red-600"
                title="Delete Image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">or</span>
        </div>
      </div>

      <div>
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 cursor-pointer text-blue-500 hover:text-blue-600"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload an Image</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
