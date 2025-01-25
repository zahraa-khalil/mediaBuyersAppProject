import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  });

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
