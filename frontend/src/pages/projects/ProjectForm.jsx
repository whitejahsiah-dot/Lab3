import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProject, createProject, updateProject } from '../../api/api';

const initialState = { title: '', description: '', technologies: '', url: '' };

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'LOAD':
      return { ...action.payload };
    default:
      return state;
  }
}

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    getProject(id)
      .then((data) =>
        dispatch({
          type: 'LOAD',
          payload: { title: data.title, description: data.description || '', technologies: data.technologies || '', url: data.url || '' },
        })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) =>
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEdit) {
        await updateProject(id, state);
      } else {
        await createProject(state);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <h1>{isEdit ? 'Edit Project' : 'Add Project'}</h1>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input id="title" name="title" value={state.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={state.description} onChange={handleChange} rows={4} />
        </div>
        <div className="form-group">
          <label htmlFor="technologies">Technologies</label>
          <input id="technologies" name="technologies" value={state.technologies} onChange={handleChange} placeholder="e.g. React, Node.js, SQLite" />
        </div>
        <div className="form-group">
          <label htmlFor="url">Project URL</label>
          <input id="url" name="url" type="url" value={state.url} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
          <Link to="/admin/projects" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
