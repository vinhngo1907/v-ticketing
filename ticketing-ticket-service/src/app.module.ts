import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [UserModule, ProductModule, 
    // DatabaseModule, 
    // KafkaModule
  ],
  controllers: [],
  providers: [
    // KafkaService, 
    // DatabaseService
  ],
})
export class AppModule {}
