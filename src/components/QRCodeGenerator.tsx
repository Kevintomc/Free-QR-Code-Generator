import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeSettings } from '../types/qr';

interface QRCodeGeneratorProps {
  settings: QRCodeSettings;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ settings }) => {
  const { text, size, bgColor, fgColor, logoUrl, includeMargin } = settings;

  return (
    <div className="flex items-center justify-center p-4">
      <QRCodeCanvas
        value={text}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level="H"
        includeMargin={includeMargin}
        imageSettings={
          logoUrl
            ? {
                src: logoUrl,
                height: size * 0.2,
                width: size * 0.2,
                excavate: true,
              }
            : undefined
        }
      />
    </div>
  );
};