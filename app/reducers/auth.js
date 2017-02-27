import { AUTHENTICATED, UNAUTHENTICATED, USER_LOGGED_OUT, USER_ACCOUNT_MESSAGE } from '_actions';

const INITIAL_STATE = {
  user: null,
  error: '',
  message: ''
}

const reducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTHENTICATED: return { ...state, user: action.user, error: '' };
    case UNAUTHENTICATED: return { ...state, user: null, error: action.error };
    case USER_LOGGED_OUT: return INITIAL_STATE;
    case USER_ACCOUNT_MESSAGE: return { ...state, message: action.message };
    default: return state;
  }
}

export default reducer;