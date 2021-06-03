import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import fbConnection from '../helpers/data/connection';
import SideNav from '../components/SideNav';

fbConnection();

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <SideNav />
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
