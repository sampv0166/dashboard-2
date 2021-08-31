import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfo) {
      history.push('/ecom-product-grid');
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {console.log(error)}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{console.log(error)}</Message>
      ) : (
        <div className="authincation">
          <div className="container p-0">
            <div className="row justify-content-center align-items-center authincation-page-area">
              <div className="col-lg-6 col-md-9">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form">
                        <h4 className="text-center mb-4">
                          Sign in your account
                        </h4>
                        <form
                          onSubmit={(e) => {
                            submitHandler(e);
                          }}
                        >
                          <div className="form-group">
                            <label className="mb-1">
                              <strong>Email</strong>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue="hello@example.com"
                              name="Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="mb-1">
                              <strong>Password</strong>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              defaultValue="Password"
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <div className="text-center">
                            <button className="btn btn-primary btn-block">
                              Sign Me In
                            </button>
                          </div>
                        </form>
                        <div className="new-account mt-3">
                          <p>
                            Don't have an account?{' '}
                            <Link className="text-primary" to="/page-register">
                              Sign up
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
      )}
    </>
  );
};

export default LoginScreen;
