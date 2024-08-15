import { IMatch } from '../interfaces/IMatch';

const itemsPerPage = 10;

const getTotalPages = (filteredArr: IMatch[]) => {
  return Math.ceil(filteredArr.length / itemsPerPage);
};

const paginate = (array: IMatch[], pageNumber: number) => {
  const start = (pageNumber - 1) * itemsPerPage;
  return array.slice(start, start + itemsPerPage);
};

export { getTotalPages, paginate };
