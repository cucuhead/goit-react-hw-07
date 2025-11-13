import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

// Doğrulama Şeması
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta zorunludur"),
  password: Yup.string()
    .min(7, "Şifre çok kısa (min 7 karakter)")
    .required("Şifre zorunludur"),
});

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      // unwrap() ile rejected action'ı catch bloğuna düşürüyoruz
      await dispatch(logIn(values)).unwrap();
      actions.resetForm();
    } catch (error) {
      // Hata varsa password alanının altında göster
      actions.setErrors({ password: "E-posta veya şifre hatalı" });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className={css.form}>
        {/* E-posta Alanı */}
        <div className={css.inputGroup}>
          <label htmlFor="login-email" className={css.label}>
            E-posta
          </label>
          <Field
            type="email"
            name="email"
            id="login-email"
            className={css.input}
          />
          <ErrorMessage name="email" component="span" className={css.error} />
        </div>

        {/* Şifre Alanı */}
        <div className={css.inputGroup}>
          <label htmlFor="login-password" className={css.label}>
            Şifre
          </label>
          <Field
            type="password"
            name="password"
            id="login-password"
            className={css.input}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
        </div>

        <button type="submit" className={css.button}>
          Giriş Yap
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
