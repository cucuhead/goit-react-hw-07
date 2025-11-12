// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
// Redux Persist ile ilgili tüm importlar (persistStore, persistReducer, FLUSH, vb.) kaldırıldı.
// import storage from "redux-persist/lib/storage"; // Artık gerek yok

// Reducer'ları import etme (Persist uygulanmamış hali)
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";

// Store'u oluşturma (Redux Persist olmaksızın)
export const store = configureStore({
  reducer: {
    // Reducer'ları birleştirme
    contacts: contactsReducer, // Doğrudan contactsReducer kullanılıyor
    filters: filtersReducer,
  },
  // Redux Persist ile ilgili middleware ayarı kaldırıldı.
});

// Artık persistor'u dışa aktarmaya gerek yok
// export const persistor = persistStore(store);
