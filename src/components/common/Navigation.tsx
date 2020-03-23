import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  categories: MovieCategory[];
}

const Navigation: React.FC<NavigationProps> = ({ categories }) => {
  return (
    <nav className="nav nav-pills nav-fill">
      {categories.map(category => {
        return (
          <NavLink
            className="nav-item nav-link"
            to={`/${category.name.toLowerCase()}`}
            key={category.id}
          >
            {category.name}
          </NavLink>
        );
      })}
    </nav>
  );
};
export default Navigation;
