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

import { searchCities, searchDirections } from "../api/api";
import type { CityType } from "./reducers/citiesSlice";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { TicketsType } from "../types";
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

// function* workGetTicketsFetch(): Generator{
//   try {
//     const state: RootState = yield select();
//     const { from_city_id, to_city_id, limit } = state.filters;

//     const progressChannel: EventChannel<number> = yield call(
//       createProgressChannel,
//       100,
//     );
//     yield call(function* (): Generator{
//       try {
//         while (true) {
//           const progress: number = yield take(progressChannel);
//           yield put(setProgress(progress));
//         }
//       } finally {
//         progressChannel.close();
//       }
//     });

//     const data: TicketsType = yield call(
//       searchDirections,
//       from_city_id,
//       to_city_id,
//       limit,
//     );

//     console.log("IDs:", from_city_id, to_city_id);
//     console.log("Response:", data);

//     yield put(getTicketsSuccess(data));
//     progressChannel.close();
//   } catch (error) {
//     yield put(getTicketsFailure(getErrorMessage(error)));
//   }
// }

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

export default function* rootSaga() {
  yield all([citiesSaga(), ticketsSaga()]);
}
