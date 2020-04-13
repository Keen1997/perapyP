import React from 'react';
import Login from './Login'
import Signup from './Signup'

export default class LoginScreen extends React.Component {
    state = {
      loginMode: true
    }
  
    render() {
      if(this.state.loginMode) {
        return <Login registerPage={() => this.setState({ loginMode: false })}/>
      } else {
        return <Signup loginPage={() => this.setState({ loginMode: true })}/>
      }
    }
  }