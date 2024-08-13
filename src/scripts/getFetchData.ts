import { useState, useEffect, useRef } from 'react';
import { api, routes } from '../scripts/apiRoutes';

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

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: ErrorData | null;
}

interface FetchStateStats<T> {
  data: T | null;
  loading: boolean;
  error: ErrorData | null;
  name: string | null;
}

interface ErrorData {
  code: string | null;
  message: string | null;
}

interface Competition {
  id: number;
  name: string;
  emblem: string | null;
  area: {
    id: number;
    name: string;
  };
}

interface Team {
  id: number;
  name: string;
  crest: string | null;
}

interface Match {
  id: number;
  name: string;
  emblem: string | null;
  utcDate: string;
  status: string | null;
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  score: {
    winner: string | null;
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
}

const useFetchDataCards = <T>(
  url: string,
  keyForData: string,
  initialData: T | null = null,
): FetchState<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorData | null>(null);
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
            const errorData: ErrorData = {
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

const useGetCompetitions = (): FetchState<Competition[]> => {
  return useFetchDataCards<Competition[]>(
    routes.competitions(),
    'competitions',
  );
};

const useGetCommands = (): FetchState<Team[]> => {
  return useFetchDataCards<Team[]>(routes.commands(), 'teams');
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
  const [error, setError] = useState<ErrorData | null>(null);
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

            const errorData: ErrorData = {
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
): FetchStateStats<Match[]> => {
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
  return useFetchDataStats<Match[]>(url, urlWithDate, urlForGetName);
};

const useGetMatchesCommandWithDate = (
  id: string | null,
  dateStart: string | null = null,
  dateEnd: string | null = null,
): FetchStateStats<Match[]> => {
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
  return useFetchDataStats<Match[]>(url, urlWithDate, urlForGetName);
};

export {
  useGetCompetitions,
  useGetCommands,
  useGetMatchesCompetitionWithDate,
  useGetMatchesCommandWithDate,
};
