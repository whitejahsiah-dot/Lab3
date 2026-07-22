import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getReferences, deleteReference } from '../../api/api';

export default function ReferenceList() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReferences()
      .then(setReferences)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reference?')) return;
    try {
      await deleteReference(id);
      setReferences((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>References</h1>
        <Link to="/admin/references/new" className="btn btn-primary">+ Add Reference</Link>
      </div>
      {references.length === 0 ? (
        <p>No references found.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Company</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {references.map((ref) => (
              <tr key={ref.id}>
                <td>{ref.name}</td>
                <td>{ref.position || '—'}</td>
                <td>{ref.company || '—'}</td>
                <td>{ref.email || '—'}</td>
                <td className="table-actions">
                  <button className="btn btn-secondary" onClick={() => navigate(`/admin/references/${ref.id}/edit`)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(ref.id)}>Delete</button>
                </td>
              </tr>
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
