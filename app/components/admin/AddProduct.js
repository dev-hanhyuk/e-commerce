import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {
  adminAddFilesToUpload,
  adminUploadFilesToServer,
  adminAddNewProduct,
  adminRemoveImage
} from '_actions/admin'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CancelIcon from 'material-ui/svg-icons/navigation/close';
import SquareButton from '_components/common/SquareButton';


class AddProduct extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmitImage = this.handleSubmitImage.bind(this);
      this.handleChangeProps = this.handleChangeProps.bind(this);
      this.handleCancelImage = this.handleCancelImage.bind(this);
      this.handleCreateProduct = this.handleCreateProduct.bind(this);
      this.state = {
        name: '',
        description: '',
        category: '',
        subCategory: '',
        gender: '',
        color: '',
        imageUrl: [],
        price: '',
        stocks: '',
        displayImage: ''
      }
    }

    componentWillMount () {
      const { user } = this.props.auth;
      if (!user || !user.isAdmin) browserHistory.push('/products');
    }

    handleChangeProps (prop, evt) {
      evt.preventDefault();
      this.setState({ [prop]: evt.target.value });
    }

    handleChangeSelectProps (event, index, value, prop) {
      this.setState({ [prop]: value })
    }

    handleSubThumbnailClick (imgUrl) {
      this.setState({displayImage: imgUrl});
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

    handleCancelImage (evt, img, idx) {
      evt.preventDefault();
      console.log(img);
      console.log(idx);
      const newImages = [ ...this.state.imageUrl.slice(0, idx), ...this.state.imageUrl.slice(idx + 1)];
      console.log(newImages);
      this.props.adminRemoveImage(img)
        .then(() => this.setState({ imageUrl: newImages }))
    }


    handleSubmitImage (event) {
      event.preventDefault();
      const data = new FormData();
      data.append('image', document.getElementById('file').files[0]);
      this.props.adminUploadFilesToServer(data)
        .then(filename => {
          this.setState({ imageUrl: [...this.state.imageUrl, filename ] });
          this.setState({ displayImage: this.state.imageUrl[0] });
          return;
        })
        .catch(err => console.error(err))
    }

    handleCreateProduct (evt) {
      evt.preventDefault();
      this.props.adminAddNewProduct(this.state);
    }

    render () {
      const { displayImage, hoverThumb } = this.state;
      return (
        <section className="col-xs-offset-1 col-xs-10" style={styles.section}>
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xs-12" style={styles.subheading}>ADD PRODUCT</div>
              </div>

              <div className="row">
                <div className="col-xs-4">
                  <TextField
                    fullWidth={true}
                    floatingLabelText="Product Name"
                    value={this.state.name}
                    onChange={evt => this.handleChangeProps('name', evt)}
                  />
                </div>
                <div className="col-xs-4">
                  <SelectField
                    floatingLabelText="Category"
                    fullWidth={true}
                    value={this.state.category}
                    onChange={(evt, idx, value) => this.handleChangeSelectProps(evt, idx, value, 'category')}
                  >
                  { category }
                  </SelectField>
                </div>

                <div className="col-xs-4">
                  <SelectField
                    floatingLabelText="Sub-Category"
                    fullWidth={true}
                    value={this.state.subCategory}
                    onChange={(evt, idx, value) => this.handleChangeSelectProps(evt, idx, value, 'subCategory')}
                  >
                  { subcategory }
                  </SelectField>
                </div>
              </div>
              <br />


              <div className="row">
                <TextField
                  className="col-xs-12"
                  hintText="Product Description"
                  hintStyle={styles.hintStyle}
                  fullWidth={true}
                  multiLine={true}
                  rows={5}
                  rowsMax={20}
                  underlineShow={false}
                  textareaStyle={styles.textareaStyle}
                  value={this.state.description}
                  onChange={evt => this.handleChangeProps('description', evt)}
                />
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <SelectField
                    floatingLabelText="Gender"
                    fullWidth={true}
                    value={this.state.gender}
                    onChange={(evt, idx, value) => this.handleChangeSelectProps(evt, idx, value, 'gender')}
                  >
                  { gender }
                  </SelectField>
                </div>

                <div className="col-xs-6">
                  <TextField
                    fullWidth={true}
                    floatingLabelText="Color"
                    value={this.state.color}
                    onChange={evt => this.handleChangeProps('color', evt)}
                  />
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-xs-6">
                  <TextField
                    fullWidth={true}
                    floatingLabelText="Price"
                    value={this.state.price}
                    onChange={evt => this.handleChangeProps('price', evt)}
                  />
                </div>

                <div className="col-xs-6">
                  <TextField
                    fullWidth={true}
                    floatingLabelText="Number of Stocks"
                    value={this.state.stocks}
                    onChange={evt => this.handleChangeProps('stocks', evt)}
                  />
                </div>
              </div>
              <br />

              <div className="row center-xs">
                <div className="col-xs-6">
                  <form role="form">
                    <div className="form-group">
                      <input id="file" type="file" />
                    </div>
                    <button id="upload" type="button" onClick={this.handleSubmitImage}>Upload</button>
                    { this.state.imageUrl.map((img, idx) => <p key={idx}>{img}<span onClick={(evt) => this.handleCancelImage(evt, img, idx)}><CancelIcon /></span></p>) }
                  </form>
                </div>
              </div>

              <div className="row center-xs">
                <div className="col-xs-6">
                    <button id="upload" type="button" onClick={this.handleCreateProduct}>Create product</button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-xs-12" style={styles.subheading}>PREVIEW</div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{marginTop: '5vh', padding: '5%'}}>
                  <div className="row">
                    { this.state.imageUrl ? <img id="thumb" src={displayImage} className="col-lg-12 col-md-12 sm-12 col-xs-12 image-box-shadow" style={styles.mainThumbnail} />: '' }
                  </div>

                  <div className="row">
                  {
                    this.state.imageUrl ? this.state.imageUrl.map((imgUrl, idx ) => (
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
                    <div className="row center-xs" style={styles.productName}>{this.state.name}</div><br />
                    <div className="row center-xs" style={styles.category}>{this.state.category}, {this.state.subCategory}</div><br />
                    <div className="row center-xs">color: {this.state.color}</div><br />
                    <div className="row center-xs">{this.state.gender ? `gender: ${this.state.gender[0]}`: ''}</div><br />

                    <div className="row">
                      <div className="col-xs-12" style={styles.description}>{this.state.description}</div>
                    </div>

                    <div className="row around-xs">
                      <div className="col-xs-6">
                        <SquareButton title="ADD TO CART" leaveStyle={styles.leaveStyle}/>
                      </div>
                      <div className="col-xs-6">
                        <SquareButton title="ADD TO WISHLIST" />
                      </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
        </section>
      )
    }
}


const category = [
  <MenuItem key={1} value="Clothes" primaryText="Clothes" />,
  <MenuItem key={2} value="Shoes" primaryText="Shoes" />,
  <MenuItem key={3} value="Jewelry" primaryText="Jewelry" />,
  <MenuItem key={4} value="Bag" primaryText="Bag" />,
  <MenuItem key={5} value="Accessory" primaryText="Accessory" />,
]

const subcategory = [
  <MenuItem key={1} value="Dress" primaryText="Dress" />,
  <MenuItem key={2} value="Casual" primaryText="Casual" />,
  <MenuItem key={3} value="Costume" primaryText="Costume" />,
]

const gender = [
  <MenuItem key={1} value="Male" primaryText="Male" />,
  <MenuItem key={2} value="Female" primaryText="Female" />,
]



const styles={
  section: {
    paddingTop: '15vh'
  },
  subheading: {
    marginBottom: '1vh',
    fontSize: '1.5rem'
  },
  description: {
    margin: '5vh',
    width: '100%',
    height: '40vh'
  },
  menuItemStyle: {
    color: '#000'
  },
  textareaStyle: {
    border: '1px solid rgb(224, 224, 224)',
    padding: '2vh'
  },
  hintStyle: {
    position: 'absolute',
    padding: '2vh',
    top: '2vh',
    left: '2vh'
  },
  dropzone: {
    height: '10vh',
    border: '1px solid rgb(224, 224, 224)',
    textAlign: 'center',
    paddingTop: '5vh'
  },
  mainThumbnail: {
    padding: '0',
    height: '30vh'
  },
  subThumbnail: {
    padding: '0',
    height: '13vh',
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
}

const mapStateToProps = ({ admin, auth }) => ({ admin, auth });

export default connect(mapStateToProps, { adminAddFilesToUpload, adminUploadFilesToServer, adminAddNewProduct, adminRemoveImage }) (AddProduct);

