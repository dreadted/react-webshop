import React, { useEffect, useState, Dispatch } from "react";
import { useParams, Redirect } from "react-router-dom";

// API
import { get } from "../lib/api";

// components
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import NotFound from "./NotFound";
import Loading from "./Loading";

const NO_MOVIES: Product[] = [
  {
    id: -1,
    name: "No products",
    description: "",
    price: 0,
    imageUrl: "",
    year: 0,
    added: new Date(),
    productCategory: []
  }
];

interface SearchHitsProps {
  categories: ProductCategory[];
  products: Product[];
  cart: Cart;
  addToCart: AddToCart;
  updateCart: UpdateCart;
  toggleCart: () => void;
  setClearSearch: Dispatch<React.SetStateAction<boolean>>;
}

const SearchHits: React.FC<SearchHitsProps> = ({
  categories,
  products,
  cart,
  addToCart,
  updateCart,
  toggleCart,
  setClearSearch
}) => {
  const { slug } = useParams();
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(!foundProducts.length);
  }, [loading, foundProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      const setProductsAsync = async () => {
        const hits: Product[] = await get<Product>(
          `search/?searchText=${slug}`
        );
        const result: Product[] =
          hits && hits.length
            ? products.filter(product =>
                hits.map(hit => hit.id).includes(product.id)
              )
            : NO_MOVIES;
        setFoundProducts(result);
      };

      setProductsAsync();
    }
  }, [slug, products]);

  useEffect(() => {
    return () => {
      setClearSearch(true);
    };
  }, []);

  return (
    <>
      {!slug && <Redirect to="/" />}
      {((!foundProducts || !foundProducts.length) && <Loading />) ||
        (foundProducts === NO_MOVIES && (
          <NotFound hasButton={false} caption="Nope" />
        )) || (
          <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
              {foundProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categories={categories}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </>
        )}
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

export default SearchHits;
