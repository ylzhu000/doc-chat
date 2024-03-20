import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AuthGuard from './components/AuthGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
