import React from 'react'
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { resetPassword } from "../store/action/userAction";
export default function ResetPassword({match}) {
    console.log(match)
    const dispatch = useDispatch();
    const resetPass = useSelector((state) => state.resetPass);
    const { loading, error, success } = resetPass;
    return (
        <>
        <div
          className="heading-banner"
          style={{
            backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 30%)), url("../../images/1.jpg")`,
          }}
        >
          <h1>Reset password</h1>
        </div>
        <main>
          <Formik
            initialValues={{
              password: "",
              confirmPassword:"",
            }}
            validationSchema={Yup.object().shape({
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
              console.log(values.password,values.confirmPassword);
              dispatch(resetPassword(match.params.id,match.params.token,{password: values.password }));
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
                {success && <MessageBox variant="success">password reset sucessfully.</MessageBox>} 
                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    className={
                      touched.password && errors.password ? `invalid` : `valid`
                    }
                  ></Field>
                  <span className="text-vaildtion">
                    {errors.password && errors.password}
                  </span>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    className={
                      touched.confirmPassword && errors.confirmPassword ? `invalid` : `valid`
                    }
                  ></Field>
                  <span className="text-vaildtion">
                    {errors.confirmPassword && errors.confirmPassword}
                  </span>
                </div>
                <div>
                  <label />
                    <button
                    type="submit"
                    className="primary"
                    //  disabled={success}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </main>
      </>
    )
}
