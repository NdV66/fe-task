import { Box, Button } from '@mui/material';
import { useChartFormViewModel } from './ChartForm.viewModel';
import { QuarterSelect } from './components';
import { HouseTypesSelect } from './components/HouseTypesSelect';
import { FormTitle, FormLineWrapper } from '../components';
import { YearInput } from './components/YearInput';

export const ChartForm = () => {
  const { translations, onSubmit, form } = useChartFormViewModel();

  return (
    <>
      <FormTitle>{translations.chartForm.title}</FormTitle>

      <Box onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" component="form" noValidate textAlign="center">
        <FormLineWrapper>
          <YearInput name="yearFrom" control={form.control} label={translations.chartForm.quartersRangeFrom} />
          <QuarterSelect
            name="quarterFrom"
            label={translations.chartForm.selectQuarter}
            quarters={translations.chartForm.quarters}
            control={form.control}
          />
        </FormLineWrapper>

        <FormLineWrapper>
          <YearInput name="yearTo" control={form.control} label={translations.chartForm.quartersRangeTo} />
          <QuarterSelect
            name="quarterTo"
            label={translations.chartForm.selectQuarter}
            quarters={translations.chartForm.quarters}
            control={form.control}
          />
        </FormLineWrapper>

        <FormLineWrapper>
          <HouseTypesSelect
            name="houseTypes"
            label={translations.chartForm.selectQuarter}
            houses={translations.chartForm.houseTypes}
            control={form.control}
          />
        </FormLineWrapper>

        <Button type="submit" disabled={!form.formState.isValid}>
          {translations.chartForm.submit}
        </Button>
      </Box>
    </>
  );
};
