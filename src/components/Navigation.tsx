import React, { ChangeEvent } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavigationProps {
  categories: MovieCategory[];
}

const Navigation: React.FC<NavigationProps> = ({ categories }) => {
  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = encodeURIComponent(e.target.value);
    if (input && input.length > 1) history.push(`/search/${input}`);
  };

  return (
    <nav className="navbar navbar-expand-md bg-secondary p-2 fixed-top">
      <div className="navbar-collapse justify-content-between">
        <div className="navbar-nav nav-pills nav-fill flex-grow-1">
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
        </div>
        <form className="form my-2 my-lg-0">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                <FontAwesomeIcon icon="search" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
};
export default Navigation;
