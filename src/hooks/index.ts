import { routes } from '../api/apiRoutes';
import { ICompetition } from '../interfaces/ICompetition';
import { ICommand } from '../interfaces/ICommand';
import { IMatch } from '../interfaces/IMatch';
import { IFetchState } from '../interfaces/IFetchState';
import { IFetchStateStats } from '../interfaces/IFetchStateStats';
import { useFetchDataCards } from './useFetchDataCards';
import { useFetchDataStats } from './useFetchDataStats';

const validateDateIsCorrect = (
  dateStartCheck: string,
  dateEndCheck: string,
) => {
  if (dateStartCheck === null || dateStartCheck === null) {
    return false;
  }
  if (dateStartCheck === '' || dateStartCheck === '') {
    return false;
  }
  const a = dateStartCheck === '';
  const b = dateEndCheck === '';
  if (a === b) {
    const date1Parts = dateStartCheck.split('-').map((item) => Number(item));
    const date2Parts = dateEndCheck.split('-').map((item) => Number(item));
    const date1 = new Date(date1Parts[0], date1Parts[2] - 1, date1Parts[1]);
    const date2 = new Date(date2Parts[0], date2Parts[2] - 1, date2Parts[1]);
    if (date1 > date2) {
      return false;
    }
    return true;
  }
  if (a && !b) {
    return false;
  }
  if (!a && b) {
    return false;
  }
};

const useGetCompetitions = (): IFetchState<ICompetition[]> => {
  return useFetchDataCards<ICompetition[]>(
    routes.competitions(),
    'competitions',
  );
};

const useGetCommands = (): IFetchState<ICommand[]> => {
  return useFetchDataCards<ICommand[]>(routes.commands(), 'teams');
};

const useGetMatchesCompetitionWithDate = (
  id: string | null,
  dateStart: string | null = null,
  dateEnd: string | null = null,
): IFetchStateStats<IMatch[]> => {
  let urlWithDate = null;
  if (dateStart !== null && dateEnd !== null) {
    if (validateDateIsCorrect(dateStart, dateEnd)) {
      urlWithDate = routes.competitionIdDate(id!, dateStart, dateEnd);
    } else {
      urlWithDate = null;
    }
  }
  const url = routes.competitionIdMatches(id!);
  const urlForGetName = routes.competitionId(id!);
  return useFetchDataStats<IMatch[]>(url, urlWithDate, urlForGetName);
};

const useGetMatchesCommandWithDate = (
  id: string | null,
  dateStart: string | null = null,
  dateEnd: string | null = null,
): IFetchStateStats<IMatch[]> => {
  let urlWithDate = null;
  if (dateStart !== null && dateEnd !== null) {
    if (validateDateIsCorrect(dateStart, dateEnd)) {
      urlWithDate = routes.commandIdDate(id!, dateStart, dateEnd);
    } else {
      urlWithDate = null;
    }
  }
  const url = routes.commandIdMatches(id!);
  const urlForGetName = routes.commandId(id!);
  return useFetchDataStats<IMatch[]>(url, urlWithDate, urlForGetName);
};

export {
  useGetCompetitions,
  useGetCommands,
  useGetMatchesCompetitionWithDate,
  useGetMatchesCommandWithDate,
};
