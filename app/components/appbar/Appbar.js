import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { toggleSidebar } from '_actions/sidebar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';


class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checkoutHover: false, menuHover: null};
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  handleMouseEnter () {
    this.setState({checkoutHover: true});
  }

  handleMouseLeave () {
    this.setState({checkoutHover: false});
  }

  handleMouseClick () {
    this.setState({checkoutHover: false});
  }

  handleClickMenu () {
    this.props.toggleSidebar();

  }

  render () {
    const { location, auth, orders, display } = this.props;

    return (
      <section>

        {display == 'portable' ?
          <div className="row middle-xs image-box-shadow" style={styles.barRow}>
            <div className="col-xs-1" style={styles.appbarCol}><MenuIcon onClick={this.handleClickMenu}/></div>
          </div>
        :
        <div className="row middle-xs image-box-shadow" style={styles.barRow}>
            <div className="col-xs-1" style={styles.appbarCol}></div>
            <div className="col-xs-1 appbar" style={styles.appbarCol}>E-STORE</div>
            <div className="col-xs-1 appbar" style={styles.appbarCol}><Link to="/products" style={styles.link}>PRODUCTS</Link></div>
            <div className="col-xs-1"></div>


            {auth && auth.user ?
            <div className="col-xs-2 appbar" style={styles.appbarCol}>
               <Link to="/account" style={styles.link}>Welcome, {auth.user.firstname + ' ' + auth.user.lastname}!</Link>
            </div>
            :
            <div className="col-xs-2" style={styles.appbarCol}></div>
            }

            {auth.user && auth.user.isAdmin ? <div className="col-xs-1 appbar" style={styles.appbarCol}><Link to="/admin" style={styles.link}>ADMIN</Link></div> : ''}


            <div className="col-xs-1 appbar" style={styles.appbarCol}>
              {auth && auth.user ?
                <Link to="/wishlist" style={styles.link}>WISHLIST<span>[{orders.wishlist.reduce((p, c) => p + c.quantity, 0)}]</span></Link>
                : <Link to="/register" style={styles.link}>SIGN UP</Link>
              }
            </div>

            <div className="col-xs-1 appbar" style={styles.appbarCol}>
              {auth && auth.user ?
              <Link to="/logout" style={styles.link}>LOG OUT</Link>
              :
              <Link to="/login" style={styles.link}>LOG IN</Link>
              }
            </div>

            <div className="col-xs-2" style={styles.appbarCol}>
              <Link to="/orders">
                <button
                  style={this.state.checkoutHover ? styles.checkoutButtonHover : styles.checkoutButton}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  onClick={this.handleMouseClick}
                >
                  CHECK OUT <span> [{orders.cart.reduce((p, c) => p + c.quantity, 0)}]</span>
                </button>
              </Link>
            </div>
        </div>
        }
      </section>
    )
  }
}


const styles = {
  barRow: {
    margin: '0',
    position: 'fixed',
    zIndex: '5',
    width: '100%',
    height: '8vh',
    background: '#fff',
    color: '#000',
    verticalAlign: 'middle',
    fontWeight: '700',
    fontSize: '0.8rem',
    textAlign: 'center',
    paddingBottom: '1vh',
    lineHeight: '1.8rem'
  },
  checkoutButton: {
    width: '120px',
    height: '2rem',
    outline: '0',
    background: '0',
    border: '2px solid #000',
    fontWeight: '700',
    color: '#000',
    borderRadius: '2.2vh'
  },
  checkoutButtonHover: {
    width: '120px',
    height: '2rem',
    outline: '0',
    background: '#00bbdc',
    border: '2px solid #00bbdc',
    fontWeight: '700',
    color: '#fff',
    borderRadius: '2.2vh'
  },
  link: {
    textDecoration: 'none',
    color: '#000'
  },
  appbarCol: {
    paddingTop: '3vh',
    height: '9vh',
    verticalAlign: 'middle'
  }
};

const mapStateToProps = ({ auth, orders, display }) => ({ auth, orders, display });
export default connect(mapStateToProps, { toggleSidebar }) (Appbar);
