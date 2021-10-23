import React, { useState } from "react";
import { signout } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function NavBar() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSigin = useSelector((state) => state.userSignin);
  const { userInfo } = userSigin;
  const [isActive, setActive] = useState(false);
  function toggle() {
    setActive(!isActive);
  }
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <header style={{ padding: "1.4rem 0", width: "100%" }}>
      <div className="row">
        <div className="header-navbar">
          <div>
            <Link className="brand" to="/">
              Furniture
            </Link>
          </div>
          <div className={`navbar-toggle`} onClick={toggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu-2"
              width="32"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </div>
        </div>
        <div className={`navbar-collapse ${isActive ? "close" : " "}`}>
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
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  {" "}
                  <Link to="#signout" onClick={signoutHandler}>
                    SignOut
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign in</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productslist">Products</Link>
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
      </div>
    </header>
  );
}
