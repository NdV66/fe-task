import axios from 'axios';

import { ChartService, IChartService } from '../Chart.service';
import { TChartForm } from '../ChartForm';

jest.mock('axios');

const URL = 'https://mock-data.aman.com';
const HEADERS = { 'Content-Type': 'application/json' };

describe('ChartService', () => {
  let service: IChartService;

  beforeEach(() => {
    service = new ChartService(URL);
  });

  describe('Should fetch data', () => {
    it('Should be ok', async () => {
      //given
      const dataMock = { data: 'Mock value' };
      (axios.post as any).mockResolvedValueOnce(dataMock);
      const data: TChartForm = {
        houseTypes: ['00'],
        quarterFrom: '1',
        quarterTo: '3',
        yearFrom: '2021',
        yearTo: '2022',
      };
      const yearsWithQuarters = ['2021K1', '2021K2', '2021K3', '2021K4', '2022K1', '2022K2', '2022K3'];
      const expectedBody = {
        query: [
          {
            code: 'Boligtype',
            selection: {
              filter: 'item',
              values: data.houseTypes,
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
      //when
      const result = await service.fetchData(data);
      //then
      expect(result).toEqual(dataMock.data);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(URL, expectedBody, { headers: HEADERS });
    });
  });

  describe('Should generate all years with quartes between start and stop data', () => {
    it('when start and stop are NOT the same year', () => {
      //given
      const data: TChartForm = {
        houseTypes: ['00'],
        quarterFrom: '1',
        quarterTo: '3',
        yearFrom: '2021',
        yearTo: '2022',
      };
      const expectedResult = ['2021K1', '2021K2', '2021K3', '2021K4', '2022K1', '2022K2', '2022K3'];
      //when
      const result = service.generateAllYearsWithQuarters(data);
      //then
      expect(result).toEqual(expectedResult);
    });

    it('when start and stop ARE the same year', () => {
      //given
      const data: TChartForm = {
        houseTypes: ['00'],
        quarterFrom: '1',
        quarterTo: '3',
        yearFrom: '2022',
        yearTo: '2022',
      };
      const expectedResult = ['2022K1', '2022K2', '2022K3'];
      //when
      const result = service.generateAllYearsWithQuarters(data);
      //then
      expect(result).toEqual(expectedResult);
    });

    it('when start and stop have 1 year gap between', () => {
      //given
      const data: TChartForm = {
        houseTypes: ['00'],
        quarterFrom: '3',
        quarterTo: '3',
        yearFrom: '2020',
        yearTo: '2022',
      };
      const expectedResult = ['2020K3', '2020K4', '2021K1', '2021K2', '2021K3', '2021K4', '2022K1', '2022K2', '2022K3'];
      //when
      const result = service.generateAllYearsWithQuarters(data);
      //then
      expect(result).toEqual(expectedResult);
    });
  });
});
