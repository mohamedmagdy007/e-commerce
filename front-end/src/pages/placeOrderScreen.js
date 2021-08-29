import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/checkoutStep";
import {Link} from 'react-router-dom'
import { createOrder } from "../store/action/orderAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector(state => state.orderCreate)
  const {loading, success, error, order}= orderCreate;
  const toPrice = (num)=> Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a , c)=>a+c.qty * c.price , 0))
  cart.shippingPrice = cart.itemsPrice > 100? toPrice(0):toPrice(10)
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispath = useDispatch();
  const placeOrderHandler = ()=>{
      dispath(createOrder({...cart,orderItems:cart.cartItems}))
      console.log('5555554')
  }
  useEffect(()=>{
    if(success){
      props.history.push(`/order/${order._id}`);
      dispath({type:"ORDER_CREATE_RESET"})
    }
  },[dispath,order,props.history,success])
  return (
    <div>
      <CheckoutStep step1 step2 step3 step4></CheckoutStep>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card-body" style={{
                border: "0.1rem #c0c0c0 solid",
                borderRadius: ".5rem",
                margin: "1rem",
                backgroundColor: "#f8f8f8",
              }}>
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {cart.shippingAddress.address}
                  , {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card-body" style={{
                border: "0.1rem #c0c0c0 solid",
                borderRadius: ".5rem",
                margin: "1rem",
                backgroundColor: "#f8f8f8",
              }}>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card-body" style={{
                border: "0.1rem #c0c0c0 solid",
                borderRadius: ".5rem",
                margin: "1rem",
                backgroundColor: "#f8f8f8",
              }}>
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
            <div className="card-body" style={{
                border: "0.1rem #c0c0c0 solid",
                borderRadius: ".5rem",
                margin: "1rem",
                backgroundColor: "#f8f8f8",
              }}>
                <ul>
                    <li>
                        <h2>Order Summary</h2>
                    </li>
                    <li>
                        <div className='row'>
                            <div>Items</div>
                            <div>${cart.itemsPrice.toFixed(2)}</div>
                        </div>
                    </li>
                    <li>
                        <div className='row'>
                            <div>Shipping</div>
                            <div>${cart.shippingPrice.toFixed(2)}</div>
                        </div>
                    </li>
                    <li>
                        <div className='row'>
                            <div>Tax</div>
                            <div>${cart.taxPrice.toFixed(2)}</div>
                        </div>
                    </li>
                    <li>
                        <div className='row'>
                            <div><strong>Total</strong></div>
                            <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                        </div>
                    </li>
                    <li>
                        <button type="button" className="primary block" onClick={placeOrderHandler} disabled={cart.cartItems.length ===0}>Place Order</button>
                    </li>
                    {
                      loading && <LoadingBox></LoadingBox>
                    }
                    {error && <MessageBox variant='danger'>{error}</MessageBox> }
                </ul>   
            </div>
        </div>
      </div>
    </div>
  );
}
