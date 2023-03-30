import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [UserModule, ProductModule, DatabaseModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService, KafkaService],
})
export class AppModule {}
