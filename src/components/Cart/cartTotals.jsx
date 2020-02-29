import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PayPalButton from "./paypalCheckout";
import * as actionTypes from "../../store/actions";

class CartTotals extends Component {
  formatPrice = price => {
    return `$${(price * 0.01).toFixed(2)}`;
  };

  handleCheckout = () => {
    this.clearCart();
    this.props.history.push("/success");
  };
  clearCart = () => {
    let tempProducts = [...this.props.products];
    tempProducts.forEach(item => {
      item.inCart = false;
      item.quantity = 0;
      item.total = 0;
    });
    this.props.onRemoveCart();
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mt-2 mg-sm-5 ml-md-auto col-sm-8 text-right text-capitalize">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => this.clearCart()}
                >
                  clear cart
                </button>
              </Link>
              <h5>
                <span className="text-title">subtotal :</span>
                <strong>{this.formatPrice(this.props.cartsubtotal)}</strong>
              </h5>
              <h5>
                <span className="text-title">tax :</span>
                <strong>{this.formatPrice(this.props.carttax)}</strong>
              </h5>
              <h5>
                <span className="text-title">total :</span>
                <strong>{this.formatPrice(this.props.carttotal)}</strong>
              </h5>
              <button className="btn-primary" onClick={this.handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    cartsubtotal: state.cartSubTotal,
    cartitems: state.cart,
    carttax: state.cartTax,
    carttotal: state.cartTotal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemoveCart: () => dispatch({ type: actionTypes.REMOVE_CART }),
    onCheckout: props => dispatch({ type: actionTypes.CHECKOUT, props: props })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTotals);
/* <PayPalButton
                total={this.formatPrice(this.props.carttotal)}
                clearCart={() => this.props.onRemoveCart()}
                history={this.props.history}
              />*/
