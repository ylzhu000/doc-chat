import { getAccessToken } from './apiAuth';
export const getConversations = async (id: string) => {
  const token = await getAccessToken();
  const { VITE_APP_API_URL, VITE_APP_API_VERSION } = import.meta.env;

  try {
    const res = await fetch(`${VITE_APP_API_URL}/api/${VITE_APP_API_VERSION}/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return res;
  } catch {
    throw new Error('Error when fetching the conversations');
  }
};
