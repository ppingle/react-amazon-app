import React from "react";

import { Link } from "react-router-dom";
import { ButtonContainer } from "../Button/button";

const productSummary = ({ product, closeModal }) => {
  const formatPrice = price => {
    return `$${(price * 0.01).toFixed(2)}`;
  };
  return (
    <div className="container">
      <div id="modal" className="text-center text-capitalize">
        <h4>{product.title}</h4>
        <h3 className="text-muted">{formatPrice(product.price)}</h3>
        <div className="modal-footer">
          <Link to="/">
            <button
              className="btn btn-outline-primary text-uppercase mb-2 px-2"
              type="button"
              onClick={() => closeModal()}
            >
              Continue Shopping
            </button>
          </Link>
          <Link to="/cart">
            <button
              className="btn btn-outline-warning text-uppercase mb-2 px-2"
              type="button"
              onClick={() => closeModal()}
            >
              Go to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default productSummary;
