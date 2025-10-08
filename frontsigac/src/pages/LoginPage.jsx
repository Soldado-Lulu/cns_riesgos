import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField.jsx';
//import { loginUser } from '/src/services/api.js';
import { loginUser } from '../services/auth.service.js';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirección según el rol (rutas en minúsculas como en App.jsx)
      if (data.user.user_role === 'admin') {
        navigate('/admindashboard', { replace: true });
      } else {
        navigate('/userdashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">SIGAC - Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <InputField label="Correo electrónico" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <InputField label="Contraseña" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition">
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
