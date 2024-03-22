import { getAccessToken } from './apiAuth';
export const getConversations = async (id: string) => {
  const token = await getAccessToken();

  try {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return res;
  } catch {
    throw new Error('Error when fetching the conversations');
  }
};
