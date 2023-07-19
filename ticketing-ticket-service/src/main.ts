import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/appConfigService';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule,{
  //   logger:['error', 'warn', 'log']
  // });
  // app.useGlobalPipes(new ValidationPipe());
  // await app.listen(process.env.APP_PORT);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const appConfigService = app.get<AppConfigService>(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
