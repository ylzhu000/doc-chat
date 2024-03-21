import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import NotFoundRoute from './pages/NotFoundRoute';
import LoginRoute from './pages/LoginRoute';
import DocumentsRoute from './pages/DocumentsRoute';
import ChatRoute from './pages/ChatRoute';

import Layout from './components/Layout';
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
            <Route index element={<Navigate replace to="documents" />} />
            <Route path="documents" element={<DocumentsRoute />} />
            <Route path="documents/:id" element={<ChatRoute />} />
          </Route>
          <Route path="login" element={<LoginRoute />} />
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
