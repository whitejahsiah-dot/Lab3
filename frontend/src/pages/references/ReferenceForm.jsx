import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getReference, createReference, updateReference } from '../../api/api';

const initialState = { name: '', position: '', company: '', email: '', phone: '', testimonial: '' };

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

export default function ReferenceForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    getReference(id)
      .then((data) =>
        dispatch({
          type: 'LOAD',
          payload: {
            name: data.name,
            position: data.position || '',
            company: data.company || '',
            email: data.email || '',
            phone: data.phone || '',
            testimonial: data.testimonial || '',
          },
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
        await updateReference(id, state);
      } else {
        await createReference(state);
      }
      navigate('/admin/references');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <h1>{isEdit ? 'Edit Reference' : 'Add Reference'}</h1>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input id="name" name="name" value={state.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input id="position" name="position" value={state.position} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" value={state.company} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={state.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" value={state.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="testimonial">Testimonial</label>
          <textarea id="testimonial" name="testimonial" value={state.testimonial} onChange={handleChange} rows={5} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
          <Link to="/admin/references" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
