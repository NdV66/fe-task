import axios from 'axios';
import { TChartForm } from './ChartForm/ChartForm.types';

export interface IChartService {
  fetchData: (data: TChartForm) => Promise<any>;
  generateAllYearsWithQuarters: (data: TChartForm) => string[];
}

const MIN_QUARTER = 1;
const MAX_QUARTER = 4;
const HEADERS = { 'Content-Type': 'application/json' };

export class ChartService implements IChartService {
  constructor(private _url: string) {}

  public async fetchData(data: TChartForm) {
    const yearsWithQuarters = this.generateAllYearsWithQuarters(data);
    const body = this._buildBody(yearsWithQuarters, data.houseTypes);
    const res = await axios.post(this._url, body, { headers: HEADERS });
    return res.data;
  }

  public generateAllYearsWithQuarters(data: TChartForm) {
    const quarterFrom = Number.parseInt(data.quarterFrom);
    const quarterTo = Number.parseInt(data.quarterTo);
    const startYear = Number.parseInt(data.yearFrom);
    const stopYear = Number.parseInt(data.yearTo);
    const yearsInRange = this._generateYearRanges(startYear, stopYear);

    const values: string[] = [];
    for (let i = 0; i < yearsInRange.length; i++) {
      const year = yearsInRange[i];

      if (year === startYear && year === stopYear) {
        for (let j = quarterFrom; j <= quarterTo; j++) values.push(this._generateYearWithQuarter(year, j));
      } else if (year === startYear) {
        for (let j = quarterFrom; j <= MAX_QUARTER; j++) values.push(this._generateYearWithQuarter(year, j));
      } else if (year === stopYear) {
        for (let j = MIN_QUARTER; j <= quarterTo; j++) values.push(this._generateYearWithQuarter(year, j));
      } else {
        for (let j = MIN_QUARTER; j <= MAX_QUARTER; j++) values.push(this._generateYearWithQuarter(year, j));
      }
    }

    return values;
  }

  private _generateYearWithQuarter(year: number | string, quarter: number | string) {
    return `${year}K${quarter}`;
  }

  private _generateYearRanges(start: number, stop: number) {
    const yearsBetween = stop - start + 1;
    return Array.from({ length: yearsBetween }, (_, i) => i + start);
  }

  private _buildBody(yearsWithQuarters: string[], houseTypes: string[]) {
    return {
      query: [
        {
          code: 'Boligtype',
          selection: {
            filter: 'item',
            values: houseTypes,
          },
        },
        {
          code: 'ContentsCode',
          selection: {
            filter: 'item',
            values: ['KvPris'],
          },
        },
        {
          code: 'Tid',
          selection: {
            filter: 'item',
            values: yearsWithQuarters,
          },
        },
      ],
      response: {
        format: 'json-stat2',
      },
    };
  }
}
