import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders, deleteOrder } from '../actions/orderActions';
import Spinner from './Spinner/Spinner'

function OrdersScreen(props) {
  const orderList = useSelector(state => state.myOrderList);
  const { loading, orders, error } = orderList;
  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyOrders());
  }, []);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }

  return loading ? (<Spinner />) :
    <div className="content content-margined">
      <div className="order-header">
        <h3>Orders</h3>
      </div>
      {orders.map((order) => <div className='row' key={order._id}>
        <div className="col s12 m6 l4">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <br />
              <p>ID : {order._id}</p>
              <p>DATE : {order.createdAt}</p>
              <p>TOTAL: {order.totalPrice}</p>
              <p>PAID : {order.isPaid.toString()}</p>
              {order.paidAt && <p>PAID AT : {order.paidAt}</p>}
              <p>DELIVERED : {order.isDelivered.toString()}</p>
              {order.isDelivered && <p>DELIVERED AT : {order.deliveredAt}</p>}
              <div>
                <Link to={"/order/" + order._id}
                  className="button secondary" >Details</Link>
                <button type="button"
                  onClick={() => deleteHandler(order)}
                  className="button secondary">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
}
export default OrdersScreen;