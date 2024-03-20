import { TextField, Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from './useLogin';

import { TLogin } from '../../types';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<TLogin>();
  const { login, isLoggingIn } = useLogin();

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    login(data);
  };

  return (
    <Box sx={{ background: '#ffffff', padding: '2.4rem 4rem' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid rowGap={2} display="flex" flexDirection="column" justifyContent="space-between">
          <TextField
            autoComplete="email"
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            {...register('email', { required: true })}
          />
          <TextField
            autoComplete="password"
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            {...register('password', { required: true })}
          />
          <LoadingButton loading={isLoggingIn} variant="contained" size="large" aria-label="loginButton" type="submit">
            Login
          </LoadingButton>
        </Grid>
      </form>
    </Box>
  );
}
