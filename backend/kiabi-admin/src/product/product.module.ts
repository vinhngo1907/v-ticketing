import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseService } from 'src/database/database.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DatabaseService, KafkaService]
})
export class ProductModule {}
