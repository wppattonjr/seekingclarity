/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle
} from 'reactstrap';

export default class ItemCard extends React.Component {
  render() {
    const { item } = this.props;
    return (
              <div className="card-container">
                  <Card className="item-card">
                      <CardBody className="item-card-body">
                          <CardTitle tag="h5" className="item-name">{item.name}</CardTitle>
                          <CardImg top width="100%" className="item-card-img" src={item.image} alt={item.name} />
                      </CardBody>
                  </Card>
              </div>
    );
  }
}
