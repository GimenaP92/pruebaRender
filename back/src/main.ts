import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el dominio de tu frontend
  app.enableCors({
    origin: 'https://pruebarender-4wtf.onrender.com', // Cambia esto al dominio correcto
  });

  await app.listen(3001);
}
bootstrap();
