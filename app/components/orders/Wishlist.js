import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { orderSelectedFromCart, removeOrderFromCart, moveWishlistToCheckout } from '_actions/order';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import HoverScaleButton from '_components/common/HoverScaleButton';

class Wishlist extends React.Component {
  constructor (props) {
    super(props);
    this.handleRemoveFromWishlist = this.handleRemoveFromWishlist.bind(this);
    this.handleMoveToCart = this.handleMoveToCart.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  handleRowSelection (key) {
    this.props.orderSelectedFromCart(key);
  }

  handleRemoveFromWishlist () {
    const { orders, auth } = this.props;
    const selectedOrders = orders.selected;
    const ordersToRemove = selectedOrders.map(k => orders.wishlist[k].id);
    this.props.removeOrderFromCart(ordersToRemove, auth.user);
  }

  handleMoveToCart () {
    const { orders, auth } = this.props;
    const selectedOrders = orders.selected;
    const ordersToMove = selectedOrders.map(k => orders.wishlist[k]);//not the id, whole item
    this.props.moveWishlistToCheckout(ordersToMove, auth.user);
  }


  render () {
    const { auth, orders } = this.props;
    return (
      <section style={styles.section} className="col-xs-offset-1 col-xs-10">

        <div className="row center-lg center-md center-sm center-xs" style={styles.cartTitle}>Wishlist</div>

        { orders.wishlist.length == 0 ?
          <div className="row center-lg center-md center-sm center-xs" style={styles.noCartItems}>THERE ARE NO ITEMS IN YOUR WISHLIST</div> :

        <div className="row">

          <div className="col-lg-12 col-sm-12">
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
                {orders.wishlist.map((w, idx) => (
                  <TableRow key={idx} selected={orders.selected.indexOf(idx) !== -1}>
                    <TableRowColumn><Link to={`/products/${w.product.id}`}><img id="thumb" src={w.product.imageUrl[0]} className="image-box-shadow" style={styles.thumbnail} /></Link></TableRowColumn>
                    <TableRowColumn>{w.product.name}{w.product.size ? `[${w.product.size}]` : ''}</TableRowColumn>
                    <TableRowColumn>{w.product.price}</TableRowColumn>
                    <TableRowColumn>{w.quantity}</TableRowColumn>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>

            <div className="row" style={styles.selectedOrderStatus}>
              <div className="col-xs-offset-2 col-xs-8">
                <div className="row center-xs">
                  {orders.wishlist.length > 0 ? `You selected ${orders.selected.length} items.` : ''}
                </div>

                <div className="row" style={styles.buttons}>
                  <div className="col-xs-6">
                    <HoverScaleButton
                      title="MOVE TO CHECK OUT"
                      handleClick={this.handleMoveToCart}
                      color="#5C6BC0"
                      scale={1.1}
                    />
                  </div>
                  <div className="col-xs-6">
                    <HoverScaleButton
                      title="REMOVE FROM WISHLIST"
                      handleClick={this.handleRemoveFromWishlist}
                      color="rgb(255, 64, 129)"
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
  selectedOrderStatus: {
    marginTop: '5vh',
  },
  buttons: {
    marginTop: '3vh',
    marginBottom: '20vh',
  }
}

const mapStateToProps = ({ auth, orders }) => ({ auth, orders });
export default connect (mapStateToProps, {
  orderSelectedFromCart,
  removeOrderFromCart,
  moveWishlistToCheckout
}) (Wishlist);