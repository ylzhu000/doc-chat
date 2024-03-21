import { getAccessToken } from './apiAuth';
export const getDocuments = async () => {
  const token = await getAccessToken();
  try {
    let files = await fetch(`${import.meta.env.VITE_APP_API_URL}/documents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    files = files.map((file: any) => ({
      name: file.name,
      created: file.created_at,
      updated: file.updated_at,
      id: file.id,
    }));

    return files;
  } catch (err) {
    throw new Error(String(err));
  }
};
