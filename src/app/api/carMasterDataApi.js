import { baseApi } from "@/app/api/baseApi";

const carMasterDataApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //car brands
    getCarBrand: builder.query({
      query: () => ({
        url: "/carBrands",
        method: "GET",
      }),
      providesTags: ["CarBrands"],
    }),
    updateBrandActive: builder.mutation({
      query: (brandId) => ({
        url: `/carBrand/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CarBrands"],
    }),
    addCarBrand: builder.mutation({
      query: (data) => ({
        url: "/carBrand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CarBrands"],
    }),
    //car models
    getAllCarModels: builder.query({
      query: () => ({
        url: "/carModels",
        method: "GET",
      }),
      providesTags: ["AllModels"],
    }),
    getCarModels: builder.query({
      query: (brandId) => ({
        url: `/carModels/${brandId}`,
        method: "GET",
      }),
      providesTags: ["CarModels"],
    }),
    updateModelActive: builder.mutation({
      query: (modelId) => ({
        url: `/carModel/${modelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllModels"],
    }),
    getAllCarTrims: builder.query({
      query: () => ({
        url: "/carTrims",
        method: "GET",
      }),
      providesTags: ["AllTrims"],
    }),
    getCarTrims: builder.query({
      query: (modelId) => ({
        url: `/carTrims/${modelId}`,
        method: "GET",
      }),
      providesTags: ["CarTrims"],
    }),
    updateTrimActive: builder.mutation({
      query: (trimId) => ({
        url: `/carTrim/${trimId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllTrims"],
    }),
    //reference data
    getYears: builder.query({
      query: () => ({
        url: "/years",
        method: "GET",
      }),
      providesTags: ["CarYears"],
    }),
    getBodyTypes: builder.query({
      query: () => ({
        url: "/bodyTypes",
        method: "GET",
      }),
      providesTags: ["BodyTypes"],
    }),
    getDoors: builder.query({
      query: () => ({
        url: "carDoors",
        method: "GET",
      }),
      providesTags: ["Doors"],
    }),
    getTransmissions: builder.query({
      query: () => ({
        url: "/carTransmissions",
        method: "GET",
      }),
      providesTags: ["Transmissions"],
    }),
    getFuelTypes: builder.query({
      query: () => ({
        url: "/carFuelTypes",
        method: "GET",
      }),
      providesTags: ["FuelTypes"],
    }),
    getColors: builder.query({
      query: () => ({
        url: "/carColors",
        method: "GET",
      }),
      providesTags: ["Colors"],
    }),
    getSeatingCapacities: builder.query({
      query: () => ({
        url: "/carSeatingCapacities",
        method: "GET",
      }),
      providesTags: ["SeatingCapacities"],
    }),
    getPowers: builder.query({
      query: () => ({
        url: "/carHorsePowers",
        method: "GET",
      }),
      providesTags: ["HorsePowers"],
    }),
    getRegionalSpecs: builder.query({
      query: () => ({
        url: "/carRegionalSpecs",
        method: "GET",
      }),
      providesTags: ["RegionalSpecs"],
    }),
    getTechFeatures: builder.query({
      query: () => ({
        url: "/carTechFeatures",
        methos: "GET",
      }),
      providesTags: ["TechFeatures"],
    }),
    getOtherFeatures: builder.query({
      query: () => ({
        url: "/carOtherFeatures",
        method: "GET",
      }),
      providesTags: ["OtherFeatures"],
    }),
  }),
});

export const {
  useGetCarBrandQuery,
  useUpdateBrandActiveMutation,
  useAddCarBrandMutation,
  useGetAllCarModelsQuery,
  useLazyGetCarModelsQuery,
  useUpdateModelActiveMutation,
  useGetAllCarTrimsQuery,
  useLazyGetCarTrimsQuery,
  useUpdateTrimActiveMutation,
  useGetYearsQuery,
  useGetBodyTypesQuery,
  useGetColorsQuery,
  useGetDoorsQuery,
  useGetFuelTypesQuery,
  useGetPowersQuery,
  useGetRegionalSpecsQuery,
  useGetSeatingCapacitiesQuery,
  useGetTransmissionsQuery,
  useGetTechFeaturesQuery,
  useGetOtherFeaturesQuery,
} = carMasterDataApi;
