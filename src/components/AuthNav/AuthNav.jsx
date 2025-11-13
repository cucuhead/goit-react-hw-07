import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css"; // ✨ CSS Modülü import edildi

/**
 * AuthNav: Kayıt Ol ve Giriş Yap linklerini gösteren bileşen.
 * Kullanıcı giriş yapmadığında AppBar'da görünür.
 */
export const AuthNav = () => {
  // CSS Modülüne göre stil sınıfı döndüren yardımcı fonksiyon
  const getNavLinkClass = ({ isActive }) =>
    `${css.link} ${isActive ? css.active : ""}`;

  return (
    <div className={css.navContainer}>
      {/* /register değerine sahip bir NavLink mevcut. */}
      <NavLink to="/register" className={getNavLinkClass}>
        Kayıt Ol
      </NavLink>

      {/* /login değerine sahip bir NavLink mevcut. */}
      <NavLink to="/login" className={getNavLinkClass}>
        Giriş Yap
      </NavLink>
    </div>
  );
};
