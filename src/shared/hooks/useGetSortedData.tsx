import { useCallback, useMemo } from "react"
import { useGetAllAccommodationQuery } from "../services/api"

import { useSelector } from "react-redux"
import {
  selectAscendingOrder,
  selectPageAmount,
  selectSortFilter,
} from "../services/slices/filterSlice"
import { Accommodation, Room } from "../types/accommodation"
import { Sort } from "../types/filters"

// This hook isn't really necessary in the context of this tech test as the return value isn't reused so the logic could remain in ListView, where it was orignially written.
// But I just wanted tidy it up and move it into a hook so I can at least show that I am able to test hooks as well as components

export const useGetSortedData = () => {
  const sortFilter = useSelector(selectSortFilter)
  const ascendingOrder = useSelector(selectAscendingOrder)
  const pageAmount = useSelector(selectPageAmount)
  const {
    data: allAccommodation = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllAccommodationQuery(pageAmount)

  const sortAlphabetically = useCallback(
    (a: Accommodation, b: Accommodation) => {
      if (ascendingOrder) {
        return a.name.localeCompare(b.name, "en", {
          sensitivity: "base",
        })
      } else {
        return b.name.localeCompare(a.name, "en", {
          sensitivity: "base",
        })
      }
    },

    [ascendingOrder]
  )

  const sortByPrice = useCallback(
    (a: Accommodation, b: Accommodation) => {
      const getCheapestPrice = (rooms: Room[]) => {
        return rooms
          .filter((room) => room.price)
          .reduce((minPrice, room) => {
            return room.price.value < minPrice ? room.price.value : minPrice
          }, Number.POSITIVE_INFINITY)
      }
      const priceA = getCheapestPrice(a.rooms)
      const priceB = getCheapestPrice(b.rooms)

      if (!priceA || !priceB) return 0
      if (ascendingOrder) {
        return priceA - priceB
      } else {
        return priceB - priceA
      }
    },
    [ascendingOrder]
  )

  const sortByStarRating = useCallback(
    (a: Accommodation, b: Accommodation) => {
      if (ascendingOrder) {
        return a.rating.id - b.rating.id
      } else {
        return b.rating.id - a.rating.id
      }
    },
    [ascendingOrder]
  )
  const sortedAccommodation = useMemo(() => {
    switch (sortFilter) {
      case Sort.ALPHABETICAL:
        return [...allAccommodation].sort(sortAlphabetically)
      case Sort.STAR:
        return [...allAccommodation].sort(sortByStarRating)
      case Sort.PRICE:
        return [...allAccommodation].sort(sortByPrice)
      default:
        return [...allAccommodation]
    }
  }, [
    allAccommodation,
    sortFilter,
    sortAlphabetically,
    sortByPrice,
    sortByStarRating,
  ])

  return { accommodation: sortedAccommodation, isLoading, isError, refetch }
}
