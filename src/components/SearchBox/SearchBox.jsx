// src/components/SearchBox/SearchBox.jsx

import { useSelector, useDispatch } from "react-redux";
// 1. changeFilter, Slice dosyasından gelir
import { changeFilter } from "../../redux/filters/slice";
// 2. selectFilter, Selectors dosyasından gelir
import { selectFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  // Redux Store'dan mevcut filtre değerini al (Selectors dosyasından)
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // changeFilter action'ı çağrılıyor
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.label}>Find contacts by name</p>
      <input
        type="text"
        className={css.input}
        value={filter} // Değer, Redux Store'dan geliyor
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
