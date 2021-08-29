import React, { useState } from "react";
import CheckoutStep from "../components/checkoutStep";
import { useDispatch,useSelector } from "react-redux";
import { savePaymentMethod } from "../store/action/cartAction";
export default function PaymentScreen(props) {
  const [payment, setPaymentMethod] = useState("PayPal");
  const  cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;
  if(!shippingAddress.address){
    props.history.push("/shipping")
  }
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutStep step1 step2 step3></CheckoutStep>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
       <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="payment">PayPal</label>
          </div>
       </div>
          <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Continue
            </button>
          </div>
      </form>
    </div>
  );
}
