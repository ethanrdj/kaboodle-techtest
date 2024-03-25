import { render, screen } from "@testing-library/react"
import { Facilities } from "../Facilities"
import { accommodations as accommodationData } from "../../mocks/data/accommodation.json"
import { Accommodation } from "../../types/accommodation"

describe("Facilities", () => {
  it("should render", () => {
    render(<Facilities accommodation={accommodationData[0] as Accommodation} />)

    expect(
      screen.getByText(`${accommodationData[0].type.name} Facilities`)
    ).toBeVisible()
  })
})
