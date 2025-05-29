type ButtonConfig = {
  condition: boolean;
  disabled?: boolean;
  handleCLick?: () => void;
  checked?: string;
  label?: string;
};
type LabelConfig = {
  condition: boolean;
  gutterBottom?: boolean;
};

type ToggleButtonConfig = {
  condition: boolean;
  checked: string;
  label: string;
  handleCLick: () => void;
};
type LoadButtonConfig = {
  condition: boolean;
  handleCLick: () => void;
};
export interface DashboardToolBarProps {
  children?: React.ReactNode;
  title?: string;
  top?: string;
  noWrap?: boolean;
  Filter?: { condition: boolean };
  primary?: ButtonConfig;
  secondory?: ButtonConfig;
  refresh?: { condition: boolean };
  CLose?: { condition: boolean }; // Consider renaming to `close`
  MoreOption?: { condition: boolean };
  loading?: boolean;
  label?: LabelConfig;
  link?: { condition: boolean };
  subheader?: { condition: boolean };
  ShowSearch?: { condition: boolean };
  FilterChips?: { condition: boolean };
  width?: string | number;
  settings?: ButtonConfig;
  toggleButton?: ToggleButtonConfig;
  customSearch?: React.ReactNode;
  zIndex?: string | number;
  toolbarWidth?: string;
  loadPrevious?: LoadButtonConfig;
  loadNext?: LoadButtonConfig;
  showPreviousNextBtn?: boolean;
  titleMinWidth?: string | number;
}