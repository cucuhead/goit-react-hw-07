import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filters/selectors"; // filters/selectors.js'ten import edilecek

// Temel seçiciler
export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;

// Memoize edilmiş selectFilteredContacts seçicisi
// İlk argüman olarak [selectContacts, selectNameFilter] değerlerini içeren bir dizi alır
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter], // selectFilter, NameFilter'ın yerini aldı
  (contacts, filter) => {
    // Boş veya null filtre varsa tüm kişileri döndür
    if (!filter) return contacts;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      (contact) =>
        // Hem ada hem de numaraya göre filtreleme (Ekstra koşul)
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
  }
);
