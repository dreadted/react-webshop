import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import slugify from "slugify";

// API
import * as API from "../api";

// css
import "./scss/App.scss";

// components
import Navigation from "./Navigation";
import MoviesPage from "./MoviesPage";
import NoPage from "./NoPage";

// icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faPlusCircle,
  faMinusCircle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex
} from "@fortawesome/free-brands-svg-icons";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Loading from "./Loading";

library.add(
  faShoppingCart,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faPlusCircle,
  faMinusCircle,
  faSpinner,
  faTrashAlt,
  faCcVisa,
  faCcMastercard,
  faCcAmex
);

const emptyCart: Cart = {
  items: new Map(),
  articles: 0,
  subTotal: 0,
  blink: false,
  open: false
};

const emptyOrder: Order = {
  companyId: 0,
  created: "",
  createdBy: "",
  paymentMethod: "",
  totalPrice: 0,
  status: 0
};

const MIN_QTY = 1;
const MAX_QTY = 99;
const NEWS_CATEGORY = -1;
const NUMBER_OF_ITEMS_IN_NEWS = 4;

const companies = ["", "Telia", "Volvo", "Skanska", "ABB"];

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<MovieCategory[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [cart, setCart] = useState<Cart>(emptyCart);
  const [order, setOrder] = useState<Order>(emptyOrder);

  useEffect(() => {
    setLoading(!(categories.length && movies.length));
  }, [loading, categories, movies]);

  useEffect(() => {
    const setCategoriesAsync = async () => {
      const c: MovieCategory[] = await API.get<MovieCategory>("categories");
      c.unshift({ id: NEWS_CATEGORY, name: "Newly added" });
      c.map(
        category => (category.slug = slugify(category.name, { lower: true }))
      );
      setCategories(c);
    };
    setCategoriesAsync();
  }, []);

  useEffect(() => {
    async function setMoviesAsync() {
      const _movies: Movie[] = await API.get<Movie>("products");
      populateNewsCategory(_movies);
      _movies.sort((x, y) => (x.name > y.name ? 1 : -1));
      setMovies(_movies);
    }
    setMoviesAsync();
  }, []);

  useEffect(() => {
    if (cart.blink) {
      setTimeout(() => setCart({ ...cart, blink: false }), 500);
    }
    if (cart.items.size) {
      localStorage.setItem("cart", JSON.stringify(cart));
      const items: number[][] = [];
      cart.items.forEach((quantity, movie) => items.push([movie.id, quantity]));
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [cart]);

  useEffect(() => {
    const initialCart: () => Cart = () => {
      const cartString = localStorage.getItem("cart");
      const itemsString = localStorage.getItem("items");
      if (
        cartString &&
        cartString.length &&
        itemsString &&
        itemsString.length
      ) {
        const _cart: Cart = JSON.parse(cartString);
        const itemsArray = JSON.parse(itemsString).map((values: number[]) => {
          const [movieId, quantity] = values;
          const movie = movies.find(m => m.id === movieId);
          return [movie, quantity];
        });
        _cart.items = new Map<Movie, number>(itemsArray);
        // console.log("initial cart:", _cart);
        return _cart;
      }
      return emptyCart;
    };
    if (movies && movies.length) setCart(initialCart());
  }, [movies]);

  const populateNewsCategory = (_movies: Movie[]) => {
    _movies.sort((x, y) => (x.added < y.added ? 1 : -1));
    _movies
      .slice(0, NUMBER_OF_ITEMS_IN_NEWS)
      .map(movie => movie.productCategory.push({ categoryId: NEWS_CATEGORY }));
  };

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

  const toggleCart = () => {
    if (cart.articles) setCart({ ...cart, open: !cart.open });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="container-fluid text-light p-4">
        <Navigation categories={categories} />
        <Switch>
          <Route path="/movies/checkout">
            <Checkout
              cart={cart}
              order={order}
              companies={companies}
              setOrder={setOrder}
              updateCart={updateCart}
              toggleCart={toggleCart}
            />
          </Route>
          <Route path="/movies/confirmation">
            <Confirmation
              cart={cart}
              order={order}
              companies={companies}
              movies={movies}
            />
          </Route>
          <Route path="/movies/:slug">
            <MoviesPage
              categories={categories}
              movies={movies}
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
              movies={movies}
              cart={cart}
              addToCart={addToCart}
              updateCart={updateCart}
              toggleCart={toggleCart}
            />
          </Route>

          <Route component={NoPage} />
        </Switch>
      </div>
      <div className="bottom-margin p-4">
        <p>
          <small className="text-info">&copy; 2020 Christofer Laurin</small>
        </p>
      </div>
    </>
  );
};

export default App;
