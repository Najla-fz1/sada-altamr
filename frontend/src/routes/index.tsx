import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from './ProtectedRoute';

// صفحات فورية (تُحمَّل دائماً — بسيطة وخفيفة)
import RolePage from '@/pages/RolePage';
import LoginPage from '@/pages/admin/LoginPage';

// صفحات كسولة (تُحمَّل فقط عند الحاجة)
const VoicePrintPage = lazy(() => import('@/pages/dalal/VoicePrintPage'));
const DalalDashboard     = lazy(() => import('@/pages/dalal/DashboardPage'));
const AdminDashboard     = lazy(() => import('@/pages/admin/DashboardPage'));

// مكوّن تحميل مؤقت
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <span className="size-8 border-2 border-current/20 border-t-current rounded-full animate-spin" />
  </div>
);

export const router = createBrowserRouter([
  { path: '/',       element: <RolePage /> },
{ path: '/admin/login', element: <LoginPage /> },
  
    { path: '/voice-setup', element: (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute allowedRole="dalal">
        <VoicePrintPage  />
      </ProtectedRoute>
    </Suspense>
)},
{ path: '/dalal', element: (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute allowedRole="dalal">
        <DalalDashboard />
      </ProtectedRoute>
    </Suspense>
)},
{ path: '/admin', element: (
    <Suspense fallback={<PageLoader />}>
      <ProtectedRoute allowedRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    </Suspense>
)},
]);