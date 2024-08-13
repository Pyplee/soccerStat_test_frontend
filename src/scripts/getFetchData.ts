import { useState, useEffect, useRef } from 'react';
import { api, routes } from '../scripts/apiRoutes';
import { ICompetition } from '../interfaces/ICompetition';
import { ICommand } from '../interfaces/ICommand';
import { IMatch } from '../interfaces/IMatch';
import { IErrorData } from '../interfaces/IErrorData';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: IErrorData | null;
}

interface FetchStateStats<T> {
  data: T | null;
  loading: boolean;
  error: IErrorData | null;
  name: string | null;
}

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

const useFetchDataCards = <T>(
  url: string,
  keyForData: string,
  initialData: T | null = null,
): FetchState<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IErrorData | null>(null);
  const cache = useRef<Record<string, T>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
      } else {
        api
          .get(url)
          .then((response) => {
            const data = response.data[keyForData];
            setData(data);
          })
          .catch((err) => {
            const errorData: IErrorData = {
              code: err.response.status.toString() || 'UNKNOWN_ERROR',
              message: err.message || 'An unknown error occurred',
            };
            setError(errorData);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const useGetCompetitions = (): FetchState<ICompetition[]> => {
  return useFetchDataCards<ICompetition[]>(
    routes.competitions(),
    'competitions',
  );
};

const useGetCommands = (): FetchState<ICommand[]> => {
  return useFetchDataCards<ICommand[]>(routes.commands(), 'teams');
};

const useFetchDataStats = <T>(
  url: string,
  urlWithDate: string | null,
  urlForGetName: string,
  initialData: T | null = null,
): FetchStateStats<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<IErrorData | null>(null);
  const cache = useRef<Record<string, T>>({});

  useEffect(() => {
    let mainUrl = '';
    if (urlWithDate !== null) {
      mainUrl = urlWithDate;
    } else {
      mainUrl = url;
    }

    const fetchData = async () => {
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
      } else {
        api
          .get(mainUrl)
          .then((response) => {
            const data = response.data.matches;
            setData(data);
          })
          .catch((err) => {
            console.log(err);

            const errorData: IErrorData = {
              code: err.response.status.toString() || 'UNKNOWN_ERROR',
              message: err.message || 'An unknown error occurred',
            };
            setError(errorData);
          })
          .finally(() => {
            setLoading(false);
          });
        api.get(urlForGetName).then((response) => {
          const nameResponse = response.data.name;
          setName(nameResponse);
        });
      }
    };

    fetchData();
  }, [url, urlWithDate]);

  return { data, name, loading, error };
};

const useGetMatchesCompetitionWithDate = (
  id: string | null,
  dateStart: string | null = null,
  dateEnd: string | null = null,
): FetchStateStats<IMatch[]> => {
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
): FetchStateStats<IMatch[]> => {
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
