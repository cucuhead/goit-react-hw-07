// src/components/Contact/Contact.jsx

import { useDispatch } from "react-redux";
// ⬅️ ÖNEMLİ DEĞİŞİKLİK: contactsSlice yerine contactsOps'tan import ediyoruz
import { deleteContact } from "../../redux/contactsOps";
import css from "./Contact.module.css";
// lucide-react kütüphanesinden telefon ve kullanıcı ikonları import edilebilir
// import { Phone, User } from 'lucide-react'; // Varsayımsal ikonlar

// Bileşen artık id, name, number prop'ları yerine bir contact objesi alıyor gibi görünüyor,
// ancak mevcut kodunuz id, name, number destructuring yaptığı için
// ben bu yapıyı koruyacağım. Eğer ContactList'ten contact objesi geliyorsa,
// ContactList'te yaptığınız gibi contact.id, contact.name, contact.number şeklinde kullanmanız gerekir.
// NOT: Önceki cevabımda ContactList'te bu şekilde bir prop geçişi yapmıştım:
// <Contact contact={contact} onDelete={handleDelete} />
// Bu yüzden Contact bileşenini contact objesi alacak şekilde güncelliyorum.

// const Contact = ({ id, name, number }) => { // Mevcut hali
const Contact = ({ contact }) => {
  // ⬅️ Daha temiz kullanım için contact objesi alıyoruz
  const { id, name, number } = contact; // Objeyi destructuring yapıyoruz

  const dispatch = useDispatch();

  const handleDelete = () => {
    // ⬅️ THUNK'ı çağırıp, sonucu dispatch ediyoruz.
    // Bu, backend'e DELETE isteği gönderecektir.
    dispatch(deleteContact(id));
  };

  return (
    // Dış <li> hatasını düzeltmek için <li> yerine <div> kullanılıyor.
    <div className={css.wrapper}>
      <div className={css.listDiv}>
        <p className={css.name}>
          {/* <User size={16} style={{ marginRight: '8px' }} /> */}
          {name.toUpperCase()}
        </p>
        <p className={css.number}>
          {/* <Phone size={16} style={{ marginRight: '8px' }} /> */}
          {number}
        </p>
      </div>
      <button type="button" onClick={handleDelete} className={css.deleteBtn}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
