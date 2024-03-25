import accommodationAPI from "./accommodationAPI"
import availabilityAPI from "./availabilityAPI"

export const { useGetAllAccommodationQuery, useGetAccommodationQuery } =
  accommodationAPI

export const {
  useGetAvailabilityAvailabilityQuery,
  useGetRoomAvailabilityQuery,
} = availabilityAPI
