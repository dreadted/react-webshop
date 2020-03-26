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

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faPlusCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Checkout from "./Checkout";

library.add(
  faShoppingCart,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faPlusCircle,
  faMinusCircle,
  faTrashAlt
);

const emptyCart: Cart = {
  items: new Map(),
  articles: 0,
  subTotal: 0,
  blink: false,
  open: false
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
    setCart({
      ...cart,
      items: newCartItems,
      subTotal,
      articles,
      open: false,
      blink: true
    });
  };

  const updateCart: UpdateCart = (movie, quantity) => {
    const newCartItems = new Map(cart.items);
    if (movie && quantity === 0) {
      newCartItems.delete(movie);
    } else if (quantity >= MIN_QTY && quantity <= MAX_QTY) {
      newCartItems.set(movie, quantity);
    }
    const [subTotal, articles] = getTotals(newCartItems);
    setCart({
      ...cart,
      items: newCartItems,
      subTotal,
      articles,
      blink: !cart.open
    });
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

  useEffect(() => {
    if (cart.blink) {
      setTimeout(() => setCart({ ...cart, blink: false }), 500);
    }
  }, [cart]);

  const toggleCart = () => {
    if (cart.articles) setCart({ ...cart, open: !cart.open });
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
          <MoviesPage
            categories={categories}
            cart={cart}
            addToCart={addToCart}
            updateCart={updateCart}
            toggleCart={toggleCart}
          />
        </Route>
        <Redirect from="/" exact to="/movies" />
        <Route path="/movies">
          <MoviesPage
            categories={categories}
            cart={cart}
            addToCart={addToCart}
            updateCart={updateCart}
            toggleCart={toggleCart}
          />
        </Route>
        <Route path="/checkout" component={Checkout} />
        <Route component={NoPage} />
      </Switch>
    </div>
  );
};

export default App;
