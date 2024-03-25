import { render, screen } from "@testing-library/react"
import { RoomTable } from "../RoomTable"
import { accommodations as accommodationData } from "../../mocks/data/accommodation.json"
import { Room } from "../../types/accommodation"

jest.mock("../RoomTableRow", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../RoomTableRow"),
    RoomTableRow: () => <div data-testid="room-table-row" />,
  }
})

const rooms = accommodationData[0].rooms as Room[]

describe("RoomTable", () => {
  it("should render the table rows", () => {
    render(<RoomTable rooms={rooms} />)

    expect(screen.getAllByTestId("room-table-row")).toHaveLength(rooms.length)
  })
})
