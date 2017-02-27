import React from 'react'
import { connect } from 'react-redux'
import { adminFetchInvoicesFromServer } from '_actions/admin'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Invoices extends React.Component {
    constructor(props) {
      super(props)
    }

    componentWillMount () {
      this.props.adminFetchInvoicesFromServer();
    }

    render () {
      const { invoices } = this.props.admin;
      return (
        <section>
          <div className="row">
            <Table className="col-xs-12">
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{width: '5%'}}>id</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '5%'}}>user_id</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '25%'}}>shipping</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '25%'}}>billing</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '10%'}}>payment</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '10%'}}>price</TableHeaderColumn>
                  <TableHeaderColumn style={{width: '10%'}}>date</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  invoices.map((invoice, idx) => (
                    <TableRow key={idx}>
                      <TableRowColumn style={{width: '5%'}}>{invoice.id}</TableRowColumn>
                      <TableRowColumn style={{width: '5%'}}>{invoice.user_id}</TableRowColumn>
                      <TableRowColumn style={{width: '25%'}}>{invoice.shipping.s_address_city}, {invoice.shipping.s_address_line1}, {invoice.shipping.s_address_line1}, {invoice.shipping.s_address_zip}</TableRowColumn>
                      <TableRowColumn style={{width: '25%'}}>{invoice.billing.b_address_city}, {invoice.billing.b_address_line1}, {invoice.billing.b_address_line1}, {invoice.billing.b_address_zip}</TableRowColumn>
                      <TableRowColumn style={{width: '10%'}}>{invoice.payment.p_number.slice(-4)}</TableRowColumn>
                      <TableRowColumn style={{width: '10%'}}>{invoice.price}</TableRowColumn>
                      <TableRowColumn style={{width: '10%'}}>{invoice.created_at.slice(0, 10)}</TableRowColumn>
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
export default connect(mapStateToProps, { adminFetchInvoicesFromServer }) (Invoices)