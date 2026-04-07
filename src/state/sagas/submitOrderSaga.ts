import { call, put, select, takeLatest } from "redux-saga/effects";
import { submitTicketOrder } from "../../api/api";

import type { PassengersState } from "../reducers/passengersSlice";
import type { RootState } from "../store";
import type { ApiResponseType } from "../../types";

import {
  submitOrderRequest,
  submitOrderSuccess,
  submitOrderFailure,
} from "../reducers/orderSlice";

function* submitOrderSaga() {
  try {
    const passengers: PassengersState = yield select(
      (state: RootState) => state.passengers,
    );

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

    const response: ApiResponseType = yield call(() =>
      submitTicketOrder(newOrderForAPI),
    );

    if ("status" in response && response.status) {
      yield put(submitOrderSuccess(response));
    } else if ("error" in response) {
      yield put(submitOrderFailure({ error: response.error }));
    }
  } catch (error) {
    yield put(
      submitOrderFailure(
        error instanceof Error
          ? { error: error.message }
          : { error: "Unknown error" },
      ),
    );
  }
}

export function* watchSubmitOrder() {
  yield takeLatest(submitOrderRequest.type, submitOrderSaga);
}
