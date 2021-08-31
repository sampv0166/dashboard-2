import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TextField from "../components/TextField";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, e) => {
    dispatch(register(values.name, values.email, values.password));
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values, e) => {
      
        handleSubmit(values, e);
      }}
    >
      {(formik) => (
        <div>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <div className="authincation">
            <div className="container p-0">
              <div className="row justify-content-center align-items-center authincation-page-area">
                <div className="col-lg-6 col-md-9">
                  <div className="authincation-content">
                    <div className="row no-gutters">
                      <div className="col-xl-12">
                        <div className="auth-form">
                          <h4 className="text-center mb-4">
                            Sign up your account
                          </h4>
                          <Form>
                            <TextField
                              label="UserName"
                              name="name"
                              type="text"
                            />
                            <TextField
                              label="Email"
                              name="email"
                              type="email"
                            />
                            <TextField
                              label="password"
                              name="password"
                              type="password"
                            />
                            <div className="text-center mt-4">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Sign me up
                              </button>
                            </div>
                          </Form>
                          <div className="new-account mt-3">
                            <p>
                              Already have an account?{" "}
                              <Link className="text-primary" to="/page-login">
                                Sign in
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Register;
