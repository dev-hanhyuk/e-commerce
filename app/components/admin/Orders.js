import React from 'react'
import { connect } from 'react-redux'
import { adminFetchOrdersFromServer } from '_actions/admin'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Orders extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount () {
      this.props.adminFetchOrdersFromServer();
    }

    render () {
      const { orders } = this.props.admin;

      return (
        <section>
          <div className="row">
            <Table className="col-xs-12">
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>oid</TableHeaderColumn>
                  <TableHeaderColumn>status</TableHeaderColumn>
                  <TableHeaderColumn>quantity</TableHeaderColumn>
                  <TableHeaderColumn>pid</TableHeaderColumn>
                  <TableHeaderColumn>user</TableHeaderColumn>
                  <TableHeaderColumn>invoice</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  orders.map((o, idx) => (
                    <TableRow key={idx}>
                      <TableRowColumn>{o.id}</TableRowColumn>
                      <TableRowColumn>{o.status}</TableRowColumn>
                      <TableRowColumn>{o.quantity}</TableRowColumn>
                      <TableRowColumn>{o.product_id}</TableRowColumn>
                      <TableRowColumn>{o.user_id}</TableRowColumn>
                      <TableRowColumn>{o.invoice_id}</TableRowColumn>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </div>
        </section>
      )
    }
}

const styles={}

const mapStateToProps = ({ admin }) => ({ admin });
export default connect(mapStateToProps, { adminFetchOrdersFromServer }) (Orders)