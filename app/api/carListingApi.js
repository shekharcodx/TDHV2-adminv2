import { baseApi } from "./baseApi";

const carListingApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // 🔄 Brand → Model → Trim → Year Chain
    getCarBrands: builder.query({
      query: () => ({
        url: "/carBrands",
        method: "GET",
      }),
      providesTags: ["CarBrands"],
    }),

    getModels: builder.query({
      query: (brandId) => ({
        url: `/carModels/${brandId}`, // ✅ use path param
        method: "GET",
      }),
      providesTags: (result, error, brandId) => [
        { type: "CarModels", id: brandId },
      ],
    }),

    getCarTrims: builder.query({
      query: (modelId) => ({
        url: `/carTrims/${modelId}`, // ✅ use path param
        method: "GET",
      }),
      providesTags: (result, error, modelId) => [
        { type: "CarTrims", id: modelId },
      ],
    }),

    getYears: builder.query({
      query: () => ({
        url: "/years", // ✅ global years, no modelId needed
        method: "GET",
      }),
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
} = carListingApi;

export default carListingApi;
