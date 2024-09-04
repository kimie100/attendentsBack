import { Test, TestingModule } from '@nestjs/testing';
import { AtendentsController } from './atendents.controller';
import { AtendentsService } from './atendents.service';

describe('AtendentsController', () => {
  let controller: AtendentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtendentsController],
      providers: [AtendentsService],
    }).compile();

    controller = module.get<AtendentsController>(AtendentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
