import * as yup from 'yup';

export type TIdBuilderElements = {
  yearFrom: string;
  yearTo: string;
  quarterFrom: string;
  quarterTo: string;
  houseTypes: string[];
};

export interface IChartCommentService {
  save: (comment: TChartCommentForm, idElements: TIdBuilderElements) => void;
  read: (idElements: TIdBuilderElements) => string | null;
  remove: (idElements: TIdBuilderElements) => void;
}

export type TChartCommentForm = {
  comment?: string;
};

export const getChartCommentFormSchema = () =>
  yup.object().shape({
    comment: yup.string().optional(),
  });
