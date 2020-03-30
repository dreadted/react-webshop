import React, { ChangeEvent, useRef, useEffect, Dispatch } from "react";
import { NavLink, useHistory } from "react-router-dom";

interface NavigationProps {
  categories: MovieCategory[];
  clearSearch: boolean;
  setClearSearch: Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<NavigationProps> = ({
  categories,
  clearSearch,
  setClearSearch
}) => {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (clearSearch && inputRef.current) inputRef.current.value = "";
    setClearSearch(false);
  }, [clearSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = encodeURIComponent(e.target.value);
    if (input && input.length > 1) history.push(`/search/${input}`);
  };

  return (
    <div className="bg-secondary p-2 fixed-top">
      <nav className="nav nav-pills nav-fill">
        {categories.map(category => {
          return (
            <NavLink
              className="nav-item nav-link"
              to={`/${category.slug}`}
              key={category.id}
            >
              {category.name}
            </NavLink>
          );
        })}
        <div className="mx-4 my-2 align-self-center">
          <input
            ref={inputRef}
            className="form-control w-100"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
          />
        </div>
      </nav>
    </div>
  );
};
export default Navigation;
