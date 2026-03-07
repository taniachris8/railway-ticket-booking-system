import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citiesSlice";
import ticketsReducer from "./reducers/ticketsSlice";
import filterReducer from "./reducers/filterSlice";
import seatsReducer from "./reducers/seatsSlice";
import seatsFilterReducer from "./reducers/filterSeatsSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const ticketPersistConfig = {
  key: "ticket",
  storage,
};

const filterPersistConfig = {
  key: "filter",
  storage,
};

const seatsPersistConfig = {
  key: "seats",
  storage,
};

const seatsFiltersPersistConfig = {
  key: "seatsFilters",
  storage,
};

const persistedTicketReducer = persistReducer(
  ticketPersistConfig,
  ticketsReducer,
);
const persistedFilterReducer = persistReducer(filterPersistConfig, filterReducer);
const persistedSeatsReducer = persistReducer(seatsPersistConfig, seatsReducer);
const persistedSeatsFiltersReducer = persistReducer(
  seatsFiltersPersistConfig,
  seatsFilterReducer,
);

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    tickets: persistedTicketReducer,
    filters: persistedFilterReducer,
    seats: persistedSeatsReducer,
    seatsFilters: persistedSeatsFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
