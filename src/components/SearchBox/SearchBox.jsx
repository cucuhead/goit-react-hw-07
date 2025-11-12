// src/components/SearchBox/SearchBox.jsx

import { useSelector, useDispatch } from "react-redux";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice"; // Filtre Redux Mantığı
import css from "./SearchBox.module.css"; // Stil dosyanızı import edin

// Bileşen artık prop almaz (Redux gereksinimi)
const SearchBox = () => {
  // 1. Redux Store'dan mevcut filtre değerini çekiyoruz
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  // 2. Input değiştiğinde çalışan fonksiyon
  const handleChange = (event) => {
    // changeFilter Action Creator'ını çağırıp, yeni değeri payload olarak gönderiyoruz.
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.label}>Find contacts by name</p>
      <input
        type="text"
        className={css.input}
        // value prop'u artık Redux Store'dan geliyor
        value={filter}
        // onChange artık Redux'a Action gönderiyor
        onChange={handleChange}
      />
    </div>
  );
};

// Ödev gereksinimi: Varsayılan dışa aktarma (export default)
export default SearchBox;
