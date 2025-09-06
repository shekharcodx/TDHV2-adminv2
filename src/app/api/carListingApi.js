import { baseApi } from "./baseApi";

const carApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getListings: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([Key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            searchParams.append(Key, value);
          }
        });

        return {
          url: `/allListings?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["listings"],
    }),
    getListing: builder.query({
      query: (listingId) => ({
        url: `/listing/${listingId}`,
        method: "GET",
      }),
      providesTags: ["listing"],
    }),
    updateListing: builder.mutation({
      query: ({ listingId, values }) => ({
        url: `/vendorListing/${listingId}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["listings", "listing"],
    }),
    updateStatus: builder.mutation({
      query: ({ listingId, status }) => ({
        url: `/listingStatus/${listingId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["listings"],
    }),
    updateIsActive: builder.mutation({
      query: ({ listingId, active }) => ({
        url: `/listing/${listingId}`,
        method: "PATCH",
        body: { isActive: active },
      }),
      invalidatesTags: ["listings"],
    }),
    updateCategory: builder.mutation({
      query: ({ listingId, data }) => ({
        url: `/listing/category/${listingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["listings"],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useLazyGetListingQuery,
  useUpdateListingMutation,
  useUpdateStatusMutation,
  useUpdateIsActiveMutation,
  useUpdateCategoryMutation,
} = carApi;
