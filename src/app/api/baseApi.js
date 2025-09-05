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
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "countries",
    "states",
    "cities",
    // Add all your car-related tag types here:
    "CarBrands",
    "CarModels",
    "CarTrims",
    "CarYears",
    "BodyTypes",
    "RegionalSpecs",
    "HorsePowers",
    "SeatingCapacities",
    "Colors",
    "Doors",
    "Transmissions",
    "FuelTypes",
    "TechFeatures",
    "OtherFeatures",
    "profile",
    "vendors",
    "vendor",
    "admins",
    "user",
    "listings",
    "listing",
  ],
});
