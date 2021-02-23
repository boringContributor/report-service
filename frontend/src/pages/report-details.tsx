import { Divider, Page } from '@geist-ui/react';
import Header from 'components/header';
import Details from 'components/report-details';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  reportId: string;
}
const ReportDetails = () => {
  const { reportId } = useParams<ParamTypes>();

  return (
    <Page>
      <Header goBack={true} title="Details" canUpload={false} info={false} />
      <Divider />
      <Details reportId={reportId} />
    </Page>
  );
};

export default ReportDetails;
