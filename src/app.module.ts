import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [AuthModule, TemplateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
