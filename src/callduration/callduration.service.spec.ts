import { Test, TestingModule } from '@nestjs/testing';
import { CalldurationService } from './callduration.service';

describe('CalldurationService', () => {
  let service: CalldurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalldurationService],
    }).compile();

    service = module.get<CalldurationService>(CalldurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
