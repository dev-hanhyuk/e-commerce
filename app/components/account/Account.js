import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import MyAccount from './MyAccount';
import PasswordResetForm from './PasswordResetForm';
import { userPasswordReset } from '_actions/auth';


import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';


class Account extends React.Component {
    constructor(props) {
      super(props);
      this.state = { myAccount: false, resetPassword: false };
      this.toggleMyAccount = this.toggleMyAccount.bind(this);
      this.toggleResetPassword = this.toggleResetPassword.bind(this);
    }

    toggleMyAccount () {
      this.setState({ myAccount: !this.state.myAccount });
    }

    toggleResetPassword () {
      this.setState({ resetPassword: !this.state.resetPassword });
    }

    render () {
      const { user } = this.props.auth;

      return (
        <section>
          <div className="col-xs-offset-1 col-xs-10">
            <div className="row center-xs"><h1 style={styles.title} className="col-xs-12">User Account</h1></div>

            { !user ? `You are not signed in yet` :
              <Tabs className="col-xs-12" style={styles.tabs}>
                <Tab label="ACCOUNT"><MyAccount user={user} /></Tab>
                <Tab label="PASSWORD" >
                  <PasswordResetForm
                    user={user}
                    account={this.props.auth}
                    userPasswordReset={this.props.userPasswordReset}
                  />
                </Tab>
              </Tabs>

            }


          </div>
        </section>
      )
    }
}

const styles={
  title: {
    fontWeight: '300',
    fontSize: '2rem',
    paddingTop: '20vh',
    marginBottom: '5vh'
  },
  subTitle: {
    border: '1px solid red',
    width: '80%',
    height: '3rem'
  },
  icon: {
    height: '50px',
    width: '50px',
    viewBox: '0 0 24 24'
  },
  wrapper: {
    marginBottom: '10vh',
    lineHeight: '2.2',
    fontSize: '1.0rem'
  },
  forms: {
    marginBottom: '20vh'
  },
  tabs: {
    padding: '0'
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { userPasswordReset }) (Account);