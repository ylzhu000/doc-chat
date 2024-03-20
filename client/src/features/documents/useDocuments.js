import { useQuery } from '@tanstack/react-query';
export function useDocuments() {
  const { data, isLoading } = useQuery({
    queryKey: ['documents'],
  });
}
