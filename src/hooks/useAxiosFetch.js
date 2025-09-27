import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

export default function useAxiosFetch(url, options = {}, immediate = true) {
  const stableOptions = useMemo(() => JSON.stringify(options), [options]);

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(immediate);
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (overrideOptions = {}, signal) => {
      setLoading(true);
      setError("");
      try {
        const parsedOptions = JSON.parse(stableOptions);
        const response = await axiosInstance({
          url,
          method: parsedOptions.method || "GET",
          ...parsedOptions,
          ...overrideOptions,
          signal,
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        if (err.name === "CanceledError") {
          return null;
        }
        if (err.response?.status === 401) {
          navigate("/login");
        }
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unknown error occurred"
        );
        return null;
      } finally {
        if (signal?.aborted !== true) {
          setLoading(false);
        }
      }
    },
    [url, stableOptions, navigate]
  );

  useEffect(() => {
    const controller = new AbortController();

    if (immediate) {
      fetchData({}, controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [fetchData, immediate]);

  return { data, error, loading, refetch: fetchData };
}
