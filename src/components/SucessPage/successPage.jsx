import React, { Component } from "react";
class SuccessPage extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
            <h1 className="display-3">Sucess</h1>

            <h3>Your payment was successful</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessPage;
