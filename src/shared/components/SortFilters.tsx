import { FC, useCallback } from "react"
import { SortFilterItem } from "./SortFilterItem"
import {
  faArrowDownAZ,
  faSterlingSign,
  faStar,
} from "@fortawesome/free-solid-svg-icons"
import { Sort } from "../types/filters"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSortFilter,
  setAscendingOrder,
  setSort,
} from "../services/slices/filterSlice"
import { Box, VStack } from "@chakra-ui/react"

export const SortFilters: FC = () => {
  const selectedSort = useSelector(selectSortFilter)
  const dispatch = useDispatch()

  const isSelected = useCallback(
    (filter: Sort) => selectedSort === filter,
    [selectedSort]
  )

  const onChangeFilter = useCallback(
    (filter: Sort) => {
      dispatch(setSort(filter))
      dispatch(setAscendingOrder())
    },
    [dispatch]
  )

  return (
    <Box w="full">
      <VStack p={4} minW="300px" position={{ base: "initial", lg: "fixed" }}>
        <SortFilterItem
          label="Sort alphabetically"
          icon={faArrowDownAZ}
          isSelected={isSelected(Sort.ALPHABETICAL)}
          onClick={() => onChangeFilter(Sort.ALPHABETICAL)}
        />
        <SortFilterItem
          label="Sort by price"
          icon={faSterlingSign}
          isSelected={isSelected(Sort.PRICE)}
          onClick={() => onChangeFilter(Sort.PRICE)}
        />
        <SortFilterItem
          label="Sort by star rating"
          icon={faStar}
          isSelected={isSelected(Sort.STAR)}
          onClick={() => onChangeFilter(Sort.STAR)}
        />
      </VStack>
    </Box>
  )
}
