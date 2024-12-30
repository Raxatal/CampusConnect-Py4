import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

interface UploadResult {
  url: string;
  path: string;
}

export const uploadEventFile = async (
  file: File,
  eventId: string,
  type: 'poster' | 'approval'
): Promise<UploadResult> => {
  const folder = type === 'poster' ? 'event-posters' : 'approval-letters';
  const extension = file.name.split('.').pop();
  const path = `${folder}/${eventId}/${Date.now()}.${extension}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return { url, path };
};