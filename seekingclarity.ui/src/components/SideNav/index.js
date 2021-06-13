/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase-auth';

class VerticalNavbar extends Component {
  logoutClickEvent = () => {
    firebase.auth().signOut();
    window.location.reload();
  }

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
          <li><Link to='/product-groups'><i className=""></i>Product Groups</Link></li>
          <li><Link to='/product-group-items'><i className=""></i>All Group Items</Link></li>
         </ul>
         <div className='nav-link sign-out' onClick={(e) => this.logoutClickEvent(e)}>Sign Out</div>
         </>
        }
        </div>
      </div>
    </>
    );
  }
}

export default VerticalNavbar;
