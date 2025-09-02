import { baseApi } from "./baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value) searchParams.append(key, value);
        });

        return {
          url: `vendors?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllVendorsQuery } = vendorApi;
