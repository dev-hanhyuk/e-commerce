import React from 'react';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const Payment = ({ orders, invoice }) => (
  <section>
      <div className="col-xs-12">
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableRow id="confirm-order-table-header">
              <TableHeaderColumn>Item</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {orders.cart.length == 0 ? 'THERE ARE NO ITEMS IN YOUR BAG'
            : orders.cart.map((c, idx) => (
              <TableRow key={idx}>
                <TableRowColumn><img id="thumb" src={c.product.imageUrl[0]} className="image-box-shadow" style={styles.thumbnail} /></TableRowColumn>
                <TableRowColumn>{c.product.name}{c.product.size ? `[${c.product.size}]` : ''}</TableRowColumn>
                <TableRowColumn>{c.product.price}</TableRowColumn>
                <TableRowColumn>{c.quantity}</TableRowColumn>
                <TableRowColumn>{c.quantity * c.product.price}</TableRowColumn>
              </TableRow>
            ))
            }
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableRowColumn colSpan="3" style={styles.totalPrice}>
                Total: <strong>${orders.cart.reduce((p, c) => p + (c.product.price * c.quantity), 0).toFixed(2)}</strong>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="col-xs-12" style={styles.invoiceWrapper}>
        <List>
          <ListItem
            primaryText="Billing" secondaryText={invoice.b_address_line1 + ' ' + invoice.b_address_line2 + ' ' + invoice.b_address_city + ', ' + invoice.b_address_zip} />
          <Divider />
          <ListItem
            primaryText="Shipping" secondaryText={invoice.s_address_line1 + ' ' + invoice.s_address_line2 + ' ' + invoice.s_address_city + ', ' + invoice.s_address_zip} />
          <Divider />
          <ListItem
            primaryText="Payment" secondaryText={invoice.p_fullname + ', Last 4 digits: ' + invoice.p_number.slice(-4)}
          />
          <Divider />
        </List>
      </div>

  </section>
)



const styles={
  thumbnail: {
    height: '10vh'
  },
  totalPrice: {
    textAlign: 'right',
  },
  invoiceWrapper: {
    marginTop: '5vh',
    marginBottom: '10vh',
    lineHeight: '2rem'
  }
};

const mapStateToProps = ({ orders, invoice }) => ({ orders, invoice });
export default connect(mapStateToProps) (Payment);