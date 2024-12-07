export const DEFAULT_QR_SETTINGS = {
  text: 'https://www.google.com',
  size: 256,
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  logoUrl: '',
  includeMargin: true,
};

export const validateQRText = (text: string): boolean => {
  return text.length > 0 && text.length <= 2953;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const isValidImageUrl = async (url: string): Promise<boolean> => {
  if (!isValidUrl(url)) return false;
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return contentType?.startsWith('image/') ?? false;
  } catch {
    return false;
  }
};