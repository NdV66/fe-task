import { BarChart } from '@mui/x-charts';
import { TChartAxisSeries, TChartSeries } from '../Chart.type';

type Props = {
  chartSeries: TChartSeries[];
  chartXAxis: TChartAxisSeries;
  width: number;
  height: number;
};

export const CustomBarChart = ({ chartSeries, chartXAxis, width, height }: Props) => (
  <BarChart
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
    skipAnimation
  />
);
