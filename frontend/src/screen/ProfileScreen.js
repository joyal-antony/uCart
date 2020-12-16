import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner/Spinner'

function ProfileScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name }))
  }

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, errors } = myOrderList;

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
    dispatch(listMyOrders());
  }, [userInfo])

  return (
    <div className="container">
      <div className="row">
        {loading && <Spinner />}
        {userInfo && (

          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
            Back to Home
          </Link>
            <h2 className="grey-text text-darken-1 center">User Profile</h2>
            <br />
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            </div>
            <form onSubmit={submitHandler}>
              <h4 className="grey-text text-darken-1 center">{email}</h4>
              <br />
              <br />
              <div className="col s12">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="center">
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
                    UPDATE
              </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable red accent-3"
                  >
                    LOG OUT
              </button>
                </div>
              </div>
            </form>

          </div>
        )}
      </div>

      <br />
      <div className="center">
        <button
          onClick={() => setModalVisible(!modalVisible)}
          className="btn btn-large waves-effect waves-light hoverable green accent-3"
        >
          {modalVisible ? "Close orders" : "View orders"}
        </button>
      </div>
      <br />
      <br />
      {modalVisible &&
        <div className="profile-orders content-margined">
          {
            loadingOrders && <Spinner />}
          {orders &&
            < ul className="table">
              <li>
                {myOrderList.orders.map((order) =>
                  <div key={order._id}>
                    <p>ID : {order._id}</p>
                    <p>DATE : {order.createdAt}</p>
                    <p>TOTAL : {order.totalPrice}</p>
                    <p>PAID : {order.isPaid ? "True" : "False"}</p>
                    <p>ACTIONS : <Link className="blue" to={"/order/" + order._id}>DETAILS</Link></p>
                    <br />
                  </div>
                )}
              </li>
            </ul>
          }
        </div>}
    </div >

  )
}

export default ProfileScreen;