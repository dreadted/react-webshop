import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import slugify from "slugify";
import packageJSON from "../../package.json";

// API
import * as API from "../lib/api";

// css
import "../scss/App.scss";

// icons
import "../lib/FontAwesome";

// context
import {
  ProductContext,
  emptyCart,
  MIN_QTY,
  MAX_QTY,
  NEWS_CATEGORY,
  NUMBER_OF_ITEMS_IN_NEWS
} from "../contexts/ProductContext";

import {
  OrderContext,
  companies,
  emptyOrder,
  orderStatusArray
} from "../contexts/OrderContext";

// components
import Navigation from "./common/Navigation";
import ProductsPage from "./shop/ProductsPage";
import NotFound from "./common/NotFound";
import Checkout from "./shop/Checkout";
import Confirmation from "./shop/Confirmation";
import Loading from "./common/Loading";
import SearchHits from "./shop/SearchHits";
import Footer from "./common/Footer";
import OrderAdmin from "./admin/OrderAdmin";
import Test from "./Test";

export const APP_INFO = {
  name: packageJSON.name,
  version: packageJSON.version,
  homepage: packageJSON.homepage,
  root: packageJSON.homepage.slice(packageJSON.homepage.lastIndexOf("/"))
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [cart, setCart] = useState<Cart>(emptyCart);
  const [order, setOrder] = useState<Order>(emptyOrder);

  const [clearSearch, setClearSearch] = useState<boolean>(false);
  const [video, setVideo] = useState<Video>({ url: "", poster: "" });

  useEffect(() => {
    const preloadVideo = async () => {
      const blob = await API.fetchBLOB(`${APP_INFO.root}/media/404.mkv`);
      const url = window.URL.createObjectURL(blob);
      const poster = `${APP_INFO.root}/media/404.jpg`;
      setVideo({ url, poster });
    };
    preloadVideo();
  }, []);

  useEffect(() => {
    setLoading(!(categories.length && products.length));
  }, [loading, categories, products]);

  useEffect(() => {
    const setCategoriesAsync = async () => {
      const c: ProductCategory[] = await API.get<ProductCategory>(
        "categories",
        true
      );
      c.unshift(NEWS_CATEGORY);
      c.map(
        category => (category.slug = slugify(category.name, { lower: true }))
      );
      setCategories(c);
    };
    setCategoriesAsync();
  }, []);

  useEffect(() => {
    const setProductsAsync = async () => {
      const _products: Product[] = await API.get<Product>("products", true);
      populateNewsCategory(_products);
      _products.sort((x, y) => (x.name > y.name ? 1 : -1));
      setProducts(_products);
    };
    setProductsAsync();
  }, []);

  useEffect(() => {
    companies.map(
      company => (company.slug = slugify(company.name, { lower: true }))
    );
  }, []);

  useEffect(() => {
    if (cart.blink) {
      setTimeout(() => setCart({ ...cart, blink: false }), 500);
    }
    if (cart.items.size) {
      localStorage.setItem(`${APP_INFO.name}.cart`, JSON.stringify(cart));
      const items: number[][] = [];
      cart.items.forEach((quantity, product) =>
        items.push([product.id, quantity])
      );
      localStorage.setItem(`${APP_INFO.name}.items`, JSON.stringify(items));
    }
  }, [cart]);

  useEffect(() => {
    const initialCart: () => Cart = () => {
      const cartString = localStorage.getItem(`${APP_INFO.name}.cart`);
      const itemsString = localStorage.getItem(`${APP_INFO.name}.items`);
      if (
        cartString &&
        cartString.length &&
        itemsString &&
        itemsString.length
      ) {
        const _cart: Cart = JSON.parse(cartString);
        const itemsArray = JSON.parse(itemsString).map((values: number[]) => {
          const [productId, quantity] = values;
          const product = products.find(m => m.id === productId);
          return [product, quantity];
        });
        _cart.items = new Map<Product, number>(itemsArray);
        return _cart;
      }
      return emptyCart;
    };
    if (products && products.length) setCart(initialCart());
  }, [products]);

  const populateNewsCategory = (_products: Product[]) => {
    _products.sort((x, y) => (x.added < y.added ? 1 : -1));
    _products
      .slice(0, NUMBER_OF_ITEMS_IN_NEWS)
      .map(product =>
        product.productCategory.push({ categoryId: NEWS_CATEGORY.id })
      );
  };

  const addToCart: AddToCart = (product, quantity) => {
    const newCartItems = new Map(cart.items);
    if (newCartItems.has(product)) {
      const currentQty = newCartItems.get(product);
      if (currentQty) newCartItems.set(product, currentQty + quantity);
    } else newCartItems.set(product, quantity);
    const [subTotal, articles] = getTotals(newCartItems);
    setCart({
      items: newCartItems,
      articles,
      subTotal,
      blink: true,
      open: false
    });
  };

  const updateCart: UpdateCart = (product, quantity) => {
    const newCartItems = new Map(cart.items);
    if (product && quantity === 0) {
      newCartItems.delete(product);
    } else if (quantity >= MIN_QTY && quantity <= MAX_QTY) {
      newCartItems.set(product, quantity);
    }
    const [subTotal, articles] = getTotals(newCartItems);
    setCart({
      items: newCartItems,
      articles,
      subTotal,
      blink: !cart.open,
      open: cart.open
    });
    console.log("newCartItems:", newCartItems);
    if (!newCartItems.size) resetCart();
  };

  const resetCart = () => {
    cart.items.clear();
    cart.articles = 0;
    cart.subTotal = 0;
    cart.open = false;
    localStorage.removeItem(`${APP_INFO.name}.cart`);
    localStorage.removeItem(`${APP_INFO.name}.items`);
  };

  const getTotals = (items: Map<Product, number>) => {
    let subTotal = 0;
    let articles = 0;
    for (let [product, quantity] of items.entries()) {
      const price = product.price * quantity;
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
      <ProductContext.Provider
        value={{
          categories,
          products,
          news: { NEWS_CATEGORY, NUMBER_OF_ITEMS_IN_NEWS }
        }}
      >
        <OrderContext.Provider
          value={{ companies, emptyOrder, orderStatusArray }}
        >
          <Navigation
            clearSearch={clearSearch}
            setClearSearch={setClearSearch}
          />
          <main className="container-fluid text-light px-3">
            <Switch>
              <Route path="/test" component={Test} />
              <Route path="/checkout">
                <Checkout
                  cart={cart}
                  order={order}
                  setOrder={setOrder}
                  updateCart={updateCart}
                  toggleCart={toggleCart}
                />
              </Route>
              <Route path="/confirmation">
                <Confirmation cart={cart} resetCart={resetCart} order={order} />
              </Route>
              <Route path="/not-found">
                <NotFound video={video} hasButton={true} caption="404" />
              </Route>
              <Route path="/admin" exact>
                <OrderAdmin />
              </Route>
              <Route path="/admin/:slug">
                <OrderAdmin />
              </Route>
              <Route path="/search/:slug">
                <SearchHits
                  cart={cart}
                  addToCart={addToCart}
                  updateCart={updateCart}
                  toggleCart={toggleCart}
                  setClearSearch={setClearSearch}
                  video={video}
                />
              </Route>
              <Route path="/:slug">
                <ProductsPage
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
        </OrderContext.Provider>
      </ProductContext.Provider>
    </div>
  );
};

export default App;
