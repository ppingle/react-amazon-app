import React, { Component } from "react";
import { getCategories } from "../../services/fakeCategoryService";
import ListGroup from "../../common/listGroup";
import { getProducts } from "../../services/fakeProductsService";
import Pagination from "../../common/paginate";
import paginate from "../../utils/paginate";
import Modal from "../../common/modal";
import { connect } from "react-redux";
import ProductSummary from "../ProductSummary/productSummary";
import styled from "styled-components";
import * as actionTypes from "../../store/actions";

class Home extends Component {
  state = {
    categories: [],
    pageSize: 5,
    currentPage: 1,
    modalOpen: false,
    modalProduct: ""
  };

  componentDidMount() {
    const categories = [{ _id: "", name: "All Products" }, ...getCategories()];

    this.setState({
      categories
    });

    const products = getProducts();
    this.props.onStoreProducts(products);
  }

  handleCategorySelect = category => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getItem = id => {
    const product = this.props.products.find(item => item._id === id);
    return product;
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
    this.handleAddToCart(id);
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  handleAddToCart = id => {
    let tempProducts = [...this.props.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.quantity = 1;
    const price = product.price;
    product.total = price;
    //to store the cart items in a shared state
    this.props.onStoreResult(product);
    this.setState(
      {
        showModal: true,
        product: tempProducts
      },
      () => {
        console.log(this.props.cartitems);
        this.props.onStoreTotals();
      }
    );
  };

  formatPrice = price => {
    return `$${(price * 0.01).toFixed(2)}`;
  };
  render() {
    const { length: count } = this.props.products;
    const {
      pageSize,
      currentPage,
      //products: allProducts,
      selectedCategory
    } = this.state;

    if (count === 0) return <p>There are no products in the database</p>;

    const filtered =
      selectedCategory && selectedCategory._id
        ? this.props.products.filter(
            p => p.category._id === selectedCategory._id
          )
        : this.props.products;

    const products = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <Modal show={this.state.modalOpen} modalClosed={this.closeModal}>
          <ProductSummary
            product={this.state.modalProduct}
            closeModal={this.closeModal}
          />
        </Modal>
        <div className="col-3">
          <ListGroup
            items={this.state.categories}
            onItemSelect={this.handleCategorySelect}
            selectedItem={this.state.selectedCategory}
          />
        </div>

        <div className="col">
          <p>There are {filtered.length} products in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.category.name}</td>
                  <td>{this.formatPrice(product.price)}</td>
                  <td>
                    <button
                      className={product.inCart ? "btn-secondary" : "btn-info"}
                      disabled={product.inCart ? true : false}
                      onClick={() => this.openModal(product._id)}
                    >
                      {product.inCart ? (
                        <p className="text-capitalize mb-0" disabled>
                          In Cart
                        </p>
                      ) : (
                        <p className="text-capitalize mb-0" disabled>
                          Add To Cart
                        </p>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

/** TRIED TO USE STYLED COMPONENTS and was trying to create a card layout for each product, but had few
 * style issues so did not spend time fixing it.
 */

/*{products.map(product => (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
              <div className="card">
                <div className="img-container p-5">
                  <div className="imgDiv"></div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <p className="align-self-center mb-0">{product.title}</p>
                <h5 className="text-blue font-italix mb-0">
                  <span className="mr-1">
                    {this.formatPrice(product.price)}
                  </span>
                </h5>
              </div>
            </ProductWrapper>
          ))}
*/
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
    onStoreProducts: products =>
      dispatch({ type: actionTypes.STORE_PRODUCTS, products: products }),
    onStoreResult: product =>
      dispatch({ type: actionTypes.STORE_RESULT, product: product }),
    onStoreTotals: () => dispatch({ type: actionTypes.STORE_TOTAL })
  };
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .imageDiv {
    border: 1px solid grey;
    width: 100%;
    height: 100%;
    background: grey;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
