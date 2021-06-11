/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import productGroupData from '../../helpers/data/productGroupData';
import AddProductGroupForm from '../ProductForm';
import AppModal from '../AppModal';

export default class ProductGroupTable extends Component {
    state = {
      products: []
    }

    componentDidMount() {
      this.getUserGroups();
    }

    getUserGroups = () => {
      const { userId } = this.props;
      productGroupData.getAllUserProducts(userId).then((response) => this.setState({
        products: response,
      }));
    }

    renderProductGroups = () => this.state.products.map((products) => <tr key={products.id}>
        <td>{products.name}</td>
        <td>{products.category}</td>
        <td>{products.dateCreated}</td>
        <td><AppModal
        title={'Update Product Group'}
        id={products.id}
        products={products}
        >
          <AddProductGroupForm products={products} />
        </AppModal></td>
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
