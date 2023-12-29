import { Select, MenuItem, styled } from '@mui/material';
import { TSelect } from '../ChartForm.types';
import { Control, useController } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  quarters: TSelect[];
  control: Control<any, any>;
};

export const QuarterSelect = ({ name, quarters, control }: Props) => {
  const {
    field: { onChange, value },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return value ? (
    <StyledSelect name={name} id={name} defaultValue={value ?? ''} onChange={onChange} error={invalid}>
      {quarters.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledSelect>
  ) : null;
};

const StyledSelect = styled(Select)(() => ({
  height: '100%',
}));
