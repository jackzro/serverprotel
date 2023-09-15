import { Module } from '@nestjs/common';
import { CalldurationService } from './callduration.service';
import { CalldurationController } from './callduration.controller';

@Module({
  controllers: [CalldurationController],
  providers: [CalldurationService]
})
export class CalldurationModule {}
