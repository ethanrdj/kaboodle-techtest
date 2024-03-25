import { Availability } from "../../types/availibility"
import { api } from "./api"

export const availabilityAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAvailabilityAvailability: builder.query<Availability[], void>({
      query: () => "/availability",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Availability" as const,
                id,
              })),
              "Availability",
            ]
          : ["Availability"],
    }),
    getRoomAvailability: builder.query<Availability, number>({
      query: (id) => `/availability/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Availability", id }],
    }),
  }),
})

export default availabilityAPI
