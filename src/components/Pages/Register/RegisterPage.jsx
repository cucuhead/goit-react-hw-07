import RegistrationForm from "../../../components/RegistrationForm/RegistrationForm"; // Form bileşeni buraya gelecek
import css from "./Register.module.css";

const RegisterPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Kayıt Ol</h1>
      {/* RegistrationForm bileşeni render ediliyor */}
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
