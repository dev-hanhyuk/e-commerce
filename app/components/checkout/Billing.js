import React from 'react'
import { connect } from 'react-redux';
import {
  updateInvoice,
  fetchDefaultBillingInformation,
  removeDefaultBillingInformation
} from '_actions/invoice';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

class Billing extends React.Component {
    constructor(props) {
      super(props);
      this.state = { radioClicked: false, CCnumber: '' };
      this.handleChangeProps = this.handleChangeProps.bind(this);
      this.handleClickOnRadio = this.handleClickOnRadio.bind(this);
    }

    handleClickOnRadio () {
      if (this.state.radioClicked == false) this.props.fetchDefaultBillingInformation(this.props.auth.user);
      else this.props.removeDefaultBillingInformation();
      this.setState({ radioClicked: !this.state.radioClicked });
    }

    handleChangeProps (prop, evt) {
      evt.preventDefault();
      this.props.updateInvoice(prop, evt.target.value);
    }

    render () {
      const { invoice } = this.props;

      return (
        <section>

            <form className="col-xs-offset-1 col-xs-10" style={{marginTop: '5vh'}}>
              <h1 style={styles.title}>Card Verification</h1>
              <div className="row">
                <div className="col-xs-6">
                  <TextField
                    floatingLabelText="Full name"
                    hintText="Jane Doe"
                    type="text"
                    name="CCname"
                    onChange={evt => this.handleChangeProps('p_fullname', evt)}
                  />
                </div>
                <div className="col-xs-6">
                  <TextField
                    id="card-number"
                    floatingLabelText="Card number"
                    hintText="4242 4242 4242 4242"
                    type="text"
                    name="CCnumber"
                    onChange={evt => this.handleChangeProps('p_number', evt)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <TextField
                    floatingLabelText="MM/YY"
                    hintText="09/17"
                    type="text"
                    name="CCexpiry"
                    onChange={evt => this.handleChangeProps('p_exp', evt)}
                  />
                </div>
                <div className="col-xs-6">
                  <TextField
                    floatingLabelText="CVC"
                    hintText="777"
                    type="text"
                    name="CCcvc"
                    onChange={evt => this.handleChangeProps('p_cvc', evt)}
                  />
                </div>
              </div>
            </form>



          <div className="col-xs-offset-1 col-xs-10">
            <h1 style={styles.title}>Billing Information</h1>

            <Checkbox
              label="Same as user information"
              onClick={this.handleClickOnRadio}
            />

            <div className="row">
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="First Name"
                  hintText="John"
                  value={invoice.b_firstname}
                  onChange={evt => this.handleChangeProps('b_firstname', evt)}
                /><br />
              </div>
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="Last Name"
                  hintText="Doe"
                  value={invoice.b_lastname}
                  onChange={evt => this.handleChangeProps('b_lastname', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="e-mail"
                  hintText="user@email.com"
                  value={invoice.b_email}
                  onChange={evt => this.handleChangeProps('b_email', evt)}
                /><br />
              </div>
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="Phone"
                  hintText="+82 1 555-555-5555"
                  value={invoice.b_phone}
                  onChange={evt => this.handleChangeProps('b_phone', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="Country"
                  hintText="USA"
                  value={invoice.b_address_country}
                  onChange={evt => this.handleChangeProps('b_address_country', evt)}
                /><br />
              </div>
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="City"
                  hintText="New York"
                  value={invoice.b_address_city}
                  onChange={evt => this.handleChangeProps('b_address_city', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <TextField
                  floatingLabelText="Address(1)"
                  style={styles.longInfo}
                  hintText="150 EAST 56TH STREET"
                  value={invoice.b_address_line1}
                  onChange={evt => this.handleChangeProps('b_address_line1', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-7">
                <TextField
                  style={styles.longInfo}
                  floatingLabelText="Address(2)"
                  hintText="RM #11C"
                  value={invoice.b_address_line2}
                  onChange={evt => this.handleChangeProps('b_address_line2', evt)}
                /><br />
              </div>
              <div className="col-xs-5">
                <TextField
                  style={styles.longInfo}
                  floatingLabelText="Postal Code"
                  hintText="10022"
                  value={invoice.b_address_zip}
                  onChange={evt => this.handleChangeProps('b_address_zip', evt)}
                /><br />
              </div>
            </div>
          </div>
        </section>
      )
    }
}


const styles={
  title: {
    fontWeight: '300',
    fontSize: '2rem',
    marginTop: '5vh',
    marginBottom: '2vh'
  },
  longInfo: {
    width: '100%'
  },
  cardWrapper: {
    marginTop: '3vh',
    marginBottom: '5vh'
  }
}

const mapStateToProps = ({ invoice, auth }) => ({ invoice, auth });

export default connect(mapStateToProps, {
  updateInvoice,
  fetchDefaultBillingInformation,
  removeDefaultBillingInformation,
}) (Billing);