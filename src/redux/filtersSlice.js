// src/redux/filtersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    // Ödev gereksinimi: name: ""
    name: "",
  },
  reducers: {
    // 1. Filtre değerini değiştirme (Action: changeFilter)
    // payload: yeni filtre değeri (örneğin: 'ali')
    changeFilter: (state, action) => {
      // RTK ile doğrudan atama yapmak güvenlidir.
      state.name = action.payload;
    },
  },
});

// Selector: Filtre değerini döndürür (useSelector için)
export const selectNameFilter = (state) => state.filters.name;

// Action Creator'ı ve Reducer'ı dışa aktarma
export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
