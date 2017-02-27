import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { toggleSidebar } from '_actions/sidebar';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleCloseMenu () {
    this.props.toggleSidebar();
  }

  redirect (link) {
    browserHistory.push(link);
    this.props.toggleSidebar();
  }

  render () {
    const { sidebar, orders, auth } = this.props;
    const { user } = this.props.auth;

    return (
      <div>
      {
        sidebar ?
          <section
            className="col-lg-3 col-sm-4 col-xs-6 image-box-shadow"
            style={styles.sidebarOpen}
          >
            <div className="col-xs-offset-1 col-xs-10 sidebar">
              <div className="row middle-xs" style={styles.firstRow}>
                <CloseIcon style={styles.closeIcon} onClick={this.handleCloseMenu}/>
              </div>
              <div className="row">
                <div className="col-xs-12 bar-item" onClick={() => this.redirect('/products')}>PRODUCTS</div>
              </div>
              <div className="row">
                <div className="col-xs-12 bar-item" onClick={() => this.redirect('/orders')}>CHECK OUT <span> [{orders.cart.reduce((p, c) => p + c.quantity, 0)}]</span></div>
              </div>
              <div className="row">
                <div className="col-xs-12 bar-item" onClick={() => this.redirect('/wishlist')}>WISHLIST<span>[{orders.wishlist.reduce((p, c) => p + c.quantity, 0)}]</span></div>
              </div>
              <div className="row"><div className="col-xs-12 bar-item" onClick={() => this.redirect('/history')}>ORDER HISTORY</div></div>

              { user && user.isAdmin ? <div className="row"><div className="col-xs-12 bar-item" onClick={() => this.redirect('/admin')}>ADMIN</div></div> : ''}

              { auth && auth.user ?
                <div>
                  <div className="row"><div className="col-xs-12 bar-item" onClick={() => this.redirect('/account')}>ACCOUNT</div></div>
                  <div className="row"><div className="col-xs-12 bar-item" onClick={() => this.redirect('/logout')}>LOG OUT</div></div>
                </div> :

                <div>
                  <div className="row"><div className="col-xs-12 bar-item" onClick={() => this.redirect('/login')}>LOG IN</div></div>
                  <div className="row"><div className="col-xs-12 bar-item" onClick={() => this.redirect('/register')}>SIGN UP</div></div>
                </div>
              }

              <div className="row"><div className="col-xs-12 bar-item" onClick={() => this.redirect('/contact')}>CONTACT</div></div>
            </div>
          </section>
          : ''
      }
      </div>

    )
  }
}


const styles={
  sidebarOpen: {
    color: '#292929',
    height: '100vh',
    width: '100%',
    background: '#fff',
    zIndex: '7',
    flexDirection: 'column-reverse',
    position: 'fixed',
    verticalAlign: 'middle',
    fontWeight: '700',
    fontSize: '1.2rem',
    textAlign: 'center',
    lineHeight: '2.4rem',
    minWidth: '230px'
  },
  firstRow: {
    height: '8vh',
    verticalAlign: 'middle',
    fontWeight: '700',
    fontSize: '1.2rem',
    textAlign: 'center',
    lineHeight: '2rem',
    marginBottom: '2vh'
  },
}

const mapStateToProps = ({ sidebar, orders, auth }) => ({ sidebar, orders, auth });
export default connect(mapStateToProps, { toggleSidebar }) (Sidebar);