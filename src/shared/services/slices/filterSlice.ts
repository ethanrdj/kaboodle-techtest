import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Sort } from "../../types/filters"
import { RootState } from "../store"

export type FilterState = {
  sort: Sort | undefined
  ascendingOrder: boolean
  pageAmount: number
}

const initialState: FilterState = {
  sort: undefined,
  ascendingOrder: false,
  pageAmount: 10,
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },
    setAscendingOrder: (state, _action: PayloadAction) => {
      state.ascendingOrder = !state.ascendingOrder
    },
    setPageAmount: (state, action: PayloadAction<number>) => {
      state.pageAmount = state.pageAmount + action.payload
    },
  },
})

export const { setSort, setAscendingOrder, setPageAmount } =
  filtersSlice.actions

export const selectSortFilter = (state: RootState) => state.filtersSlice.sort

export const selectAscendingOrder = (state: RootState) =>
  state.filtersSlice.ascendingOrder

export const selectPageAmount = (state: RootState) =>
  state.filtersSlice.pageAmount

export default filtersSlice.reducer
