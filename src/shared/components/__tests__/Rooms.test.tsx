import { render, screen } from "@testing-library/react"
import { Rooms } from "../Rooms"
import { accommodations as accommodationData } from "../../mocks/data/accommodation.json"
import { Room } from "../../types/accommodation"
import { useMediaQuery } from "@chakra-ui/react"

jest.mock("@chakra-ui/react", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@chakra-ui/react"),
    useMediaQuery: jest.fn(),
  }
})

jest.mock("../RoomCard", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../RoomCard"),
    RoomCard: () => <div data-testid="room-card" />,
  }
})

jest.mock("../RoomTable", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../RoomTable"),
    RoomTable: () => <div data-testid="room-table" />,
  }
})

const rooms = accommodationData[0].rooms as Room[]

describe("Rooms", () => {
  const setup = (smallScreen: boolean) => {
    ;(useMediaQuery as jest.Mock).mockReturnValue([smallScreen])

    render(<Rooms rooms={rooms} />)
  }
  it("should render the room table when on desktop", () => {
    setup(false)

    expect(screen.getByTestId("room-table")).toBeVisible()
  })

  it("should render the room cards when on mobile", () => {
    setup(true)

    expect(screen.getAllByTestId("room-card")).toHaveLength(rooms.length)
  })
})
