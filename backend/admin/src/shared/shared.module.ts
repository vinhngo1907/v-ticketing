import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';

@Module({
  controllers: [SharedController],
  providers: [SharedService]
})
export class SharedModule {}
