import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singin } from "../store/action/userAction";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function Signin(props) {
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSigin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSigin;
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
        <h1>SIGNIN</h1>
      </div>
      <main>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
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
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.email, values.password);
            dispatch(singin(values.email, values.password));
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
            /* and other goodies */
          }) => (
            <form className="form" onSubmit={handleSubmit}>
              <div>
                <h1>Sign In</h1>
              </div>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}

              <div>
                <label htmlFor="email">Email address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email"
                  className={
                    touched.email && errors.email ? `invalid` : `valid`
                  }
                ></Field>
                <span className="text-vaildtion">
                  {errors.email && errors.email}
                </span>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className={
                    touched.password && errors.password ? `invalid` : `valid`
                  }
                ></Field>
                <span className="text-vaildtion">
                  {errors.password && errors.password}
                </span>
              </div>
              <div>
                <label />
                <button
                  type="submit"
                  className="primary"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
              </div>
              <div style={{alignItems:"center"}}>
              <label />
                <div style={{marginBottom:"10px"}}>
                  <Link to="/sendresetemail">Forget Password</Link>
                </div>
                <div>
                  <Link to="/register">Create your account</Link>
                </div>
              </div>
            </form>

          )}
        </Formik>
      </main>
    </>
  );
}
