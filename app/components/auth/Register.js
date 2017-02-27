import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { register } from '_actions/auth';
import styles from './authStyles';




class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authButtonHover: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    };
    this.handleAuthMouseEnter = this.handleAuthMouseEnter.bind(this);
    this.handleAuthMouseLeave = this.handleAuthMouseLeave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAuthMouseEnter () {
    this.setState({ authButtonHover: true });
  }

  handleAuthMouseLeave () {
    this.setState({ authButtonHover: false });
  }

  handleChange (prop, value) {
    this.setState({ [prop]: value });
  }

  handleSubmit (evt) {
    this.setState({ error: '' });
    evt.preventDefault();
    const { firstname, lastname, email, password, confirmPassword } = this.state;
    console.log(firstname, lastname, email, password, confirmPassword);
    if (password !== confirmPassword) this.setState({ error: `passwords don't match`});
    else this.props.register(firstname, lastname, email, password, confirmPassword)
      .then(() => console.log('successfully user account created'))
      .catch(err => this.setState({ error: err }));
  }

  render () {

    return (
      <section style={ownStyles.section}>
        <form className="col center-xs" onSubmit={evt => {
          evt.preventDefault();
          this.handleSubmit(evt)}
        }>

        <div className="row center-xs center-sm center-lg">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
              <div className="row"><label style={styles.authLabel}>FIRST NAME</label></div>
              <div className="row">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  style={styles.authInput}
                  onChange={evt => this.handleChange('firstname', evt.target.value )}
                />
              </div>
            </div>
          </div>
          <br />

          <div className="row center-xs center-sm center-lg">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
              <div className="row"><label style={styles.authLabel}>LAST NAME</label></div>
              <div className="row">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  style={styles.authInput}
                  onChange={evt => this.handleChange('lastname', evt.target.value)}
                />
              </div>
            </div>
          </div>
          <br />

          <div className="row center-xs center-sm center-lg">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
              <div className="row"><label style={styles.authLabel}>EMAIL ADDRESS</label></div>
              <div className="row">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  style={styles.authInput}
                  onChange={evt => this.handleChange('email', evt.target.value)}
                />
                </div>
            </div>
          </div>
          <br />

          <div className="row center-xs center-sm center-lg">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
              <div className="row"><label style={styles.authLabel}>PASSWORD</label></div>
              <div className="row">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  style={styles.authInput}
                  onChange={evt => this.handleChange('password', evt.target.value)}
                />
              </div>
            </div>
          </div>
          <br />

          <div className="row center-xs center-sm center-lg">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
              <div className="row"><label style={styles.authLabel}>CONFIRM PASSWORD</label></div>
              <div className="row">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-type your password"
                  style={styles.authInput}
                  onChange={evt => this.handleChange('confirmPassword', evt.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row center-xs">
            <div className="col-xs-6">{this.state.error ? <p style={ownStyles.message}>{this.state.error}</p> : ''}</div>
          </div>

          <div className="row center-xs">
            <button
              onMouseEnter={this.handleAuthMouseEnter}
              onMouseLeave={this.handleAuthMouseLeave}
              style={this.state.authButtonHover ? styles.authButtonHover : styles.authButton}
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="row center-xs" style={styles.register}><Link to="/login" style={styles.link}>Already have an account?</Link></div>


      </section>
    )
  }
}

const ownStyles = {
  section: {
    height: '80vh',
    paddingTop: '15vh'
  },
  message: {
    marginTop: '2vh',
    fontSize: '0.8rem',
    color: 'red'
  }
}

const mapStateToProps = ({ account }) => ({ account });

export default connect (mapStateToProps, { register })(Register);
