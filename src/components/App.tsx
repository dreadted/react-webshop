import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// API
import * as API from "../api";

// components
import Navigation from "./common/Navigation";
import MoviesPage from "./MoviesPage";
import NoPage from "./NoPage";

// const categories: MovieCategory[] = [
//   { id: 1, name: "Första" },
//   { id: 2, name: "Andra" },
//   { id: 3, name: "Tredje" }
// ];

const App = () => {
  const [categories, setCategories] = useState<MovieCategory[]>([]);

  useEffect(() => {
    async function setCategoriesAsync() {
      const c: MovieCategory[] = await API.getMovieCategories();
      c.map(category => (category.slug = category.name.toLowerCase()));
      setCategories(c);
    }
    setCategoriesAsync();
  }, [categories]);

  return (
    <div className="container-fluid bg-secondary text-light">
      <Navigation categories={categories} />
      <Switch>
        <Route path="/movies/:slug">
          <MoviesPage categories={categories} />
        </Route>
        <Route component={NoPage} />
      </Switch>
    </div>
  );
};

export default App;
