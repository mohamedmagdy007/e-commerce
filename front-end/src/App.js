import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./pages/cartScreen";
import HomeScreen from "./pages/homeScreen";
import ProductScreen from "./pages/productScreen";
import RegisterScreen from "./pages/resqisterScreen"
import Sigin from "./pages/signin";
import ShippingScreen from './pages/shippingScreen'
import { signout } from "./store/action/userAction";
import PaymentScreen from "./pages/paymentScreen";
import placeOrderScreen from "./pages/placeOrderScreen";
import OrderScreen from "./pages/orderScreen";
import OrderHistoryScreen from "./pages/orderHistoryScreen";
import ProfileScreen from "./pages/profileScreen";
import PrivateRoute from "./components/privateRoute";
function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSigin = useSelector((state) => state.userSignin);
  const { userInfo } = userSigin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              E-SHOP
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                  <Link to='/profile'>User Profile</Link>
                  </li>
                  <li>
                    <Link to='/orderhistory'>Order History</Link>
                  </li>
                  <li> <Link to="#signout" onClick={signoutHandler}>SignOut</Link></li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign in</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                  <Link to="#admin">Admin <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                  <li>
                  <Link to='/dashboard'>Dashboard</Link>
                  </li>
                  <li>
                    <Link to='/productlist'>Products</Link>
                  </li>
                  <li> 
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li> 
                    <Link to="/userList">Users</Link>
                  </li>
                </ul>
              </div>

            )}
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/signin" component={Sigin}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={placeOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        </main>
        <footer className="row center">Alt right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
