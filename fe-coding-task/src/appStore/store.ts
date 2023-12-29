import { configureStore } from '@reduxjs/toolkit';
import { languagesSlice } from '../languages';
import { chartSlice } from '../Chart/Chart.slice';
import { chartFormSlice } from '../Chart/ChartForm/ChatForm.slice';

export const store = configureStore({
  reducer: {
    languages: languagesSlice.reducer,
    chart: chartSlice.reducer,
    chartForm: chartFormSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
