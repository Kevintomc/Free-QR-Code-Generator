import React, { useState } from 'react';
import { PreviewCard } from './components/PreviewCard';
import { SettingsPanel } from './components/SettingsPanel';
import { QRCodeSettings } from './types/qr';
import { QrCode } from 'lucide-react';
import { DEFAULT_QR_SETTINGS } from './utils/qr';

function App() {
  const [settings, setSettings] = useState<QRCodeSettings>(DEFAULT_QR_SETTINGS);

  const handleSettingsChange = (newSettings: Partial<QRCodeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">QR Code Generator</h1>
          </div>
          <p className="text-lg text-gray-600">
            Create customized QR codes with your own colors and logo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PreviewCard settings={settings} />
          <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
        </div>
      </div>
    </div>
  );
}

export default App;