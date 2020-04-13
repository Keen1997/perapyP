import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from 'firebase';

export default class StepCount extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    start: new Date().setHours(0, 0, 0, 0),
    now: Date.now(),
    nextDay: null,
  };

  componentDidMount() {
    this.askPermission()
    this.listeningTime(this.listeningStep())
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // Ask for pedometer permission
  askPermission() {
    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        })
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        })
      }
    )
  }

  // ----------------------------------- //
  // 1) Set 00:00 at next day
  // 2) Update current time (now) every second
  // 3) if new day reset again
  // ----------------------------------- //
  listeningTime(callback) {

    // 1) Set 00:00 at next day
    let nextDay = new Date()
    nextDay.setHours(0, 0, 0, 0)
    nextDay.setDate(new Date().getDate() + 1)
    this.setState({ nextDay })

    setInterval(() => {

      // 2) Update current time (now) every second
      this.setState({ now: this.state.now + 1000 })

      // 3) if new day reset again
      if (this.state.now == this.state.nextDay) {
        let nextDay = new Date()
        nextDay.setHours(0, 0, 0, 0)
        nextDay.setDate(new Date().getDate() + 1)
        this.setState({ nextDay })

        this.setState({
          start: new Date().setHours(0, 0, 0, 0),
          nextDay
        })
      }      
    }, 1000)

    callback
  }

  // 1) Call and listening step from pedometer
  // 2) Update to database
  listeningStep = () => {

    // 1.1) Count step from today until open
    Pedometer.getStepCountAsync(new Date(this.state.start), new Date(this.state.now)).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        })
      }
    )

    // 1.2) Get step after open
    this.listeningStep = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      })
    })

    // 2) Update to database
    setInterval(() => { 
      firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", snap => {
        let step = snap.val().step
  
        step.today = this.state.pastStepCount + this.state.currentStepCount
  
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          step
        })
      })
    }, 5000)
  }

  // If component has removed, step listening
  _unsubscribe = () => {
    this.listeningTime = null;
  }

  // Convert timestamp for testing
  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()]
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Testing */}

        {/* <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text>From: </Text>
            <Text>To: </Text>
            <Text>Reset At: </Text>
          </View>
          <View style={{ width: 5 }} />
          <View style={{ alignItems: 'flex-start' }}>
            <Text>{this.timeConverter(this.state.start)}</Text>
            <Text>{this.timeConverter(this.state.now)}</Text>
            <Text>{this.timeConverter(this.state.nextDay)}</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text>Previos steps taken today: </Text>
            <Text>Walk! And watch this go up: </Text>
            <Text>Total: </Text>
          </View>
          <View style={{ width: 5 }} />
          <View style={{ alignItems: 'flex-start' }}>
            <Text>{this.state.pastStepCount}</Text>
            <Text>{this.state.currentStepCount}</Text>
            <Text>{this.state.pastStepCount + this.state.currentStepCount}</Text>
          </View>
        </View> */}

      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
