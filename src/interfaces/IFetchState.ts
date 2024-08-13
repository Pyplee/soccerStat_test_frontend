import { IErrorData } from './IErrorData';

export interface IFetchState<T> {
  data: T | null;
  loading: boolean;
  error: IErrorData | null;
}
