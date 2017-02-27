import axios from 'axios';
import {
  UPDATE_INVOICE,
  REMOVE_DEFAULT_USER_INFORMATION
} from '_actions';

export const updateInvoice = (prop, value) => dispatch => {
  const payload = {prop: prop, value: value};
  dispatch({ type: UPDATE_INVOICE, payload });
  }

export const fetchDefaultBillingInformation = (user) => dispatch => {
  const b = {
    b_firstname: user.firstname,
    b_lastname: user.lastname,
    b_email: user.email,
    b_phone: user.phone,
    b_address_country: user.address_country,
    b_address_city: user.address_city,
    b_address_zip: user.address_zip,
    b_address_line1: user.address_line1,
    b_address_line2: user.address_line2,
  };

  for (let key in b ) {
    const payload = {prop: key, value: b[key] };
    dispatch({ type: UPDATE_INVOICE, payload })
  }

}

export const fetchDefaultShippingInformation = (invoice) => dispatch => {
  const s = {
    s_firstname: invoice.b_firstname,
    s_lastname: invoice.b_lastname,
    s_email: invoice.b_email,
    s_phone: invoice.b_phone,
    s_address_country: invoice.b_address_country,
    s_address_city: invoice.b_address_city,
    s_address_zip: invoice.b_address_zip,
    s_address_line1: invoice.b_address_line1,
    s_address_line2: invoice.b_address_line2,
  }

  for (let key in s ) {
    const payload = {prop: key, value: s[key] };
    dispatch({ type: UPDATE_INVOICE, payload })
  }

}


export const removeDefaultBillingInformation = () => dispatch => {
  const b = {
    b_firstname: '',
    b_lastname: '',
    b_email: '',
    b_phone: '',
    b_address_country: '',
    b_address_city: '',
    b_address_zip: '',
    b_address_line1: '',
    b_address_line2: ''
  }

  for (let key in b ) {
    const payload = {prop: key, value: b[key] };
    dispatch({ type: UPDATE_INVOICE, payload })
  }

}

export const removeDefaultShippingInformation = () => dispatch => {
  const s = {
    s_firstname: '',
    s_lastname: '',
    s_email: '',
    s_phone: '',
    s_address_country: '',
    s_address_city: '',
    s_address_zip: '',
    s_address_line1: '',
    s_address_line2: '',
  }

  for (let key in s ) {
    const payload = {prop: key, value: s[key] };
    dispatch({ type: UPDATE_INVOICE, payload })
  }

}
