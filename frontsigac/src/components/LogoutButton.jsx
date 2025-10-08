// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ className = "" }) {
  const navigate = useNavigate();

  function handleLogout() {
    // Elimina token y datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirige al login
    navigate("/", { replace: true });
  }

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition ${className}`}
    >
      Cerrar sesión
    </button>
  );
}
