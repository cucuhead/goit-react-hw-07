import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// Uygulama içinde sayfa yönlendirmesi için gerekli
import { BrowserRouter } from "react-router-dom";
// Auth token'ının yerel depolamada kalması için gerekli
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
// components/App yerine, daha yaygın kullanılan yolu varsayıyoruz
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter: Uygulamanın yönlendirme yapmasını sağlar */}
    <BrowserRouter>
      <Provider store={store}>
        {/* PersistGate: Redux state'inin depodan geri yüklenmesini bekler. 
            loading prop'u, yüklenme süresince gösterilecek bileşendir. */}
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
