import { IChartService } from './Chart.service';
import { ECharTypes } from './Chart.type';
import { useChartViewModel } from './Chart.viewModel';
import { ChartComment } from './ChartComment';
import { IChartCommentService } from './ChartComment/ChartComment.types';
import { ChartForm } from './ChartForm';
import { CustomBarChart, NoData } from './components';
import { ChartTypeSwitcher } from './components/ChartTypeSwitcher';
import { CustomLineChart } from './components/CustomLineChart';

type Props = {
  service: IChartService;
  chartCommentService: IChartCommentService;
};

export const Chart = ({ service, chartCommentService }: Props) => {
  const { chartSeries, chartXAxis, chartType, onClickChartTypeSwitcher } = useChartViewModel(service);
  const areData = chartSeries && chartXAxis;

  const getContent = () => {
    if (areData) {
      const chartProps = {
        chartSeries,
        chartXAxis,
        width: 900,
        height: 400,
      };

      return chartType === ECharTypes.BAR ? <CustomBarChart {...chartProps} /> : <CustomLineChart {...chartProps} />;
    }
    return <NoData />;
  };

  return (
    <>
      <ChartTypeSwitcher value={chartType} onClick={onClickChartTypeSwitcher} />
      {getContent()}
      <ChartForm />
      <ChartComment service={chartCommentService} />
    </>
  );
};
