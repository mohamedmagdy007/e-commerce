import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CartScreen from "./pages/cartScreen";
import HomeScreen from "./pages/homeScreen";
import ProductScreen from "./pages/productScreen";
import RegisterScreen from "./pages/resqisterScreen";
import Sigin from "./pages/signin";
import ShippingScreen from "./pages/shippingScreen";
import PaymentScreen from "./pages/paymentScreen";
import placeOrderScreen from "./pages/placeOrderScreen";
import OrderScreen from "./pages/orderScreen";
import OrderHistoryScreen from "./pages/orderHistoryScreen";
import ProfileScreen from "./pages/profileScreen";
import PrivateRoute from "./components/privateRoute";
import ProductListScreen from "./pages/ProductListScreen";
import AdminRoute from "./components/adminRoute";
import ProductEditScreen from "./pages/ProductEidtScreen";
import { createBrowserHistory } from "history";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import OrderListScreen from "./pages/OrderListScreen";
import CreateProduct from "./pages/CreateProduct";
import AllProduct from "./pages/AllProduct";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <div className="grid-container">
        <NavBar />
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/productsAll" component={AllProduct} exact></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/signin" component={Sigin}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingScreen}></Route>
        <Route path="/payment" component={PaymentScreen}></Route>
        <Route path="/placeorder" component={placeOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route path="/sendresetemail" component={ForgetPassword}></Route>
        <Route path="/password-reset/:id/:token" component={ResetPassword} exact></Route>
        <Route
          path="/product/:id/edit"
          component={ProductEditScreen}
          exact
        ></Route>
        <Route path="/products/create" component={CreateProduct} exact></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <AdminRoute
          path="/productslist"
          component={ProductListScreen}
        ></AdminRoute>
        <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
