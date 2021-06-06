import React from 'react';
import firebase from 'firebase';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import fbConnection from '../helpers/data/connection';
import SideNav from '../components/SideNav';

fbConnection();

class App extends React.Component {
  state = {
    user: '',
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
      console.warn(user);
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <SideNav user={this.state.user} />
          <Routes user={this.state.user} />
        </Router>
      </div>
    );
  }
}

export default App;
