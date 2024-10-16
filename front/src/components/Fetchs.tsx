import { ILoginResponse, IUserLogin, IUserRegister } from '@/interfaces/interfaces'; 
//import {config as dotenvConfig} from "dotenv"

//dotenvConfig({ path: '.env.local' });

/* 
// Verificar que la variable de entorno esté definida
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL no está definida');
}

// No es necesario agregar /users en cada llamada, ya lo concatenamos aquí
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`; */

// Función para registrar un usuario
export const fetchRegisterUser = async (user: IUserRegister) => {
  console.log('Datos del usuario a enviar:', user);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error desconocido');
  }

  const data = await response.json();
  return data;
};

// Función para login de usuario
export const fetchLoginUser = async (credentials: IUserLogin): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`https://pruebarender-4wtf.onrender.com/users/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    const data: ILoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la función login:', error);
    throw error;
  }
};
