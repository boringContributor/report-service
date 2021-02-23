import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportList, ReportListSchema } from 'schemas/report-list.schema';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

// replace username pw and db
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://<username>:<pw>@cluster0.yvjjk.mongodb.net/<db>>?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: ReportList.name, schema: ReportListSchema },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class AppModule {}
