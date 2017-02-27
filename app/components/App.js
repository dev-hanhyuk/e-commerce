import React from 'react';
import { connect } from 'react-redux';
import { displaySizeAdjust } from '_actions/display';
import Appbar from '_components/appbar/Appbar';
import Footer from '_components/footer/Footer';
import Sidebar from '_components/sidebar/Sidebar';


class App extends React.Component {

  componentWillMount () {
    if (window.innerWidth < 1080) this.props.displaySizeAdjust('portable');
  }

  componentDidMount () {
    /* responsive screen dispatch */
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      /* portable devices */
      if (w < 1080) this.props.displaySizeAdjust('portable');
      else this.props.displaySizeAdjust(null);
    });
  }

  render () {
    const { children, location, sidebar } = this.props;
    return (
      <section>
        <Appbar location={location} />
        { sidebar ? <Sidebar /> : ''}
        {children}
        <Footer  />
      </section>
    )
  }
}


const mapStateToProps = ({ sidebar }) => ({ sidebar });
export default connect(mapStateToProps, { displaySizeAdjust }) (App);