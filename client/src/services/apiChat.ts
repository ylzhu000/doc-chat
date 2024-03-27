import { getAccessToken } from './apiAuth';
import { apiUrl } from './index';

type TGetAiMessagePayload = {
  conversation_id: string;
  message: string;
};
export const getConversations = async (id: string) => {
  const token = await getAccessToken();

  try {
    const res = await fetch(`${apiUrl}/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return res;
  } catch {
    throw new Error('Error when fetching the conversations');
  }
};

export const getAiMessge = async ({ conversation_id, message }: TGetAiMessagePayload) => {
  console.log(conversation_id, message);
  const token = await getAccessToken();

  try {
    const res = await fetch(`${apiUrl}/conversations/${conversation_id}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    }).then((res) => res.json());

    return res;
  } catch {
    throw new Error('Error when fetching the response');
  }
};
