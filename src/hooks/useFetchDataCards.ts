import { useState, useEffect, useRef } from 'react';
import { api } from '../api/apiRoutes';
import { IErrorData } from '../interfaces/IErrorData';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: IErrorData | null;
}

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
  }, [url, keyForData]);

  return { data, loading, error };
};

export { useFetchDataCards };
