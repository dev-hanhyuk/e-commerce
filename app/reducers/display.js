import {
  DISPLAY_SIZE_CHANGED
} from '_actions';

const INITIAL_STATE = {
  size: null
}

/* reducer */
export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case DISPLAY_SIZE_CHANGED: return action.size;
    default: return state;
  }
}
