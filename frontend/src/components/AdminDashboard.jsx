import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Users',
    description: 'Manage user profiles in your portfolio.',
    links: [
      { label: 'View All Users', to: '/admin/users' },
      { label: 'Add New User', to: '/admin/users/new' },
    ],
  },
  {
    title: 'Projects',
    description: 'Showcase and manage your projects.',
    links: [
      { label: 'View All Projects', to: '/admin/projects' },
      { label: 'Add New Project', to: '/admin/projects/new' },
    ],
  },
  {
    title: 'Services',
    description: 'List and manage services you offer.',
    links: [
      { label: 'View All Services', to: '/admin/services' },
      { label: 'Add New Service', to: '/admin/services/new' },
    ],
  },
  {
    title: 'References',
    description: 'Manage references and testimonials.',
    links: [
      { label: 'View All References', to: '/admin/references' },
      { label: 'Add New Reference', to: '/admin/references/new' },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p className="subtitle">Manage all portfolio content from one place.</p>
      <div className="dashboard-grid">
        {sections.map((section) => (
          <div key={section.title} className="dashboard-card">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <div className="dashboard-card-links">
              {section.links.map((link) => (
                <Link key={link.to} to={link.to} className="btn btn-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
