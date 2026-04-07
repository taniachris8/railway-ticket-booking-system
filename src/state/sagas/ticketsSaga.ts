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
import type { TicketsType } from "../../types";
import type { RootState } from "../store";

import {
  getTicketsRequired,
  getTicketsSuccess,
  getTicketsFailure,
  setProgress,
} from "../reducers/ticketsSlice";

import { createProgressChannel } from "./createProgressChannel";
import { searchDirections } from "../../api/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

function* workGetTicketsFetch(): Generator {
  try {
    const filters: RootState["filters"] = yield select(
      (state: RootState) => state.filters,
    );

    const progressChannel: EventChannel<number> = yield call(
      createProgressChannel,
      100,
    );

    const progressTask = yield fork(function* () {
      try {
        while (true) {
          const progress: number = yield take(progressChannel);
          yield put(setProgress(progress));
        }
      } finally {
        progressChannel.close();
      }
    });

    const data: TicketsType = yield call(searchDirections, filters);

    yield cancel(progressTask);
    yield put(setProgress(100));
    yield put(getTicketsSuccess(data));
  } catch (error) {
    yield put(getTicketsFailure(getErrorMessage(error)));
  }
}

export function* ticketsSaga() {
  yield takeLatest(getTicketsRequired.type, workGetTicketsFetch);
}
