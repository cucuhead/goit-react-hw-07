import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import { authReducer } from "./auth/slice";
import { contactsReducer } from "./contacts/slice"; // Eski contactsSlice.js'ten taşıdığınızı varsayıyorum
import { filtersReducer } from "./filters/slice"; // Eski filtersSlice.js'ten taşıdığınızı varsayıyorum

// Auth için persist yapılandırması (yalnızca token'ı sakla)
// Zorunlu olarak bu 3 alan mevcut olmalı: key, storage, whitelist
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

// store oluşturma
export const store = configureStore({
  reducer: {
    // persistReducer() fonksiyonu iki argümanla çağrılır ve auth alanına atanır
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    filters: filtersReducer,
  },
  // Redux-Persist'in action tiplerini ignore etmek için middleware eklendi
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistStore(store) metodu çağrılır ve export let persistor şeklinde dışa aktarılır
export const persistor = persistStore(store);
