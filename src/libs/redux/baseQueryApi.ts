import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT + "/api/v1/",
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set("x-IP", Cookies.get("ip") || "");
    headers.set("timezone", (dayjs().utcOffset() / 60).toString());
    headers.set("region", encodeURI(Cookies.get("region")!));
    headers.set("country", encodeURI(Cookies.get("country")!));
    headers.set("city", encodeURI(Cookies.get("city")!));
    headers.set("cache-control", "no-cache");
    headers.set("time", new Date().getTime().toString());
    const token = "";
    if (!!token && endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  // const { getState, dispatch } = api;

  let result = await baseQuery(args, api, extraOptions);

  const isAuthorizeError = result.error && result.error.status === 401;

  // const isUserBanned =
  //   result.error &&
  //   ((result.error.data as APIResponse<any>)?.code as any) === USER_00004;

  // if (isAuthorizeError || isUserBanned) {
  //   // checking whether the mutex is locked
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire();
  //     try {
  //       api.dispatch(
  //         setLockedCode(
  //           isUserBanned ? HttpErrorCode.USER_00004 : HttpErrorCode.CLIENT_6
  //         )
  //       );
  //     } finally {
  //       // release must be called once the mutex should be released again.
  //       release();
  //     }
  //   } else {
  //     // wait until the mutex is available without locking it
  //     await mutex.waitForUnlock();
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }

  return result;
};

export const baseQueryApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
