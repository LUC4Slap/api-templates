import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Durante o desenvolvimento, libera para qualquer origem
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
