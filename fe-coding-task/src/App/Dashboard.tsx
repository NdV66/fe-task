import { Chart } from '../Chart';
import { chartService } from '../Chart/Chart.builder';
import { chartCommentService } from '../Chart/ChartComment';

export const Dashboard = () => <Chart service={chartService} chartCommentService={chartCommentService} />;
