import { Test, TestingModule } from '@nestjs/testing';
import { SipclientController } from './sipclient.controller';
import { SipclientService } from './sipclient.service';

describe('SipclientController', () => {
  let controller: SipclientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SipclientController],
      providers: [SipclientService],
    }).compile();

    controller = module.get<SipclientController>(SipclientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
