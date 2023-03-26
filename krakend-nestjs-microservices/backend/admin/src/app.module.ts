import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './product/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
