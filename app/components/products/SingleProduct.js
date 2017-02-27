import React from 'react'

export default ({ product }) => (
  <section>
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={styles.productView}>
      <img
        className="image-box-shadow"
        src={product.imageUrl[0]}
        style={styles.image}
      />

      <div style={styles.caption}>
        <p style={styles.title}>{product.name}</p>
        <p style={styles.desc}>{product.category}, {product.color}</p>
        <p style={styles.price}>$ {product.price.toFixed(2)}</p>
      </div>
    </div>

  </section>
)

const styles={
  productView: {
    position: 'relative',
    height: '50vh',
    paddingTop: '2vh',
    paddingBottom: '2vh',
    marginBottom: '2vh'
  },
  image: {
    width: '100%',
    height: '70%',
  },
  caption: {
    textAlign: 'center',
    margin: '2vh',
    lineHeight: '1.5'
  },
  title: {
    color: '#141414'
  },
  desc: {
    color: '#787878',
    fontSize: '0.8rem'
  },
  price: {
    color: '#787878',
    fontSize: '1rem'
  }
};
