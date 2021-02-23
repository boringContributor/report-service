import { useState, useEffect } from 'react';
import axios from 'axios';
import { ReportList } from 'types/report';

const useReportList = (): {
  isLoading: boolean;
  reportList: ReportList[] | undefined;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [reportList, setReportList] = useState<ReportList[] | undefined>(
    undefined
  );

  // use something like swr here for caching
  useEffect(() => {
    const fetchReportList = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/v1/report`);
        setReportList(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchReportList();
  }, []);

  return {
    isLoading,
    reportList,
  };
};

export default useReportList;
