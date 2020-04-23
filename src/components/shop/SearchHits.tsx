import React, { useEffect, useState, Dispatch, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import slugify from "slugify";

// css
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// context
import { ProductContext } from "../contexts/ProductContext";
import { OrderContext } from "../contexts/OrderContext";

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
  const { cart } = useContext(OrderContext);
  const { slug } = useParams();
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(!foundProducts.length);
  }, [loading, foundProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      // const setProductsAsync = async () => {
      //   console.time("hits");
      //   const hits: Product[] = await get<Product>(
      //     `search/?searchText=${slug}`
      //   );
      //   const result: Product[] =
      //     hits && hits.length
      //       ? products.filter(product =>
      //           hits.map(hit => hit.id).includes(product.id)
      //         )
      //       : NO_MOVIES;
      //   console.timeEnd("hits");

      //   setFoundProducts(result);
      // };

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
      <div className={`${cart.open ? "" : "fixed-bottom"}`}>
        <Row>
          <Col sm={8} lg={6} className="px-1">
            <Cart atCheckout={false} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SearchHits;
