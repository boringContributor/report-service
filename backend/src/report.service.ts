import { Injectable } from '@nestjs/common';
import { Report, Listing } from 'entity/report.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ReportList, ReportListDocument } from 'schemas/report-list.schema';
import { Model } from 'mongoose';
import { parse } from '@fast-csv/parse';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(ReportList.name)
    private reportListModel: Model<ReportListDocument>,
  ) {}

  // I don't consider pagination for now due to time limits
  async getReportList(): Promise<ReportList[]> {
    return await this.reportListModel.find().exec();
  }

  async createReportEntry(reportList: ReportList): Promise<void> {
    await this.reportListModel.create(reportList);
  }
  /* id: '1098',
  make: 'Toyota',
  price: '11345',
  mileage: '3500',
  seller_type: 'private'*/
  async generateReport(csv: string) {
    const parsedListing = await this.parseCsv(csv);

    const makePrice = parsedListing.filter(({ make, price }) => {
      return { make, price };
    });

    const sellerTypePrice = parsedListing.filter(({ seller_type, price }) => {
      return { seller_type, price };
    });

    const makeMileAge = parsedListing.filter(({ make, mileage }) => {
      return { make, mileage };
    });
    console.log(sellerTypePrice);
  }

  async parseCsv(csv: string): Promise<Listing[]> {
    return new Promise((resolve, reject) => {
      const data = [];
      const stream = parse<Listing, Listing>({
        headers: true,
        strictColumnHandling: true,
      })
        .validate(
          ({ id, make, mileage, price, seller_type }: Listing): boolean =>
            Number(id) &&
            typeof make === 'string' &&
            mileage >= 0 &&
            price >= 0 &&
            typeof seller_type === 'string',
        )
        .on('error', (error) => reject(error))
        .on('data', (row) => data.push(row))
        .on('data-invalid', (row, rowNumber) =>
          console.log(
            `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`,
          ),
        )
        .on('end', (rowCount: number) => {
          console.log(`Parsed ${rowCount} rows`);
          return resolve(data);
        });
      stream.write(csv);
      stream.end();
    });
  }

  getAverage(avg, value, _, { length }) {
    return avg + value / length;
  }

  async getReportById(id: string): Promise<Report> {
    return this.reportListModel.findById(id);
  }
}
