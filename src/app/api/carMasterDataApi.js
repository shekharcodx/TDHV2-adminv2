import { baseApi } from "@/app/api/baseApi";

const carMasterDataApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //car brands
    getCarBrand: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("allBrands", param);
        }
        return { url: `/carBrands?${urlParams}`, method: "GET" };
      },
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
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("allModels", param);
        }
        return { url: `/carModels?${urlParams}`, method: "GET" };
      },
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
    addCarModels: builder.mutation({
      query: (data) => ({
        url: "/carModels",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllModels", "CarModels"],
    }),

    //car trims
    getAllCarTrims: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("allTrims", param);
        }
        return { url: `/carTrims?${urlParams}`, method: "GET" };
      },
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
    addCarTrims: builder.mutation({
      query: (data) => ({
        url: "/carTrims",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllTrims", "CarTrims"],
    }),

    //reference data
    getYears: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/years?${urlParams}`, method: "GET" };
      },
      providesTags: ["CarYears"],
    }),

    //bodytype
    getBodyTypes: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/bodyTypes?${urlParams}`, method: "GET" };
      },
      providesTags: ["BodyTypes"],
    }),

    //doors
    getDoors: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `carDoors?${urlParams}`, method: "GET" };
      },
      providesTags: ["Doors"],
    }),

    //transmission
    getTransmissions: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/carTransmissions?${urlParams}`, method: "GET" };
      },
      providesTags: ["Transmissions"],
    }),

    //fuelTypes
    getFuelTypes: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/carFuelTypes?${urlParams}`, method: "GET" };
      },
      providesTags: ["FuelTypes"],
    }),

    //colors
    getColors: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/carColors?${urlParams}`, method: "GET" };
      },
      providesTags: ["Colors"],
    }),

    //seating
    getSeatingCapacities: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/carSeatingCapacities?${urlParams}`, method: "GET" };
      },
      providesTags: ["SeatingCapacities"],
    }),

    //powers
    getPowers: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/carHorsePowers?${urlParams}`, method: "GET" };
      },
      providesTags: ["HorsePowers"],
    }),

    //regionalSpecs
    getRegionalSpecs: builder.query({
      query: (param) => {
        let urlParams = new URLSearchParams();
        if (param !== undefined && param !== null) {
          urlParams.append("all", param);
        }
        return { url: `/carRegionalSpecs?${urlParams}`, method: "GET" };
      },
      providesTags: ["RegionalSpecs"],
    }),

    //techFeatures
    getTechFeatures: builder.query({
      query: () => ({
        url: "/carTechFeatures",
        methos: "GET",
      }),
      providesTags: ["TechFeatures"],
    }),

    //otherFeatures
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
  useAddCarModelsMutation,

  useGetAllCarTrimsQuery,
  useLazyGetCarTrimsQuery,
  useUpdateTrimActiveMutation,
  useAddCarTrimsMutation,

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
