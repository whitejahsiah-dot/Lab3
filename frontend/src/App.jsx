import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const UserList = lazy(() => import('./pages/users/UserList'));
const UserForm = lazy(() => import('./pages/users/UserForm'));
const ProjectList = lazy(() => import('./pages/projects/ProjectList'));
const ProjectForm = lazy(() => import('./pages/projects/ProjectForm'));
const ServiceList = lazy(() => import('./pages/services/ServiceList'));
const ServiceForm = lazy(() => import('./pages/services/ServiceForm'));
const ReferenceList = lazy(() => import('./pages/references/ReferenceList'));
const ReferenceForm = lazy(() => import('./pages/references/ReferenceForm'));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Suspense fallback={<div className="page"><p>Loading…</p></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />

              {/* Protected Admin */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

              {/* Users */}
              <Route path="/admin/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
              <Route path="/admin/users/new" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
              <Route path="/admin/users/:id/edit" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />

              {/* Projects */}
              <Route path="/admin/projects" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />
              <Route path="/admin/projects/new" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
              <Route path="/admin/projects/:id/edit" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />

              {/* Services */}
              <Route path="/admin/services" element={<ProtectedRoute><ServiceList /></ProtectedRoute>} />
              <Route path="/admin/services/new" element={<ProtectedRoute><ServiceForm /></ProtectedRoute>} />
              <Route path="/admin/services/:id/edit" element={<ProtectedRoute><ServiceForm /></ProtectedRoute>} />

              {/* References */}
              <Route path="/admin/references" element={<ProtectedRoute><ReferenceList /></ProtectedRoute>} />
              <Route path="/admin/references/new" element={<ProtectedRoute><ReferenceForm /></ProtectedRoute>} />
              <Route path="/admin/references/:id/edit" element={<ProtectedRoute><ReferenceForm /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
