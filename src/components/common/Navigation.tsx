import React from "react";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  categories: MovieCategory[];
}

const Navigation: React.FC<NavigationProps> = ({ categories }) => {
  return (
    <div className="bg-dark p-1 fixed-top">
      <nav className="nav nav-pills nav-fill">
        <NavLink className="nav-item nav-link" to="/movies" exact>
          Newly added
        </NavLink>
        {categories.map(category => {
          return (
            <NavLink
              className="nav-item nav-link"
              to={`/movies/${category.slug}`}
              key={category.id}
            >
              {category.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
export default Navigation;
