import { useMutation } from '@tanstack/react-query';
import { uploadDocument } from '../../services/apiDocuments';
import toast from 'react-hot-toast';

export function useUpload() {
  const {
    mutate: uploadFile,
    error,
    isPending,
  } = useMutation({
    mutationFn: (formData: FormData) => uploadDocument(formData),
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return {
    uploadFile,
    error,
    isLoading: isPending,
  };
}
