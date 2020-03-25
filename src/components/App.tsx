import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import slugify from "slugify";

// API
import * as API from "../api";

// css
import "./App.scss";

// components
import Navigation from "./common/Navigation";
import MoviesPage from "./MoviesPage";
import NoPage from "./NoPage";
import Cart from "./Cart";

const emptyCart: Cart = {
  items: new Map(),
  articles: 0,
  subTotal: 0,
  openState: false
};

const App = () => {
  const [categories, setCategories] = useState<MovieCategory[]>([]);
  const [cart, setCart] = useState<Cart>(emptyCart);

  const addToCart: AddToCart = (movie, quantity) => {
    const newCartItems = new Map(cart.items);
    if (newCartItems.has(movie)) {
      const currentQty = newCartItems.get(movie);
      if (currentQty) newCartItems.set(movie, currentQty + quantity);
    } else newCartItems.set(movie, quantity);
    setCart({ ...cart, items: newCartItems });
  };

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
          <MoviesPage categories={categories} addToCart={addToCart} />
        </Route>
        <Redirect from="/" exact to="/movies" />
        <Route path="/movies">
          <MoviesPage categories={categories} addToCart={addToCart} />
        </Route>
        <Route component={NoPage} />
      </Switch>
      <Cart cart={cart} />
    </div>
  );
};

export default App;
