// src/components/App/App.jsx

import React, { useEffect } from "react"; // ⬅️ useEffect import edildi
import { useDispatch, useSelector } from "react-redux"; // ⬅️ useDispatch import edildi
import { fetchContacts } from "../../redux/contactsOps"; // ⬅️ Thunk import edildi
import { selectLoading, selectError } from "../../redux/contactsSlice"; // ⬅️ loading/error seçicileri import edildi

import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import css from "./App.module.css";

const App = () => {
  const dispatch = useDispatch(); // ⬅️ useDispatch hook'u kullanıldı
  const isLoading = useSelector(selectLoading); // Loading durumunu izle
  const isError = useSelector(selectError); // Hata durumunu izle

  // ⬅️ ÖNEMLİ DEĞİŞİKLİK: Uygulama yüklendiğinde fetchContacts işlemini başlat
  useEffect(() => {
    // Boş bağımlılık dizisi `[]` ile bileşen sadece ilk yüklendiğinde çalışır.
    // React kuralı gereği dispatch fonksiyonunu bağımlılık dizisine ekliyoruz.
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>

      {/* İletişim Formu Bölümü */}
      <div className={css.sectionForm}>
        <ContactForm />
      </div>

      {/* İletişim Listesi Bölümü */}
      <div className={css.sectionContact}>
        <h2 className={css.subtitle}>Contacts</h2>

        {/* Loading ve Error göstergeleri buraya eklenebilir */}
        {isLoading && <p>Kişi bilgileri sunucudan yükleniyor...</p>}
        {isError && (
          <p style={{ color: "red" }}>
            Kişiler yüklenirken bir hata oluştu: {isError}
          </p>
        )}

        {/* Yükleme veya hata yoksa diğer bileşenleri göster */}
        {!isLoading && !isError && (
          <>
            <SearchBox />
            <ContactList />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
