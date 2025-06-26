import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the public directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3005);
  console.log(`Backend rodando na porta ${process.env.PORT ?? 3005}`);
}
bootstrap();
