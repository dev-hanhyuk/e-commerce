import { FETCH_SINGLE_PRODUCT_FROM_SERVER } from '_actions';

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_SINGLE_PRODUCT_FROM_SERVER: return action.product;
    default: return state;
  }
}
