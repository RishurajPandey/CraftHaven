const DEFAULT_API_BASE = import.meta.env.PROD
  ? 'https://crafthaven-backend.onrender.com'
  : 'http://localhost:5001';

const getApiBase = () => {
  const configured = import.meta.env.VITE_API_URL || '';
  if (!configured) return DEFAULT_API_BASE;
  return configured.replace(/\/$/, '');
};

export const API_BASE = getApiBase();

const requestJson = async (path, options = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

export async function registerUser({ name, email, password }) {
  return requestJson('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });
}

export async function loginUser({ email, password }) {
  return requestJson('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}
