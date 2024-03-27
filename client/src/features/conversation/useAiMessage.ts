import { useMutation } from '@tanstack/react-query';
import { getAiMessge } from '../../services/apiChat';

export function useAiMessage() {
  const { mutate: fetchAiMessage, isPending: isFetchingAiMessage } = useMutation({
    mutationFn: ({ message, conversation_id }: { message: string; conversation_id: string }) =>
      getAiMessge({ message, conversation_id }),
  });

  return {
    fetchAiMessage,
    isFetchingAiMessage,
  };
}
