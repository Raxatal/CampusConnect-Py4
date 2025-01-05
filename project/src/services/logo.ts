import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

// Constants
const LOGO_PATH = 'media/CampusConnectLogo.png';
const FALLBACK_LOGO = 'https://via.placeholder.com/150x50?text=CampusConnect';

export const getLogoUrl = async (): Promise<string> => {
  try {
    const logoRef = ref(storage, LOGO_PATH);
    return await getDownloadURL(logoRef);
  } catch (error) {
    console.error('Error loading logo:', error);
    return FALLBACK_LOGO;
  }
};