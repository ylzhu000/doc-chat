import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../../services/apiDocuments';
export function useDocuments() {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

  return {
    documents,
    isLoading,
  };
}
