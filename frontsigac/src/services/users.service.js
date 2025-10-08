// src/services/users.service.js
import { httpGet, httpPost, httpPut, httpDelete, httpPatch } from './http.js';

export function getUsers() {
  return httpGet('/users');
}

export function createUser(payload) {
  return httpPost('/users', payload);
}

export function updateUser(id, payload) {
  return httpPut(`/users/${id}`, payload);
}

export function deleteUser(id) {
  return httpDelete(`/users/${id}`);
}

// ✅ mejor: endpoint dedicado
export function toggleUserActive(id, nextActive) {
  return httpPatch(`/users/${id}/active`, { is_active: !!nextActive });
  // (si no tenés el endpoint PATCH en backend, usa httpPut(`/users/${id}`, { is_active: nextActive }))
}
