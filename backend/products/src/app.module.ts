import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './product/client/client.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ClientModule, ProductModule, SharedModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
