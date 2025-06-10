import { runtimeVersion } from "expo-updates";

const IS_PROD = process.env.APP_VARIANT === 'production';

// expo local means that the build for android or iOS is done locally and not with eas build
const IS_LOCAL_BUILD = process.env.APP_EXPO_LOCAL === 'true';

export default { 
  name: IS_PROD || IS_LOCAL_BUILD ? 'Nutrigastoncito 2.0' : (process.env.APP_VARIANT === 'test') ? 'TEST XProv' : 'Dev XProv',
  plugins: ['expo-media-library'],
  slug: 'nutrigastoncito',
  version: '1.0.0',
  orientation: 'portrait',
  icon: IS_PROD ?  './assets/nutrientes-icon.png' : './assets/icon.png',
  splash: {
    image: IS_PROD ? './assets/nutrientes.png' : './assets/nutrientes.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_PROD || IS_LOCAL_BUILD ? 'nutrigastoncito.prod' : 'nutrigastoncito.dev',
  },
  android: {
    permissions: [
      'CAMERA',
      'ACCESS_FINE_LOCATION',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'com.sec.android.provider.badge.permission.READ',
      'com.sec.android.provider.badge.permission.WRITE',
    ],
    adaptiveIcon: {
      foregroundImage: './assets/nutrientes-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_PROD || IS_LOCAL_BUILD ? 'nutrigastoncito.prod' : (process.env.APP_VARIANT === 'test') ? 'nutrigastoncito.test' : 'nutrigastoncito.dev',
  },
  web: {
    favicon: './assets/nutrientes-icon.png',
  }
};
