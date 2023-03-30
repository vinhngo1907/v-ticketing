import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [IdeaModule, UserModule, DatabaseModule, SharedModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
