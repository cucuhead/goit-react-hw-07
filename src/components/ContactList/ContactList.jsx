// src/components/ContactList/ContactList.jsx

import { useSelector, useDispatch } from "react-redux"; // useDispatch ekledik (Contact bileşeninde sildiğimiz prop'u kullanabiliriz)

// ⬅️ ÖNEMLİ DEĞİŞİKLİK: selectFilteredContacts seçicisini import ediyoruz.
// selectContacts ve selectNameFilter artık burada kullanılmayacak.
import {
  selectFilteredContacts,
  selectLoading,
  selectError,
} from "../../redux/contactsSlice";

import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
// import { deleteContact } from "../../redux/contactsOps"; // Delete işlemi burada değil, Contact.jsx'te çağrılır

// ⬅️ ÖNEMLİ DEĞİŞİKLİK: getVisibleContacts fonksiyonunu siliyoruz!
// Bu mantık artık selectFilteredContacts içinde (contactsSlice.js'te) bulunuyor.

// Bileşen artık prop almıyor
const ContactList = () => {
  // Redux Store'dan gerekli verileri çekme
  // ⬅️ YENİ: Memolu seçiciyi kullanarak filtrelenmiş listeyi alıyoruz
  const visibleContacts = useSelector(selectFilteredContacts);

  // loading ve error durumlarını App.jsx'te gösteriyor olsak da,
  // burada da durumu kontrol edebiliriz
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  // Contacts sayısını doğrudan store'dan alabiliriz
  const totalContacts = useSelector((state) => state.contacts.items.length);

  // Filtre değeri, sadece mesaj için gerekliyse tekrar çekilebilir
  const filter = useSelector((state) => state.filters.name);

  // Hata ve yükleme durumlarını handle et
  if (isLoading && totalContacts === 0) {
    return <p className={css.message}>Kişiler yükleniyor...</p>;
  }

  if (isError) {
    return (
      <p className={css.message} style={{ color: "red" }}>
        Kişi listesi yüklenemedi.
      </p>
    );
  }

  // Görünür iletişim listesini render etme
  return (
    <div className={css.container}>
      {visibleContacts.length === 0 && totalContacts > 0 && filter !== "" ? (
        <p className={css.message}>
          "{filter}" filtresine uyan kişi bulunamadı.
        </p>
      ) : visibleContacts.length === 0 && totalContacts === 0 && !isLoading ? (
        <p className={css.message}>
          Telefon rehberiniz boş. Yeni bir kişi ekleyin!
        </p>
      ) : (
        <ul className={css.list}>
          {/* VisibleContacts üzerinde map yapıyoruz */}
          {visibleContacts.map((contact) => (
            <li className={css.listItem} key={contact.id}>
              {/* contact objesinin tamamını prop olarak geçmek daha temizdir */}
              <Contact contact={contact} />
              {/* Contact bileşenini contact objesi alacak şekilde güncellediğimiz için (önceki adımda), 
                  burada sadece contact objesini geçiyoruz. */}
              {/* <Contact id={contact.id} name={contact.name} number={contact.number} /> // Eski versiyon */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Ödev gereksinimi: Varsayılan dışa aktarma (export default)
export default ContactList;
