import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import FiltersReducer from "./slices/filterSlice"

import { api } from "./api/api"

const rootReducer = combineReducers({
  filtersSlice: FiltersReducer,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST"] },
    }).concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
