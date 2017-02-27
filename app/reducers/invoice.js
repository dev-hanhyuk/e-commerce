import {
  UPDATE_INVOICE,
} from '_actions';

const INITIAL_STATE = {
  s_firstname: '',
  s_lastname: '',
  s_email: '',
  s_phone: '',
  s_address_country: '',
  s_address_city: '',
  s_address_zip: '',
  s_address_line1: '',
  s_address_line2: '',

  b_firstname: '',
  b_lastname: '',
  b_email: '',
  b_phone: '',
  b_address_country: '',
  b_address_city: '',
  b_address_zip: '',
  b_address_line1: '',
  b_address_line2: '',

  p_fullname: '',
  p_brand: '',
  p_exp: '',
  p_number: '',
  p_cvc: null,

}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_INVOICE: return { ...state, [action.payload.prop]: action.payload.value };
    default: return state;
  }
}
