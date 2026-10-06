import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false });

  // Detrás de nginx: la IP real del cliente viene en X-Forwarded-For (necesaria para el rate limit).
  app.set('trust proxy', 'loopback');
  app.disable('x-powered-by');
  // HSTS y X-Frame-Options los pone nginx; aquí se omiten para no duplicarlos.
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' }, hsts: false, frameguard: false }));
  app.useBodyParser('json', { limit: '100kb' });

  // La app móvil no envía Origin; el CORS abierto es para la vista previa web de Expo.
  app.enableCors();

  // Imágenes, audio y video servidos como archivos estáticos en /media/*
  app.useStaticAssets(join(process.cwd(), 'public', 'media'), { prefix: '/media' });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT || 5006;
  // Solo escucha en localhost: el único acceso público es a través de nginx.
  await app.listen(port, '127.0.0.1');
  console.log(`SoundFlow API en http://localhost:${port}/api`);
}

bootstrap();
