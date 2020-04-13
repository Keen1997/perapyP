import React from 'react'
import { View, PanResponder, Image, Animated, Dimensions } from 'react-native'
import { playSound } from '../components/PlaySound'

export default class Ball extends React.Component {
    state = {
        dragging: false,
        initialTop: 0,
        initialLeft: 0,
        offsetTop: 0,
        offsetLeft: 0,
        distanceSize: 0
    }

    UNSAFE_componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
            onPanResponderGrant: this.handlePanResponderGrant,
            onPanResponderMove: this.handlePanResponderMove,
            onPanResponderRelease: this.handlePanResponderEnd,
            onPanResponderTerminate: this.handlePanResponderEnd,
        })

        this.setState({
            initialLeft: this.props.left,
            initialTop: this.props.top
        })
    }

    componentWillUnmount() {
        clearInterval(this.a)
    }

    handleStartShouldSetPanResponder = () => {
        return true
    }

    handlePanResponderGrant = () => {
        this.setState({ dragging: true })
    }

    handlePanResponderMove = (e, gestureState) => {
        if (gestureState.dy < 0) {
            this.setState({
                offsetTop: gestureState.dy,
                offsetLeft: gestureState.dx,
                distanceSize: this.state.offsetTop * 0.1
            })
        } else {
            this.setState({
                offsetLeft: gestureState.dx,
            })
        }
    }

    handlePanResponderEnd = (e, gestureState) => {
        const { initialTop, initialLeft } = this.state
        if (gestureState.dy < 0) {
            this.setState({
                dragging: false,
                initialTop: initialTop + gestureState.dy,
                initialLeft: initialLeft + gestureState.dx,
                offsetTop: 0,
                offsetLeft: 0,
            })
        } else {
            this.setState({
                dragging: false,
                initialLeft: initialLeft + gestureState.dx,
                offsetLeft: 0,
            })
        }

        let posX = initialLeft + this.state.offsetLeft
        let posY = initialTop + this.state.offsetTop

        if ((posX < 40 && posX > -40) && (posY < -150 && posY > -350)) {
            this.props.play()
        }

        let t = gestureState.dy / 9
        let i = 1

        let u = gestureState.dx / 200

        this.a = setInterval(() => {
            this.setState({
                initialLeft: this.state.initialLeft + (9 - i) * u,
                initialTop: this.props.top + (9 - i) * t,
                distanceSize: 0
            })
            i++
        }, 10)

        setTimeout(() => {
            clearInterval(this.a)
            this.setState({
                initialLeft: this.state.initialLeft + u,
                initialTop: this.props.top,
                distanceSize: 0
            })

            playSound(require('../assets/sounds/ball2.wav'))
        }, 100);
    }

    render() {
        const { initialTop, initialLeft, offsetTop, offsetLeft, distanceSize } = this.state

        const style = {
            top: initialTop + offsetTop,
            left: initialLeft + offsetLeft,
            width: this.props.width + distanceSize * 0.3,
            height: this.props.height + distanceSize * 0.3,
        }

        const styleShadow = {
            left: initialLeft + offsetLeft,
            top: (initialTop + offsetTop) * 0.3,
            width: this.props.width + distanceSize * 0.5,
        }

        if (this.props.show) {
            return (
                <View
                    style={{
                        position: 'absolute',
                        alignItems: 'center',
                        zIndex: 1
                    }}
                >
                    <Image
                        {...this.panResponder.panHandlers}
                        source={this.props.itemSrc}
                        style={[{
                            position: 'absolute',
                            zIndex: 1,
                        }, style]}
                    >
                    </Image>

                    <View
                        {...this.panResponder.panHandlers}
                        style={[{
                            width: 50,
                            height: 20,
                            backgroundColor: '#00000033',
                            borderRadius: 50,
                            marginTop: 15,
                        }, styleShadow]}
                    ></View>
                </View>
            )
        } else {
            return null
        }
    }
}