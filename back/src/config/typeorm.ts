import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import {config as dotenvConfig} from "dotenv"

dotenvConfig({ path: '.env.development' });

const AppDataSource = new DataSource({
  type: 'postgres',             
  host: process.env.DB_HOST,   
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  synchronize: true,            
  logging: false,               
  entities: [User],             
  

});

export default AppDataSource;
