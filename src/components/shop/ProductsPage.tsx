import React, { useEffect, useRef, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

// css
import Row from "react-bootstrap/Row";

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
      <Row xs={1} sm={2} md={3} lg={4} xl={5}>
        {currentCategory &&
          getProductsFromCategory(currentCategory).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Row>
      <Cart atCheckout={false} />
    </>
  );
};

export default ProductsPage;
