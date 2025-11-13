import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../../redux/contacts/operations";
import {
  selectError,
  selectIsLoading,
} from "../../../redux/contacts/selectors";
// Sizin dosya yapınızdaki isim: SearchBox
import SearchBox from "../../../components/SearchBox/SearchBox";
import ContactForm from "../../../components/ContactForm/ContactForm";
import ContactList from "../../../components/ContactList/ContactList";
import css from "./Contacts.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Kişileri yükle
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.mainTitle}>Telefon Rehberiniz</h1>

      <ContactForm />

      <h2 className={css.sectionTitle}>Kişiler</h2>

      {/* Filter bileşeni yerine SearchBox bileşeni render ediliyor */}
      <SearchBox />

      {isLoading && !error && (
        <p className={css.loadingText}>
          Kişiler yükleniyor, lütfen bekleyin...
        </p>
      )}

      {error && (
        <p className={css.errorText}>
          Kişiler yüklenirken hata oluştu: {error}
        </p>
      )}

      <ContactList />
    </div>
  );
};

export default ContactsPage;
