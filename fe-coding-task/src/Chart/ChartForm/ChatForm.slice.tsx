import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TChartForm } from './ChartForm.types';

export type TChartFormState = {
  formData?: TChartForm;
};

const initialState: TChartFormState = {
  formData: undefined,
};

export const chartFormSlice = createSlice({
  name: 'chartSlice',
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<TChartForm>) => {
      return {
        ...state,
        formData: action.payload,
      };
    },
  },
});
