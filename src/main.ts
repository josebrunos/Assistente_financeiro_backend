import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Permite chamadas do frontend (CORS)

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend rodando na porta ${process.env.PORT ?? 3000}`);
}
bootstrap();
