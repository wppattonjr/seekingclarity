/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import UpdateItem from '../UpdateItem';
import AppModal from '../AppModal';
import itemData from '../../helpers/data/itemData';
import criteriaData from '../../helpers/data/criteriaData';

export default class ItemCard extends React.Component {
  state = {
    items: [],
    criteria: []
  }

  componentDidMount() {
    this.getItems();
    this.getItemCriteria();
  }

  getItems = () => {
    itemData.getAllItems().then((response) => {
      this.setState({
        items: response
      });
    });
  }

  getItemCriteria = () => {
    criteriaData.getAllCriteria().then((response) => {
      this.setState({
        criteria: response
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      id: this.props.id,
      groupid: parseInt(this.state.groupid, 10),
      name: this.state.name,
      isActive: this.state.isActive === 'true' && true,
      image: this.state.image
    };
    itemData.updateProductItem(this.props.id, item).then(() => {
      this.props.handleupdate();
    });
    if (this.props.callback) {
      this.props.callback(item);
      itemData.getAllItems();
    }

    this.props.toggle();
  }

  render() {
    const { item } = this.props;
    return (
              <div className="card-container">
                  <Card className="item-card">
                      <CardBody className="item-card-body">
                          <CardTitle tag="h5" className="item-name">{item.name}</CardTitle>
                          <Link to={`/single-item-details/${item.id}`}><CardImg top width="100%" className="item-card-img" src={this.props.item.image} alt={item.name} /></Link>
                          <AppModal
                            title={'Update a Product Item'}
                            groupId={this.props.groupid}
                            item={this.props.item}
                            userId={this.props.uid}>
                            <UpdateItem handleUpdate={() => this.getItems()} item={this.props.item} id={this.props.id} callback={(thisItem) => console.log(thisItem)} />
                          </AppModal>
                     </CardBody>
                  </Card>
              </div>
    );
  }
}
