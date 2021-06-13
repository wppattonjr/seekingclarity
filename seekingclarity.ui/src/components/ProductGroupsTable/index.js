/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import AddProductGroupForm from '../ProductForm';
import AppModal from '../AppModal';
import productGroupData from '../../helpers/data/productGroupData';

export default class ProductGroupTable extends Component {
  state = {
    groups: []
  }

  componentDidMount() {
    // this.setState({ groups: this.props.products });
    this.getProductGroups();
  }

  getProductGroups = () => {
    productGroupData.getAllProductGroups().then((response) => {
      this.setState({
        groups: response
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    productGroupData.updateProductGroup(this.groups.id, this.state)
      .then(() => {
        this.props.onSubmit();
      });
    this.props.toggle();
  }

  render() {
    const renderProductGroups = () => this.state.groups.map((groups) => <tr key={groups.id}>
      <td>{groups.name}</td>
      <td>{groups.category}</td>
      <td>{groups.dateCreated}</td>
      <td><AppModal
      title={'Update Product Group'}
      groups={groups}
      dbUser={this.props.dbUser}
      handleUpdate={() => this.getProductGroups()}
      >
        <AddProductGroupForm handleUpdate={() => this.getProductGroups()} products={groups} id={groups.id} dbUser={this.props.dbUser} callback={(group) => console.log(group)}/>
      </AppModal></td>
  </tr>);
    return (
        <>
        <h2>Product Group Table</h2>
        <Table className="product-groups-fixed-header" striped boardered hover size="sm">
            <thead className="product-groups-table">
                <tr>
                    <th>Product Name</th>
                    <th>Product Category</th>
                    <th>Date Created</th>
                    <th>Update Product Group</th>
                </tr>
            </thead>
              <tbody className="product-groups-table-body">
                  {renderProductGroups()}
              </tbody>
        </Table>
        </>
    );
  }
}
