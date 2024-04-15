import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "../features/authorization/authorizationSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({
  user: authorizationSlice,
});

// Configure persist options
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          REHYDRATE,
          "histograms/getHistograms/fulfilled",
          "publicationIds/getObjectSearchId/fulfilled",
          "publication/getObjectSearch/fulfilled",
        ],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;
