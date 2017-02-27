import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import store from '../store';

import {
  ORDER_PRODUCT_TO_CART,
  ORDER_PRODUCT_TO_SESSION,
  FETCH_USER_ORDERS_FROM_SERVER,
  FETCH_USER_WISHLIST_FROM_SERVER,
  FETCH_USER_ORDER_HISTORY_FROM_SERVER,
  ORDER_SELECTED_FROM_CART,
} from '_actions';


export const orderProductToSession = (product, n) => dispatch => {
  const order = {productId: product.id, quantity: n, status: 'processing', product: product};
  dispatch({ type: ORDER_PRODUCT_TO_SESSION, order });

}

export const orderProductToCart = (user, product, n) => dispatch => {
  const payload = {productId: product.id, quantity: n, status: 'processing'};
  axios.post(`/api/order/${user.id}`, payload)
    .then(() => dispatch(fetchUserOrdersFromServer(user.id)))
    .catch(err => console.error(err.stack))
}

export const fetchUserOrdersFromServer = (userId) => dispatch => {
  axios.get(`/api/order/${userId}`)
    .then(response => {
      const orders = response.data;
      dispatch({ type: FETCH_USER_ORDERS_FROM_SERVER, orders });
    })
    .catch(err => console.error(err.stack))
}

export const fetchUserOrderHistoryFromServer = (userId) => dispatch => {
  axios.get(`/api/order/history/${userId}`)
    .then(response => {
      const history = response.data;
      dispatch({ type: FETCH_USER_ORDER_HISTORY_FROM_SERVER, history })
    })
    .catch(err => console.error(err.stack))
}

export const fetchUserWishlistFromServer = (userId) => dispatch => {
  axios.get(`/api/order/wishlist/${userId}`)
    .then(response => {
      const wishlist = response.data;
      dispatch({ type: FETCH_USER_WISHLIST_FROM_SERVER, wishlist })
    })
    .catch(err => console.error(err.stack))
}

export const addProductToWishlist = (productId, userId, n) => dispatch => {
  axios.post(`/api/order/wishlist/product`, { productId, quantity: n, userId })
    .then(() => dispatch(fetchUserWishlistFromServer(userId)))
    .catch(err => console.error(err.stack))
}

export const moveWishlistToCheckout = (orders, user) => dispatch => {
  axios.put(`/api/order/checkout`, {orders, user})
    .then(() => dispatch(fetchUserOrdersFromServer(user.id)))
    .then(() => dispatch(fetchUserWishlistFromServer(user.id)))
    .then(() => dispatch(orderSelectedFromCart([])))
    .then(() => browserHistory.push('/orders'))
    .catch(err => console.error(err.stack))
}

export const moveOrderHistoryToCheckout = (orders, user) => dispatch => {
  axios.post(`/api/order/orderhistory`, { orders })
    .then(() => dispatch(orderSelectedFromCart([])))
    .then(() => dispatch(fetchUserOrdersFromServer(user.id)))
    .then(() => browserHistory.push('/orders'))
    .catch(err => console.error(err.stack))
}


// export const moveOrderToWishlist;
export const moveOrdersToWishlist = (orders, user) => dispatch => {
  axios.put(`/api/order/wishlist`, {orders, user})
    .then(() => dispatch(fetchUserOrdersFromServer(user.id)))
    .then(() => dispatch(fetchUserWishlistFromServer(user.id)))
    .then(() => dispatch(orderSelectedFromCart([])))
    .catch(err => console.error(err.stack))
}


export const orderSelectedFromCart = (key) => dispatch => dispatch({ type: ORDER_SELECTED_FROM_CART, key });

export const removeOrderFromCart = (orders, user) => dispatch => {
  axios.post(`/api/order/remove/`, {orders})
    .then(() => dispatch(fetchUserOrdersFromServer(user.id)))
    .then(() => dispatch(fetchUserWishlistFromServer(user.id)))
    .then(() => dispatch(orderSelectedFromCart([])))
    .catch(err => console.error(err.stack))
}

export const removeOrderFromSession = (orders) => dispatch => {
  const { cart, selected } = orders;
  const newOrdersToCheckOut = _.remove(cart, (o, i) => selected.indexOf(i) == -1 );
  dispatch({ type: ORDER_PRODUCT_TO_CART, order: newOrdersToCheckOut });
}

