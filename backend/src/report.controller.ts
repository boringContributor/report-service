import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Report } from 'entity/report.entity';
import { ReportList } from 'schemas/report-list.schema';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getReports(): Promise<ReportList[]> {
    return await this.reportService.getReportList();
  }

  @Get(':id')
  async getReportById(@Param('id') id: string): Promise<Report> {
    return await this.reportService.getReportById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createReport(@UploadedFile() file) {
    return await this.reportService.generateReport(file.buffer.toString());
  }
}
