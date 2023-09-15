import { Test, TestingModule } from '@nestjs/testing';
import { CalldurationController } from './callduration.controller';
import { CalldurationService } from './callduration.service';

describe('CalldurationController', () => {
  let controller: CalldurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalldurationController],
      providers: [CalldurationService],
    }).compile();

    controller = module.get<CalldurationController>(CalldurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
