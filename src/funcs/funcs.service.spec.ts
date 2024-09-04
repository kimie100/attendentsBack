import { Test, TestingModule } from '@nestjs/testing';
import { FuncsService } from './funcs.service';

describe('FuncsService', () => {
  let service: FuncsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncsService],
    }).compile();

    service = module.get<FuncsService>(FuncsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
