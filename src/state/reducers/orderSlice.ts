import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { SuccessResponseType } from "../../types";
import type { ErrorResponseType } from "../../types";

type OrderState = {
  loading: boolean;
  error: ErrorResponseType | null;
  data: SuccessResponseType | null;
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
    submitOrderSuccess: (state, action: PayloadAction<SuccessResponseType>) => {
      state.loading = false;
      state.data = action.payload;
    },
    submitOrderFailure: (state, action: PayloadAction<ErrorResponseType>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { submitOrderRequest, submitOrderSuccess, submitOrderFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
