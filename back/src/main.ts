import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para los dominios de tu frontend
  app.enableCors({
    origin: [
      'https://pruebarender-front.onrender.com', // Tu dominio de frontend
      'https://pruebarender-1.onrender.com'  // Otro dominio que necesitas (si aplica)
    ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o credenciales
  });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
}
bootstrap();
