import React from 'react'
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';

const ConfirmOrders = ({ auth, orders }) => (
  <section>
    <div className="col-xs-offset-1 col-xs-10">
      <div className="row center-xs">
        <h1 style={styles.title}>{orders.cart.reduce((p, c) => p + c.quantity, 0)} items ordered by {auth && auth.user ? `${auth.user.firstname}` : 'you'}!</h1>
      </div>


      <div className="row">
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
      </div>

      <div className="row center-xs" style={styles.nextMessage}>
        { orders.cart.length ? <p>Click 'Next' to confirm billing information</p> : ''}
      </div>
    </div>
  </section>
)

const styles={
  title: {
    fontSize: '2rem',
    fontWeight: '300',
    marginTop: '5vh',
    marginBottom: '2vh'
  },
  thumbnail: {
    height: '10vh'
  },
  totalPrice: {
    textAlign: 'right',
  },
  nextMessage: {
    marginTop: '3vh',
    fontWeight: '300',
    color: '#373737'
  }
}

const mapStateToProps = ({ auth, orders }) => ({ auth, orders })

export default connect(mapStateToProps) (ConfirmOrders);
