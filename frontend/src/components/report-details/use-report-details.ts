import { useState, useEffect } from 'react';
import axios from 'axios';
import { Report } from 'types/report';

const useReportDetails = (
  id?: string
): {
  isLoading: boolean;
  report: Report | undefined;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Report | undefined>(undefined);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/v1/report/${id}`);
        console.log(data);
        setReport(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(true);
    };
    fetchReport();
  }, [id]);

  return {
    isLoading,
    report,
  };
};

export default useReportDetails;
