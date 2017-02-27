import {
  ADMIN_FETCH_ORDERS_FROM_SERVER,
  ADMIN_FETCH_INVOICES_FROM_SERVER,
  ADMIN_ADD_FILES_TO_UPLOAD
} from '_actions';

const INITIAL_STATE = {
  orders: [],
  invoices: [],
  files: []
}

const reducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ADMIN_FETCH_ORDERS_FROM_SERVER: return { ...state, orders: action.orders};
    case ADMIN_FETCH_INVOICES_FROM_SERVER: return { ...state, invoices: action.invoices};
    case ADMIN_ADD_FILES_TO_UPLOAD: return { ...state, files: action.files };
    default: return state;
  }
}

export default reducer;