/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase-auth';

class VerticalNavbar extends Component {
  logMeOut = (e) => {
    e.preventDefault();
    this.props.history.push('/');
    firebase.auth().signOut();
  };

  render() {
    const { user } = this.props;
    return (
    <>
      <div className='my-nav'>
        <div className='nav-items'>
          <div className='nav-brand'>
          <Link to='/dashboard'>Seeking Clarity</Link>
          </div>
          {
            user
            && <>
              <img
              className='userInfo rounded-circle'
              src={user?.photoURL}
              alt={user?.dsplayName}
              />
          <div>{user?.displayName}</div>
          <ul className='nav-links'>
          <li><Link to='/dashboard'><i className=""></i>Dashboard</Link></li>
            <li><Link to='/group-details'><i className=""></i>Group Details</Link></li>
            <li><Link to='/product-groups'><i className=""></i>Product Groups</Link></li>
         </ul>
         <div className='nav-link btn btn-danger' onClick={(e) => this.logMeOut(e)}>Logout</div>
         </>
        }
        </div>
      </div>
    </>
    );
  }
}

export default VerticalNavbar;
