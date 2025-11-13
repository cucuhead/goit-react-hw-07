import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

/**
 * RestrictedRoute bileşeni:
 * Yalnızca giriş YAPMAMIŞ kullanıcılar için rotalara erişim sağlar.
 * Giriş yapılmışsa, kullanıcıyı redirectTo yoluna yönlendirir (varsayılan: /).
 *
 * @param {object} props
 * @param {React.Component} props.component - Gösterilecek bileşen (örneğin: <RegistrationPage />)
 * @param {string} props.redirectTo - Yönlendirilecek yol (varsayılan: '/')
 */
export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  // useSelector metodu kullanılır.
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Koşullu render mantığı:
  // Eğer kullanıcı giriş yapmışsa, redirectTo yoluna yönlendir.
  // Giriş yapmamışsa (isLoggedIn false ise) Component'i render et.
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

// Not: Görevde belirtilen prop yapısı { component: Component, redirectTo = '/' } kullanılmıştır.
