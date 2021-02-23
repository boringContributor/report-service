import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ReportListDocument = ReportList & Document;

interface AverageListing {
  seller_type: 'dealer' | 'private' | 'other';
  avg_euro: number;
}
interface CarDistribution {
  make: string;
  distribution: number;
}
interface MostContactedListing {
  ranking: number;
  listing_id: number;
  make: string;
  selling_price: number;
  mileage: number;
  totalContacts: number;
}

@Schema({ collection: 'reportList' })
export class ReportList {
  @Prop()
  creation: Date;

  @Prop()
  status: 'success' | 'error';

  @Prop()
  avgListing: AverageListing[];

  @Prop()
  carDistribution: CarDistribution[];

  @Prop()
  avgPrice: number;

  @Prop()
  mostContactedListing: MostContactedListing[];
}

export const ReportListSchema = SchemaFactory.createForClass(ReportList);
