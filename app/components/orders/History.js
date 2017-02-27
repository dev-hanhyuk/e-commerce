import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { orderSelectedFromCart, fetchUserOrderHistoryFromServer, moveOrderHistoryToCheckout } from '_actions/order';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import HoverScaleButton from '_components/common/HoverScaleButton';


class History extends React.Component {
  constructor (props) {
    super(props);
    this.handleMoveToCheckout = this.handleMoveToCheckout.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  componentDidMount () {
    if (this.props.auth.user) this.props.fetchUserOrderHistoryFromServer(this.props.auth.user.id);
  }

  handleRowSelection (key) {
    this.props.orderSelectedFromCart(key);
  }

  handleMoveToCheckout () {
    const { orders, auth } = this.props;
    const selectedOrders = orders.selected;
    const ordersToMove = selectedOrders.map(k => orders.history[k]);//not the id, whole item
    this.props.moveOrderHistoryToCheckout(ordersToMove, auth.user);
  }


  render () {
    const { auth, orders } = this.props;
    return (
      <section style={styles.section} className="col-xs-offset-1 col-xs-10">

        <div className="row center-lg center-md center-sm center-xs" style={styles.cartTitle}>Order History</div>

        { orders.history.length == 0 || !auth.user ?
          <div className="row center-lg center-md center-sm center-xs" style={styles.noCartItems}>THERE ARE NO ITEMS IN YOUR ORDER HISTORY</div> :

        <div className="row">

          <div className="col-lg-12 col-sm-12">
            <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Item</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Price</TableHeaderColumn>
                  <TableHeaderColumn>Quantity</TableHeaderColumn>
                  <TableHeaderColumn>Date</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {orders.history.map((w, idx) => (
                  <TableRow key={idx} selected={orders.selected.indexOf(idx) !== -1}>
                    <TableRowColumn><Link to={`/products/${w.product.id}`}><img id="thumb" src={w.product.imageUrl[0]} className="image-box-shadow" style={styles.thumbnail} /></Link></TableRowColumn>
                    <TableRowColumn>{w.product.name}{w.product.size ? `[${w.product.size}]` : ''}</TableRowColumn>
                    <TableRowColumn>{w.product.price}</TableRowColumn>
                    <TableRowColumn>{w.quantity}</TableRowColumn>
                    <TableRowColumn>{w.created_at.slice(0, 10)}</TableRowColumn>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>

            <div className="row" style={styles.selectedOrderStatus}>
              <div className="col-xs-offset-2 col-xs-8">
                <div className="row center-xs">
                  {orders.history.length > 0 ? `You selected ${orders.selected.length} items.` : ''}
                </div>

                <div className="row center-xs" style={styles.buttons}>
                  <div className="col-xs-6">
                    <HoverScaleButton
                      title="REORDER"
                      handleClick={this.handleMoveToCheckout}
                      color="#5C6BC0"
                      scale={1.1}
                    />
                  </div>
                </div>

              </div>
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
  orderTableWrapper: {
    marginBottom: '5vh'
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
  cartOption: {
    zIndex: '100'
  },
  checkoutPreviewTitle: {
    fontSize: '1.5rem',
    fontWeight: '300'
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
  fetchUserOrderHistoryFromServer,
  moveOrderHistoryToCheckout
}) (History);