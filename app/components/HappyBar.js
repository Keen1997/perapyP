import React from 'react'
import { View } from 'react-native'
import * as firebase from 'firebase';
import percent_color from './helpers/percent_color'

export default class HappyBar extends React.Component {
    state = {
        happyPercent: 1,
    }

    // ---- Get happy level from database and set into state ----
    UNSAFE_componentWillMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", async (snap) => {
            this.setState({ happyPercent: snap.val().status.happyPercent })
        })
    }

    // ---- Return style -----
    // 1) Calculate width of happy level bar
    // 2) Set border (if happy >= 97%, all radius is round) 
    // 3) Set other styles
    style() {
        let style = {
            width: ((this.state.happyPercent * this.props.width) / 100),
            height: 24,
            backgroundColor: percent_color(this.state.happyPercent)
        }
        if (this.state.happyPercent >= 97) {
            style.borderRadius = 10 
        }
        else {
            style.borderTopLeftRadius = 10
            style.borderBottomLeftRadius = 10
            style.borderTopRightRadius = 0
            style.borderBottomRightRadius = 0
        }
        return style
    }

    render() {
        return (
            <View
                style={{
                    width: this.props.width,
                    height: 24,
                    borderRadius: 10,
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    shadowColor: "#777",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.45,
                    shadowRadius: 3.84,
                    elevation: 5,
                    alignSelf: 'center'
                }}
            >
                <View
                    style={this.style()}
                >
                </View>
            </View>
        )
    }
}

