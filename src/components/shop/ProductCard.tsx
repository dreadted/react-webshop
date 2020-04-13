import React, { useContext } from "react";

// utils
import { getCurrencyFormat } from "../../lib/utils";

// components
import CategoryBadges from "./CategoryBadges";
import { OrderContext } from "../contexts/OrderContext";
import { CartAction } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useContext(OrderContext);
  return (
    <div className="d-flex">
      <div className="card mx-1 mx-sm-3 my-3 bg-dark shadow-sm">
        <div className="overlay">
          <img
            className="card-img-top img-fluid"
            alt={product.name}
            src={product.imageUrl}
          />
          <div className="card-description">
            <div className="d-flex">
              <div>
                <img
                  className="thumbnail d-block d-sm-none"
                  alt={product.name}
                  src={product.imageUrl}
                />
              </div>
              <div>
                <h4 className="font-weight-bold">{product.name}</h4>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer px-3 px-md-2">
          <div className="d-flex mb-3">
            <CategoryBadges product={product} />
          </div>
          <div className="d-flex flex-md-wrap align-items-center justify-content-between">
            <div className="h5 font-weight-bold mb-0 mx-1">
              {getCurrencyFormat(product.price)}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(CartAction.ADD, { product, quantity: 1 })}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
