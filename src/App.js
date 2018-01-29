import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Register from "../src/containers/Auth/Register/Register";
import Login from "../src/containers/Auth/Login/Login";
import ResetPassword from "../src/containers/Auth/ResetPassword/ResetPassword";
import ForgetPassword from "../src/containers/Auth/ForgetPassword/ForgetPassword";
import Layout from "../src/hoc/Layout/Layout";
import classes from './App.css';
import {Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
      <Layout >
        {/* <Route path="/" exact component={BurgerBuilder}/> */}
        <Route path="/register" exact component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/resetpassword" component={ResetPassword}/>
        {/* <Route path="/api/auth/resetpassword/" component={ResetPassword}/> */}
        <Route path="/forgetpassword" component={ForgetPassword}/>
      </Layout>
      </div>
    );
  }
}

export default App;
