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

export const uploadDocument = async (formData: FormData) => {
  const token = await getAccessToken();

  try {
    const data = await fetch(`${import.meta.env.VITE_APP_API_URL}/upload/`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res: any) => {
      const jsonRes = await res.json();
      if (res.status !== 200) {
        throw new Error(jsonRes?.detail);
      }
      return jsonRes;
    });

    return data;
  } catch (err) {
    throw new Error('Error when uploading the document');
  }
};
