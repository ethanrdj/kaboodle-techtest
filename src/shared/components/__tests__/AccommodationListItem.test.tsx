import { fireEvent, render, screen } from "@testing-library/react"
import { accommodations as accommodationData } from "../../mocks/data/accommodation.json"
import { Accommodation } from "../../types/accommodation"
import { AccommodationListItem } from "../AccommodationListItem"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }
})

const withoutPrice = (accommodationData as Accommodation[]).find(
  (accommodation) => accommodation.rooms.some((room) => !room.price)
)
const withPrice = (accommodationData as Accommodation[]).find((accommodation) =>
  accommodation.rooms.some((room) => room.price)
)

describe("AccommodationListItem", () => {
  it("should render", () => {
    render(<AccommodationListItem accommodation={withoutPrice!} />)
  })

  it("should the accommodation price", () => {
    render(<AccommodationListItem accommodation={withPrice!} />)

    expect(screen.getByText("£409.00")).toBeVisible()
  })

  it("should navaigate to the accommodation page", () => {
    render(<AccommodationListItem accommodation={withPrice!} />)

    fireEvent.click(screen.getByTestId("view-rooms-button"))

    expect(mockNavigate).toHaveBeenCalledWith(`/${withPrice!.id}`)
  })
})
