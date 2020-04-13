import React from 'react';
import { View, Text } from 'react-native'

export default class PetCheerStep extends React.Component {
    state = {
        cheers: [
            'You will be happy and be healthy too (≧▽≦)',
            'I walk beside you along the way ＾▽＾',
            'We will happy together ヽ(^o^)ノ',
            'Can a sweet friendship refresh your soul ?',
            'You have four-leaf clover inside ＾ω＾'
        ],
        select: ''
    }

    componentDidMount() {
        // Set initial text
        this.setState({ select:this.state.cheers[0] })
        
        // Random text every 5 sec
        this.randomSentence = setInterval(() => {
            this.setState({ select: this.state.cheers[Math.floor(Math.random() * this.state.cheers.length)] })
        }, 5000)
    }

    // Clear random sentences when unmount
    componentWillUnmount() {
        clearInterval(this.randomSentence)
        this.randomSentence = null
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        maxWidth: '95%',
                        backgroundColor: '#fff',
                        shadowColor: "#777",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.45,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    {/* ---- Text ---- */}
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>{this.state.select}</Text>
                </View>
                {/* ---- Triangle ---- */}
                <View
                    style={{
                        alignSelf: 'flex-start',
                        marginLeft: 40,
                        width: 0,
                        height: 0,
                        borderLeftWidth: 20,
                        borderRightWidth: 0,
                        borderTopWidth: 15,
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: '#fff',
                        shadowColor: "#777",
                        shadowOffset: {
                            width: 2,
                            height: 4,
                        },
                        shadowOpacity: 0.45,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                </View>
            </View>
        )
    }
}