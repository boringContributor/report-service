import { FC } from 'react';
import { Table, Card, Page } from '@geist-ui/react';
import useReportDetails from './use-report-details';
const ReportDetails: FC<{ reportId: string }> = ({ reportId }) => {
  const { report } = useReportDetails(reportId);

  return (
    <Page>
      <Card shadow>
        <h4>Percentual distribution of available cars by Make</h4>
        <Table data={report?.carDistribution}>
          <Table.Column prop="make" label="Make" />
          <Table.Column prop="distribution" label="Distribution" />
        </Table>
      </Card>
      <Card shadow>
        <h4>Average Listing Selling Price per Seller Type</h4>
        <Table data={report?.avgListing}>
          <Table.Column prop="seller_type" label="Seller Type" />
          <Table.Column prop="avg_euro" label="Avg in Euro" />
        </Table>
      </Card>
      <Card shadow>
        <h4>The Top 5 most contacted listings per month</h4>
        <Table data={report?.mostContactedListing}>
          <Table.Column prop="ranking" label="Ranking" />
          <Table.Column prop="listing_id" label="Listing Id" />
          <Table.Column prop="make" label="Make" />
          <Table.Column prop="mileage" label="Mileage" />
          <Table.Column prop="selling_price" label="Selling Price" />
          <Table.Column prop="totalContacts" label="Total Contacts" />
        </Table>
      </Card>
    </Page>
  );
};

export default ReportDetails;
