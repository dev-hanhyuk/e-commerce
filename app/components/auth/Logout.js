import React from 'react'
import { connect } from 'react-redux';
import { logout } from '_actions/auth';

class Logout extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount () {
      this.props.logout();
    }

    render () {

      return (
        <section style={styles.section}>
          <div className="row center-xs">
            <h1>You are successfully logged out</h1>
          </div>
        </section>
      )
    }
}

const styles={
  section: {
    paddingTop: '20vh',
    marginBottom: '30vh'
  }
}

export default connect(null, { logout } ) (Logout);