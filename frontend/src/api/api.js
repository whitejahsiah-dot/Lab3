const BASE = import.meta.env.VITE_API_URL || '/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Network error' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
};

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});


export const getUsers = () => fetch(`${BASE}/users`).then(handleResponse);
export const getUser = (id) => fetch(`${BASE}/users/${id}`).then(handleResponse);
export const createUser = (data) => fetch(`${BASE}/users`, json('POST', data)).then(handleResponse);
export const updateUser = (id, data) => fetch(`${BASE}/users/${id}`, json('PUT', data)).then(handleResponse);
export const deleteUser = (id) => fetch(`${BASE}/users/${id}`, { method: 'DELETE' }).then(handleResponse);


export const getProjects = () => fetch(`${BASE}/projects`).then(handleResponse);
export const getProject = (id) => fetch(`${BASE}/projects/${id}`).then(handleResponse);
export const createProject = (data) => fetch(`${BASE}/projects`, json('POST', data)).then(handleResponse);
export const updateProject = (id, data) => fetch(`${BASE}/projects/${id}`, json('PUT', data)).then(handleResponse);
export const deleteProject = (id) => fetch(`${BASE}/projects/${id}`, { method: 'DELETE' }).then(handleResponse);


export const getServices = () => fetch(`${BASE}/services`).then(handleResponse);
export const getService = (id) => fetch(`${BASE}/services/${id}`).then(handleResponse);
export const createService = (data) => fetch(`${BASE}/services`, json('POST', data)).then(handleResponse);
export const updateService = (id, data) => fetch(`${BASE}/services/${id}`, json('PUT', data)).then(handleResponse);
export const deleteService = (id) => fetch(`${BASE}/services/${id}`, { method: 'DELETE' }).then(handleResponse);


export const getReferences = () => fetch(`${BASE}/references`).then(handleResponse);
export const getReference = (id) => fetch(`${BASE}/references/${id}`).then(handleResponse);
export const createReference = (data) => fetch(`${BASE}/references`, json('POST', data)).then(handleResponse);
export const updateReference = (id, data) => fetch(`${BASE}/references/${id}`, json('PUT', data)).then(handleResponse);
export const deleteReference = (id) => fetch(`${BASE}/references/${id}`, { method: 'DELETE' }).then(handleResponse);
