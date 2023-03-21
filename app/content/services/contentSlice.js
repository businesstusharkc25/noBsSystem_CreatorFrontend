import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
  name: "dappContent",
  initialState: {
    filterObj: {},
  },
  reducers: {
    setFilterObj: (state, action) => {
      state.filterObj = action.payload;
    },
  },
});

export const { setFilterObj } = contentSlice.actions;
export const filterObj = (state) => state["dappContent"].filterObj;

export default contentSlice.reducer;
