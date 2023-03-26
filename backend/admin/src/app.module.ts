import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './product/client/client.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { ControllerModule } from './service/controller/controller.module';

@Module({
  imports: [ClientModule, UserModule, SharedModule, ProductModule, ControllerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
