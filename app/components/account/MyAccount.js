import React from 'react'
import TextField from 'material-ui/TextField';


export default class UserInfoForm extends React.Component {
    constructor(props) {
      super(props);
        this.state = {profileUpdateHover: false};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);

    }

    handleMouseEnter () {
      this.setState({profileUpdateHover: true});
    }

    handleMouseLeave () {
      this.setState({profileUpdateHover: false});
    }

    handleMouseClick () {
      this.setState({profileUpdateHover: false});
    }

    componentDidMount () {}

    render () {
      const { user } = this.props;
      return (
        <section>
          <div className="row">
            <div className="col-xs-12" style={styles.subheading}>My Account</div>
          </div>

          <div className="row">

            <div className="col-xs-6">
              <TextField
                fullWidth={true}
                floatingLabelText="Firstname"
                value={user.firstname}
              />
            </div>

            <div className="col-xs-6">
              <TextField
                fullWidth={true}
                floatingLabelText="Lastname"
                value={user.lastname}
              />
            </div>
          </div>


          <div className="row">
            <div className="col-xs-12">
              <TextField
                fullWidth={true}
                floatingLabelText="Email"
                value={user.email}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <TextField
                fullWidth={true}
                floatingLabelText="Country"
                value={user.address_country}
              />
            </div>

            <div className="col-xs-6">
              <TextField
                fullWidth={true}
                floatingLabelText="City"
                value={user.address_city}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <TextField
                fullWidth={true}
                floatingLabelText="Address(1)"
                value={user.address_line1}
              />
            </div>
          </div>

           <div className="row">
            <div className="col-xs-7">
              <TextField
                floatingLabelText="Address(2)"
                fullWidth={true}
                value={user.address_line2}
              />
            </div>

            <div className="col-xs-5">
              <TextField
                floatingLabelText="Postal Code"
                fullWidth={true}
                value={user.address_zip}
              />
            </div>


            <div className="col-xs-12">
              <div className="row center-xs">
                <button
                  style={this.state.profileUpdateHover ? styles.profileUpdateButtonHover : styles.profileUpdateButton}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  UPDATE USER ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </section>
      )
    }
}

const styles={
  profileUpdateButton: {
    width: '200px',
    height: '2rem',
    outline: '0',
    background: '0',
    border: '2px solid #000',
    fontWeight: '700',
    color: '#000',
    borderRadius: '2.2vh',
    marginTop: '5vh',
    marginBottom: '30vh'
  },
  profileUpdateButtonHover: {
    width: '200px',
    height: '2rem',
    outline: '0',
    background: '#00bbdc',
    border: '2px solid #00bbdc',
    fontWeight: '700',
    color: '#fff',
    borderRadius: '2.2vh',
    marginTop: '5vh',
    marginBottom: '30vh'
  },
  subheading: {
    marginBottom: '1vh'
  }
};
