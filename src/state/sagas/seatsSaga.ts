import {
  call,
  put,
  takeLatest,
  select,
  take,
  fork,
  cancel,
} from "redux-saga/effects";

import type { EventChannel } from "redux-saga";
import type { SeatsInfoType } from "../../types";
import type { RootState } from "../store";

import {
  getSeatsRequired,
  getSeatsSuccess,
  getSeatsFailure,
  setSeatsProgress,
} from "../reducers/seatsSlice";

import { createProgressChannel } from "./createProgressChannel";
import { searchSeats } from "../../api/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

function* workGetSeatsFetch(): Generator {
  try {
    const filters: RootState["seatsFilters"] = yield select(
      (state: RootState) => state.seatsFilters,
    );

    const progressChannel: EventChannel<number> = yield call(
      createProgressChannel,
      100,
    );

    const progressTask = yield fork(function* () {
      try {
        while (true) {
          const progress: number = yield take(progressChannel);
          yield put(setSeatsProgress(progress));
        }
      } finally {
        progressChannel.close();
      }
    });

    const data: SeatsInfoType[] = yield call(searchSeats, filters);

    yield cancel(progressTask);
    yield put(setSeatsProgress(100));
    yield put(getSeatsSuccess(data));
  } catch (error) {
    yield put(getSeatsFailure(getErrorMessage(error)));
  }
}

export function* seatsSaga() {
  yield takeLatest(getSeatsRequired.type, workGetSeatsFetch);
}
