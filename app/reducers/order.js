import {
  ORDER_PRODUCT_TO_CART,
  ORDER_PRODUCT_TO_SESSION,
  FETCH_USER_ORDERS_FROM_SERVER,
  FETCH_USER_WISHLIST_FROM_SERVER,
  FETCH_USER_ORDER_HISTORY_FROM_SERVER,
  CLEAR_USER_CART,
  ORDER_SELECTED_FROM_CART
} from '_actions';

const INITIAL_STATE = {
  cart: [],
  selected: [],
  history: [],
  wishlist: []
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_USER_ORDERS_FROM_SERVER: return { ...state, cart: action.orders };
    case FETCH_USER_WISHLIST_FROM_SERVER: return { ...state, wishlist: action.wishlist };
    case FETCH_USER_ORDER_HISTORY_FROM_SERVER: return { ...state, history: action.history };
    case ORDER_SELECTED_FROM_CART: return { ...state, selected: action.key };
    case ORDER_PRODUCT_TO_CART: return { ...state, cart: [...action.order] };
    case ORDER_PRODUCT_TO_SESSION: return { ...state, cart: [...state.cart, action.order] };
    case CLEAR_USER_CART: return INITIAL_STATE;
    default: return state;
  }
}
