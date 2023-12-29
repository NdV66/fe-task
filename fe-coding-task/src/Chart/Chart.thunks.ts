import { createAsyncThunk } from '@reduxjs/toolkit';
import { chartService } from './Chart.builder';
import { TChartForm } from './ChartForm';

export const fetchContent = createAsyncThunk('chart/fetchContent', (data: TChartForm) => chartService.fetchData(data));
