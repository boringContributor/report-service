import { Loading, Row, Table, Tag } from '@geist-ui/react';
import useReadableDate from 'hooks/use-readable-date';
import { Link } from 'react-router-dom';
import useReportList from './use-report-list';

const ReportTable = () => {
  const toReadableDate = useReadableDate();
  const { isLoading, reportList } = useReportList();

  const data = reportList?.map(({ _id: reportId, creation, status }) => {
    return {
      reportId:
        status === 'success' ? (
          <Link to={`/${reportId}`}>{reportId}</Link>
        ) : (
          reportId
        ),
      creation: toReadableDate(new Date(creation)),
      status: (
        <Tag type={status === 'success' ? 'success' : 'error'}>{status}</Tag>
      ),
    };
  });

  return (
    <>
      {isLoading && (
        <Row style={{ padding: '10px 0' }}>
          <Loading>Loading</Loading>
        </Row>
      )}
      {!isLoading && (
        <Table data={data}>
          <Table.Column prop="reportId" label="Report Id" />
          <Table.Column prop="creation" label="Date" />
          <Table.Column prop="status" label="Status" />
        </Table>
      )}
    </>
  );
};
export default ReportTable;
