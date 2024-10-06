// src/components/UserList.tsx
"use client"; // Indica que este componente es un Client Component

import React, { useEffect, useState } from "react";

// Definir la estructura del tipo de datos que viene de la API
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users"); // Ruta de la API en Next.js


      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data: User[] = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchUsers();
  }, []);

  // Si está cargando, mostrar un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si hay un error, mostrar el mensaje de error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Mostrar los usuarios
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
