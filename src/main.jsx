// src/main.jsx (veya main.js)

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// Redux Persist importu kaldırıldı
// import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store"; // Sadece store import edildi
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate kaldırıldı */}
      <App />
    </Provider>
  </React.StrictMode>
);
