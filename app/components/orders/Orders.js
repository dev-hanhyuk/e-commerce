import React from 'react'
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';//products, product
import {
  orderSelectedFromCart,
  removeOrderFromCart,
  removeOrderFromSession,
  moveOrdersToWishlist
} from '_actions/order';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SquareButton from '_components/common/SquareButton';
import HoverScaleButton from '_components/common/HoverScaleButton';

class Orders extends React.Component {
  constructor (props) {
    super(props);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleRemoveOrder = this.handleRemoveOrder.bind(this);
    this.handleMoveToWishlist = this.handleMoveToWishlist.bind(this);
    this.handleClickOnCheckout = this.handleClickOnCheckout.bind(this);
  }

  handleRowSelection (key) {
    this.props.orderSelectedFromCart(key);
  }

  handleRemoveOrder () {
    const { orders, auth } = this.props;
    const selectedOrders = orders.selected;
    const ordersToRemove = selectedOrders.map(k => orders.cart[k].id);
    if (auth.user) this.props.removeOrderFromCart(ordersToRemove, auth.user);
    else if(!auth.user) this.props.removeOrderFromSession(orders);

  }

  handleMoveToWishlist () {
    const { orders, auth } = this.props;
    const selectedOrders = orders.selected;
    const ordersToMove = selectedOrders.map(k => orders.cart[k]);
    this.props.moveOrdersToWishlist(ordersToMove, auth.user);
  }

  handleClickOnCheckout () {
    browserHistory.push('/checkout');
  }

  render () {
    const { auth, orders } = this.props;
    return (
      <section style={styles.section} className="col-xs-offset-1 col-xs-10">

        <div className="row center-lg center-md center-sm center-xs" style={styles.cartTitle}>Shopping cart</div>

        { orders.cart.length == 0 ?
          <div className="row center-lg center-md center-sm center-xs" style={styles.noCartItems}>THERE ARE NO ITEMS IN YOUR CART</div> :

        <div className="row">

          <div className="col-lg-9 col-sm-12">
            <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Item</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Price</TableHeaderColumn>
                  <TableHeaderColumn>Quantity</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {orders.cart.map((c, idx) => (
                  <TableRow key={idx} selected={orders.selected.indexOf(idx) !== -1}>
                    <TableRowColumn><Link to={`/products/${c.product.id}`}><img id="thumb" src={c.product.imageUrl[0]} className="image-box-shadow" style={styles.thumbnail} /></Link></TableRowColumn>
                    <TableRowColumn>{c.product.name}{c.product.size ? `[${c.product.size}]` : ''}</TableRowColumn>
                    <TableRowColumn>{c.product.price}</TableRowColumn>
                    <TableRowColumn>{c.quantity}</TableRowColumn>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>

            <div className="row" style={styles.selectedOrderStatus}>
              <div className="col-xs-offset-2 col-xs-8">
                <div className="row center-xs">
                  {orders.selected.length > 0 ? `You selected ${orders.selected.length} order items.` : ''}
                </div>

                <div className="row" style={styles.buttons}>
                  <div className="col-xs-6">
                    <HoverScaleButton
                      title="ADD TO WISHLIST"
                      handleClick={this.handleMoveToWishlist}
                      color="#5C6BC0"
                      scale={1.1}
                    />
                  </div>
                  <div className="col-xs-6">
                    <HoverScaleButton
                      title="REMOVE FROM CART"
                      handleClick={this.handleRemoveOrder}
                      color="rgb(255, 64, 129)"
                      scale={1.1}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12" style={styles.checkoutStatus}>
            <div className="row" style={styles.subTotal}>Subtotal ({orders.cart.reduce((p, c) => p + c.quantity, 0)} items): ${orders.cart.reduce((p, c) => p + (c.product.price * c.quantity), 0).toFixed(2)}</div>
            <div className="row" style={styles.checkoutButton}>
              <SquareButton title="PLACE ORDER" leaveStyle={styles.leaveStyle} handleClick={this.handleClickOnCheckout}/>
            </div>
          </div>
        </div>
        }

      </section>
    )
  }
}


const styles = {
  section: {
    paddingTop: '15vh',
  },
  noCartItems: {
    marginTop: '20vh',
    marginBottom: '50vh',
    color: '#787878'
  },
  cartTitle: {
    fontSize: '2rem',
    fontWeight: '300',
    marginBottom: '5vh'
  },
  thumbnail: {
    height: '10vh'
  },
   leaveStyle: {
    background: '#383838',
    color: '#eee'
  },
  selectedOrderStatus: {
    marginTop: '5vh',
  },
  buttons: {
    marginTop: '3vh',
    marginBottom: '20vh',
  },
  checkoutStatus: {
    marginBottom: '10vh',
    paddingLeft: '5%',
    borderLeft: '10px solid #4DD0E1',
    lineHeight: '1.6'
  },
  subTotal: {
    fontSize: '1.2rem',
    fontWeight: '300',
    color: '#787878',
    marginTop: '3vh',
  },
  checkoutButton: {
    marginTop: '3vh'
  },
}


const mapStateToProps = ({ auth, orders }) => ({ auth, orders });
export default connect (mapStateToProps, {
  orderSelectedFromCart,
  removeOrderFromCart,
  removeOrderFromSession,
  moveOrdersToWishlist
}) (Orders);