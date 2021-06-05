import React, { Component } from 'react';
import { Table } from 'reactstrap';
import productGroupData from '../../helpers/data/productGroupData';

export default class ProductGroupTable extends Component {
    state = {
      productGroups: []
    }

    componentDidMount() {
      this.getAllGroups();
    }

    getAllGroups = () => {
      productGroupData.getAllProductGroups().then((response) => this.setState({
        productGroups: response,
      }));
    }

    renderProductGroups = () => this.state.productGroups.map((productGroup) => <tr key={productGroup.id}>
        <td>{productGroup.name}</td>
        <td>{productGroup.category}</td>
        <td>{productGroup.dateCreated}</td>
    </tr>)

    render() {
      return (
        <>
        <h2>Product Group Table</h2>
        <Table className="product-groups-fixed-header" striped boardered hover size="sm">
            <thead className="product-groups-table">
                <tr>
                    <th>Product Name</th>
                    <th>Product Category</th>
                    <th>Date Created</th>
                </tr>
            </thead>
              <tbody className="product-groups-table-body">
                  {this.renderProductGroups()}
              </tbody>
        </Table>
        </>
      );
    }
}
