import { combineReducers } from 'redux';
import display from './display';
import sidebar from './sidebar';
import auth from './auth';
import admin from './admin';
import products from './products';
import product from './product';
import orders from './order';
import invoice from './invoice';

const rootReducer = combineReducers({
  display,
  sidebar,
  auth,
  admin,
  products,
  product,
  orders,
  invoice
})

export default rootReducer;