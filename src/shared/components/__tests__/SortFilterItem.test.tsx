import { fireEvent, render, screen } from "@testing-library/react"
import { SortFilterItem } from "../SortFilterItem"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const mockOnClick = jest.fn()

describe("SortFilterItem", () => {
  it("should render", () => {
    render(
      <SortFilterItem
        label="Sort label"
        icon={faCheck}
        isSelected={false}
        onClick={mockOnClick}
      />
    )

    expect(screen.getByText(/sort label/i)).toBeVisible()
  })

  it("should call onClick when the row is clicked", () => {
    render(
      <SortFilterItem
        label="Sort label"
        icon={faCheck}
        isSelected={false}
        onClick={mockOnClick}
      />
    )

    fireEvent.click(screen.getByTestId("sort-row"))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
