import { Box, Button, TextField, Typography } from '@mui/material';
import { FormLineWrapper, FormTitle } from '../components';
import { IChartCommentService } from './ChartComment.types';
import { useChartComment } from './ChartComment.viewModel';

type Props = {
  service: IChartCommentService;
};

export const ChartComment = ({ service }: Props) => {
  const { translations, form, onSubmit, onRemove, commentValue } = useChartComment(service);

  return (
    <>
      <FormTitle>{translations.chartComment.title}</FormTitle>
      <Typography textAlign="center" variant="body2">
        {translations.chartComment.description}
      </Typography>
      <Box onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" component="form" noValidate textAlign="center">
        <FormLineWrapper>
          <TextField
            label={translations.chartComment.comment}
            type="text"
            rows={4}
            multiline
            fullWidth
            {...form.register('comment')}
            InputLabelProps={{ shrink: true }}
          />
        </FormLineWrapper>

        <Button onClick={onRemove} disabled={!commentValue}>
          {translations.chartComment.remove}
        </Button>
        <Button type="submit" disabled={!form.formState.isValid || !commentValue}>
          {translations.chartComment.save}
        </Button>
      </Box>
    </>
  );
};
