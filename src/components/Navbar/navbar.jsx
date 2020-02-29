import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ButtonContainer } from "../Button/button";
//import "../../css/materialize.css";
const Navbar = () => {
  return (
    <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
      <Link to="/">
        <i className="fa fa-amazon"></i>
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5">
          <Link to="/" className="nav-link">
            Products
          </Link>
        </li>
      </ul>

      <Link to="/cart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <i className="fa fa-cart-plus">My Cart</i>
          </span>
        </ButtonContainer>
      </Link>
    </NavWrapper>
  );
};
const NavWrapper = styled.nav`
  background: #2a2a72;
  .nav-link {
    color: white;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  margin: 0 0 20px 0;
`;
export default Navbar;
