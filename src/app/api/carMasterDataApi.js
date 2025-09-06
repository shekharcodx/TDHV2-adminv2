import { baseApi } from "@/app/api/baseApi";

const carMasterDataApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCarBrand: builder.query({
      query: () => ({
        url: "/carBrands",
        method: "GET",
      }),
      providesTags: ["CarBrands"],
    }),
    getCarModels: builder.query({
      query: (brandId) => ({
        url: `/carModels/${brandId}`,
        method: "GET",
      }),
      providesTags: ["CarModels"],
    }),
    getCarTrims: builder.query({
      query: (modelId) => ({
        url: `/carTrims/${modelId}`,
        methid: "GET",
      }),
      providesTags: ["CarTrims"],
    }),
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
  useLazyGetCarModelsQuery,
  useLazyGetCarTrimsQuery,
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
