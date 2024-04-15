import { IFutbolista } from "./futbolista.model";

// solo agarro los datos que me importan
export interface IFutbolistaRespond {
  content: IFutbolista[];
  pageable: IPageable;
  totalPages: number;
  totalElements: number
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
}