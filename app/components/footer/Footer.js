import React from 'react'
import Facebook from './Facebook';
import Instagram from './Instagram';
import Twitter from './Twitter';
import Email from './Email';


const Footer = (props) => (
  <section>
    <div className="col-xs-12 center-xs" style={styles.footer}>
      <div className="row center-xs" style={styles.title}>E-STORE</div>
      <div className="row col-xs-offset-1 col-xs-10">

        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={styles.divider}>
          <div className="row col-xs-12 start-xs" style={styles.subHeader}>Member Services</div>
          <div className="row col-xs-12">FAQs</div>
          <div className="row col-xs-12">Privacy Policy</div>
          <div className="row col-xs-12">Terms of Service</div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={styles.divider}>
          <div className="row col-xs-12" style={styles.subHeader}>E-Store</div>
          <div className="row col-xs-12">Sign Up</div>
          <div className="row col-xs-12">Contact Us</div>
          <div className="row col-xs-12">Location</div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={styles.divider}>
          <div className="row col-xs-12" style={styles.subHeader}>Company</div>
          <div className="row col-xs-12">About Us</div>
          <div className="row col-xs-12">Careers</div>
          <div className="row col-xs-12">Press</div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" style={styles.divider}>
          <div className="row col-xs-12" style={styles.subHeader}>Connect</div>
          <div className="row col-xs-12"><a href="#" title="Facebook"><Facebook style={styles.socialMedia}/></a></div>
          <div className="row col-xs-12"><a href="#" title="Instagram"><Instagram style={styles.socialMedia}/></a></div>
          <div className="row col-xs-12"><a href="#" title="Twitter"><Twitter style={styles.socialMedia}/></a></div>
        </div>


      </div>
    </div>
  </section>
)

const styles={
  footer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#272727',
    margin: '0',
    color: '#fff',
    paddingTop: '7vh',
    lineHeight: '1.8rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '5vh'
  },
  subHeader: {
    fontSize: '1.3rem',
    marginBottom: '2rem'
  },
  socialMedia: {
    fill: '#fff',
    width: '30px'
  },
  divider: {
    marginBottom: '10vh'
  }
}

export default Footer;