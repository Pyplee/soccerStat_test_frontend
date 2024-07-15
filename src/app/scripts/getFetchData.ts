import { useState, useEffect } from "react";
import { api, routes } from "../scripts/apiRoutes";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: ErrorData | null;
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

export { useGetCompetitions, useGetCommands };
