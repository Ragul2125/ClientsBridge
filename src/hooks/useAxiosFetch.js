import { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "../config/axiosConfig";

export default function useAxiosFetch(url, options = {}, immediate = true) {
  const stableOptions = useMemo(() => options, []); // memoize once

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(url);
  
  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance({
          url,
          method: stableOptions.method || "GET",
          ...stableOptions,
          ...overrideOptions,
        });
        if (response.status == 401) {
          window.location.href = "/login";
        }
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unknown error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, stableOptions]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { data, error, loading, refetch: fetchData };
}
