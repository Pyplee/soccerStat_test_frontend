import { useState, useEffect } from "react";
import { api, routes } from "../scripts/apiRoutes";
import validateDate from "@/app/scripts/validateDate";

const validateDateIsError = (dateStartCheck: string, dateEndCheck: string) => {
  const a = dateStartCheck === "";
  const b = dateEndCheck === "";
  if (a === b) {
    const date1Parts = dateStartCheck.split("-").map((item) => Number(item));
    const date2Parts = dateEndCheck.split("-").map((item) => Number(item));
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

interface FetchStateWithName<T> {
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

// const useFetch = <T,>(url: string): FetchState<T> => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result: T = await response.json();
//         setData(result);
//       } catch (error) {
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { data, loading, error };
// };

const useGetCompetitions = (): FetchState<Competition[]> => {
  const [data, setData] = useState<Competition[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      api
        .get(routes.competitions())
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.data.code, response.data.message);
          }
          const data = response.data.competitions;
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          const errorData: ErrorData = {
            code: err.code || "UNKNOWN_ERROR",
            message: err.message || "An unknown error occurred",
          };
          setError(errorData);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const useGetCommands = (): FetchState<Team[]> => {
  const [data, setData] = useState<Team[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      api
        .get(routes.commands())
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.data.code, response.data.message);
          }
          const data = response.data.teams;
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          const errorData: ErrorData = {
            code: err.code || "UNKNOWN_ERROR",
            message: err.message || "An unknown error occurred",
          };
          setError(errorData);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const useGetCompetitionMatches = (
  id: number | string,
  dateStart: string,
  dateEnd: string,
): FetchStateWithName<Match[]> => {
  const [data, setData] = useState<Match[] | null>(null);
  const [name, setName] = useState<"string" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorData | null>(null);
  // const [responseOnDate, setResponseOnDate] = useState<boolean>(false);
  // const result = validateDateIsError(dateStart, dateEnd)
  // setResponseOnDate(result);

  useEffect(() => {
    // let pathToResponse;
    // if (responseOnDate) {
    //   pathToResponse = routes.competitionIdDate(id, dateStart, dateEnd);
    // } else {
    //   pathToResponse = routes.competitionIdMatches(id);
    // }
    const fetchData = async () => {
      api
        .get(routes.competitionIdMatches(id))
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.data.code, response.data.message);
          }
          const data = response.data.matches;
          const name = response.data.competition.name;
          setName(name);
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          const errorData: ErrorData = {
            code: err.code || "UNKNOWN_ERROR",
            message: err.message || "An unknown error occurred",
          };
          setError(errorData);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return { data, loading, error, name };
};

const getCompetitionMatchesToDate = async (
  id: number | string,
  dateStart: string,
  dateEnd: string,
) => {
  let data;
  let name;
  let errorData: ErrorData | null;
  await api
    .get(routes.competitionIdDate(id, dateStart, dateEnd))
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.data.code, response.data.message);
      }
      data = response.data.matches;
      name = response.data.competition.name;
    })
    .catch((err) => {
      errorData.code = err.code;
      errorData.message = err.message;
    });

  if (errorData === null) {
    return { dataFunc: null, nameFunc: null, errorFunc: errorData };
  } else {
    return { dataFunc: data, nameFunc: name, errorFunc: null };
  }
};

export {
  useGetCompetitions,
  useGetCommands,
  useGetCompetitionMatches,
  getCompetitionMatchesToDate,
};
