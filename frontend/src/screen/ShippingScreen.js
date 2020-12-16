import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalcode, country }));
    props.history.push('payment')

  }

  return <>
    <div className="container">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div style={{ marginTop: "4rem" }} className="row" >
        <div className="col s8 offset-s2"></div>
        <form onSubmit={submitHandler} >
          <div className="col s12 center" >
            <h4>
              <b> Shipping</b>
            </h4>
          </div>

          <div className="input-field col s12">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={(e) => setAddress(e.target.value)}>
            </input>
          </div>

          <div className="input-field col s12">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={(e) => setCity(e.target.value)}>
            </input>
          </div>

          <div className="input-field col s12">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </div>

          <div className="input-field col s12">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              onChange={(e) => setCountry(e.target.value)}>
            </input>
          </div>

          <div className="center input-field col s12">
            <button
              type="submit"
              className=" btn btn-large waves-effect waves-light hoverable blue accent-3">
              Continue
                  </button>
          </div>
        </form>
      </div>
    </div>
  </>
}
export default ShippingScreen;
