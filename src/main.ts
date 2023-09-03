import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.DEFAULT_HTTP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}

bootstrap();
