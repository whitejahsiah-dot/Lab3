import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServices, deleteService } from '../../api/api';

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Services</h1>
        <Link to="/admin/services/new" className="btn btn-primary">+ Add Service</Link>
      </div>
      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.price || '—'}</td>
                <td>{service.description ? service.description.substring(0, 60) + (service.description.length > 60 ? '…' : '') : '—'}</td>
                <td className="table-actions">
                  <button className="btn btn-secondary" onClick={() => navigate(`/admin/services/${service.id}/edit`)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(service.id)}>Delete</button>
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
