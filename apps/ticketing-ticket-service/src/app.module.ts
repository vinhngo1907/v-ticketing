import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';
import { DatabaseService } from './database/database.service';
import { AppConfigService } from './config/appConfigService';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, ProductModule, 
    // DatabaseModule, 
    // KafkaModule
  ],
  controllers: [],
  providers: [
    // KafkaService, 
    DatabaseService,
    ConfigService,
    AppConfigService
  ],
})
export class AppModule {}
