import React from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { fetchUserOrdersFromServer } from '_actions/order';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ConfirmOrders from './Confirmorders';
import Billing from './Billing';
import Shipping from './Shipping';
import Payment from './Payment';
import axios from 'axios';

const STRIPE_PUBLISHABLE_KEY = process.env.STIPE_PUBLISHABLE_KEY || 'pk_test_89BWHaTW06t8GAYXHbiL0Qfx';


class Checkout extends React.Component {
    constructor(props) {
      super(props);
      this.state = { finished: false, stepIndex: 0 };
      this.handleCompleteOrder = this.handleCompleteOrder.bind(this);
    }

    componentDidMount () {
      Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
    }

    handleNext = () => {
      const {stepIndex} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 3,
      });
    };

    handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
    };

    getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0: return <ConfirmOrders />;
        case 1: return <Billing />;
        case 2: return <Shipping />;
        case 3: return <Payment />;
        default: return <ConfirmOrders />;
      }
    }

    handleCompleteOrder () {
      // create card token
      const { invoice, orders, auth } = this.props;
      const totalPrice = orders.cart.reduce((p, c) => p + (c.product.price * c.quantity), 0).toFixed(2);
      const invoicePkg = {
        shipping: {
          s_firstname: invoice.s_firstname,
          s_lastname: invoice.s_lastname,
          s_email: invoice.s_email,
          s_phone: invoice.s_phone,
          s_address_country: invoice.s_address_country,
          s_address_city: invoice.s_address_city,
          s_address_zip: invoice.s_address_zip,
          s_address_line1: invoice.s_address_line1,
          s_address_line2: invoice.s_address_line2,
        },
        billing: {
          b_firstname: invoice.b_firstname,
          b_lastname: invoice.b_lastname,
          b_email: invoice.b_email,
          b_phone: invoice.b_phone,
          b_address_country: invoice.b_address_country,
          b_address_city: invoice.b_address_city,
          b_address_zip: invoice.b_address_zip,
          b_address_line1: invoice.b_address_line1,
          b_address_line2: invoice.b_address_line2,
        },
        payment: {
          p_fullname: invoice.p_fullname,
          p_brand: invoice.p_brand,
          p_exp: invoice.p_exp,
          p_number: invoice.p_number,
          p_cvc: invoice.p_cvc,
        },
        price: totalPrice
      }
      const stripeResponseHandler = (status, response) => {
        axios.post('/api/invoice/charge', {
          stripeToken: response,
          invoice: invoicePkg,
          orderIds: orders.cart.map(o => o.id),
          user: auth.user || invoice.p_full_name
        })
        .then(() => {
          console.log('successfully charged')
          if (auth && auth.user) this.props.fetchUserOrdersFromServer(auth.user.id);
          return browserHistory.push('/products');
        })
        .catch(err => console.error(err))
      };

      Stripe.card.createToken({
        number: +invoice.p_number.split(' ').join(''),
        cvc: invoice.p_cvc,
        exp_month: +invoice.p_exp.slice(0, 2),
        exp_year: +invoice.p_exp.slice(4)
      }, stripeResponseHandler);

    }

    render () {
      const {finished, stepIndex} = this.state;

      return (
        <section style={styles.section}>
          <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
            <Stepper activeStep={stepIndex}>
              <Step><StepLabel>Confirm orders</StepLabel></Step>
              <Step><StepLabel>Credit card/billing</StepLabel></Step>
              <Step><StepLabel>Shipping address</StepLabel></Step>
              <Step><StepLabel>Payment</StepLabel></Step>
            </Stepper>
            <div style={styles.contentStyle}>
                <div>
                  {this.getStepContent(stepIndex)}
                  <div style={{marginTop: 12}}>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}
                    />
                    <RaisedButton
                      label={stepIndex === 3 ? 'Complete' : 'Next'}
                      primary={true}
                      onTouchTap={stepIndex === 3 ? this.handleCompleteOrder : this.handleNext}
                    />
                  </div>
                </div>

            </div>
          </div>
        </section>
      )
    }
}

const styles={
  section: {
    paddingTop: '15vh',
    marginBottom: '20vh'
  },
  contentStyle: {
    margin: '0 16px'
  }
};

const mapStateToProps = ({ auth, invoice, orders }) => ({ auth, invoice, orders });
export default connect(mapStateToProps, { fetchUserOrdersFromServer }) (Checkout);