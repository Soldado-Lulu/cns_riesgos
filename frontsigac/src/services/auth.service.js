import { httpPost } from './http.js';

export function loginUser(credentials) {
  return httpPost('/auth/login', credentials);
}

// Si luego quieres register:
// export function registerUser(payload) {
//   return httpPost('/auth/register', payload);
// }
