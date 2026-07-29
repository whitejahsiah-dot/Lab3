import { useEffect, useState, useMemo, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, deleteProject } from '../../api/api';

const ProjectRow = memo(function ProjectRow({ project, onEdit, onDelete }) {
  return (
    <tr>
      <td>{project.title}</td>
      <td>{project.technologies || '—'}</td>
      <td>{project.url ? <a href={project.url} target="_blank" rel="noreferrer">Link</a> : '—'}</td>
      <td className="table-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(project.id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(project.id)}>Delete</button>
      </td>
    </tr>
  );
});

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = useMemo(
    () => projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())),
    [projects, search]
  );

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Projects</h1>
        <Link to="/admin/projects/new" className="btn btn-primary">+ Add Project</Link>
      </div>
      <div className="form-group" style={{ maxWidth: 320, marginBottom: '1rem' }}>
        <input
          type="search"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Technologies</th>
              <th>URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                onEdit={(id) => navigate(`/admin/projects/${id}/edit`)}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
      <div className="back-link">
        <Link to="/admin">← Back to Dashboard</Link>
      </div>
    </div>
  );
}
