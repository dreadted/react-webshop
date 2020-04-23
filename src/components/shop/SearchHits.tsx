import React, { useEffect, useState, Dispatch, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import slugify from "slugify";

// css
import Row from "react-bootstrap/Row";

// context
import { ProductContext } from "../contexts/ProductContext";

// components
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import NotFound from "../common/NotFound";
import Loading from "../common/Loading";

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
  setClearSearch: Dispatch<React.SetStateAction<boolean>>;
  video: Video;
}

const SearchHits: React.FC<SearchHitsProps> = ({ setClearSearch, video }) => {
  const { products } = useContext(ProductContext);
  const { slug } = useParams();
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(!foundProducts.length);
  }, [loading, foundProducts]);

  useEffect(() => {
    if (slug) {
      const setProducts = () => {
        console.time("hits");
        const slugslug = slugify(slug, { lower: true });
        const result: Product[] = Array.from(
          new Set(
            products.filter(
              product =>
                slugify(product.name, { lower: true }).indexOf(slugslug) >= 0
            )
          )
        );
        console.timeEnd("hits");

        setFoundProducts(result?.length ? result : NO_MOVIES);
      };

      setProducts();
    }
  }, [slug, products]);

  useEffect(() => {
    return () => {
      setClearSearch(true);
    };
  }, [setClearSearch]);

  return (
    <>
      {!slug && <Redirect to="/" />}
      {((!foundProducts || !foundProducts.length) && <Loading />) ||
        (foundProducts === NO_MOVIES && (
          <NotFound video={video} hasButton={false} caption="Nope" />
        )) || (
          <Row xs={1} sm={2} md={3} lg={4} xl={5}>
            {foundProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        )}
      <Cart />
    </>
  );
};

export default SearchHits;
