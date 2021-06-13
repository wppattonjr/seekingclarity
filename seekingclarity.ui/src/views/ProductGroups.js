/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductGroupTable from '../components/ProductGroupsTable';
import productGroupData from '../helpers/data/productGroupData';
import AppModal from '../components/AppModal';
import ProductForm from '../components/ProductForm';

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
      <div className='product-groups-div'>
        <div className="product-groups-table">
          <Container fluid>
          <Row>
          <Col xs={-1} id="sidebar-wrapper">
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                    <AppModal
                  title={'Add a Product Group'}
                  dbUser={this.props.dbUser}
                  userId={this.props.user.uid}>
        <ProductForm handleUpdate={() => this.getProductGroups()} dbUser={this.props.dbUser} />
        </AppModal>
        <ProductGroupTable userId={this.props.user.uid} dbUser={this.props.dbUser} products={this.state.products} />
         </Col>
          </Row>
        </Container>
        </div>
        </div>
    );
  }
}
