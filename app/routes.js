import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

/* created components */
import App from '_components/App';
import Login from '_components/auth/Login';
import Logout from '_components/auth/Logout';
import Register from '_components/auth/Register';
import Admin from '_components/admin/Admin';
import AddProduct from '_components/admin/AddProduct';
import UpdateProduct from '_components/admin/UpdateProduct';
import Account from '_components/account/Account';
import Products from '_components/products/Products';
import Product from '_components/product/Product';
import Orders from '_components/orders/Orders';
import OrderHistory from '_components/orders/History';
import Wishlist from '_components/orders/Wishlist';
import Checkout from '_components/checkout/Checkout';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="products" />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="register" component={Register} />
      <Route path="admin" component={Admin} />
      <Route path="admin/addproduct" component={AddProduct} />
      <Route path="admin/updateproduct/:pid" component={UpdateProduct} />
      <Route path="account" component={Account} />
      <Route path="products" component={Products} />
      <Route path="products/:productId" component={Product} />
      <Route path="orders" component={Orders} />
      <Route path="history" component={OrderHistory} />
      <Route path="wishlist" component={Wishlist} />
      <Route path="checkout" component={Checkout} />
    </Route>
  </Router>
);
