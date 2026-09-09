import { useEffect, useState } from 'react';
import { customAxios } from 'utils/customAxios';

export const useR2ObjectUrl = (key) => {
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(key));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!key) {
      setUrl(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    const fetchUrl = async () => {
      try {
        const { data } = await customAxios.get('/api/r2/presign-download', {
          params: { key },
        });
        if (!cancelled) {
          setUrl(data.url);
        }
      } catch (err) {
        console.log(err);
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchUrl();

    return () => {
      cancelled = true;
    };
  }, [key]);

  return { url, isLoading, error };
};
