import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../appStore';
import { TChartForm } from './ChartForm.types';
import { chartFormSlice } from './ChatForm.slice';
import { getChartFormSchema } from './ChartForm.schema';

const DEFAULT_YEAR = (new Date().getFullYear() - 1).toString();
const DEFAULT_HOUSE_TYPES = ['00'];
const DEFAULT_FIELD_OPTIONS = {
  shouldTouch: false,
};

export const useChartFormViewModel = () => {
  const { translations } = useSelector((state: RootState) => state.languages);
  const dispatch = useDispatch();
  const form = useForm<TChartForm>({
    resolver: yupResolver<TChartForm>(getChartFormSchema(translations.chartForm.errors)),
    mode: 'all',
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit: SubmitHandler<TChartForm> = useCallback(
    (data) => {
      setSearchParams(data);
      dispatch(chartFormSlice.actions.saveForm(data));
    },
    [dispatch, setSearchParams],
  );

  const loadFormValuesOnEnter = useCallback(() => {
    form.setValue('quarterFrom', searchParams.get('quarterFrom') ?? '', DEFAULT_FIELD_OPTIONS);
    form.setValue('quarterTo', searchParams.get('quarterTo') ?? '', DEFAULT_FIELD_OPTIONS);
    form.setValue('yearFrom', searchParams.get('yearFrom') ?? '', DEFAULT_FIELD_OPTIONS);
    form.setValue('yearTo', searchParams.get('yearTo') ?? '', DEFAULT_FIELD_OPTIONS);
    form.setValue('houseTypes', [...searchParams.getAll('houseTypes')], DEFAULT_FIELD_OPTIONS);
  }, [form, searchParams]);

  const setDefaultFormValuesOnEnter = useCallback(() => {
    form.setValue('quarterFrom', translations.chartForm.quarters[0].value, DEFAULT_FIELD_OPTIONS);
    form.setValue('quarterTo', translations.chartForm.quarters[3].value, DEFAULT_FIELD_OPTIONS);
    form.setValue('yearFrom', DEFAULT_YEAR, DEFAULT_FIELD_OPTIONS);
    form.setValue('yearTo', DEFAULT_YEAR, DEFAULT_FIELD_OPTIONS);
    form.setValue('houseTypes', DEFAULT_HOUSE_TYPES, DEFAULT_FIELD_OPTIONS);
  }, [form, translations]);

  useEffect(() => {
    if (searchParams.size) loadFormValuesOnEnter();
    else setDefaultFormValuesOnEnter();

    const data = form.getValues();
    onSubmit(data);
  }, [dispatch, form, searchParams, setDefaultFormValuesOnEnter, loadFormValuesOnEnter, onSubmit]);

  return {
    translations,
    onSubmit,
    form,
  };
};
