import { fireEvent, render, screen } from "@testing-library/react"
import { EmptyState } from "../EmptyState"

const mockOnRefetch = jest.fn()

describe("EmptyState", () => {
  it("should render the loading state", () => {
    render(<EmptyState label="Loading" isLoading />)

    expect(screen.getByTestId("loading-spinner")).toBeVisible()
  })

  it("should render the error state", () => {
    render(<EmptyState label="Error" onRefetch={mockOnRefetch} />)

    expect(screen.getByTestId("refetch-button")).toBeVisible()
  })

  it("should call onRefetch when the Retry button is clicked", () => {
    render(<EmptyState label="Error" onRefetch={mockOnRefetch} />)

    fireEvent.click(screen.getByTestId("refetch-button"))

    expect(mockOnRefetch).toHaveBeenCalledTimes(1)
  })
})
