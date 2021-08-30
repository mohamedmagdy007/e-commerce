import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/action/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Err, seterror] = useState("");
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userResgister = useSelector((state) => state.userRegister);
  const { userInfo,loading,error } = userResgister;
  const submitHandle = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        seterror('Password and confirm password are not match')
    }else{
        dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    //   window.location.reload();
    }
  }, [props.history, redirect ,userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandle}>
        <div>
          <h1>Resgister</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            required
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          { error?<p></p> :<p className="alert alert-danger">{Err}</p>}
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
             Already have an account? 
            <Link to={`/signin?redirect=${redirect}`}> Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}