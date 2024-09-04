import { Test, TestingModule } from '@nestjs/testing';
import { AtendentsService } from './atendents.service';

describe('AtendentsService', () => {
  let service: AtendentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtendentsService],
    }).compile();

    service = module.get<AtendentsService>(AtendentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
