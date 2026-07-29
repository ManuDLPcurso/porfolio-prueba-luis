import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.luisfetrabajo.portfolio',
  appName: 'Portfolio LOTR',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
