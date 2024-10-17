// components/GetAllUsersComponent.tsx
'use client';
import { IUserResponse } from '@/interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import { fetchUsers } from './Fetchs';

export default function GetAllUsersComponent() {
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const usersData = await fetchUsers(page);
      setUsers(usersData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 text-white p-4">
      <div className="bg-gray-800 rounded-lg p-8 shadow-md w-full max-w-6xl">
        <h1 className="text-2xl font-semibold text-center mb-4">Usuarios Registrados</h1>
        {loading && <p className="text-center">Cargando usuarios...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-700 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold">{user.email}</h2>
              <p className="text-gray-300">Teléfono: {user.phone}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={handlePrevPage} 
            disabled={page === 1} 
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Página Anterior
          </button>
          <span className="text-lg">Página {page}</span>
          <button 
            onClick={handleNextPage} 
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Página Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
