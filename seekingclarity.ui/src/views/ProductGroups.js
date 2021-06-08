/* eslint-disable react/prop-types */
import React from 'react';
import ProductGroupTable from '../components/ProductGroupsTable';
import productGroupData from '../helpers/data/productGroupData';

export default class ProductGroups extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    this.getProductGroups();
  }

  getProductGroups = () => {
    productGroupData.getAllProductGroups().then((response) => {
      this.setState({
        products: response
      });
    });
  }

  render() {
    return (
      <div className="product-groups-table">
      <ProductGroupTable userId={this.props.user.uid} />
      </div>
    );
  }
}
