import LoginForm from "../../../components/LoginForm/LoginForm"; // Form bileşeni buraya gelecek
import css from "./Login.module.css";

const LoginPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Giriş Yap</h1>
      {/* LoginForm bileşeni render ediliyor */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
