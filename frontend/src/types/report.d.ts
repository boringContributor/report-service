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
  avgListing: AverageListing[];
  carDistribution: CarDistribution[];
  avgPrice: number;
  mostContactedListing: MostContactedListing[];
}

interface ReportList {
  _id: string;
  creation: Date;
  status: 'success' | 'error';
}
export { Listing, Contact, Report, ReportList };
