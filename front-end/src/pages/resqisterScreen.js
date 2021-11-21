import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/action/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Formik, Field } from "formik";
import * as Yup from "yup";
export default function RegisterScreen(props) {
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userResgister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userResgister;
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <>
      <div
        className="heading-banner"
        style={{
          backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("images/1.jpg")`,
        }}
      >
        <h1>REGISTER</h1>
      </div>
      <main>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .required("UserName is Required")
              .min(3, `Name should have a minimum length of 3`)
              .max(30, "name should have a maximum length of 30"),
            email: Yup.string()
              .required("Email is Required")
              .email("Not a valid email"),
            password: Yup.string()
              .required("password is Required")
              .min(8, "should have a minimum length of 8")
              .max(30, "should have a maximum length of 30")
              .matches(
                /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
                "Password Must contain captial and small Letters"
              ),
            confirmPassword: Yup.string()
              .required("password is Required")
              .oneOf([Yup.ref("password")], "Passwords does not match"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.username, values.email, values.password);
            dispatch(register(values.username, values.email, values.password));
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="form" onSubmit={handleSubmit}>
              <div>
                <h1>Resgister</h1>
              </div>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <div>
                <label htmlFor="name">User Name</label>
                <Field
                  type="text"
                  id="name"
                  name="username"
                  placeholder="Enter Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={
                    touched.username && errors.username ? `invalid` : `valid`
                  }
                ></Field>
               <span className="text-vaildtion"> {errors.username && errors.username}</span>
              </div>
              <div>
                <label htmlFor="email">Email address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    touched.email && errors.email ? `invalid` : `valid`
                  }
                ></Field>
               <span className="text-vaildtion"> {errors.email && errors.email}</span>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    touched.password && errors.password ? `invalid` : `valid`
                  }
                ></Field>
                <span className="text-vaildtion">{errors.password && errors.password}</span>
              </div>
              <div>
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  className={
                    touched.confirmPassword && errors.confirmPassword
                      ? `invalid`
                      : `valid`
                  }
                ></Field>
               <span className="text-vaildtion"> {errors.confirmPassword && errors.confirmPassword}</span>
              </div>
              <div>
                <label />
                <button
                  type="submit"
                  className="primary"
                  disabled={isSubmitting}
                >
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
          )}
        </Formik>
      </main>
    </>
  );
}
