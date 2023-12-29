import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ECharTypes } from './Chart.type';
import { fetchContent } from './Chart.thunks';

export type TChartState = {
  chartType: ECharTypes;
  chartSeriesRaw?: number[];
  isLoading?: boolean;
  error: boolean;
};

const initialState: TChartState = {
  chartType: ECharTypes.BAR,
  chartSeriesRaw: undefined,
  isLoading: false,
  error: false,
};

export const chartSlice = createSlice({
  name: 'chartSlice',
  initialState,
  reducers: {
    changeChartType: (state, action: PayloadAction<ECharTypes>) => {
      return {
        ...state,
        chartType: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chartSeriesRaw = action.payload.value;
    });
    builder.addCase(fetchContent.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});
