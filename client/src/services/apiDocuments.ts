import { getAccessToken } from './apiAuth';
export const getDocuments = async () => {
  const token = await getAccessToken();
  const { VITE_APP_API_URL, VITE_APP_API_VERSION } = import.meta.env;

  try {
    let files = await fetch(`${VITE_APP_API_URL}/api/${VITE_APP_API_VERSION}/documents`, {
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
  const { VITE_APP_API_URL, VITE_APP_API_VERSION } = import.meta.env;

  try {
    const data = await fetch(`${VITE_APP_API_URL}/api/${VITE_APP_API_VERSION}/upload/`, {
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
