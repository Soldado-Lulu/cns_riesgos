// src/services/http.js
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

function authHeaders(extra = {}) {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function handleJson(res) {
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw new Error(data.message || 'No autorizado');
  }
  if (!res.ok) throw new Error(data.message || 'Error de red');
  return data;
}

export async function httpGet(path) {
  const res = await fetch(`${API_URL}${path}`, { headers: authHeaders() });
  return handleJson(res);
}

export async function httpPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return handleJson(res);
}

export async function httpPut(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return handleJson(res);
}

export async function httpPatch(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return handleJson(res);
}

export async function httpDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleJson(res);
}
