import { Test, TestingModule } from '@nestjs/testing';
import { EdgeDevicesService } from './edge-devices.service';

describe('EdgeDevicesService', () => {
  let service: EdgeDevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdgeDevicesService],
    }).compile();

    service = module.get<EdgeDevicesService>(EdgeDevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
