import { renderHook } from "@testing-library/react"
import { useGetAllAccommodationQuery } from "../../services/api"
import { Sort } from "../../types/filters"
import { useGetSortedData } from "../useGetSortedData"
import { useSelector } from "react-redux"

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
  }
})

jest.mock("../../services/api", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../services/api"),
    useGetAllAccommodationQuery: jest.fn(),
  }
})

const mockData = [
  {
    id: 1,
    name: "A hotel",
    rating: { id: 2 },
    rooms: [{ price: { value: 50 } }],
  },
  {
    id: 2,
    name: "C hotel",
    rating: { id: 5 },
    rooms: [{ price: { value: 100 } }],
  },
  {
    id: 3,
    name: "B hotel",
    rating: { id: 1 },
    rooms: [{ price: { value: 10 } }],
  },
]

describe("useGetSortedData", () => {
  const setup = (sortType: Sort | undefined, ascendingOrder: boolean) => {
    ;(useSelector as unknown as jest.Mock)
      .mockReturnValueOnce(sortType)
      .mockReturnValueOnce(ascendingOrder)
    ;(useGetAllAccommodationQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    })

    const { result } = renderHook(useGetSortedData)

    return result
  }

  it("should return the accommodation unsorted", () => {
    const { current } = setup(undefined, false)

    expect(current.accommodation).toEqual(mockData)
  })

  it("should return the accommodation sorted by price ascending", () => {
    const { current } = setup(Sort.PRICE, true)

    const sortedMockData = mockData.toSorted(
      (a, b) => a.rooms[0].price.value - b.rooms[0].price.value
    )

    expect(current.accommodation).toEqual(sortedMockData)
  })

  it("should return the accommodation sorted by price descending", () => {
    const { current } = setup(Sort.PRICE, false)

    const sortedMockData = mockData.toSorted(
      (a, b) => b.rooms[0].price.value - a.rooms[0].price.value
    )

    expect(current.accommodation).toEqual(sortedMockData)
  })

  it("should return the accommodation sorted by star rating ascending", () => {
    const { current } = setup(Sort.STAR, true)

    const sortedMockData = mockData.toSorted(
      (a, b) => a.rating.id - b.rating.id
    )

    expect(current.accommodation).toEqual(sortedMockData)
  })

  it("should return the accommodation sorted by star rating descending", () => {
    const { current } = setup(Sort.STAR, false)

    const sortedMockData = mockData.toSorted(
      (a, b) => b.rating.id - a.rating.id
    )

    expect(current.accommodation).toEqual(sortedMockData)
  })

  it("should return the accommodation sorted alphabetically ascending", () => {
    const { current } = setup(Sort.ALPHABETICAL, true)

    const sortedMockData = mockData.toSorted((a, b) =>
      a.name.localeCompare(b.name, "en", {
        sensitivity: "base",
      })
    )

    expect(current.accommodation).toEqual(sortedMockData)
  })

  it("should return the accommodation sorted alphabetically descending", () => {
    const { current } = setup(Sort.ALPHABETICAL, false)

    const sortedMockData = mockData.toSorted((a, b) =>
      b.name.localeCompare(a.name, "en", {
        sensitivity: "base",
      })
    )

    expect(current.accommodation).toEqual(sortedMockData)
  })
})
