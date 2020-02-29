import * as actionTypes from "./actions";
const initialState = {
  products: [],
  cart: [],
  cartSubTotal: 0,
  cartTax: 0,
  cartTotal: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
    case actionTypes.REMOVE_ITEM:
      let tempProducts = [...state.products];
      let tempCart = [...state.cart];
      tempCart = tempCart.filter(item => item._id !== action.productId);

      const product = state.products.find(
        item => item._id === action.productId
      );
      const index = tempProducts.indexOf(product);
      let removedProduct = tempProducts[index];
      removedProduct.inCart = false;
      removedProduct.quantity = 0;
      removedProduct.total = 0;

      //fix the totals
      let subTotalPrice = 0;
      state.cart.map(item => (subTotalPrice += item.total));
      const tempTaxNew = subTotalPrice * 0.1;
      const taxNew = parseFloat(tempTaxNew.toFixed(2));
      const totalNew = subTotalPrice + taxNew;

      return {
        ...state,
        cart: tempCart,
        products: [...tempProducts],
        cartSubTotal: subTotalPrice,
        cartTax: taxNew,
        cartTotal: totalNew
      };
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        cart: [...state.cart, action.product]
      };
    case actionTypes.REMOVE_CART:
      return {
        ...state,
        //products: products,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
      };
    case actionTypes.STORE_TOTAL:
      let subTotal = 0;
      state.cart.map(item => (subTotal += item.total));
      const tempTax = subTotal * 0.1;
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax;

      return {
        ...state,
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };

    case actionTypes.DECREMENT:
      let oldCart = [...state.cart];

      const indexNew = oldCart.indexOf(action.product);

      const productNew = oldCart[indexNew];
      productNew.quantity = productNew.quantity - 1;

      // NEED to rEMIVE from cart
      if (productNew.quantity == 0) {
        oldCart = oldCart.filter(item => item._id !== action.product._id);
        productNew.inCart = false;
        productNew.quantity = 0;
        productNew.total = 0;

        //fix the totals
        let subTotalPriceRem = 0;
        state.cart.map(item => (subTotalPriceRem += item.total));
        const tempTaxRem = subTotalPriceRem * 0.1;
        const taxRem = parseFloat(tempTaxRem.toFixed(2));
        const totalRem = subTotalPriceRem + taxRem;
        return {
          ...state,
          cart: [...oldCart],
          cartSubTotal: subTotalPriceRem,
          cartTax: taxRem,
          cartTotal: totalRem
        };
      } else {
        productNew.total = productNew.price * productNew.quantity;
        return {
          ...state,
          cart: [...oldCart]
        };
      }

    /*return {
        ...state,
        cart: [...oldCart]
      };*/
    case actionTypes.CHECKOUT:
      console.log("reducer", action.props);

      return {};
    case actionTypes.INCREMENT:
      let oldCartInc = [...state.cart];
      const indexNewInc = oldCartInc.indexOf(action.product);

      const productNewInc = oldCartInc[indexNewInc];
      productNewInc.quantity = productNewInc.quantity + 1;
      productNewInc.total = productNewInc.price * productNewInc.quantity;

      let subTotalInc = 0;
      state.cart.map(item => (subTotalInc += item.total));
      const tempTaxInc = subTotalInc * 0.1;
      const taxInc = parseFloat(tempTaxInc.toFixed(2));
      const totalInc = subTotalInc + taxInc;

      return {
        ...state,
        cart: [...oldCartInc],
        cartSubTotal: subTotalInc,
        cartTax: taxInc,
        cartTotal: totalInc
      };
  }

  return state;
};

export default reducer;
