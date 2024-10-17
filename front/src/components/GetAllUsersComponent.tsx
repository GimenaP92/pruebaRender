// components/GetAllUsersComponent.tsx
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&limit=10`);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-700 text-white p-4">
      <div className="bg-gray-800 rounded-lg p-6 shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Usuarios Registrados</h1>
        {loading && <p>Cargando usuarios...</p>}
        {error && <p>Error: {error}</p>}

        <ul className="mb-4">
          {users.map((user) => (
            <li key={user.id} className="border-b border-gray-600 py-2">
              <p>Email: {user.email}</p>
              <p>Teléfono: {user.phone}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Página Anterior
          </button>
          <span className="self-center">Página {page}</span>
          <button
            onClick={handleNextPage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Página Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}