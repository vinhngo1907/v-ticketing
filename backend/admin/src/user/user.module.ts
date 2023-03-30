import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports:[DatabaseModule, DatabaseModule, KafkaModule],
  providers: [UserService, DatabaseService, KafkaService],
  controllers: [UserController]
})
export class UserModule {}
