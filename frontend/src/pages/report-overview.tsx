import { Divider, Page } from '@geist-ui/react';
import Header from 'components/header';
import ReportTable from 'components/report-table';
const ReportOverview = () => {
  return (
    <Page>
      <Header title="Reports" canUpload={true} info={true} />
      <Divider />
      <ReportTable />
    </Page>
  );
};

export default ReportOverview;
