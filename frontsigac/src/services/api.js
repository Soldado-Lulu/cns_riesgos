// src/services/api.js

const API_URL = 'http://localhost:4000/api';

/**
 * Inicia sesión enviando credenciales al backend
 * @param {{ email: string, password: string }} credentials
 */
export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error de autenticación');
  }

  return data; // { token, user }
}


//*************************************************** */
function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function createUser({ full_name, email, password, user_role }) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ full_name, email, password, user_role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'No se pudo crear el usuario');
  return data;
}

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'No se pudo obtener usuarios');
  return data;
}

//*************************************/ */
// ...

export async function updateUser(id, payload) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'No se pudo actualizar el usuario');
  return data;
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'No se pudo eliminar el usuario');
  return data;
}
