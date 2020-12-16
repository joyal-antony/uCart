import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [state, setstate] = useState(false)
  const openMenu = () => setstate(true)
  const closeMenu = () => setstate(false)

  const name = state ? "sidebar open" : " sidebar close"

  return (
    <>
      <header className="header">
        <div className="brand">
          {/* <button onClick={openMenu}>&#9776;</button> */}
          <Link to="/">ucart</Link>
        </div>
        <div className="header-links">
          {userInfo && <Link to="cart">Cart</Link>}
          {userInfo ? (
            <Link to="/profile">{userInfo.name}</Link>
          ) : (
              <Link to="/signin">Sign In</Link>
            )}
          {userInfo && userInfo.isAdmin && (
            <div className="drop">
              <Link to="#">Admin</Link>
              <ul >
                <li className="dropdown-con">
                  <Link to="/orders-edit">Orders</Link>
                  <Link to="/products">Products</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      {/* <aside className={name} >
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>
          x
          </button>
        <ul className="categories">
          <li>
            <Link to="/category/Pants">Pants</Link>
          </li>

          <li>
            <Link to="/category/Shirts">Shirts</Link>
          </li>
        </ul>
      </aside> */}
    </>
  )
}
