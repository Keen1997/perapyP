import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Microphone from './Microphone'

export default class SmileButton extends React.Component {
    render() {
        return (
            <View>
                {/* -------- Smile Button Guide -------- */}
                <Text style={{ alignSelf: 'center' }}>{(this.props.smileButtonGuide) ? 'Hold and give your smile' : ' '}</Text>

                <View style={styles.button}>

                    <View style={styles.menuIcon}></View>

                    {/* -------- Smile Button ------- */}
                    <TouchableOpacity
                        style={styles.menuIcon}
                        onPressIn={this.props.onPressInSmile}
                        onPressOut={this.props.onPressOutSmile}
                    >
                        <Image
                            style={{ width: 110, height: 110 }}
                            source={require('../assets/icons/smile.png')}
                        />
                    </TouchableOpacity>

                    {/* -------- Microphone Button ------- */}
                    <View style={styles.menuIcon}>
                        <Microphone STT={data => this.props.STT(data)} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // justifyContent: 'center',
        // width: '100%',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        width: 110,
    },
})