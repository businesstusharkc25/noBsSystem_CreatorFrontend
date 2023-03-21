import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterObj, setFilterObj } from "../services/contentSlice";
import styles from "../styles/contentTabStyles.module.scss";

const ContentSearchBar = () => {
  const filterObjFromStore = useSelector(filterObj);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();

  return (
    <div className="text-xs md:text-base px-0 md:px-4">
      <input
        onChange={(e) => {
          setSearchText(e.target.value);

          if (e.target.value) {
            dispatch(
              setFilterObj({
                ...filterObjFromStore,
                searchText: e.target.value,
              })
            );
          } else {
            const newFilterObjWithoutSearchValue = { ...filterObjFromStore };
            delete newFilterObjWithoutSearchValue.searchText;
            dispatch(setFilterObj(newFilterObjWithoutSearchValue));
          }
        }}
        type="text"
        value={searchText}
        placeholder="Search"
        className={`${styles.search_input} ${styles.search_icon} py-1 px-5 text-white`}
      />
    </div>
  );
};

export default ContentSearchBar;
