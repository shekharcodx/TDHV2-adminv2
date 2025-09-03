import { baseApi } from "./baseApi";

const carApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // 🔄 Brand → Model → Trim → Year Chain
    getCarBrands: builder.query({
      query: () => ({ url: "/carBrands", method: "GET" }),
      providesTags: ["CarBrands"],
    }),
    getModels: builder.query({
      query: (brandId) => ({ url: `/carModels/${brandId}`, method: "GET" }),
      providesTags: (result, error, brandId) => [{ type: "CarModels", id: brandId }],
    }),
    getCarTrims: builder.query({
      query: (modelId) => ({ url: `/carTrims/${modelId}`, method: "GET" }),
      providesTags: (result, error, modelId) => [{ type: "CarTrims", id: modelId }],
    }),
    getYears: builder.query({
      query: () => ({ url: "/years", method: "GET" }),
      providesTags: ["CarYears"],
    }),

    // 🔧 Static Dropdown Data
    getBodyTypes: builder.query({
      query: () => ({ url: "/bodyTypes", method: "GET" }),
      providesTags: ["BodyTypes"],
    }),
    getCarRegionalSpecs: builder.query({
      query: () => ({ url: "/carRegionalSpecs", method: "GET" }),
      providesTags: ["RegionalSpecs"],
    }),
    getCarHorsePowers: builder.query({
      query: () => ({ url: "/carHorsePowers", method: "GET" }),
      providesTags: ["HorsePowers"],
    }),
    getCarSeatingCapacities: builder.query({
      query: () => ({ url: "/carSeatingCapacities", method: "GET" }),
      providesTags: ["SeatingCapacities"],
    }),
    getCarColors: builder.query({
      query: () => ({ url: "/carColors", method: "GET" }),
      providesTags: ["Colors"],
    }),
    getCarDoors: builder.query({
      query: () => ({ url: "/carDoors", method: "GET" }),
      providesTags: ["Doors"],
    }),
    getTransmissions: builder.query({
      query: () => ({ url: "/carTransmissions", method: "GET" }),
      providesTags: ["Transmissions"],
    }),
    getFuelTypes: builder.query({
      query: () => ({ url: "/carFuelTypes", method: "GET" }),
      providesTags: ["FuelTypes"],
    }),
    getCarTechFeatures: builder.query({
      query: () => ({ url: "/carTechFeatures", method: "GET" }),
      providesTags: ["TechFeatures"],
    }),
    getCarOtherFeatures: builder.query({
      query: () => ({ url: "/carOtherFeatures", method: "GET" }),
      providesTags: ["OtherFeatures"],
    }),

    // ✅ Add / Update listing
    addCarListing: builder.mutation({
      query: (formData) => ({
        url: "/listing",
        method: "POST",
        body: formData,
      }),
    }),
    updateCarListing: builder.mutation({
      query: ({ id, body }) => ({
        url: `/listing/${id}`,
        method: "PUT",
        body,
      }),
    }),

    getVendorListings: builder.query({
      query: () => ({ url: "/vendorListings", method: "GET" }),
      providesTags: ["VendorListings"],
    }),
  }),
});

export const {
  useGetCarBrandsQuery,
  useLazyGetModelsQuery,
  useLazyGetCarTrimsQuery,
  useLazyGetYearsQuery,
  useGetBodyTypesQuery,
  useGetCarRegionalSpecsQuery,
  useGetCarHorsePowersQuery,
  useGetCarSeatingCapacitiesQuery,
  useGetCarColorsQuery,
  useGetCarDoorsQuery,
  useGetTransmissionsQuery,
  useGetFuelTypesQuery,
  useGetCarTechFeaturesQuery,
  useGetCarOtherFeaturesQuery,
  useAddCarListingMutation,
  useUpdateCarListingMutation,
  useGetVendorListingsQuery,
} = carApi;

export default carApi;
