import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class CartItem extends Component {
  formatPrice = price => {
    return `$${(price * 0.01).toFixed(2)}`;
  };
  render() {
    return (
      <div className="row my-2 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2">
          <span className="d-lg-none">product: </span> {this.props.item.title}
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <span className="d-lg-none">price: </span>{" "}
          {this.formatPrice(this.props.item.price)}
        </div>

        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
          <div className="d-flex justify-content-center">
            <span
              className="btn btn-black mx-1"
              onClick={() => this.props.onDecrementCounter(this.props.item)}
            >
              -
            </span>
            <span className="btn btn-black mx-1">
              {this.props.item.quantity}
            </span>
            <span
              className="btn btn-black mx-1"
              onClick={() => this.props.onIncrementCounter(this.props.item)}
            >
              +
            </span>
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <div
            className="cart-icon"
            onClick={() => this.props.onRemoveItem(this.props.item._id)}
          >
            <i className="fa fa-trash"></i>
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <strong>item total: {this.formatPrice(this.props.item.total)}</strong>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartsubtotal: state.cartSubTotal,
    cartitems: state.cart,
    carttax: state.cartTax,
    carttotal: state.cartTotal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDecrementCounter: item =>
      dispatch({ type: actionTypes.DECREMENT, product: item }),
    onIncrementCounter: item =>
      dispatch({ type: actionTypes.INCREMENT, product: item }),
    onRemoveItem: id =>
      dispatch({ type: actionTypes.REMOVE_ITEM, productId: id })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
/*.text-blue{
 color:#2a2a72;
}*/
