import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, } from "react-redux";
import { register } from "../actions/userActions";
import classnames from "classnames";
import Spinner from './Spinner/Spinner'


function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, errors } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, password2));

  }
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);


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
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account ? <Link to="/signin">Log In</Link>
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="input-field col s12">
              <input
                type="text"
                id="name"
                value={name}
                error={errors && errors.name}
                className={classnames("", {
                  invalid: errors && errors.name
                })}
                onChange={(e) => setName(e.target.value)}
              /><label htmlFor="name">Name</label>
              <span className="red-text">{errors && errors.name}</span>
            </div>

            <div className="input-field col s12">
              <input
                type="email"
                id="email"
                value={email}
                error={errors && errors.email}
                className={classnames("", {
                  invalid: errors && errors.email
                })}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors && errors.email}{errors && errors.error}</span>
            </div>

            <div className="input-field col s12">
              <input
                type="password"
                id="password"
                error={errors && errors.password}
                className={classnames("", {
                  invalid: errors && errors.password
                })}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors && errors.password}</span>
            </div>

            <div className="input-field col s12">
              <input
                type="password"
                id="password2"
                error={errors && errors.password2}
                className={classnames("", {
                  invalid: errors && errors.password2
                })}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{errors && errors.password2}</span>
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
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default RegisterScreen;
