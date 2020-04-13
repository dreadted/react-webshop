import React, {
  ChangeEvent,
  useRef,
  useEffect,
  Dispatch,
  useCallback,
  useContext
} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// context
import { ProductContext } from "../contexts/ProductContext";

interface NavigationProps {
  clearSearch: boolean;
  setClearSearch: Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<NavigationProps> = ({
  clearSearch,
  setClearSearch
}) => {
  const { categories } = useContext(ProductContext);
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLInputElement>(null);

  const hideSearch = useCallback(
    (noDelay?: boolean) => {
      if (!noDelay) setTimeout(() => hideSearch(true), 2000);
      else
        !(inputRef && inputRef.current && inputRef.current.value) &&
          toggleRef &&
          toggleRef.current &&
          (toggleRef.current.checked = false);
    },
    [inputRef, toggleRef]
  );

  useEffect(() => {
    if (clearSearch && inputRef.current) {
      inputRef.current.value = "";
      hideSearch();
    }
    setClearSearch(false);
  }, [clearSearch, hideSearch, setClearSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = encodeURIComponent(e.target.value);
    if (!input) hideSearch();
    else input.length > 1 && history.push(`/search/${input}`);
  };

  const focusSearch = () => {
    if (toggleRef.current?.checked) inputRef.current?.focus();
  };

  return (
    <div className="bg-secondary sticky-top px-2 py-1">
      <nav className="nav nav-pills nav-fill align-items-center">
        {categories.map(category => {
          return (
            <NavLink
              className="nav-item nav-link h2 pt-2 pb-1 my-1"
              to={`/${category.slug}`}
              key={category.id}
            >
              {category.name}
            </NavLink>
          );
        })}
        <div className="nav-item">
          <input
            ref={toggleRef}
            type="checkbox"
            id="search-toggle"
            onChange={focusSearch}
          />
          <div className="search mx-4 my-0 align-self-center">
            <div className="d-flex">
              <input
                ref={inputRef}
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
              />
            </div>
          </div>
          <label
            className="search-open btn btn-secondary m-0"
            htmlFor="search-toggle"
          >
            <FontAwesomeIcon icon="search" />
          </label>
        </div>
      </nav>
    </div>
  );
};
export default Navigation;
