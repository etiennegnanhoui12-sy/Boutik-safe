import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.boutiksafe.app',
  appName: 'Boutik Safe',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
