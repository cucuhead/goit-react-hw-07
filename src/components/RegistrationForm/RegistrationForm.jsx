import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations"; // Auth register işlemi
import css from "./RegistrationForm.module.css"; // CSS Modülü

// Doğrulama Şeması (Validation Schema)
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Ad çok kısa (min 3 karakter)")
    .max(50, "Ad çok uzun (max 50 karakter)")
    .required("Ad zorunludur"),
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta zorunludur"),
  password: Yup.string()
    .min(7, "Şifre çok kısa (min 7 karakter)")
    .required("Şifre zorunludur"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

/**
 * RegistrationForm: Kullanıcı kayıt formunu içerir.
 * Prop almaz ve register işlemini tetikler.
 */
export const RegistrationForm = () => {
  // useDispatch() metodu çağrılıyor.
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    // onSubmit() metodunda dispatch kullanılarak register işlemi çağrılıyor.
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegisterSchema}
    >
      <Form className={css.form}>
        {/* Name Alanı */}
        <div className={css.inputGroup}>
          <label htmlFor="name" className={css.label}>
            Adınız
          </label>
          <Field type="text" name="name" id="name" className={css.input} />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>

        {/* E-posta Alanı */}
        <div className={css.inputGroup}>
          <label htmlFor="email" className={css.label}>
            E-posta
          </label>
          <Field type="email" name="email" id="email" className={css.input} />
          <ErrorMessage name="email" component="span" className={css.error} />
        </div>

        {/* Şifre Alanı */}
        <div className={css.inputGroup}>
          <label htmlFor="password" className={css.label}>
            Şifre
          </label>
          <Field
            type="password"
            name="password"
            id="password"
            className={css.input}
          />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
        </div>

        <button type="submit" className={css.button}>
          Kayıt Ol
        </button>
      </Form>
    </Formik>
  );
};

// Varsayılan dışa aktarma tercih edilir.
export default RegistrationForm;
