import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singin } from "../store/action/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSigin = useSelector((state) => state.userSignin);
  const { userInfo,loading,error } = userSigin;
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(singin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect ,userInfo]);
  return (
    <>
    <div className="heading-banner" style={{backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("images/1.jpg")`}}>
        <h1>SIGNIN</h1>
    </div>
    <main>
      <form className="form" onSubmit={submitHandle}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </main>
    </>
  );
}
