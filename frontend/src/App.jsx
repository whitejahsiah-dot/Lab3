import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import Home from './pages/Home';
import UserList from './pages/users/UserList';
import UserForm from './pages/users/UserForm';
import ProjectList from './pages/projects/ProjectList';
import ProjectForm from './pages/projects/ProjectForm';
import ServiceList from './pages/services/ServiceList';
import ServiceForm from './pages/services/ServiceForm';
import ReferenceList from './pages/references/ReferenceList';
import ReferenceForm from './pages/references/ReferenceForm';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Users */}
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/new" element={<UserForm />} />
          <Route path="/admin/users/:id/edit" element={<UserForm />} />

          {/* Projects */}
          <Route path="/admin/projects" element={<ProjectList />} />
          <Route path="/admin/projects/new" element={<ProjectForm />} />
          <Route path="/admin/projects/:id/edit" element={<ProjectForm />} />

          {/* Services */}
          <Route path="/admin/services" element={<ServiceList />} />
          <Route path="/admin/services/new" element={<ServiceForm />} />
          <Route path="/admin/services/:id/edit" element={<ServiceForm />} />

          {/* References */}
          <Route path="/admin/references" element={<ReferenceList />} />
          <Route path="/admin/references/new" element={<ReferenceForm />} />
          <Route path="/admin/references/:id/edit" element={<ReferenceForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
