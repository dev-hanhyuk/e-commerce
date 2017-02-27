import { FETCH_PRODUCTS_FROM_SERVER } from '_actions';

export default (state=[], action) => {
  switch(action.type) {
    case FETCH_PRODUCTS_FROM_SERVER: return action.products;
    default: return state;
  }
}
