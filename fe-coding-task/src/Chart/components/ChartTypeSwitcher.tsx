import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ECharTypes } from '../Chart.type';

type Props = {
  onClick: () => void;
  value: ECharTypes;
};

export const ChartTypeSwitcher = ({ onClick, value }: Props) => (
  <ToggleButtonGroup value={value} exclusive onChange={onClick} aria-label="Chart type">
    <ToggleButton value={ECharTypes.BAR}>BAR</ToggleButton>
    <ToggleButton value={ECharTypes.LINE}>LINE</ToggleButton>
  </ToggleButtonGroup>
);
