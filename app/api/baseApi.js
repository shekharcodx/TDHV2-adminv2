import { getToken } from "@/utils/localStorageMethods";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers) => {
      const userToken = getToken();
      if (userToken) {
        headers.set("Authorization", `Bearer ${userToken}`);

      } else {
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["User", "countries","states","cities"],
});
