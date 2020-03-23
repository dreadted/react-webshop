import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// API
import * as API from "../api";

// components
import Navigation from "./common/Navigation";

// const categories: MovieCategory[] = [
//   { id: 1, name: "Första" },
//   { id: 2, name: "Andra" },
//   { id: 3, name: "Tredje" }
// ];

function App() {
  const [categories, setCategories] = useState<MovieCategory[]>([]);

  useEffect(() => {
    async function setCategoriesAsync() {
      const c: MovieCategory[] = await API.getMovieCategories();
      setCategories(c);
    }
    setCategoriesAsync();
  }, [categories]);

  return (
    <div className="container-fluid">
      <h1>Hello World!</h1>
      <Navigation categories={categories} />
    </div>
  );
}

export default App;
