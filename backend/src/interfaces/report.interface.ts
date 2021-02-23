interface IReportService {
  getAllReports(): Promise<void>;
  getReportById(id: number): Promise<void>;
  deleteReportById(id: number): Promise<void>;
  generateReport(csv: string): Promise<void>;
  parseCsv(): Promise<void>;
}

export { IReportService };
