import { Accommodation } from "../../types/accommodation"

import { api } from "./api"

export const accommodationAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccommodation: builder.query<Accommodation[], number>({
      query: (page) => `/accommodation?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Accommodation" as const,
                id,
              })),
              "Accommodation",
            ]
          : ["Accommodation"],
    }),
    getAccommodation: builder.query<Accommodation, string>({
      query: (id) => `/accommodation/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Accommodation", id }],
    }),
  }),
})

export default accommodationAPI
