import { all, call, put, takeLatest, select, take, fork, cancel } from "redux-saga/effects";
import { END, eventChannel, type EventChannel } from "redux-saga";

import {
  getCitiesRequired,
  getCitiesSuccess,
  getCitiesFailure,
} from "./reducers/citiesSlice";

import {
  getTicketsRequired,
  getTicketsSuccess,
  getTicketsFailure,
  setProgress,
} from "./reducers/ticketsSlice";

import {  getSeatsRequired,
  getSeatsSuccess,
  getSeatsFailure,
  setSeatsProgress,} from "./reducers/seatsSlice";

import { searchCities, searchDirections, searchSeats } from "../api/api";
import type { CityType } from "./reducers/citiesSlice";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { TicketsType, SeatsInfoType } from "../types";
import type { RootState } from "./store";

function* workGetCitiesFetch(action: ReturnType<typeof getCitiesRequired>) {
  try {
    const searchTerm: string = action.payload;
    const data: CityType[] = yield call(searchCities, searchTerm);
    yield put(getCitiesSuccess(data));
  } catch (error) {
    yield put(getCitiesFailure(getErrorMessage(error)));
  }
}

function* citiesSaga() {
  yield takeLatest(getCitiesRequired.type, workGetCitiesFetch);
}

function createProgressChannel(totalSteps: number): EventChannel<number> {
  return eventChannel((emit) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      emit(progress);
      if (progress >= totalSteps) {
        clearInterval(interval);
        emit(END);
      }
    }, 50);
    return () => clearInterval(interval);
  });
}

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
    console.log("Response:", data);

    yield cancel(progressTask);
    yield put(setProgress(100));
    yield put(getTicketsSuccess(data));
  } catch (error) {
    yield put(getTicketsFailure(getErrorMessage(error)));
  }
}

function* ticketsSaga() {
  yield takeLatest(getTicketsRequired.type, workGetTicketsFetch);
}

//////////////////////////////
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
    console.log("Response:", data);

    yield cancel(progressTask);
    yield put(setSeatsProgress(100));
    yield put(getSeatsSuccess(data));
  } catch (error) {
    yield put(getSeatsFailure(getErrorMessage(error)));
  }
}

function* seatsSaga() {
  yield takeLatest(getSeatsRequired.type, workGetSeatsFetch);
}
/////////////////////////////

export default function* rootSaga() {
  yield all([citiesSaga(), ticketsSaga(), seatsSaga()]);
}
