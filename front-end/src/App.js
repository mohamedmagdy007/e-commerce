import React from "react";
import { useSelector } from "react-redux";
import {BrowserRouter, Link, Route} from 'react-router-dom'
import CartScreen from "./pages/cartScreen";
import HomeScreen from './pages/homeScreen'
import ProductScreen from "./pages/productScreen";
function App() {
    const cart = useSelector(state=>state.cart)
    const {cartItems}=cart;
  return (
      <BrowserRouter>
    <div className="grid-container">
    <header className="row">
        <div>
            <Link className="brand" to="/">E-SHOP</Link>
        </div>
        <div>
            <Link to="/cart">Cart
            {cartItems.length >0 &&(
                <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            <Link to="/signin">Sign in</Link>
        </div>
    </header>
    <main>
        <Route path='/product/:id' component={ProductScreen} exact></Route>
        <Route path='/' component={HomeScreen} exact></Route>
        <Route path='/cart/:id?' component={CartScreen}></Route>
    </main>
    <footer className="row center">Alt right reserved</footer>
</div>
</BrowserRouter>
  );
}

export default App;
