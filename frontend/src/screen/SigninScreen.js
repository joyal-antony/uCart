import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, } from "react-redux";
import { signin } from "../actions/userActions";
import Spinner from './Spinner/Spinner'
import classnames from "classnames"


function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, errors } = userSignin;

  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i>
            Back to Home
          </Link>
          {loading && <Spinner />}
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account ? <Link to="/register">Register</Link>
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="input-field col s12">
              <input
                type="email"
                id="email"
                value={email}
                error={errors && errors.email}
                className={classnames("", {
                  invalid: errors && (errors.email || errors.emailnotfound)
                })}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors && errors.email}{errors && errors.emailnotfound}</span>
            </div>

            <div className="input-field col s12">
              <input
                type="password"
                id="password"
                error={errors && errors.password}
                className={classnames("", {
                  invalid: errors && (errors.password || errors.passwordincorrect)
                })}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors && errors.password}{errors && errors.passwordincorrect}</span>
            </div>

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}
export default SigninScreen;
