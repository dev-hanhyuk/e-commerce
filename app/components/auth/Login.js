import React from 'react'
import { connect } from 'react-redux'
import { login } from '_actions/auth'
import { Link } from 'react-router'
import styles from './authStyles';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authButtonHover: false };
    this.handleAuthMouseEnter = this.handleAuthMouseEnter.bind(this);
    this.handleAuthMouseLeave = this.handleAuthMouseLeave.bind(this);
  }

  handleAuthMouseEnter () {
    this.setState({ authButtonHover: true });
  }

  handleAuthMouseLeave () {
    this.setState({ authButtonHover: false });
  }

  render () {
    const { auth, login } = this.props;
    return (
      <section style={styles.section}>
        <form className="col center-xs" onSubmit={evt => {
          evt.preventDefault()
          login(evt.target.email.value, evt.target.password.value)
        }}>

          <div className="row center-xs center-sm center-lg">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
              <div className="row"><label style={styles.authLabel}>EMAIL ADDRESS</label></div>
              <div className="row"><input type="text" name="email" placeholder="Enter your email address" style={styles.authInput}/></div>
            </div>
          </div>
          <br />
          <div className="row center-xs center-sm center-lg">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
              <div className="row"><label style={styles.authLabel}>PASSWORD</label></div>
              <div className="row"><input type="password" name="password" placeholder="Enter your password" style={styles.authInput}/></div>
            </div>
          </div>

          <div className="row center-xs">
            <button
              onMouseEnter={this.handleAuthMouseEnter}
              onMouseLeave={this.handleAuthMouseLeave}
              style={this.state.authButtonHover ? styles.authButtonHover : styles.authButton}
            >
              Log in
            </button>
          </div>
        </form>
        <div className="row center-xs" style={styles.register}><Link to="/register" style={styles.link}>Need to sign up for an account?</Link></div>

        { auth && auth.error ? <p className="row center-xs" style={styles.authFailedText}>{auth.error}</p> : '' }

      </section>
    )
  }

}


const mapStateToProps = ({ auth }) => ({ auth });
export default connect (mapStateToProps, { login }) (Login);