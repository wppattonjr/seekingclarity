import React from 'react';
import ProductGroupTable from '../components/ProductGroupsTable';
import productGroupData from '../helpers/data/productGroupData';

export default class ProductGroups extends React.Component {
  state = {
    productGroups: [],
  }

  componentDidMount() {
    this.getProductGroups();
  }

  getProductGroups = () => {
    productGroupData.getAllProductGroups().then((response) => {
      this.setState({
        names: response
      });
    });
  }

  render() {
    return (
      <div className="product-groups-table">
      <ProductGroupTable />
      </div>
    );
  }
}
