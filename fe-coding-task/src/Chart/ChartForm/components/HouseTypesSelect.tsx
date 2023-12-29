import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TSelect } from '../ChartForm.types';
import { Control, useController } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  houses: TSelect[];
  control: Control<any, any>;
};

export const HouseTypesSelect = ({ name, label, houses, control }: Props) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  const handleOnChange = (event: SelectChangeEvent<string[]>) => {
    const { length } = event.target.value;
    length && onChange(event);
  };

  return value ? (
    <Select
      name={name}
      id={name}
      defaultValue={value ?? []}
      onChange={handleOnChange}
      multiple
      label={label}
      value={value}
    >
      {houses.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  ) : null;
};
