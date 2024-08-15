import { useState, useEffect, useRef } from 'react';
import { api } from '../api/apiRoutes';
import { IErrorData } from '../interfaces/IErrorData';

interface FetchStateStats<T> {
  data: T | null;
  loading: boolean;
  error: IErrorData | null;
  name: string | null;
}

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
  }, [url, urlWithDate, urlForGetName]);

  return { data, name, loading, error };
};

export { useFetchDataStats };
