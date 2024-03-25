import { fireEvent, render, screen } from "@testing-library/react"
import { SortFilters } from "../SortFilters"
import { useDispatch, useSelector } from "react-redux"
import { Sort } from "../../types/filters"
import { setSort } from "../../services/slices/filterSlice"

const mockDispatch = jest.fn()

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  }
})

describe("SortFilters", () => {
  const setup = (sortType: Sort = Sort.STAR) => {
    ;(useSelector as unknown as jest.Mock).mockReturnValue(sortType)
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)

    return render(<SortFilters />)
  }
  it("should change the sort type to price", () => {
    setup()

    fireEvent.click(screen.getByText("Sort by price"))

    expect(mockDispatch).toHaveBeenCalledWith(setSort(Sort.PRICE))
  })
})
