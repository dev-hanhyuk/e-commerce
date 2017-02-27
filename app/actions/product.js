import axios from 'axios';
import { FETCH_SINGLE_PRODUCT_FROM_SERVER } from '_actions';

export const fetchSingleProductFromServer = (productId) => dispatch =>
  axios.get(`/api/product/${productId}`)
    .then(response => {
      const product = response.data;
      dispatch({ type: FETCH_SINGLE_PRODUCT_FROM_SERVER, product })
    })
    .catch(err => console.error(err.stack))