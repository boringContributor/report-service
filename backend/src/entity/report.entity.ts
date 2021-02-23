import { ObjectId } from 'mongoose';

interface Listing {
  id: number;
  make: string;
  price: number;
  mileage: number;
  seller_type: string;
}

interface Contact {
  listing_id: number;
  contact_date: Date;
}

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

interface Report {
  creation: Date;
  status: 'success' | 'error';
  avgListing: AverageListing[];
  carDistribution: CarDistribution[];
  avgPrice: number;
  mostContactedListing: MostContactedListing[];
}
export { Listing, Contact, Report };

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
