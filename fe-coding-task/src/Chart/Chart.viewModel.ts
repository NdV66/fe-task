import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../appStore';
import { chartSlice } from './Chart.slice';
import { useEffect } from 'react';
import { fetchContent } from './Chart.thunks';
import { ECharTypes, TChartSeries } from './Chart.type';
import { IChartService } from './Chart.service';

export const useChartViewModel = (service: IChartService) => {
  const { chartSeriesRaw, chartType } = useSelector((state: RootState) => state.chart);
  const { translations } = useSelector((state: RootState) => state.languages);
  const formData = useSelector((state: RootState) => state.chartForm.formData);
  const dispatch = useDispatch<AppDispatch>();
  const chartXAxis = formData && service.generateAllYearsWithQuarters(formData);

  const onClickChartTypeSwitcher = () => {
    const nextType = chartType === ECharTypes.BAR ? ECharTypes.LINE : ECharTypes.BAR;
    dispatch(chartSlice.actions.changeChartType(nextType));
  };

  const getLabel = (houseType: string) =>
    translations.chartForm.houseTypes.find((el) => el.value === houseType)?.label ?? '';

  const cutValuesIntoParts = (rawValues: number[], houseTypes: string[]) => {
    const values: TChartSeries[] = [];
    const howManyPerPart = rawValues.length / houseTypes.length;
    let startIndex = 0;

    for (let i = 1; i <= houseTypes.length; i++) {
      const endIndex = i * howManyPerPart;
      values.push({
        data: rawValues.slice(startIndex, i * howManyPerPart),
        label: getLabel(houseTypes[i - 1]),
      });
      startIndex = endIndex;
    }
    return values;
  };

  useEffect(() => {
    formData && dispatch(fetchContent(formData));
  }, [formData, dispatch]);

  return {
    chartSeries: chartSeriesRaw && formData ? cutValuesIntoParts(chartSeriesRaw, formData.houseTypes) : undefined,
    translations,
    chartXAxis,
    chartType,
    onClickChartTypeSwitcher,
  };
};
