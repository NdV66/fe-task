import { LineChart } from '@mui/x-charts';
import { TChartAxisSeries, TChartSeries } from '../Chart.type';

type Props = {
  chartSeries: TChartSeries[];
  chartXAxis: TChartAxisSeries;
  width: number;
  height: number;
};

export const CustomLineChart = ({ chartSeries, chartXAxis, width, height }: Props) => (
  <LineChart
    xAxis={[
      {
        id: 'barCategories',
        data: chartXAxis,
        scaleType: 'band',
      },
    ]}
    series={chartSeries}
    width={width}
    height={height}
  />
);
