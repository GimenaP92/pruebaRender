import { DataSource } from 'typeorm';
import { User } from './entities/user.entity'; // Asegúrate de ajustar las rutas a tus entidades

const AppDataSource = new DataSource({
  type: 'postgres',             // Tipo de base de datos
  host: process.env.DB_HOST,   // Host de la base de datos
  port: Number(process.env.DB_PORT), // Puerto de la base de datos
  username: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_NAME, // Nombre de la base de datos
  synchronize: true,            // Habilita la sincronización automática (no recomendado en producción)
  logging: false,               // Habilita el logging de consultas (útil para desarrollo)
  entities: [User],             // Aquí puedes agregar tus entidades
  migrations: [],               // Si tienes migraciones, las puedes incluir aquí
  subscribers: [],              // Si usas suscriptores, los puedes incluir aquí
});

export default AppDataSource;
