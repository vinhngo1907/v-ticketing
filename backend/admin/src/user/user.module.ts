import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports:[DatabaseModule, DatabaseModule],
  providers: [UserService, DatabaseService],
  controllers: [UserController]
})
export class UserModule {}
