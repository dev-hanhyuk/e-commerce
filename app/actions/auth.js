import axios from 'axios'
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  USER_LOGGED_OUT,
  USER_ACCOUNT_MESSAGE,
  CLEAR_USER_ORDERS
} from '_actions';
import { fetchUserOrdersFromServer, fetchUserWishlistFromServer } from '_actions/order';
import { browserHistory } from 'react-router';


/* action */
export const authenticated = () => dispatch =>
  axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data;
        dispatch(fetchUserOrdersFromServer(user.id));
        dispatch(fetchUserWishlistFromServer(user.id));
        dispatch({ type: AUTHENTICATED, user });
      })
      .catch(() => dispatch(unauthenticated()))


export const unauthenticated = () => dispatch =>
  dispatch({ type: UNAUTHENTICATED, error: 'Invalid Email or Password. Please try again.' });


export const login = (email, password) => dispatch =>
    axios.post('/api/auth/local/login', {username: email, password})
      .then(() => {
        dispatch(authenticated());
        browserHistory.push('/products');
      })
      .catch(() => dispatch(unauthenticated()))


export const logout = () => dispatch =>
  axios.post('/api/auth/logout')
    .then(() => {
      dispatch({ type: CLEAR_USER_ORDERS});
      dispatch({ type: USER_LOGGED_OUT });
    })
    .catch(() => {
      dispatch({ type: CLEAR_USER_ORDERS});
      dispatch({ type: USER_LOGGED_OUT });
    })

export const register = (firstname, lastname, email, password, confirmPassword) => dispatch => {
  dispatch({ type: USER_ACCOUNT_MESSAGE, message: ''});
  if (password !== confirmPassword) {
    return dispatch({ type: USER_ACCOUNT_MESSAGE, message: `Your passwords don't match`});
  } else {
    return axios.post('/api/user/register', { firstname, lastname, email, password })
      .then(user => dispatch(login(user.data.email, user.data.password)))
      .catch(err => console.error(err.stack))
  }
}

export const userPasswordReset = (userId, currentPassword, newPassword, confirmPassword) => dispatch => {
  dispatch({ type: USER_ACCOUNT_MESSAGE, message: ''});
  if (newPassword !== confirmPassword) {
    return dispatch({ type: USER_ACCOUNT_MESSAGE, message: `Your confirmed password doesn't match your new password`});
  } else {
    return axios.put(`/api/user/password/${userId}`, { currentPassword, newPassword })
      .then(() => dispatch({ type: USER_ACCOUNT_MESSAGE, message: 'Password has been successfully changed'}))
      .catch(() => dispatch({ type: USER_ACCOUNT_MESSAGE, message: `Current password doesn't match your password`}))
  }
}
