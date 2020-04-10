import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";

export function useDetailDate(results) {
  const [d, setDate] = useState({
    start: null,
    end: null,
  });

  useEffect(() => {
    if (!isEmpty(results)) {
      const startDate = new Date(results[0].date);
      const endDate = new Date(results[results.length - 1].date);

      setDate({
        start: startDate,
        end: endDate,
      });
    }
  }, [results]);

  return d;
}
