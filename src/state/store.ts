import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citiesSlice";
import ticketsReducer from "./reducers/ticketsSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const ticketPersistConfig = {
  key: "ticket",
  storage,
};

const persistedTicketReducer = persistReducer(ticketPersistConfig, ticketsReducer);

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    tickets: persistedTicketReducer,
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
