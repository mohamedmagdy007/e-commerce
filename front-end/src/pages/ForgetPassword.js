import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ForgetPass } from "../store/action/userAction";
export default function ForgetPassword() {
  const dispatch = useDispatch();
  const forgetPass = useSelector((state) => state.forgetPass);
  const { loading, error, success } = forgetPass;
  return (
    <>
      <div
        className="heading-banner"
        style={{
          backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("images/1.jpg")`,
        }}
      >
        <h1>Forget Password</h1>
      </div>
      <main>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required("Email is Required")
              .email("Not a valid email"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.email);
            dispatch(ForgetPass({ email: values.email }));
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
              {/* {loading && <LoadingBox></LoadingBox>} */}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {success && <MessageBox variant="success">password reset link sent to your email account</MessageBox>} 
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
                <label />
                  <button
                  type="submit"
                  className="primary"
                  //  disabled={success}
                >
                  Send Email
                </button>
              </div>
            </form>
          )}
        </Formik>
      </main>
    </>
  );
}
