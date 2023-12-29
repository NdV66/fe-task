import * as yup from 'yup';
import { TTranslate } from '../../languages';

const MIN_YEAR = 2009;
const MAX_YEAR = new Date().getFullYear();

export const getChartFormSchema: any = (errors: TTranslate['chartForm']['errors']) =>
  yup.object().shape({
    yearFrom: yup
      .number()
      .typeError(errors.numberOnly)
      .required(errors.required)
      .min(MIN_YEAR, errors.yearMustBeGreater)
      .max(MAX_YEAR, errors.yearMustBeBefore),
    yearTo: yup
      .number()
      .typeError(errors.numberOnly)
      .required(errors.required)
      .min(MIN_YEAR, errors.yearMustBeGreater)
      .max(MAX_YEAR, errors.yearMustBeBefore)
      .when('yearFrom', (yearFrom, schema) => yearFrom && schema.min(yearFrom as any, errors.yearToOlderThanYearFrom)),

    quarterFrom: yup
      .number()
      .required(errors.required)
      .when('yearFrom', ([yearFrom], schema) => testIfQuarterIsPassedInCurrentYear(yearFrom, schema)),
    quarterTo: yup
      .number()
      .required(errors.required)
      .when('yearTo', ([yearTo], schema) => testIfQuarterIsPassedInCurrentYear(yearTo, schema)),
  });

const testIfQuarterIsPassedInCurrentYear = (year: number, schema: any) => {
  if (year === MAX_YEAR) {
    const currentMonth = new Date().getMonth();
    const currentQuarter = Math.floor(currentMonth / 3 + 1);
    return schema.lessThan(currentQuarter);
  }
  return schema;
};
