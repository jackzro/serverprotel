import { Module } from '@nestjs/common';
import { SipclientService } from './sipclient.service';
import { SipclientController } from './sipclient.controller';

@Module({
  controllers: [SipclientController],
  providers: [SipclientService]
})
export class SipclientModule {}
