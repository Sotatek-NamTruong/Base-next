import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useMemo } from "react";

export function useConvertSearchParams(fieldName: string) {
  const searchParams = useSearchParams();

  const currentValuesSelected = useMemo(() => {
    const parseValues = queryString.parse(searchParams.toString())[fieldName];

    if (typeof parseValues === "string") {
      return [parseValues] as any[];
    }

    return (Array.isArray(parseValues) ? parseValues : []) as any[];
  }, [searchParams, fieldName]);

  return currentValuesSelected;
}
