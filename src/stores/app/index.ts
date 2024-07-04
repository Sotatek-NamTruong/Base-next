import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppState = {
  loadingAcceptOffer: boolean;
};

const initialState: AppState = {
  loadingAcceptOffer: false,
};

// slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoadingAcceptOffer: (state, actions: PayloadAction<boolean>) => {
      state.loadingAcceptOffer = actions.payload;
    },
  },
});

// actions
export const { setLoadingAcceptOffer } = appSlice.actions;

// reducer
export const appStateReducer = appSlice.reducer;
