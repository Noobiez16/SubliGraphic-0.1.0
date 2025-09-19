import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export const useThemeDetector = (): Theme => {
  const [theme, setTheme] = useState<Theme>('android'); // Default a 'android'

  useEffect(() => {
    console.log("--- Theme Detector Re-evaluating ---");
    const userAgent = navigator.userAgent.toLowerCase();
    console.log("User Agent:", userAgent); // LOG 1: Muestra el user agent

    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    console.log("Is iOS?", isIOS); // LOG 2: Muestra si detectó iOS

    if (isIOS) {
      setTheme('ios');
      console.log("Theme SET to: ios"); // LOG 3: Confirma el tema establecido
    } else {
      setTheme('android');
      console.log("Theme SET to: android"); // LOG 3: Confirma el tema establecido
    }
    console.log("------------------------------------");
  }, []);

  return theme;
};