/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import itemCriteriaData from '../helpers/data/itemCriteriaData';
import itemData from '../helpers/data/itemData';
import AppModal from '../components/AppModal';
import UpdateCriteriaForm from '../components/UpdateCriteriaForm';

export default class SingleItemDetails extends Component {
  state = {
    item: {},
    criteria: [],
    name: this.props.item?.name || '',
    groupid: this.props.item?.groupid || '',
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
        <td>
            <AppModal
                title={'Update Criteria'}
                groupId={this.props.groupId}
                dbUser={this.props.dbUser}
                userId={this.props.uid}>
                   <UpdateCriteriaForm handleUpdate={() => this.getItemCriteria()} criteria={this.props.criteria} criteriaid={this.props.id} callback={(thisCriteria) => console.log(thisCriteria)}/>
            </AppModal>
        </td>
    </tr>);

    return (
      <div className="single-item-page">
        <h1 className="all-item">Single Item</h1>
        <div className="single-item-body">
          <div className="all-items-container">
            <ItemCard key={item.id} item={item} />
          </div>
          <div className="single-item-criteria-table">
          <Table className="single-item-criteria-fixed-header"si striped boardered hover size="sm">
             <thead>
                 <tr>
                     <th>Name</th>
                     <th>Score</th>
                     <th>Update Criteria</th>
                 </tr>
             </thead>
             <tbody className="single-item-criteria-table-body">
                 {renderCriteriaDetails()}
             </tbody>
         </Table>
         </div>
        </div>
      </div>
    );
  }
}
