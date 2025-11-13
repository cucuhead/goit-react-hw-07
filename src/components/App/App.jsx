import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

// Sayfalar (Gereksinimler için importlar)
import HomePage from "../../components/Pages/Home/HomePage";
import RegisterPage from "../../components/Pages/Register/RegisterPage";
import LoginPage from "../../components/Pages/Login/LoginPage";
import ContactsPage from "../../components/Pages/Contacts/ContactsPage";

// Bileşenler
import { Layout } from "../Layout/Layout";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";

// Redux Operasyonları ve Seçicileri
import { refreshUser } from "../../redux/auth/operations";

import { selectIsRefreshing } from "../../redux/auth/selectors";

// Geçici Yükleme Bileşeni (Placeholder)
const Loader = () => <div>Kullanıcı bilgileri yükleniyor...</div>;

export const App = () => {
  // useDispatch() metodu kullanılır.
  const dispatch = useDispatch();

  // useSelector() metodu kullanılarak isRefreshing değeri alınır.
  const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect içinde refreshUser işlemiyle dispatch çağrılır.
  // Bağımlılık dizisinde dispatch kullanılır.
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // isRefreshing true ise bir placeholder görüntülenir.
  if (isRefreshing) {
    return <Loader />;
  }

  // isRefreshing false ise Layout bileşeni render edilir.
  return (
    <Layout>
      <Routes>
        {/* / - Ana sayfa rotası, Home bileşenini render eder. */}
        <Route path="/" element={<HomePage />} />

        {/* /register - RestrictedRoute bileşeni. */}
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />} // Registration.jsx'in RegistrationPage olarak import edildiği varsayılır.
            />
          }
        />

        {/* /login - RestrictedRoute bileşeni. */}
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<LoginPage />} // Login.jsx'in LoginPage olarak import edildiği varsayılır.
            />
          }
        />

        {/* /contacts - PrivateRoute bileşeni. */}
        <Route
          path="/contacts"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<ContactsPage />} // Contacts.jsx'in ContactsPage olarak import edildiği varsayılır.
            />
          }
        />

        {/* Tanımsız rotalar için Ana Sayfaya yönlendirme veya 404 eklenebilir. */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
};

// Default export tercih edilmelidir.
export default App;
