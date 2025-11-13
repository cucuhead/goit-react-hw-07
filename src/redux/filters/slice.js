// src/redux/filters/slice.js

import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Reducer ve actions export
export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

// Selector export
export const selectFilter = (state) => state.filters.name;
