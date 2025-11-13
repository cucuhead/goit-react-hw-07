import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css"; // ✨ CSS Modülü import edildi

/**
 * UserMenu: Kullanıcının e-postasını ve Çıkış yap butonunu gösterir.
 * Kullanıcı giriş yaptığında AppBar'da görünür.
 */
export const UserMenu = () => {
  // useDispatch metodu kullanılır.
  const dispatch = useDispatch();

  // useSelector metodu kullanılır.
  // Kullanıcının adı/e-postası (bu durumda e-postası) render ediliyor.
  const user = useSelector(selectUser);

  // Bir buton mevcut ve onClick metodunda logOut işlemiyle dispatch çağrılıyor.
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.container}>
      <p className={css.welcomeText}>
        Hoş geldin,{" "}
        <span className={css.userName}>{user.name || user.email}</span>
      </p>
      <button type="button" onClick={handleLogout} className={css.logoutButton}>
        Çıkış Yap
      </button>
    </div>
  );
};
