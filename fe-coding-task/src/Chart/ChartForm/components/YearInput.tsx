import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { Control, useController } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  control: Control<any, any>;
};

export const YearInput = ({ label, name, control }: Props) => {
  const {
    field: { onChange, value },
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <StyledTextField
      label={label}
      type="text"
      InputLabelProps={{ shrink: true }}
      error={invalid}
      name={name}
      onChange={onChange}
      value={value}
      helperText={errors[name]?.message?.toString()}
    />
  );
};

const StyledTextField = styled(TextField)(() => ({
  width: '320px',
}));
