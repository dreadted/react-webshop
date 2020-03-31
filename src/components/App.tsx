import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import slugify from "slugify";

// API
import * as API from "../lib/api";

// css
import "./scss/App.scss";

// icons
import "../lib/FontAwesome";

// components
import Navigation from "./Navigation";
import MoviesPage from "./MoviesPage";
import NotFound from "./NotFound";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Loading from "./Loading";
import SearchHits from "./SearchHits";
import Footer from "./Footer";

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

  const [clearSearch, setClearSearch] = useState<boolean>(false);

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
    const setMoviesAsync = async () => {
      const _movies: Movie[] = await API.get<Movie>("products");
      populateNewsCategory(_movies);
      _movies.sort((x, y) => (x.name > y.name ? 1 : -1));
      setMovies(_movies);
    };
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
    <div id="content">
      <Navigation
        categories={categories}
        clearSearch={clearSearch}
        setClearSearch={setClearSearch}
      />
      <main className="container-fluid text-light px-3">
        <Switch>
          <Route path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              companies={companies}
              setOrder={setOrder}
              updateCart={updateCart}
              toggleCart={toggleCart}
            />
          </Route>
          <Route path="/confirmation">
            <Confirmation
              cart={cart}
              order={order}
              companies={companies}
              movies={movies}
            />
          </Route>
          <Route path="/not-found">
            <NotFound hasButton={true} caption="404" />
          </Route>
          <Route path="/search/:slug">
            <SearchHits
              categories={categories}
              movies={movies}
              cart={cart}
              addToCart={addToCart}
              updateCart={updateCart}
              toggleCart={toggleCart}
              setClearSearch={setClearSearch}
            />
          </Route>
          <Route path="/:slug">
            <MoviesPage
              categories={categories}
              movies={movies}
              cart={cart}
              addToCart={addToCart}
              updateCart={updateCart}
              toggleCart={toggleCart}
            />
          </Route>
          <Redirect from="/" exact to="/newly-added" />
          <Route>
            <Redirect to="/not-found" />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
