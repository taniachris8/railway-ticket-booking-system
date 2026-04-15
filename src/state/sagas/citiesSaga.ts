import { call, put, takeLatest } from "redux-saga/effects";

import type { CityType } from "../../types";

import {
  getCitiesRequired,
  getCitiesSuccess,
  getCitiesFailure,
} from "../reducers/citiesSlice";

import { searchCities } from "../../api/api";
import { getErrorMessage } from "../../utils/getErrorMessage";

function* workGetCitiesFetch(action: ReturnType<typeof getCitiesRequired>) {
  try {
    const searchTerm: string = action.payload;
    const data: CityType[] = yield call(searchCities, searchTerm);
    yield put(getCitiesSuccess(data));
  } catch (error) {
    yield put(getCitiesFailure(getErrorMessage(error)));
  }
}

export function* citiesSaga() {
  yield takeLatest(getCitiesRequired.type, workGetCitiesFetch);
}
