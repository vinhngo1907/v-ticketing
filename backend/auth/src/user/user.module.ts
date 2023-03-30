import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule, HttpModule],
  providers: [UserService],
  controllers: [UserController]
})

export class UserModule {}
