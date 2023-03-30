import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { KafkaModule } from './kafka/kafka.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http.error.filter';
import { LogginInterceptor } from './shared/logging.interceptor';

@Module({
  imports: [IdeaModule, UserModule, DatabaseModule, SharedModule, KafkaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogginInterceptor,
    },
  ],
})
export class AppModule { }
