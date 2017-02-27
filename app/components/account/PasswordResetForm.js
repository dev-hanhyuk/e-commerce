import React from 'react'
import TextField from 'material-ui/TextField';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

export default class PasswordResetForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        passwordUpdateHover: false,
        passwordUpdateOpen: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: ''
      };
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleMouseClick = this.handleMouseClick.bind(this);
      this.openPasswordUpdate = this.openPasswordUpdate.bind(this);
      this.closePasswordUpdate = this.closePasswordUpdate.bind(this);
      this.handleCurrentPasswordChanged = this.handleCurrentPasswordChanged.bind(this);
      this.handleNewPasswordChanged = this.handleNewPasswordChanged.bind(this);
      this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
      this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    }

    handleCurrentPasswordChanged (evt) {
      this.setState({ currentPassword: evt.target.value });
    }

    handleNewPasswordChanged (evt) {
      this.setState({ newPassword: evt.target.value });
    }

    handleConfirmPassword (evt) {
      this.setState({ confirmPassword: evt.target.value });
    }

    handleUpdatePassword (evt) {
      this.props.userPasswordReset(this.props.user.id, this.state.currentPassword, this.state.newPassword, this.state.confirmPassword);
    }


    handleMouseEnter () {
      this.setState({ passwordUpdateHover: true });
    }

    handleMouseLeave () {
      this.setState({ passwordUpdateHover: false });
    }

    handleMouseClick () {
      this.setState({ passwordUpdateHover: false });
    }

    openPasswordUpdate () {
      this.setState({ passwordUpdateOpen: true });
    }

    closePasswordUpdate () {
      this.setState({ passwordUpdateOpen: false });
    }

    render () {
      const { user } = this.props;
      return (
        <section style={styles.section}>
          <div className="row center-xs">
            <div className="col-xs-8" style={styles.subheading}>RESET PASSWORD</div>
          </div>

          <div className="row center-xs">
            <div className="col-xs-8">
              <TextField
                type="password"
                fullWidth={true}
                floatingLabelText="Type your current password"
                onChange={this.handleCurrentPasswordChanged}
              />
            </div>
          </div>

          <div className="row center-xs">
            <div className="col-xs-8">
              <TextField
                type="password"
                fullWidth={true}
                floatingLabelText="Type your new password"
                onChange={this.handleNewPasswordChanged}
              />
            </div>
          </div>

          <div className="row center-xs">
            <div className="col-xs-8">
              <TextField
                type="password"
                fullWidth={true}
                floatingLabelText="Confirm new password"
                onChange={this.handleConfirmPassword}
                />
            </div>
          </div>

          <div className="row center-xs">
            <div className="col-xs-12">{ this.props.account.message !== '' ? <p style={styles.message}>{this.props.account.message}</p> : ''}</div>
          </div>

          <div className="col-xs-12">
            <div className="row center-xs">
              <button
                style={this.state.passwordUpdateHover ? styles.passwordUpdateButtonHover : styles.passwordUpdateButton}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleUpdatePassword}
              >
                UPDATE PASSWORD
              </button>
            </div>
          </div>

        </section>
      )
    }
}

const styles={
  section: {
    paddingTop: '10vh'
  },
  subheading: {
  },
  passwordUpdateButton: {
    width: '200px',
    height: '2rem',
    outline: '0',
    background: '0',
    border: '2px solid #000',
    fontWeight: '700',
    color: '#000',
    borderRadius: '2.2vh',
    marginTop: '5vh',
    marginBottom: '10vh'
  },
  passwordUpdateButtonHover: {
    width: '200px',
    height: '2rem',
    outline: '0',
    background: '#00bbdc',
    border: '2px solid #00bbdc',
    fontWeight: '700',
    color: '#fff',
    borderRadius: '2.2vh',
    marginTop: '5vh',
    marginBottom: '10vh'
  },
  message: {
    color: 'red',
    fontWeight: '700',
    fontSize: '0.8rem'
  }
}

