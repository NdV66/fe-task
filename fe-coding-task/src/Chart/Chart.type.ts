export enum ECharTypes {
  LINE = 'line',
  BAR = 'bar',
}

export type TChartSeries = {
  label: string;
  data: number[];
};

export type TChartAxisSeries = string[];

export enum EFetchStatus {
  SUCCESS = 'fetchSuccess',
  LOADING = 'loading',
  FAILED = 'failed',
}
