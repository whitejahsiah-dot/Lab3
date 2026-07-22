import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../../api/api';

const initialState = { name: '', email: '', role: '', bio: '' };

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'LOAD':
      return { ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    getUser(id)
      .then((data) => dispatch({ type: 'LOAD', payload: { name: data.name, email: data.email, role: data.role || '', bio: data.bio || '' } }))
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
        await updateUser(id, state);
      } else {
        await createUser(state);
      }
      navigate('/admin/users');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <h1>{isEdit ? 'Edit User' : 'Add User'}</h1>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" value={state.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" value={state.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input id="role" name="role" value={state.role} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" value={state.bio} onChange={handleChange} rows={4} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
          <Link to="/admin/users" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
