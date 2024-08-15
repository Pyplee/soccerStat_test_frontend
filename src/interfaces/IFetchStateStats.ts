import { IErrorData } from './IErrorData';

export interface IFetchStateStats<T> {
  data: T | null;
  loading: boolean;
  error: IErrorData | null;
  name: string | null;
}
