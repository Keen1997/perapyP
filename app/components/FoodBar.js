import React from 'react'
import { View, Image, ScrollView, TouchableOpacity } from 'react-native'

export default class FoodBar extends React.Component {
    render() {
        return (
            <View
                style={[{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    width: 300,
                    alignSelf: 'center',
                    borderRadius: 12,
                    top: 25,
                    paddingHorizontal: 20,
                    shadowColor: "#777",
                    shadowOffset: {
                        width: 2,
                        height: 4,
                    },
                    shadowOpacity: 0.45,
                    shadowRadius: 3.84,
                    elevation: 5,
                }, this.props.style]}
            >
                <View
                    style={{
                        height: 80,
                    }}
                >
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            flexGrow: 1,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{

                            }}
                            onPress={() => {
                                this.props.selectFood('Apple', require('../assets/resize/Foods/Apple/Apple_Full.png'))
                            }}
                        >
                            <Image
                                source={require('../assets/resize/Foods/Apple/Apple_Full.png')}
                                style={{
                                    width: 35,
                                    resizeMode: 'contain',
                                    marginRight: 20,
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{

                            }}
                            onPress={() => {
                                this.props.selectFood('Pizza', require('../assets/resize/Foods/Pizza/Pizza_Full.png'))
                            }}
                        >
                            <Image
                                source={require('../assets/resize/Foods/Pizza/Pizza_Full.png')}
                                style={{
                                    width: 35,
                                    resizeMode: 'contain',
                                    marginRight: 20
                                }}
                            />
                        </TouchableOpacity>
                    </ScrollView>

                </View>

                {/* ---- Tri ---- */}
                <View
                    style={{
                        alignSelf: 'flex-start',
                        marginLeft: 20,
                        width: 0,
                        height: 0,
                        borderLeftWidth: 10,
                        borderRightWidth: 10,
                        borderTopWidth: 15,
                        borderStyle: 'solid',
                        backgroundColor: 'transparent',
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: '#fff',
                        top: 80,
                        position: 'absolute',
                    }}
                ></View>
            </View>
        )
    }
}