import { render, screen } from "@testing-library/react"
import { AccommodationList } from "../AccommodationList"
import { accommodations as accommodationData } from "../../mocks/data/accommodation.json"
import { Accommodation } from "../../types/accommodation"

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }
})

describe("AccommodationList", () => {
  it("should render the accommodation list", () => {
    render(
      <AccommodationList
        allAccommodation={accommodationData as Accommodation[]}
      />
    )

    expect(screen.getByText(accommodationData[0].name)).toBeVisible()
  })
})
