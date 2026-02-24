import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getCitiesRequired,
  getCitiesSuccess,
  getCitiesFailure,
} from "./reducers/citiesSlice";

import { searchCities } from "../api/api";

import type { CityType } from "./reducers/citiesSlice";

import { getErrorMessage } from "../utils/getErrorMessage";

function* workGetCitiesFetch(action: ReturnType<typeof getCitiesRequired>) {
  try {
    const searchTerm: string = action.payload;
    const data: CityType[] = yield call(searchCities, searchTerm);
    yield put(getCitiesSuccess(data));
  } catch (error) {
    yield put(getCitiesFailure(getErrorMessage(error)));
  }
}

function* citySearchSaga() {
  yield takeLatest(getCitiesRequired.type, workGetCitiesFetch);
}

export default function* rootSaga() {
  yield all([citySearchSaga()]);
}
