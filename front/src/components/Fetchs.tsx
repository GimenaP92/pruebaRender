import { IUserResponse, IUserLogin, IUserRegister } from '@/interfaces/interfaces'; 

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
export const fetchLoginUser = async (credentials: IUserLogin): Promise<IUserResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    const data: IUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la función login:', error);
    throw error;
  }
};



export const fetchUsers = async (page: number): Promise<IUserResponse[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`);
   
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    const data: IUserResponse[] = await response.json();
    return data;
  } catch (error) {
    
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error desconocido');
    }
  }
};