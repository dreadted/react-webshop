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

const MIN_QTY = 1;
const MAX_QTY = 99;

const App = () => {
  const [categories, setCategories] = useState<MovieCategory[]>([]);
  const [cart, setCart] = useState<Cart>(emptyCart);

  const addToCart: AddToCart = (movie, quantity) => {
    const newCartItems = new Map(cart.items);
    if (newCartItems.has(movie)) {
      const currentQty = newCartItems.get(movie);
      if (currentQty) newCartItems.set(movie, currentQty + quantity);
    } else newCartItems.set(movie, quantity);
    const [subTotal, articles] = getTotals(newCartItems);
    setCart({ ...cart, items: newCartItems, subTotal, articles });
  };

  const updateCart: UpdateCart = (movie, quantity) => {
    const newCartItems = new Map(cart.items);
    if (movie && quantity === 0) {
      newCartItems.delete(movie);
    } else if (quantity >= MIN_QTY && quantity <= MAX_QTY) {
      newCartItems.set(movie, quantity);
    }
    const [subTotal, articles] = getTotals(newCartItems);
    setCart({ ...cart, items: newCartItems, subTotal, articles });
  };

  const getTotals = (items: Map<Movie, number>) => {
    let subTotal = 0;
    let articles = 0;
    for (let [movie, quantity] of items.entries()) {
      const price = movie.price * quantity;
      subTotal += price;
      articles += quantity;
    }
    return [subTotal, articles];
  };

  const handleChange = (
    movie: Movie,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.name, e.target.value, movie.name);
  };

  useEffect(() => {
    const setCategoriesAsync = async () => {
      const c: MovieCategory[] = await API.getMovieCategories();
      c.map(
        category => (category.slug = slugify(category.name, { lower: true }))
      );
      setCategories(c);
    };
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
      <Cart cart={cart} updateCart={updateCart} />
    </div>
  );
};

export default App;
