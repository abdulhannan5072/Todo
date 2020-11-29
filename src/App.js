import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HashRouter, Route, Switch, withRouter, Redirect } from "react-router-dom";
import {auth, createUserProfileDocument } from './firebase/firebase.util';
import { getCurrentUser } from "./store/actions";
import AppBar from './components/AppBar';


// Containers
const TodoList = React.lazy(() => import("./containers/TodoList"));
const Login = React.lazy(() => import("./auth/login/Login"));
const Signup = React.lazy(() => import("./auth/signup/Signup"));

class App extends Component {

  unsubAuth = null;

  componentDidMount(){
    this.unsubAuth = auth.onAuthStateChanged( async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(snapShot => {
        this.props.authUser({
          id: snapShot.id,
          ...snapShot.data()
        });
        })
      }
      this.props.authUser(user);
    })
  }

  componentWillUnmount(){
    this.unsubAuth();
  }


  
  onLogoutHandle(){
    auth.signOut();
  }

  render() {

    return (
      <>
        <HashRouter>
          <React.Suspense fallback={<div>Loading... </div>} >
        <AppBar signedIn={this.props.currentUser} onLogout={this.onLogoutHandle}  />

            <Switch>
              <Route
                exact
                path="/todolist"
                name="Todo List"
                component={TodoList}
              />
              <Route
                exact
                path="/login"
                name="Login"
                component={Login}
              />
              <Route
                exact
                path="/signup"
                name="Sign up"
                component={Signup}
              />
              <Route exact path="/" render={() => (<Redirect to="/todolist" />)} /> 
              
            </Switch>
          </React.Suspense>
        </HashRouter>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.authUser
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authUser: data => dispatch(getCurrentUser(data)),
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

