import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/getCurrentUser",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getDocument: builder.query({
      query: (query) => ({
        url: `/document?documentKey=${query}`,
        method: "GET",
        responseHandler: async (response) => {
          return await response.blob();
        },
        extraOptions: { maxRetries: 0, skipCache: true },
        serializeQueryArgs: () => ({}),
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetDocumentQuery } = profileApi;
