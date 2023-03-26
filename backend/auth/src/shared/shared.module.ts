import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { SharedController } from './shared.controller';
import { SharedService } from './shared.service';

@Module({
  controllers: [UserController, SharedController],
  providers: [UserService, SharedService]
})
export class SharedModule {}
