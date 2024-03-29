import { useMutation } from '@tanstack/react-query';
import { signIn as signInApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

import { TLogin } from '../../types';

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    error,
    isPending: isLoggingIn,
  } = useMutation({
    mutationFn: ({ email, password }: TLogin) => signInApi({ email, password }),
    onSuccess: () => {
      navigate('/documents', { replace: true });
    },
  });

  return {
    login,
    error,
    isLoggingIn,
  };
}
