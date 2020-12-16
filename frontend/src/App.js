import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProductsScreen from './screen/ProductsScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import ProfileScreen from './screen/ProfileScreen';
import OrdersScreen from './screen/OrdersScreen';
import adminOrder from './screen/adminOrder';
import Nav from './screen/Nav'
import Footer from './screen/Footer';

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <div className="grid-container">
          <main className="main">
            <div className="content">
              <Switch>
                <Route path="/register" component={RegisterScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/category/:id" component={HomeScreen} />
                <Route path="/orders" component={OrdersScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/products" component={ProductsScreen} />
                <Route path="/orders-edit" component={adminOrder} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/" component={HomeScreen} />
              </Switch>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;