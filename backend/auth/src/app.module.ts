import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [IdeaModule, UserModule, DatabaseModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
