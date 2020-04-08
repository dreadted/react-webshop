import React, { useEffect, useRef, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";

// context
import { ProductContext } from "../../contexts/ProductContext";

//components
import ProductCard from "./ProductCard";
import Cart from "./Cart";

interface ProductsPageProps {
  cart: Cart;
  addToCart: AddToCart;
  updateCart: UpdateCart;
  toggleCart: () => void;
}

const NEWS_CATEGORY = -1;

const ProductsPage: React.FC<ProductsPageProps> = ({
  cart,
  addToCart,
  updateCart,
  toggleCart
}) => {
  const { categories, products } = useContext(ProductContext);

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
    if (previousSlug !== slug && cart.open) toggleCart();
  }, [previousSlug, slug, cart.open, toggleCart]);

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
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
      </div>
      <div className={`${cart.open ? "" : "fixed-bottom"}`}>
        <div className="row body-bg">
          <div className="col col-sm-8 col-lg-6">
            <Cart
              cart={cart}
              updateCart={updateCart}
              toggleCart={toggleCart}
              atCheckout={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
