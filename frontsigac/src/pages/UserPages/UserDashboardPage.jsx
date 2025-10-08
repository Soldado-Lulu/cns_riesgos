import { useEffect, useState } from "react";
import LogoutButton from "../../components/LogoutButton.jsx";

export default function UserDashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener datos del usuario guardado en localStorage
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.error("Error al leer usuario del localStorage");
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-xl text-gray-700">Cargando información del usuario...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-600">Panel de Usuario</h1>
        <LogoutButton />
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Datos del usuario
        </h2>

        <div className="space-y-2 text-gray-800">
          <p>
            <strong>Nombre completo:</strong> {user.full_name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Rol:</strong>{" "}
            <span
              className={`${
                user.user_role === "admin" ? "text-blue-600" : "text-green-600"
              } font-medium`}
            >
              {user.user_role}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
