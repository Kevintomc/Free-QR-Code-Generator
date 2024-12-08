import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { ErrorMessage } from './ErrorMessage';
import { ImageSelector } from './ImageSelector';
import { QRCodeSettings } from '../types/qr';
import { ImageIcon, Type, Maximize2, Image } from 'lucide-react';
import { validateQRText, isValidImageUrl, isValidColor } from '../utils/qr';

interface SettingsPanelProps {
  settings: QRCodeSettings;
  onSettingsChange: (settings: Partial<QRCodeSettings>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndUpdateText = (text: string) => {
    if (!validateQRText(text)) {
      setErrors(prev => ({
        ...prev,
        text: 'Text must be between 1 and 2953 characters'
      }));
      return;
    }
    setErrors(prev => ({ ...prev, text: '' }));
    onSettingsChange({ text });
  };

  const validateAndUpdateLogo = async (url: string) => {
    if (url && !(await isValidImageUrl(url))) {
      setErrors(prev => ({
        ...prev,
        logo: 'Please enter a valid image URL'
      }));
      return;
    }
    setErrors(prev => ({ ...prev, logo: '' }));
    onSettingsChange({ logoUrl: url });
  };

  const validateAndUpdateColor = (color: string, type: 'fgColor' | 'bgColor') => {
    if (!isValidColor(color)) {
      setErrors(prev => ({
        ...prev,
        [type]: 'Please enter a valid hex color'
      }));
      return;
    }
    setErrors(prev => ({ ...prev, [type]: '' }));
    onSettingsChange({ [type]: color });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Type className="w-4 h-4" />
          Text Content
        </label>
        <input
          type="text"
          value={settings.text}
          onChange={(e) => validateAndUpdateText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter text or URL"
        />
        {errors.text && <ErrorMessage message={errors.text} />}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Maximize2 className="w-4 h-4" />
          Size
        </label>
        <input
          type="range"
          min="128"
          max="512"
          value={settings.size}
          onChange={(e) => onSettingsChange({ size: Number(e.target.value) })}
          className="w-full"
        />
        <span className="text-sm text-gray-500">{settings.size}px</span>
      </div>

      <ImageSelector
        selectedUrl={settings.logoUrl}
        onImageSelect={(url) => onSettingsChange({ logoUrl: url })}
      />

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Image className="w-4 h-4" />
          Custom Logo URL
        </label>
        <input
          type="text"
          value={settings.logoUrl}
          onChange={(e) => validateAndUpdateLogo(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter custom logo URL"
        />
        {errors.logo && <ErrorMessage message={errors.logo} />}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <ColorPicker
            color={settings.fgColor}
            onChange={(color) => validateAndUpdateColor(color, 'fgColor')}
            label="Foreground Color"
          />
          {errors.fgColor && <ErrorMessage message={errors.fgColor} />}
        </div>
        <div>
          <ColorPicker
            color={settings.bgColor}
            onChange={(color) => validateAndUpdateColor(color, 'bgColor')}
            label="Background Color"
          />
          {errors.bgColor && <ErrorMessage message={errors.bgColor} />}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="margin"
          checked={settings.includeMargin}
          onChange={(e) => onSettingsChange({ includeMargin: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="margin" className="text-sm font-medium text-gray-700">
          Include Margin
        </label>
      </div>
    </div>
  );
};