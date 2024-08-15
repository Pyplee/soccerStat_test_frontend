import { IMatch } from '../interfaces/IMatch';
import { ICommand } from '../interfaces/ICommand';
import { ICompetition } from '../interfaces/ICompetition';

const itemsPerPage = 10;

const getTotalPages = (
  filteredArr: IMatch[] | ICommand[] | ICompetition[],
): number => {
  return Math.ceil(filteredArr.length / itemsPerPage);
};

const paginate = <T>(array: T[], pageNumber: number): T[] => {
  const start = (pageNumber - 1) * itemsPerPage;
  return array.slice(start, start + itemsPerPage);
};

export { getTotalPages, paginate };
