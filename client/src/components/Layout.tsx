import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <Box>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
