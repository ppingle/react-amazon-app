import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/home";
import Navbar from "./components/Navbar/navbar";
import Cart from "./components/Cart/cart";
import NotFound from "./components/NotFound/notfound";
import SuccessPage from "./components/SucessPage/successPage";

function App() {
  return (
    <main className="container">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/success" component={SuccessPage} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;
