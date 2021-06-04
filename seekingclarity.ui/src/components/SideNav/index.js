import React from 'react';
import { Link } from 'react-router-dom';

export default function VerticalNavbar() {
  return (
    <>
      <div className='my-nav'>
        <div className='nav-items'>
          <div className='nav-brand'>
          <Link to='/'>Seeking Clarity</Link>
          </div>
          <ul className='nav-links'>
          <li><Link to='/dashboard'><i className=""></i>Dashboard</Link></li>
            <li><Link to='/group-details'><i className=""></i>Group Details</Link></li>
            <li><Link to='/product-groups'><i className=""></i>Product Groups</Link></li>
         </ul>
        </div>
      </div>
    </>
  );
}
