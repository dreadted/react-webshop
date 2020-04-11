import React, { useEffect, useRef, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

// context
import { ProductContext } from "../contexts/ProductContext";
import { OrderContext } from "../contexts/OrderContext";

//components
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { CartAction } from "../hooks/useCart";

const NEWS_CATEGORY = -1;

const ProductsPage: React.FC = () => {
  const { categories, products } = useContext(ProductContext);
  const { cart, dispatch } = useContext(OrderContext);

  const { slug } = useParams();
  const currentCategory: ProductCategory | undefined = slug
    ? categories.find(category => category.slug === slug)
    : categories.find(category => category.id === NEWS_CATEGORY);

  const usePrevious = <T extends {} | undefined>(value: T) => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const previousSlug = usePrevious(slug);

  useEffect(() => {
    if (previousSlug !== slug && cart.open) dispatch(CartAction.TOGGLE);
  }, [previousSlug, slug, cart.open, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const getProductsFromCategory = (category: ProductCategory) => {
    return products.filter(product => {
      return product.productCategory.find(
        cat => cat.categoryId === category.id
      );
    });
  };

  return (
    <>
      {!currentCategory && <Redirect to="/not-found" />}
      {!slug && currentCategory && <Redirect to={`/${currentCategory.slug}`} />}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {currentCategory &&
          getProductsFromCategory(currentCategory).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <div className={`${cart.open ? "" : "fixed-bottom"}`}>
        <div className="row body-bg">
          <div className="col col-sm-8 col-lg-6">
            <Cart atCheckout={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
