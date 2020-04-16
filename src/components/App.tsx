import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// css
import "../scss/App.scss";
import Container from "react-bootstrap/Container";

// icons
import "../lib/FontAwesome";

// context
import {
  ProductContext,
  NEWS_CATEGORY,
  NUMBER_OF_ITEMS_IN_NEWS
} from "./contexts/ProductContext";

import { OrderContext, companies, emptyOrder } from "./contexts/OrderContext";

// hooks
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import { useVideo } from "./hooks/useVideo";

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

const App = () => {
  const { categories, products, loading } = useProducts();
  const [cart, dispatch] = useCart(products);
  const [order, setOrder] = useState<Order>(emptyOrder);

  const [clearSearch, setClearSearch] = useState<boolean>(false);

  const video = useVideo();

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
          value={{ companies, cart, dispatch, order, setOrder }}
        >
          <Navigation
            clearSearch={clearSearch}
            setClearSearch={setClearSearch}
          />
          <Container fluid as="main">
            <Switch>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/confirmation">
                <Confirmation />
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
                <SearchHits setClearSearch={setClearSearch} video={video} />
              </Route>
              <Route path="/:slug">
                <ProductsPage />
              </Route>
              <Redirect from="/" exact to="/newly-added" />
              <Route>
                <Redirect to="/not-found" />
              </Route>
            </Switch>
          </Container>
          <Footer />
        </OrderContext.Provider>
      </ProductContext.Provider>
    </div>
  );
};

export default App;
