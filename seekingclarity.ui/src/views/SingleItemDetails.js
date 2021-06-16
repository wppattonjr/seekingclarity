/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import itemCriteriaData from '../helpers/data/itemCriteriaData';
import itemData from '../helpers/data/itemData';
// import AppModal from '../components/AppModal';

export default class SingleItemDtails extends Component {
  state = {
    item: {},
    criteria: []
  };

  componentDidMount() {
    const itemId = this.props.match.params.id;
    this.getASingleItem(itemId);
    this.getItemCriteria(itemId);
  }

  getASingleItem = (itemId) => {
    itemData.getASingleItem(itemId).then((response) => {
      this.setState({
        item: response,
      });
    });
  };

  getItemCriteria = (itemId) => {
    itemCriteriaData.getItemCriteria(itemId).then((response) => {
      this.setState({
        criteria: response
      });
    });
  }

  render() {
    const { criteria, item } = this.state;

    const renderCriteriaDetails = () => criteria.map((cs) => <tr key={cs.criteriaId}>
        <td>{cs.criteriaName}</td>
        <td>{cs.criteriaScore}</td>
    </tr>);

    return (
      <div className="single-item-page">
        <h1 className="all-item">Single Item</h1>
        <div className="single-item-body">
          <div className="all-items-container">
            <ItemCard key={item.id} item={item} />
          </div>
          <Table striped bordered hover size="sm">
             <thead>
                 <tr>
                     <th>Name</th>
                     <th>Score</th>
                 </tr>
             </thead>
             <tbody>
                 {renderCriteriaDetails()}
             </tbody>
         </Table>
        </div>
      </div>
    );
  }
}
