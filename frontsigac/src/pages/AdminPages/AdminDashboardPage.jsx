import { useEffect, useState } from 'react';
//import { createUser, getUsers, updateUser, deleteUser } from '../../services/api.js';
import LogoutButton from '../../components/LogoutButton.jsx';
import { getUsers, createUser, updateUser, deleteUser,toggleUserActive } from '/src/services/users.service.js';
import Toggle from '../../components/Toggle.jsx';

export default function AdminDashboardPage() {
  const emptyForm = { full_name: '', email: '', password: '', user_role: 'user' };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // null = creando, id = editando
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function refreshUsers() {
    const list = await getUsers();
    setUsers(list);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setError('');
    try {
      if (editingId) {
        // actualizar (password es opcional)
        const payload = { full_name: form.full_name, email: form.email, user_role: form.user_role };
        // si quieres permitir cambiar contraseña al editar:
        if (form.password?.trim()) payload.password = form.password;

        await updateUser(editingId, payload);
        setMsg('Usuario actualizado correctamente');
        setEditingId(null);
      } else {
        // crear
        const created = await createUser(form);
        setMsg(`Usuario creado: ${created.full_name} (${created.user_role})`);
      }
      setForm(emptyForm);
      await refreshUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(u) {
    setEditingId(u.id);
    setForm({
      full_name: u.full_name,
      email: u.email,
      password: '',       // vacío por seguridad
      user_role: u.user_role || 'user',
    });
    setMsg('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este usuario?')) return;
    setLoading(true);
    setMsg('');
    setError('');
    try {
      await deleteUser(id);
      setMsg('Usuario eliminado');
      await refreshUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUsers().catch(e => setError(e.message));
  }, []);

async function handleToggleActive(u) {
  const prev = [...users];
  setUsers(users.map(x => x.id === u.id ? { ...x, is_active: !u.is_active } : x));
  try {
    await toggleUserActive(u.id, !u.is_active);
  } catch (err) {
    setUsers(prev); // revertir si falla
    setError(err.message);
  }
}

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <LogoutButton />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulario de creación/edición */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">
            {editingId ? `Editar usuario #${editingId}` : 'Crear nuevo usuario'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm">Nombre completo</label>
              <input
                className="w-full border rounded px-3 py-2"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm">
                {editingId ? 'Contraseña (opcional si deseas cambiarla)' : 'Contraseña'}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={editingId ? 'Dejar en blanco para no cambiar' : ''}
              />
            </div>

            <div>
              <label className="text-sm">Rol</label>
              <select
                className="w-full border rounded px-3 py-2"
                name="user_role"
                value={form.user_role}
                onChange={handleChange}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {msg && <p className="text-green-600 text-sm">{msg}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear usuario'}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-4 py-2 rounded"
                  onClick={() => { setEditingId(null); setForm(emptyForm); setMsg('Edición cancelada'); }}
                  disabled={loading}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>


 {/* tu formulario de crear/editar... */}

      {/* Tabla con toggle */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="font-semibold text-lg mb-4">Usuarios</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Activo</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b last:border-none">
                  <td className="py-2">{u.id}</td>
                  <td>{u.full_name}</td>
                  <td>{u.email}</td>
                  <td>{u.user_role}</td>
                  <td>
                    <Toggle
                      checked={!!u.is_active}
                      onChange={() => handleToggleActive(u)}
                    />
                  </td>
                  <td>
                      <div className="flex gap-2 justify-end">
                        <button
                          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => startEdit(u)}
                        >
                          Editar
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDelete(u.id)}
                        >
                          Eliminar
                        </button>
                      </div>                  </td>
                </tr>
              ))}
              {!users.length && (
                <tr><td className="py-3" colSpan="6">Sin usuarios aún</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
