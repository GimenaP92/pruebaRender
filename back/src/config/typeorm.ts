import {DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import {config as dotenvConfig} from "dotenv"

dotenvConfig({ path: '.env.development' });


const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number | 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dropSchema: false,
  logging: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, 
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
 
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

