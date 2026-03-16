import { all } from "redux-saga/effects";
import { citiesSaga } from "./citiesSaga";
import { ticketsSaga } from "./ticketsSaga";
import { seatsSaga } from "./seatsSaga";

export default function* rootSaga() {
  yield all([citiesSaga(), ticketsSaga(), seatsSaga()]);
}
