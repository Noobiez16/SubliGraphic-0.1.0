import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useThemeDetector = (): Theme => {
  const [theme, setTheme] = useState<Theme>('android');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Explicitly check for Apple devices.
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    // Explicitly check for Android devices.
    const isAndroid = /android/.test(userAgent);

    if (isIOS) {
      setTheme('ios');
    } else if (isAndroid) {
      setTheme('android');
    } else {
      // Default for non-mobile devices (desktops)
      setTheme('android');
    }
  }, []);

  return theme;
};
