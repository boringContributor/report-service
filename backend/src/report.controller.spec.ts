import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

const mockReport = {
  avgListing: [{ seller_type: 'dealer', avg_euro: 50 }],
  carDistribution: [{ make: 'BMW', distribution: 50 }],
  avgPrice: 12000,
  mostContactedListing: [
    {
      ranking: 1,
      listing_id: 124,
      make: 'Audi',
      selling_price: 5000,
      mileage: 23400,
      totalContacts: 10,
    },
  ],
};
describe('AppController', () => {
  let appController: ReportController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [ReportService],
    }).compile();

    appController = app.get<ReportController>(ReportController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {});
  });
});
