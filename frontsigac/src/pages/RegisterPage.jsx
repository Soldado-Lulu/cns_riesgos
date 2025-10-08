import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Datos de registro:', form);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Crear cuenta
        </h2>

        <div className="mb-3">
          <label className="text-sm font-medium">Nombre completo</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="mb-3">
          <label className="text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md w-full"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
