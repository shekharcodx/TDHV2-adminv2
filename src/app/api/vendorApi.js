import { baseApi } from "./baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, value);
          }
        });

        return {
          url: `/vendors?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["vendors"],
    }),
    getVendor: builder.query({
      query: (param) => ({
        url: `/user/${param}`,
        method: "GET",
      }),
      providesTags: ["vendor"],
    }),
    editVendorProfile: builder.mutation({
      query: (data) => ({
        url: "editVendorProfile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["vendor"],
    }),
    updateActiveStatus: builder.mutation({
      query: (data) => ({
        url: "/profileActiveStatus",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["vendors"],
    }),
    updateVendorAccountStatus: builder.mutation({
      query: (data) => ({
        url: "/accountStatus",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["vendors"],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useLazyGetVendorQuery,
  useEditVendorProfileMutation,
  useUpdateActiveStatusMutation,
  useUpdateVendorAccountStatusMutation,
} = vendorApi;
