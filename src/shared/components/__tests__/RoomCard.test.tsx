import { render, screen } from "@testing-library/react"
import { RoomCard } from "../RoomCard"
import { accommodations as accommodationData } from "../../mocks/data/accommodation.json"
import { Accommodation, Room } from "../../types/accommodation"
import { useGetRoomAvailabilityQuery } from "../../services/api"
import { Availability } from "../../types/availibility"

const withoutPrice = (accommodationData as Accommodation[])[0].rooms[0]
const withPrice = (accommodationData as Accommodation[])[1].rooms.find(
  (room) => room.price
)
const availability = { id: 1, available: 1, total: 3 }

jest.mock("../../services/api", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../services/api"),
    useGetRoomAvailabilityQuery: jest.fn(),
  }
})

describe("RoomCard", () => {
  const setup = (room: Room, availability: Availability | undefined) => {
    ;(useGetRoomAvailabilityQuery as jest.Mock).mockReturnValue({
      data: availability,
      isLoading: false,
    })

    return render(<RoomCard room={room} />)
  }
  it("should render", () => {
    setup(withoutPrice, undefined)
  })

  it("should render the rooms availability and price", () => {
    setup(withPrice!, availability)

    expect(screen.getByText(withPrice!.price.price)).toBeVisible()
    expect(
      screen.getByText(`Only ${availability.available} left!`)
    ).toBeVisible()
  })
})
