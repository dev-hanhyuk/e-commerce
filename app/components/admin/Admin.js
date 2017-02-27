import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs';

import Products from './Products'
import Orders from './Orders'
import Invoices from './Invoices'

const Admin = ({ auth }) => (
  <section style={styles.section}>
    <div className="col-xs-offset-1 col-xs-10">
      <div className="row center-xs"><h1 style={styles.title} className="col-xs-12">Administration</h1></div>
      { auth.user && auth.user.isAdmin ?
        <Tabs className="col-xs-12" style={styles.tabs}>
          <Tab label="PRODUCTS"><Products /></Tab>
          <Tab label="ORDERS" ><Orders /></Tab>
          <Tab label="INVOICES" ><Invoices /></Tab>
        </Tabs>

        : <div className="col-xs-offset-1 col-xs-10"><p className="row center-xs" style={styles.unAuthorized}>You are not authorized as ADMIN</p></div> }
    </div>
  </section>
);

const styles={
  section: {
    marginBottom: '20vh'
  },
  title: {
    fontWeight: '300',
    fontSize: '2rem',
    paddingTop: '20vh',
    marginBottom: '10vh'
  },
  tabs: {
    padding: '0'
  },
  unAuthorized: {
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps) (Admin);
