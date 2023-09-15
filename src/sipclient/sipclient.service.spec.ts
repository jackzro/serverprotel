import { Test, TestingModule } from '@nestjs/testing';
import { SipclientService } from './sipclient.service';

describe('SipclientService', () => {
  let service: SipclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SipclientService],
    }).compile();

    service = module.get<SipclientService>(SipclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
