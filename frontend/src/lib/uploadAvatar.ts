import {api} from './api';

/** Upload a file and persist it as the user's profile avatar. Returns the stored URL path. */
export async function uploadAndSaveAvatar(file: File): Promise<string> {
  const uploaded = await api.upload.image(file);
  await api.profile.update({avatar: uploaded.url});
  return uploaded.url;
}
