const BASE = import.meta.env.VITE_API_URL || 'https://lab3-backend-k38t.onrender.com/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    let message;
    try {
      const data = await res.json();
      message = data.message || `Error ${res.status}`;
    } catch {
      message = `Error ${res.status} (${res.statusText || 'non-JSON response'})`;
    }
    throw new Error(message);
  }
  return res.json();
};

const request = (url, options) =>
  fetch(url, options)
    .catch(() => { throw new Error(`Cannot reach server at ${url}`); })
    .then(handleResponse);


const j = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// Users
export const getUsers = () => request(`${BASE}/users`);
export const getUser = (id) => request(`${BASE}/users/${id}`);
export const createUser = (data) => request(`${BASE}/users`, j('POST', data));
export const updateUser = (id, data) => request(`${BASE}/users/${id}`, j('PUT', data));
export const deleteUser = (id) => request(`${BASE}/users/${id}`, { method: 'DELETE' });

// Projects
export const getProjects = () => request(`${BASE}/projects`);
export const getProject = (id) => request(`${BASE}/projects/${id}`);
export const createProject = (data) => request(`${BASE}/projects`, j('POST', data));
export const updateProject = (id, data) => request(`${BASE}/projects/${id}`, j('PUT', data));
export const deleteProject = (id) => request(`${BASE}/projects/${id}`, { method: 'DELETE' });

// Services
export const getServices = () => request(`${BASE}/services`);
export const getService = (id) => request(`${BASE}/services/${id}`);
export const createService = (data) => request(`${BASE}/services`, j('POST', data));
export const updateService = (id, data) => request(`${BASE}/services/${id}`, j('PUT', data));
export const deleteService = (id) => request(`${BASE}/services/${id}`, { method: 'DELETE' });

// References
export const getReferences = () => request(`${BASE}/references`);
export const getReference = (id) => request(`${BASE}/references/${id}`);
export const createReference = (data) => request(`${BASE}/references`, j('POST', data));
export const updateReference = (id, data) => request(`${BASE}/references/${id}`, j('PUT', data));
export const deleteReference = (id) => request(`${BASE}/references/${id}`, { method: 'DELETE' });
