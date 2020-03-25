import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import slugify from "slugify";

// API
import * as API from "../api";

// components
import Navigation from "./common/Navigation";
import MoviesPage from "./MoviesPage";
import NoPage from "./NoPage";

// css
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const App = () => {
  const [categories, setCategories] = useState<MovieCategory[]>([]);

  useEffect(() => {
    async function setCategoriesAsync() {
      const c: MovieCategory[] = await API.getMovieCategories();
      c.map(
        category => (category.slug = slugify(category.name, { lower: true }))
      );
      setCategories(c);
    }
    setCategoriesAsync();
  }, []);

  return (
    <div className="container-fluid text-light p-4">
      <Navigation categories={categories} />
      <Switch>
        <Route path="/movies/:slug">
          <MoviesPage categories={categories} />
        </Route>
        <Redirect from="/" exact to="/movies" />
        <Route path="/movies">
          <MoviesPage categories={categories} />
        </Route>
        <Route component={NoPage} />
      </Switch>
    </div>
  );
};

export default App;
