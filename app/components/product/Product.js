import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchSingleProductFromServer } from '_actions/product';
import { orderProductToCart, orderProductToSession, addProductToWishlist } from '_actions/order';
import SquareButton from '_components/common/SquareButton';

class Product extends React.Component {
    constructor(props) {
      super(props);
      this.state = {displayImage: ''};
      this.handleOrderProduct = this.handleOrderProduct.bind(this);
      this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
    }

    componentWillReceiveProps (nextProps) {
      this.setState({displayImage: nextProps.product.imageUrl[0]});
    }

    handleAddToWishlist () {
      this.props.addProductToWishlist(this.props.product.id, this.props.auth.user.id, 1);
    }

    handleSubThumbnailClick (imgUrl) {
      this.setState({displayImage: imgUrl});
    }

    componentWillMount () {
      this.props.fetchSingleProductFromServer(this.props.params.productId);
    }

    handleOrderProduct () {
      if (this.props.auth.user) this.props.orderProductToCart(this.props.auth.user, this.props.product, 1);
      else this.props.orderProductToSession(this.props.product, 1);
    }

    handleMouseEnter (evt, idx) {
      evt.preventDefault();
      evt.target.style.opacity = 1;
      evt.target.style.border = '1px solid rgba(0, 0, 0, 0.3)';
    }

    handleMouseLeave (evt, idx) {
      evt.preventDefault();
      evt.target.style.opacity = 0.6;
      evt.target.style.border = 'none';
    }

    render () {
      const { product, params } = this.props;
      const { displayImage, hoverThumb } = this.state;

      return (
        <section style={styles.section}>
          <div className="col-lg-offset-1 col-lg-10 col-xs-offset-1 col-xs-10">

            <div className="row">

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{marginTop: '5vh', padding: '5%'}}>
                <div className="row">
                  { product.imageUrl ? <img id="thumb" src={displayImage} className="col-lg-12 col-md-12 sm-12 col-xs-12 image-box-shadow" style={styles.mainThumbnail} />: '' }
                </div>

                <div className="row">
                {
                  product.imageUrl ? product.imageUrl.map((imgUrl, idx ) => (
                    <img
                      key={idx} src={imgUrl}
                      onClick={() => this.handleSubThumbnailClick(imgUrl)}
                      onMouseEnter={(evt) => this.handleMouseEnter(evt, idx)}
                      onMouseLeave={(evt) => this.handleMouseLeave(evt, idx)}
                      className="col-lg-3 col-md-3 col-xs-3  image-box-shadow"
                      style={hoverThumb == idx ?  Object.assign(styles.subThumbnail, {opacity: 1}) : styles.subThumbnail}
                    />
                  )) : ''
                }
                </div>

                <div style={styles.productCode}>PRODUCT CODE: 32901120</div>
              </div>


              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{marginTop: '5vh', marginBottom: '20vh', padding: '5%'}}>
                <div className="row center-xs" style={styles.productName}>{product.name}</div><br />
                <div className="row center-xs" style={styles.category}>{product.category}, {product.subCategory}</div><br />
                <div className="row center-xs">color: {product.color}</div><br />
                <div className="row center-xs">{product.gender ? `gender: ${product.gender[0]}`: ''}</div><br />

                <div className="row">
                  <div className="col-xs-12" style={styles.description}>{product.description}</div>
                </div>

                <div className="row around-xs">
                  <div className="col-xs-6">
                    <SquareButton title="ADD TO CART" leaveStyle={styles.leaveStyle} handleClick={this.handleOrderProduct}/>
                  </div>
                  <div className="col-xs-6">
                    <SquareButton title="ADD TO WISHLIST" handleClick={this.handleAddToWishlist}/>
                  </div>
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
    paddingTop: '12vh',
  },
  subHeader: {
    fontSize: '0.8rem'
  },
  left: {
    padding: '3%',
    height: '100vh',
  },
  right: {
    padding: '3%',
    height: '100vh'
  },
  mainThumbnail: {
    padding: '0',
    height: '60vh'
  },
  subThumbnail: {
    padding: '0',
    height: '17vh',
    opacity: '0.7'
  },
  productName: {
    fontSize: '2rem',
    fontWeight: '300'
  },
  productCode: {
    marginTop: '1rem',
    fontSize: '0.6rem',
  },
  category: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '1rem',
    fontWeight: '300'
  },
  description: {
    marginBottom: '3rem',
    fontSize: '0.8rem',
    maxHeight: '30vh',
    overflow: 'auto'
  },
  leaveStyle: {
    background: '#383838',
    color: '#eee'
  }
};


const mapStateToProps = ({ product, auth }) => ({ product, auth });

export default connect (mapStateToProps, {
  fetchSingleProductFromServer,
  orderProductToCart,
  orderProductToSession,
  addProductToWishlist
}) (Product);
