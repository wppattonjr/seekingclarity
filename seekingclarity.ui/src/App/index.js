import React from 'react';
import firebase from 'firebase';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../helpers/Routes';
import fbConnection from '../helpers/data/connection';
import SideNav from '../components/SideNav';
import userData from '../helpers/data/userData';

fbConnection();

class App extends React.Component {
  state = {
    user: '',
    dbUser: '',
    products: [],
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setUser(user.uid);
      } else {
        this.setState({ user: false });
      }
      console.warn(this.state.dbUser);
    });
  }

  setUser = (fbId) => {
    userData.getUserByUid(fbId).then((response) => {
      this.setState({
        dbUser: response,
      });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
            <SideNav user={this.state.user} dbUser={this.state.dbUser} />
            <Routes user={this.state.user} dbUser={this.state.dbUser} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
