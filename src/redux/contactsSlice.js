// src/redux/contactsSlice.js

import { createSlice, createSelector } from "@reduxjs/toolkit";
// Thunk'ları ve selectNameFilter'ı kullanmak için importlar
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

// Yardımcı Fonksiyon: İşlem beklemedeyken (pending) durumu ayarlar
const handlePending = (state) => {
  state.loading = true;
  state.error = null; // Yeni bir istek başladığında hatayı temizle
};

// Yardımcı Fonksiyon: İşlem reddedildiğinde (rejected) durumu ayarlar
const handleRejected = (state, action) => {
  state.loading = false;
  // action.payload, thunkAPI.rejectWithValue ile döndürülen hata mesajıdır
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    // Ödev gereksinimi: loading ve error eklendi
    items: [],
    loading: false,
    error: null,
  },
  // Ödev gereksinimi: reducers alanı boş olmalı veya kaldırılmalıdır.
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ------------------------------------------------------------------
      // --- fetchContacts İşlemi (GET) ---
      // ------------------------------------------------------------------
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload; // Backend'den gelen kişi dizisini kaydet
      })
      .addCase(fetchContacts.rejected, handleRejected)

      // ------------------------------------------------------------------
      // --- addContact İşlemi (POST) ---
      // ------------------------------------------------------------------
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload); // Backend'den dönen yeni kişiyi state'e ekle
      })
      .addCase(addContact.rejected, handleRejected)

      // ------------------------------------------------------------------
      // --- deleteContact İşlemi (DELETE) ---
      // ------------------------------------------------------------------
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // action.payload, silinen kişinin ID'sidir (contactsOps.js'ten geliyor)
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

// Reducer'ın dışa aktarımı
export const contactsReducer = contactsSlice.reducer;

// Temel seçicilerin duyurulması
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// Memolu Seçici (Memoized Selector) - Ödev Gereksinimi
// Yalnızca contacts.items veya filters.name değiştiğinde tekrar hesaplanır.
export const selectFilteredContacts = createSelector(
  // Girdilerin (Input) dizisi
  [selectContacts, selectNameFilter],
  // Çıktı (Output) fonksiyonu
  (contacts, nameFilter) => {
    // Filtreleme mantığı
    const normalizedFilter = nameFilter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
