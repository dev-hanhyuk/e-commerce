import axios from 'axios';
import { FETCH_PRODUCTS_FROM_SERVER } from '_actions';

export const fetchProductsFromServer = () => dispatch =>
  axios.get('/api/product')
    .then(response => {
      const products = response.data;
      dispatch({ type: FETCH_PRODUCTS_FROM_SERVER, products })
    })
    .catch(err => console.error(err.stack))
