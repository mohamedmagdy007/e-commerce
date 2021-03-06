import React, { useState } from "react";
import CheckoutStep from "../components/checkoutStep";
import { useDispatch, useSelector } from "react-redux";
import { saveShipingAddress } from "../store/action/cartAction";
export default function ShippingScreen(props) {
  const  userSignin = useSelector(state => state.userSignin); 
  const {userInfo} = userSignin;
  const  cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;
  if(!userInfo){
    props.history.push("/signin")
  }
  const [ fullName, setFullName ] = useState(shippingAddress.fullName);
  const [ address, setAddress ] = useState(shippingAddress.address);
  const [ city, setCity ] = useState(shippingAddress.city);
  const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
  const [ country, setCountry ] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShipingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <>
      <CheckoutStep step1 step2></CheckoutStep>
    <div className="heading-banner" style={{backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("images/1.jpg")`}}>
        <h1>SHIPPING</h1>
    </div>
    <main>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </main>
    </>
  );
}
