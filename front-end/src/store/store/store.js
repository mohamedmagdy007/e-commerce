import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducers";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from "../reducers/userReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from "../reducers/orderReducers";
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  ProductList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateReducer,
  productCreate:productCreateReducer,
  productUpdate:productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList:orderListReducer,
  orderDelete:orderDeleteReducer,
  orderDeliver:orderDeliverReducer
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
