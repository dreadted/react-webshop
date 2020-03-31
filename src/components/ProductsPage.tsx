import React, { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

//components
import ProductCard from "./ProductCard";
import Cart from "./Cart";

interface ProductsPageProps {
  categories: ProductCategory[];
  products: Product[];
  cart: Cart;
  addToCart: AddToCart;
  updateCart: UpdateCart;
  toggleCart: () => void;
}

const NEWS_CATEGORY = -1;

const ProductsPage: React.FC<ProductsPageProps> = ({
  categories,
  products,
  cart,
  addToCart,
  updateCart,
  toggleCart
}) => {
  const { slug } = useParams();
  const currentCategory: ProductCategory | undefined = slug
    ? categories.find(category => category.slug === slug)
    : categories.find(category => category.id === NEWS_CATEGORY);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cart.open) toggleCart();
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
              categories={categories}
              addToCart={addToCart}
            />
          ))}
      </div>
      <div className={`${cart.open ? "" : "fixed-bottom"}`}>
        <div className="row">
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