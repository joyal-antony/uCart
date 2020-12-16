import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import Spinner from './Spinner/Spinner'

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }

  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? (<Spinner />) : error ? (<div>{error}</div>) :
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>Shipping</h3>
          <p>
            {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalcode}, {order.shipping.country}
          </p>
          <p>
            {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
          </p>
        </div>
        <div>
          <h3>Payment</h3>
          {order.isPaid ? "Paid at : " + order.paidAt : "Not Paid"}
          {order.isPaid && <p>Payment Method: {order.payment}</p>}
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>Shopping Cart</h3>
              <p>Price</p>
            </li>
            {
              order.orderItems.length === 0 ? <p>Cart is empty</p> :
                order.orderItems.map(item =>
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <p><Link to={"/product/" + item.product}>{item.name}</Link></p>
                      <p>Qty: {item.qty}</p>
                    </div>
                    <p className="cart-price">${item.price}</p>
                  </li>)}
          </ul>
        </div>
      </div>

      <div className="placeorder-action">
        <ul>
          {!(order.isPaid) &&
            <li className="placeorder-actions-payment">
              <form onSubmit={handleSuccessPayment} >
                <div className="center form-container">
                  <div>
                    <h2> Payment</h2>
                  </div>
                  <div>
                    <div className="center">
                      <button
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                      >
                        pay
                </button>
                    </div>
                  </div>
                </div>
              </form>
              <br />
            </li>
          }
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <p>Items</p>
            <p>${order.itemsPrice}</p>
          </li>
          <li>
            <p>Shipping</p>
            <p>${order.shippingPrice}</p>
          </li>
          <li>
            <p>Tax</p>
            <p>${order.taxPrice}</p>
          </li>
          <li>
            <p>Order Total</p>
            <p>${order.totalPrice}</p>
          </li>
        </ul>
      </div>
    </div>
}

export default OrderScreen;