import React, { Component } from 'react';
import 'firebase-auth';
import firebase from 'firebase';

export default class Auth extends Component {
    loginClickEvent = (e) => {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }

    render() {
      return (
       <div className="maincontainer">
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4">SeekingClarity</h3>
                                    <p className="text-muted mb-4">Using data to make the right decison!</p>
                                    <form>
                                        <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={this.loginClickEvent}>Sign in</button>
                                        <div className="text-center d-flex justify-content-between mt-4"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      );
    }
}
