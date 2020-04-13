import React from 'react'
import { View, PanResponder, Text } from 'react-native'

class Drag extends React.Component {
    state = {
        show: true,
        dragging: false,
        initialTop: 10,
        initialLeft: 10,
        offsetTop: 0,
        offsetLeft: 0,
        text: 'Drop Here'
    }

    UNSAFE_componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
            onPanResponderGrant: this.handlePanResponderGrant,
            onPanResponderMove: this.handlePanResponderMove,
            onPanResponderRelease: this.handlePanResponderEnd,
            onPanResponderTerminate: this.handlePanResponderEnd,
        })
    }

    handleStartShouldSetPanResponder = () => {
        return true
    }

    handlePanResponderGrant = () => {
        this.setState({ dragging: true })
    }

    handlePanResponderMove = (e, gestureState) => {
        this.setState({
            offsetTop: gestureState.dy,
            offsetLeft: gestureState.dx,
        })
    }

    handlePanResponderEnd = (e, gestureState) => {
        const { initialTop, initialLeft } = this.state

        this.setState({
            dragging: false,
            initialTop: initialTop + gestureState.dy,
            initialLeft: initialLeft + gestureState.dx,
            offsetTop: 0,
            offsetLeft: 0,
        })

        if(initialTop + gestureState.dy < -30) {
            this.setState({ 
                show: false,
                text: 'Thank You'
            })
        }
    }

    renderBall(dragging, initialTop, initialLeft, offsetTop, offsetLeft) {
        const style = {
            borderColor: dragging ? 'skyblue' : 'steelblue',
            top: initialTop + offsetTop,
            left: initialLeft + offsetLeft,
        }

        if (this.state.show) return <View {...this.panResponder.panHandlers} style={[styles.ball, style]}></View>
    }

    render() {
        const { dragging, initialTop, initialLeft, offsetTop, offsetLeft } = this.state

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.dropArea}>
                    <Text style={styles.dropHereText}>{this.state.text}</Text>
                </View>
                {this.renderBall(dragging, initialTop, initialLeft, offsetTop, offsetLeft)}
                <View style={styles.position}>
                    <Text style={styles.positionText}>pos: ({initialLeft + offsetLeft}, {initialTop + offsetTop})</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    dropArea: {
        height: 200,
        backgroundColor: "#eee",
        alignItems: 'center'
    },
    dropHereText: {
        marginTop: 60,
        fontSize: 20
    },
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
    },
    position: {
        position: 'absolute',
        bottom: 40,
        right: 30,
    },
    positionText: {
        fontSize: 14
    }
}

export default Drag