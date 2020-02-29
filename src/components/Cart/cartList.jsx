import React from "react";
import CartItem from "./cartItem";

const cartList = ({ value }) => {
  const cart = value;

  return (
    <div className="container-fluid">
      {cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default cartList;
