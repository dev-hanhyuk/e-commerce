import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { fetchProductsFromServer } from '_actions/products'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddProductIcon from 'material-ui/svg-icons/content/add';


class Products extends React.Component {
    constructor(props) {
      super(props);
      this.handleRowSelection = this.handleRowSelection.bind(this);
    }

    handleClickAddProduct () {
      browserHistory.push('/admin/addproduct');
    }

    handleRowSelection(key) {
      const pid = (this.props.products[key[0]].id);
      browserHistory.push(`/admin/updateproduct/${pid}`);
    }

    componentWillMount () {
      const { user } = this.props.auth;
      if( user && user.isAdmin) this.props.fetchProductsFromServer();
    }

    renderAdminProductList () {
      const { products } = this.props;
      return (
          <div className="row">
            <Table className="col-xs-12" onRowSelection={this.handleRowSelection}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{width: '5%'}}>pid</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '20%'}}>name of product</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '15%'}}>category</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '10%'}}>price</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '5%'}}>stocks</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '5%'}}>gender</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '15%'}}>color</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '25%'}}>images</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  products.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableRowColumn style={{width: '5%'}}>{p.id}</TableRowColumn>
                      <TableRowColumn style={{width: '20%'}}>{p.name}</TableRowColumn>
                      <TableRowColumn style={{width: '15%', whiteSpace: 'normal', wordWrap: 'break-word'}}>{p.category}, {p.subCategory}</TableRowColumn>
                      <TableRowColumn style={{width: '10%'}}>{p.price}</TableRowColumn>
                      <TableRowColumn style={{width: '5%'}}>{p.stocks}</TableRowColumn>
                      <TableRowColumn style={{width: '5%'}}>{p.gender.slice(0, 1)}</TableRowColumn>
                      <TableRowColumn style={{width: '15%'}}>{p.color}</TableRowColumn>
                      <TableRowColumn style={{width: '25%'}}>
                        {p.imageUrl.map((imgUrl, i) => <img key={i} src={imgUrl} style={{width: '50px', height: '50px'}}/>)}
                      </TableRowColumn>

                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </div>
      )
    }

    render () {
      return (
        <section>
          { this.renderAdminProductList() }
          <FloatingActionButton style={styles.fab} onClick={this.handleClickAddProduct}>
            <AddProductIcon />
          </FloatingActionButton>
        </section>
      )
    }
}

const styles={
  fab: {
    position: 'fixed',
    bottom: '3vh',
    right: '3vh',
    zIndex: '5'
  }
}

const mapStateToProps = ({ auth, products }) => ({ auth, products });
export default connect(mapStateToProps, { fetchProductsFromServer }) (Products);
