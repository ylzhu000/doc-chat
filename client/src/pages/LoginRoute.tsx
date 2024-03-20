import { Box, Typography } from '@mui/material';
import LoginForm from '../features/authentication/LoginForm';

export default function LoginRoute() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f9fafb',
        display: 'grid',
        placeContent: 'center',
        gap: '3.2rem',
        gridTemplateColumns: '48rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Login to your account</Typography>
      <LoginForm />
    </Box>
  );
}
