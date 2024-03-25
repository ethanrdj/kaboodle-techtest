import { http, HttpHandler } from "msw"
import { accommodations as accommodationData } from "../data/accommodation.json"
import { rooms as availabilityData } from "../data/accommodation_availability.json"

const accommodationMap = new Map<string, any>(
  accommodationData.map((accommodation) => [
    String(accommodation.id),
    accommodation,
  ])
)

const availabilityMap = new Map<string, any>(
  availabilityData.map((availability) => [
    String(availability.id),
    availability,
  ])
)

export const handlers: HttpHandler[] = [
  http.get("/accommodation", ({ request }) => {
    const url = new URL(request.url)
    const pageAmount = url.searchParams.get("page")

    const data = Object.values(Object.fromEntries(accommodationMap.entries()))
    const pagedData = data.slice(
      0,
      pageAmount ? parseInt(pageAmount) : data.length
    )
    return Response.json(pagedData)
  }),

  http.get("/accommodation/:id", ({ params }) => {
    const { id } = params

    const data = accommodationMap.get(id as string)

    return Response.json(data)
  }),

  http.get("/availability", (_info) => {
    const data = Object.values(Object.fromEntries(availabilityMap.entries()))
    return Response.json(data)
  }),

  http.get("/availability/:id", ({ params }) => {
    const { id } = params

    const data = availabilityMap.get(id as string)

    if (!data) return
    return Response.json(data)
  }),
]
