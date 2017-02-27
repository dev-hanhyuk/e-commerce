import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProductsFromServer } from '_actions/products';
import _ from 'lodash';
import Slider from 'react-slick';
import PrevArrow from 'material-ui/svg-icons/navigation/chevron-left';
import NextArrow from 'material-ui/svg-icons/navigation/chevron-right';
import Product from './SingleProduct'


class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displaySearch: false, searchQuery: '', selectedCategory: '', selectedSort: ''};
    this.handleSearch = this.handleSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.handleChangeSearchQuery = this.handleChangeSearchQuery.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }

  componentWillMount () {
    this.props.fetchProductsFromServer();
  }

  handleSearch () {
    this.setState({displaySearch: true});
  }

  closeSearch () {
    this.setState({displaySearch: false});
  }

  handleChangeSearchQuery (evt) {
    this.setState({searchQuery: evt.target.value});
  }

  handleChangeCategory (event) {
    this.setState({ selectedCategory: event.target.value });
  }

  handleChangeSort (event) {
    this.setState({ selectedSort: event.target.value });
  }

  renderProductList () {
    const { products } = this.props;//array of object
    const queriedProducts = _.filter(products, (product) => product.name.startsWith(this.state.searchQuery));
    const categorizedProducts = _.filter(queriedProducts, (product) => {
      if (this.state.selectedCategory) return product.category == this.state.selectedCategory;
      else return product;
    });
    const sortedProducts = _.orderBy(categorizedProducts, ['price'], [this.state.selectedSort]);

    return sortedProducts
      .map((product) => (
        <span key={product.id} className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
          <Link to={`/products/${product.id}`} style={{textDecoration: 'none'}}>
            <Product product={product}/>
          </Link>
        </span>
      ))
  }

  render () {
    const { products } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: <PrevArrow style={styles.arrow}/>,
      nextArrow: <NextArrow style={styles.arrow} />
    }


    return (
      <section style={styles.section}>

        <Slider {...settings}>
          <img src="/carousel/carousel-1.jpg" className="image-box-shadow" style={styles.carouselImage}/>
          <img src="/carousel/carousel-2.jpg" className="image-box-shadow" style={styles.carouselImage}/>
          <img src="/carousel/carousel-3.jpg" className="image-box-shadow" style={styles.carouselImage}/>
          <img src="/carousel/carousel-4.jpg" className="image-box-shadow" style={styles.carouselImage}/>
        </Slider>

        <div style={styles.productsSection} className="col-xs-offset-1 col-xs-10">

          <div className="row middle-xs between-xs">
            <div className="col-xs-2" style={styles.selectCategoryWrapper} value={this.state.selectedCategory} onChange={this.handleChangeCategory}>
              <select className="row middle-xs" style={styles.select}>
                <option value="all" className="row">All</option>
                <option value="Bag" className="row">Bags</option>
                <option value="Shoes" className="row">Shoes</option>
                <option value="Accessory" className="row">Accessories</option>
              </select>
            </div>


            <form className="col-xs-6">
              <input
                type="text"
                name="search"
                placeholder="Type product name"
                onChange={this.handleChangeSearchQuery}
                style={styles.querySearch}
              />
            </form>

            <div className="col-xs-2" style={styles.selectPriceWrapper}>
              <select
                className="row middle-xs"
                style={styles.select}
                value={this.state.selectedSort}
                onChange={this.handleChangeSort}
              >
                <option value="asc">Price: ASC</option>
                <option value="desc">Price: DESC</option>

              </select>
            </div>

          </div>


          <div className="row" style={styles.productList}>
            { this.renderProductList() }
          </div>

        </div>


      </section>
    )
  }
}
const styles={
  section: {
    width: '100%',
    overflowX: 'hidden',
    padding: '0',
    paddingTop: '8vh'
  },
  productsSection: {
    width: '100%',
    padding: '0',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '10vh'
  },
  querySearch: {
    outline: '0',
    width: '100%',
    border: '2px solid #787878',
    borderRadius: '2.4vh',
    paddingLeft: '2.5vh',
    fontSize: '1.1rem',
    height: '2rem',
  },
  carouselImage: {
    width: '100%',
    height: '60vh'
  },
  arrow: {
    zIndex: '2'
  },
  categoryFilter: {
    outline: '0',
    height: '2rem'
  },
  priceSort: {

  },
  select: {
    height: '2rem',
    width: '100%',
    background: 'transparent',
    border: '0',
    outline: '0',
    // borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '0px',
    fontSize: '1rem',
    color: '#787878',

  },
  selectCategoryWrapper: {
    paddingLeft: '7vh',
  },
  selectPriceWrapper: {
    // paddingRight: '7vh',
  },
  productList: {
    marginTop: '5vh'
  }

};

const mapStateToProps = ({ products }) => ({ products });
export default connect (mapStateToProps, { fetchProductsFromServer }) (Products);