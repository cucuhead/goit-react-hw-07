import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";

/**
 * PrivateRoute bileşeni:
 * Yalnızca giriş yapmış kullanıcılar için rotaları korur.
 * Giriş yapılmamışsa, kullanıcıyı redirectTo yoluna yönlendirir (varsayılan: /login).
 *
 * @param {object} props
 * @param {React.Component} props.component - Gösterilecek bileşen (örneğin: <ContactsPage />)
 * @param {string} props.redirectTo - Yönlendirilecek yol (varsayılan: '/')
 */
export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  // useSelector metodu kullanılır.
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Koşullu render mantığı:
  // Yenileme (refresh) işlemi devam ediyorsa VEYA giriş yapılmamışsa yönlendirme yapılır.
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  // Yenileme işlemi devam ederken (isRefreshing true) veya
  // Giriş yapılmışsa (isLoggedIn true) Component'i render et.
  // Aksi takdirde (shouldRedirect true ise) Navigate ile yönlendir.
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

// PrivateRoute'un dışa aktarılması (export default yerine tercih edilmiştir).
// Ancak App.jsx içinde <PrivateRoute /> kullanımı için sadece yukarıdaki yeterli.
// export default PrivateRoute; // Eğer default export kullanıyorsanız

// Not: Görevde belirtilen prop yapısı { component: Component, redirectTo = '/' } kullanılmıştır.
