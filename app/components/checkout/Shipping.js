import React from 'react'
import { connect } from 'react-redux';
import {
  updateInvoice,
  fetchDefaultShippingInformation,
  removeDefaultShippingInformation
} from '_actions/invoice';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

class Billing extends React.Component {
    constructor(props) {
      super(props);
      this.state = { radioClicked: false };
      this.handleChangeProps = this.handleChangeProps.bind(this);
      this.handleClickOnRadio = this.handleClickOnRadio.bind(this);
    }

    handleClickOnRadio () {
      if (this.state.radioClicked == false) this.props.fetchDefaultShippingInformation(this.props.invoice);
      else this.props.removeDefaultShippingInformation();
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

          <div className="col-xs-offset-1 col-xs-10">

            <h1 style={styles.title}>Shipping Address</h1>
            <Checkbox
              label="Same as billing address"
              onClick={this.handleClickOnRadio}
            />

            <div className="row">
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="First Name"
                  hintText="John"
                  value={invoice.s_firstname}
                  onChange={evt => this.handleChangeProps('s_firstname', evt)}
                /><br />
              </div>
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="Last Name"
                  hintText="Doe"
                  value={invoice.s_lastname}
                  onChange={evt => this.handleChangeProps('s_lastname', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="e-mail"
                  hintText="user@email.com"
                  value={invoice.s_email}
                  onChange={evt => this.handleChangeProps('s_email', evt)}
                /><br />
              </div>
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="Phone"
                  hintText="+82 1 555-555-5555"
                  value={invoice.s_phone}
                  onChange={evt => this.handleChangeProps('s_phone', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="Country"
                  hintText="USA"
                  value={invoice.s_address_country}
                  onChange={evt => this.handleChangeProps('s_address_country', evt)}
                /><br />
              </div>
              <div className="col-xs-6">
                <TextField
                  floatingLabelText="City"
                  hintText="New York"
                  value={invoice.s_address_city}
                  onChange={evt => this.handleChangeProps('s_address_city', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <TextField
                  floatingLabelText="Address(1)"
                  style={styles.longInfo}
                  hintText="150 EAST 56TH STREET"
                  value={invoice.s_address_line1}
                  onChange={evt => this.handleChangeProps('s_address_line1', evt)}
                /><br />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-7">
                <TextField
                  style={styles.longInfo}
                  floatingLabelText="Address(2)"
                  hintText="RM #11C"
                  value={invoice.s_address_line2}
                  onChange={evt => this.handleChangeProps('s_address_line2', evt)}
                /><br />
              </div>
              <div className="col-xs-5">
                <TextField
                  style={styles.longInfo}
                  floatingLabelText="Postal Code"
                  hintText="10022"
                  value={invoice.s_address_zip}
                  onChange={evt => this.handleChangeProps('s_address_zip', evt)}
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
  }
}

const mapStateToProps = ({ invoice }) => ({ invoice });
export default connect(mapStateToProps, {
  updateInvoice,
  fetchDefaultShippingInformation,
  removeDefaultShippingInformation
}) (Billing);