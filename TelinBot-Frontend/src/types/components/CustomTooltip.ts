import { TooltipProps } from 'recharts';

export interface CustomTooltipProps extends TooltipProps<any, any> {
  label?: string;
}
