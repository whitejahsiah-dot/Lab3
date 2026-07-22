import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getService, createService, updateService } from '../../api/api';

const initialState = { name: '', description: '', price: '' };

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

export default function ServiceForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    getService(id)
      .then((data) =>
        dispatch({
          type: 'LOAD',
          payload: { name: data.name, description: data.description || '', price: data.price || '' },
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
        await updateService(id, state);
      } else {
        await createService(state);
      }
      navigate('/admin/services');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <h1>{isEdit ? 'Edit Service' : 'Add Service'}</h1>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" value={state.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={state.description} onChange={handleChange} rows={4} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input id="price" name="price" value={state.price} onChange={handleChange} placeholder="e.g. $50/hr or Free" />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
          <Link to="/admin/services" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
