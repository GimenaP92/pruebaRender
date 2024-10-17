'use client';
import { IUserResponse } from '@/interfaces/interfaces';
import React, { useEffect, useState } from 'react';

export default function GetAllUsersComponent() {
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [page, setPage] = useState(1); // Control de la página actual
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (page: number): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://nest-demo-latest-hg07.onrender.com/users?page=${page}&limit=10`);
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data: IUserResponse[] = await response.json(); // Especifica que data es un array de IUserResponse
      setUsers(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Usa el mensaje de error si es un objeto de Error
      } else {
        setError('Error desconocido'); // Maneja casos donde el error no sea un objeto de Error
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page); // Cargar usuarios al cambiar la página
  }, [page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <h1>Usuarios Registrados</h1>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Página Anterior
        </button>
        <span> Página {page} </span>
        <button onClick={handleNextPage}>Página Siguiente</button>
      </div>
    </div>
  );
}
