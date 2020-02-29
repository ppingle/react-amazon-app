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
        <h5>Item</h5>
        <h4>{product.title}</h4>
        <h3 className="text-muted">{formatPrice(product.price)}</h3>
        <div className="modal-footer">
          <Link to="/">
            <ButtonContainer onClick={() => closeModal()}>
              Continue Shoppinng
            </ButtonContainer>
          </Link>
          <Link to="/cart">
            <ButtonContainer onClick={() => closeModal()}>
              Go to Cart
            </ButtonContainer>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default productSummary;
