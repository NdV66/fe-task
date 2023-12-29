import { IChartCommentService, TChartCommentForm, TIdBuilderElements } from './ChartComment.types';

export class ChartCommentService implements IChartCommentService {
  public save(data: TChartCommentForm, idElements: TIdBuilderElements) {
    const key = this._buildKey(idElements);
    data.comment && localStorage.setItem(key, data.comment);
  }

  public read(idElements: TIdBuilderElements) {
    const key = this._buildKey(idElements);
    return localStorage.getItem(key);
  }

  public remove(idElements: TIdBuilderElements) {
    const key = this._buildKey(idElements);
    localStorage.removeItem(key);
  }

  private _buildKey(idElements: TIdBuilderElements) {
    const houseTypes = idElements.houseTypes.map((el) => Number.parseInt(el)).sort();
    return `CHART_COMMENT_from_${idElements.yearFrom}K${idElements.quarterFrom}_to_${idElements.yearTo}K${idElements.quarterTo}_houses_${houseTypes}`;
  }
}
