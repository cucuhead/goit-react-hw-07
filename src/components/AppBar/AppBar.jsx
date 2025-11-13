import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";
import { Navigation } from "../Navigation/Navigation";
import css from "./AppBar.module.css"; // ✨ CSS Modülü import edildi

/**
 * AppBar: Uygulamanın en üst navigasyon çubuğu.
 * Şartnameye uygun olarak Navigation, AuthNav ve UserMenu'yu içerir.
 */
export const AppBar = () => {
  // useSelector metodu kullanılarak isLoggedIn alanına erişim sağlanıyor.
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    // Tailwind sınıfları yerine CSS Modülü sınıfı kullanıldı
    <header className={css.header}>
      {/* Navigation bileşeni render ediliyor. */}
      <Navigation />

      {/* Giriş durumuna göre UserMenu veya AuthNav gösterimi */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};
