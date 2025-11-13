import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../../redux/auth/selectors";
import css from "./Home.module.css";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <div className={css.container}>
      {isLoggedIn ? (
        <>
          <h1 className={css.title}>Hoş geldin, {user.name}!</h1>
          <p className={css.text}>
            Kişisel iletişim listenizi yönetmek için sol menüden Kişiler
            sayfasına gidin.
          </p>
        </>
      ) : (
        <>
          <h1 className={css.title}>
            Telefon Rehberi Uygulamasına Hoş Geldiniz!
          </h1>
          <p className={css.text}>
            Kişisel iletişim listenizi yönetmek için lütfen Kayıt Olun veya
            Giriş Yapın.
          </p>
        </>
      )}
    </div>
  );
};

export default HomePage;
