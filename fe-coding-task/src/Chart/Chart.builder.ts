import { ChartService } from './Chart.service';

const URL = 'https://data.ssb.no/api/v0/no/table/07241';
export const chartService = new ChartService(URL);
