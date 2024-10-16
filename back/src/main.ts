import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el dominio de tu frontend
  app.enableCors({
    origin: 'https://pruebarender-4wtf.onrender.com', // Cambia esto al dominio correcto
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o credenciales
  });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

}
bootstrap();
