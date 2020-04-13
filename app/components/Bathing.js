import React from 'react'
import { View, Image } from 'react-native'

export default class Bathing extends React.Component {
    state = { height: 0 }

    componentDidMount() {
        this.animation = setInterval(() => {
            this.setState({ height: this.state.height + 1 })
        }, 17)
    }

    componentWillUnmount() {
        clearInterval(this.animation)
    }

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#0080ff88',
                    justifyContent: 'flex-end',
                    zIndex: 2
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: this.state.height + '%',
                        backgroundColor: '#0080ff99',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}
                    >
                        <Image
                            source={require('../assets/resize/bubble.png')}
                            style={{
                                width: 300,
                                resizeMode: 'contain',
                            }}
                        />
                        <Image
                            source={require('../assets/resize/bubble.png')}
                            style={{
                                width: 200,
                                resizeMode: 'contain',
                            }}
                        />
                        <Image
                            source={require('../assets/resize/bubble.png')}
                            style={{
                                width: 100,
                                resizeMode: 'contain',
                            }}
                        />
                        <Image
                            source={require('../assets/resize/bubble.png')}
                            style={{
                                width: 200,
                                resizeMode: 'contain',
                            }}
                        />
                        <Image
                            source={require('../assets/resize/bubble.png')}
                            style={{
                                width: 300,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>

                </View>
            </View>
        )
    }
}