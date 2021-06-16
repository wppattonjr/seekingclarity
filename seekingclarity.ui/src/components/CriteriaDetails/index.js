/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class CriteriaDetails extends Component {
    renderCriteriaDetails = () => this.props.criteria.map((cs) => <tr key={cs.criteriaId}>
        <td>{cs.name}</td>
        <td>{cs.score}</td>
    </tr>)

    render() {
      return (
         <Table striped bordered hover size="sm">
             <thead>
                 <tr>
                     <th>Name</th>
                     <th>Score</th>
                 </tr>
             </thead>
             <tbody>
                 {this.renderCriteriaDetails()}
             </tbody>
         </Table>
      );
    }
}

export default { CriteriaDetails };
