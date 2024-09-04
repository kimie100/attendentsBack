import { Test, TestingModule } from '@nestjs/testing';
import { FuncsController } from './funcs.controller';
import { FuncsService } from './funcs.service';

describe('FuncsController', () => {
  let controller: FuncsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncsController],
      providers: [FuncsService],
    }).compile();

    controller = module.get<FuncsController>(FuncsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
