// src/services/google-signin.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/**
 * Initializes Google Sign-In SDK configuration parameters once.
 */
export const initializeGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '570225947398-j9pon8sakdq5kpmlut5m9281jh793vi4.apps.googleusercontent.com', 
    offlineAccess: false,
    profileImageSize: 120,
  });
};