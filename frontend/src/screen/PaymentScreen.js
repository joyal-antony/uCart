import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen(props) {

  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push('placeorder')
  }

  return <div>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <div className="center form-container">
          <div>
            <h2> Payment</h2>
          </div>
          <div>
            <br />
            <div>
              <label htmlFor="paymentMethod">
                <input
                  name="paymentMethod"
                  type="radio"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)} />
                <span>Paypal</span>
              </label>
            </div>
          </div>
          <br />
          <div className="center">
            <button
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Login
                </button>
          </div>

        </div>
      </form>
    </div>
  </div>
}
export default PaymentScreen;
