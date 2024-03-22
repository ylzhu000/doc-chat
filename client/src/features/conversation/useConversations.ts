import { useQuery } from '@tanstack/react-query';
import { getConversations } from '../../services/apiChat';
import { useParams } from 'react-router-dom';

export function useConversation() {
  const { documentId } = useParams();
  const { data: conversations, error } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => getConversations(documentId!),
  });

  return {
    conversations,
    error,
  };
}
