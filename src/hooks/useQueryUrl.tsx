import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";

export const useQueryUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (obj: { [index: string]: any }) => {
      const parseSearchParams = queryString.parse(searchParams.toString());

      const params = queryString.stringify(
        { ...parseSearchParams, ...obj },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      );

      return router.push(pathname + "?" + params, { scroll: false });
    },
    // eslint-disable-next-line
    [searchParams]
  );

  return { createQueryString };
};
