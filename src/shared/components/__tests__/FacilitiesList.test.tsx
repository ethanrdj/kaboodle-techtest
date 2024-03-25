import { render, screen } from "@testing-library/react"
import { FacilitiesList } from "../FacilitiesList"
import { accommodations as accommodationData } from "../../mocks/data/accommodation.json"

describe("FacilitiesList", () => {
  it("should render", () => {
    render(<FacilitiesList facilities={accommodationData[0].facilities} />)

    expect(screen.getAllByTestId("tick-icon")).toHaveLength(
      accommodationData[0].facilities.length
    )
  })
})
