import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  ADMIN_FETCH_ORDERS_FROM_SERVER,
  ADMIN_FETCH_INVOICES_FROM_SERVER,
  ADMIN_ADD_FILES_TO_UPLOAD,
  ADMIN_UPLOAD_FILES_TO_SERVER,
} from '_actions';


export const adminFetchOrdersFromServer = () => dispatch =>
  axios.get('/api/order/admin')
    .then(response => {
      const orders = response.data;
      return dispatch({ type: ADMIN_FETCH_ORDERS_FROM_SERVER, orders })
    })
    .catch(err => console.error(err.stack))


export const adminFetchInvoicesFromServer = () => dispatch =>
  axios.get('/api/invoice/admin')
    .then(response => {
      const invoices = response.data;
      return dispatch({ type: ADMIN_FETCH_INVOICES_FROM_SERVER, invoices })
    })
    .catch(err => console.error(err.stack))


export const adminAddFilesToUpload = (file) => dispatch =>
  dispatch({ type: ADMIN_ADD_FILES_TO_UPLOAD, files: file})

export const adminUploadFilesToServer = (data) => dispatch =>
  axios.post('/api/admin/product/upload', data)
    .then(response => response.data)
    .catch(err => console.error(err.stack))


export const adminAddNewProduct = (product) => dispatch =>
{ console.log(product)
  axios.post('/api/admin/product/add', product)
    .then(response => console.log(response.data))
    .then(() => browserHistory.push('/admin'))
    .catch(err => console.error(err.stack))

}


export const adminRemoveImage = (imagePath) => dispatch =>
  axios.post('/api/admin/product/removeImage', {path: imagePath})
    .then(response => console.log(response.data))
    .catch(err => console.error(err.stack))


export const adminRemoveProduct = (pid) => dispatch =>
  axios.post(`/api/admin/product/remove/${pid}`)
    .then(() => browserHistory.push('/admin'))
    .catch(err => console.error(err.stack))


export const adminUpdateProduct = (pid, product) => dispatch =>
  axios.put(`/api/admin/product/update/${pid}`, product)
    .then(() => browserHistory.push('/admin'))
    .catch(err => console.error(err.stack))
