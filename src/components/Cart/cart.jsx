import React, { Component } from "react";
import CartColumns from "../Cart/cartcolumns";
import EmptyCart from "../Cart/emptyCart";
import CartList from "../Cart/cartList";
import CartTotals from "../Cart/cartTotals";
import { connect } from "react-redux";
class Cart extends Component {
  render() {
    return (
      <section>
        {this.props.cartitems.length ? (
          <React.Fragment>
            <div className="font-weight-bold text-center text-uppercase mx-auto text-title">
              Your Cart
            </div>
            <CartColumns />
            <CartList value={this.props.cartitems} />
            <CartTotals
              value={this.props.cartitems}
              history={this.props.history}
            />
          </React.Fragment>
        ) : (
          <EmptyCart />
        )}
      </section>
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
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
