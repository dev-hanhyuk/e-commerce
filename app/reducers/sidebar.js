import { TOGGLE_SIDEBAR } from '_actions';

const INITIAL_STATE = {
  open: false
}

/* reducer */
const reducer = (state=false, action) => {
  switch(action.type) {
    case TOGGLE_SIDEBAR: return !state;
    default: return state;
  }
}

export default reducer;