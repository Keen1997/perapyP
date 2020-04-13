import React from 'react'
import { ImageBackground, Image, TouchableOpacity, Text, Dimensions } from 'react-native'

export default class Tutorial extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require('../../assets/background/normal.png')}
                style={{
                    backgroundColor: '#eee',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <Image
                    source={require('../../assets/tutorial/tutorial_1.jpg')}
                    style={{
                        width: Dimensions.get('window').width > 300 ? 300 : Dimensions.get('window').width,
                        resizeMode: 'contain',
                    }}
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: Dimensions.get('window').height / 2 - 200,
                        // borderWidth: 2,
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        backgroundColor: '#9370DB',
                        shadowColor: "#EC3A8B",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                        elevation: 10,
                    }}
                    onPress={() => this.props.play()}
                >
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>PLAY</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}