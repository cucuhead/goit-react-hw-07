import { AppBar } from "../AppBar/AppBar"; // AppBar bileşenini import et
import { Outlet } from "react-router-dom"; // App.jsx'te Routes kullandığımız için Outlet kullanıyoruz
import css from "./Layout.module.css"; // Stil dosyasını import et (Layout.module.css oluşturulmalı)

/**
 * Layout bileşeni:
 * Tüm rotaları saran temel arayüz yapısını oluşturur.
 * AppBar'ı her zaman görünür kılar.
 */
export const Layout = ({ children }) => {
  // App.jsx dosyasında Routes sarmalandığı için {children} prop'u yerine
  // React Router'ın Outlet bileşeni kullanılabilir.
  // Ancak App.jsx'teki mevcut yapınız (Layout bileşenini Routes'ı sarmalamak için kullanmak)
  // {children} prop'unu kullanmayı gerektirir.

  return (
    <div className={css.container}>
      {/* AppBar bileşeni görüntülenir */}
      <AppBar />

      <main className={css.mainContent}>
        {/* {children} prop'u render edilir (Bu, App.jsx'teki <Routes> bileşenidir) */}
        {children}

        {/* Veya alternatif olarak, Layout bileşeni Router tarafından sarılsaydı <Outlet /> kullanılırdı. */}
        {/* <Outlet /> */}
      </main>

      {/* İsteğe bağlı olarak ToastContainer eklenebilir */}
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
    </div>
  );
};

// Layout.module.css dosyasının da oluşturulması gerekmektedir.
