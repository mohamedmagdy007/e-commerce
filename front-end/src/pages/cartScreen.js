import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { addToCart, removeFromCart } from "../store/action/cartAction";

export default function CartScreen(props) {
  const id = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (_id) => {
    dispatch(removeFromCart(_id));
  };
  const checkoutHandler = ()=>{
      props.history.push('/signin?redirect=shipping')
  }
  return (
    <>
    <div className="heading-banner" style={{backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("../images/1.jpg")`}}>
        <h1>CART</h1>
    </div>
    <main>
    <div className="row top" >
      <div className="col-2">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is emoty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart((item.product),Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>$ {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div
          className="card-body"
          style={{
            border: "0.1rem #c0c0c0 solid",
            borderRadius: ".5rem",
            padding: "15px 15px 25px",
          }}
        >
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
                <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>Proceed to checkout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </main>
    </>
  );
}
