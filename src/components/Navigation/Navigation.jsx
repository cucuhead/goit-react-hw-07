import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css"; // ✨ CSS Modülü import edildi

/**
 * Navigation bileşeni:
 * isLoggedIn durumuna göre /contacts linkini koşullu olarak gösterir.
 */
export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // CSS Modülüne göre stil sınıfı döndüren yardımcı fonksiyon
  const getNavLinkClass = ({ isActive }) =>
    `${css.link} ${isActive ? css.active : ""}`;

  return (
    <nav className={css.nav}>
      {/* / yoluna sahip bir NavLink bileşeni render ediliyor. */}
      <NavLink to="/" className={getNavLinkClass}>
        Ana Sayfa
      </NavLink>

      {/* Eğer isLoggedIn true ise /contacts yoluna sahip bir NavLink render ediliyor. */}
      {isLoggedIn && (
        <NavLink to="/contacts" className={getNavLinkClass}>
          Kişiler
        </NavLink>
      )}
    </nav>
  );
};
