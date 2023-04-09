import { Test, TestingModule } from '@nestjs/testing';
import { EdgeDevicesController } from './edge-devices.controller';

describe('EdgeDevicesController', () => {
  let controller: EdgeDevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdgeDevicesController],
    }).compile();

    controller = module.get<EdgeDevicesController>(EdgeDevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
