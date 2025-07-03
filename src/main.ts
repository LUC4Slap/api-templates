import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: methods,
    allowedHeaders: "Content-Type, Accept",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
