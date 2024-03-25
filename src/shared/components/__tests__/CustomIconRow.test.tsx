import { render, screen } from "@testing-library/react"
import { CustomIconRow } from "../CustomIconRow"
import { faStar } from "@fortawesome/free-solid-svg-icons"

describe("CustomIconRow", () => {
  it("should render", () => {
    render(<CustomIconRow amount={3} icon={faStar} />)

    expect(screen.getAllByTestId("custom-icon")).toHaveLength(3)
  })
})
