import { call, put, select, takeLatest } from "redux-saga/effects";
import { submitTicketOrder } from "../../api/api";

import type { PassengersState } from "../reducers/passengersSlice";
import type { RootState } from "../store";

import {
  submitOrderRequest,
  submitOrderSuccess,
  submitOrderFailure,
} from "../reducers/orderSlice";

function* submitOrderSaga() {
  try {
    const passengers = (yield select(
      (state: RootState) => state.passengers,
      )) as PassengersState & { [key: string]: any }; // для TS
      
      const hasArrival =
        passengers.arrival.route_direction_id &&
        passengers.arrival.seats.length > 0;

    const newOrderForAPI = {
      user: passengers.user,
      departure: passengers.departure,
      ...(hasArrival && {
        arrival: passengers.arrival,
      }),
    };

    console.log("Submitting order:", newOrderForAPI);

    const response: unknown = yield call<unknown, [typeof newOrderForAPI]>(
      submitTicketOrder,
      newOrderForAPI,
    );

    yield put(submitOrderSuccess(response));
    console.log("from order saga:", response);
  } catch (error) {
    yield put(
      submitOrderFailure(
        error instanceof Error ? error.message : "Unknown error",
      ),
    );
  }
}

export function* watchSubmitOrder() {
  yield takeLatest(submitOrderRequest.type, submitOrderSaga);
}
