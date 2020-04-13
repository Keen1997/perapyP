import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import ProgressBar from './ProgressBar'

export default class SmileProgress extends React.Component {
    smileEngageText() {
        if (this.props.faceDetecting) {
            switch (this.props.smileLevel) {
                case 'high':
                    return "I am happy with you :)"
                case 'medium':
                    return "Smile like that!"
                case 'low':
                    return "Smile more!"
            }
        } else {
            return " "
        }
    }

    render() {
        if (!this.props.faceDetecting) return null

        return (
            <View style={styles.container}>
                <Text>{this.smileEngageText()}</Text>
                <View style={{ height: 15 }}></View>
                <ProgressBar
                    width={100}
                    height={15}
                    percent={this.props.smileProgressPercent}
                    borderRadius={4}
                    color='#333'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // marginBottom: 20,
        top: 150
    }
})