import React from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import MainScreen from './screens/MainScreen'
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'

let firebaseConfig = {
  apiKey: "AIzaSyDk_ifTz83VLDJYsMSIwiLjhhezJgaXkMA",
  authDomain: "petprotype01.firebaseapp.com",
  databaseURL: "https://petprotype01.firebaseio.com",
  projectId: "petprotype01",
  storageBucket: "petprotype01.appspot.com",
  messagingSenderId: "362132350249",
  appId: "1:362132350249:web:9cafbb371b1d4011e80338",
  measurementId: "G-EFXT5KJB7Q"
};
firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  state = {
    isLoggined: null
  }

  UNSAFE_componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggined: true })
      } else {
        this.setState({ isLoggined: false })
      }
    })
  }

  renderScreen() {
    if (this.state.isLoggined) {
      return <MainScreen />
    } else if (this.state.isLoggined === false) {
      return <LoginScreen />
    } else {
      return <LoadingScreen />
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>{this.renderScreen()}</View>
    )
  }
}