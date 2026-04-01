import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type OrderState = {
  loading: boolean;
  error: "" | null;
  data: unknown | null;
};

const initialState: OrderState = {
  loading: false,
  data: null,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    submitOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    submitOrderSuccess: (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      state.data = action.payload;
    },
    submitOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { submitOrderRequest, submitOrderSuccess, submitOrderFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
