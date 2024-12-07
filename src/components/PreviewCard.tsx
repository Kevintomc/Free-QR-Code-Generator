import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { QRCodeGenerator } from './QRCodeGenerator';
import { QRCodeSettings } from '../types/qr';

interface PreviewCardProps {
  settings: QRCodeSettings;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ settings }) => {
  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) => 
        canvas.toBlob((blob) => resolve(blob!), 'image/png')
      );
      
      if (navigator.share) {
        await navigator.share({
          files: [new File([blob], 'qr-code.png', { type: 'image/png' })],
          title: 'QR Code',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
      <QRCodeGenerator settings={settings} />
      
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        
        {navigator.share && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        )}
      </div>
    </div>
  );
};