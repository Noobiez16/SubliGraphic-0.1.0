
import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useThemeDetector = (): Theme => {
  const [theme, setTheme] = useState<Theme>('android');

  useEffect(() => {
    const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setTheme(isAppleDevice ? 'ios' : 'android');
  }, []);

  return theme;
};
