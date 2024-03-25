import { fireEvent, render, screen } from "@testing-library/react"
import { ListView } from "../ListView"
import { accommodations as accommodationData } from "../../shared/mocks/data/accommodation.json"
import { useGetSortedData } from "../../shared/hooks/useGetSortedData"
import { useDispatch } from "react-redux"
import { setPageAmount } from "../../shared/services/slices/filterSlice"
import { BrowserRouter } from "react-router-dom"

const mockDispatch = jest.fn()

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  }
})

jest.mock("../../shared/components/EmptyState", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../shared/components/EmptyState"),
    EmptyState: () => <div data-testid="loading-state" />,
  }
})

jest.mock("../../shared/hooks/useGetSortedData", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../shared/hooks/useGetSortedData"),
    useGetSortedData: jest.fn(),
  }
})

describe("ListView", () => {
  beforeEach(() => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }))
  })

  const setup = (isLoading: boolean) => {
    ;(useGetSortedData as jest.Mock).mockReturnValue({
      accommodation: accommodationData,
      isLoading,
    })
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)

    return render(
      <BrowserRouter>
        <ListView />
      </BrowserRouter>
    )
  }

  it("should render the empty state when loading", () => {
    setup(true)

    expect(screen.getByTestId("loading-state")).toBeVisible()
  })

  it("should call dispatch when the Load more is clicked", () => {
    setup(false)

    fireEvent.click(screen.getByTestId("load-more-button"))

    expect(mockDispatch).toHaveBeenCalledWith(setPageAmount(10))
  })
})
