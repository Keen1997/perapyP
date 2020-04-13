import React from 'react';
import { Image, StyleSheet, View, Dimensions, Text } from 'react-native'
import PetNormal from './PetNormal'
import PetEating from './PetEating'

const petHeight = Dimensions.get('window').width < 400 ? 250 : 300

export default class Pet extends React.Component {
    render() {
        const { activity } = this.props

        if (activity == 'smile') {
            if (this.props.faceDetecting) {
                if (this.props.smileLevel == 'high') {
                    return (
                        <Image
                            style={{ height: 450, resizeMode: 'contain', top: 200 }}
                            source={require('../assets/resize/Bear/Bear-smile.png')}
                        />
                    )
                } else if (this.props.smileLevel == 'medium') {
                    return (
                        <Image
                            style={{ height: 450, resizeMode: 'contain', top: 200 }}
                            source={require('../assets/resize/Bear/Bear-smile.png')}
                        />
                    )
                } else {
                    return (
                        <Image
                            style={{ height: 450, resizeMode: 'contain', top: 200 }}
                            source={require('../assets/resize/Bear/Bear.png')}
                        />
                    )
                }
            }
        } else if (activity == 'playBall') {
            return (
                <Image
                    style={{ height: petHeight, resizeMode: 'contain' }}
                    source={require('../assets/resize/Bear/Bear-playball.png')}
                />
            )
        } else if (activity == 'sleeping') {
            return (
                <View></View>
            )
        } else if (activity == 'bathing') {
            return (
                <Image
                    style={{ height: petHeight, zIndex: 2, resizeMode: 'contain' }}
                    source={require('../assets/resize/Bear/Bear-smile.png')}
                />
            )
        } else if (activity) {
            if (activity.includes('eating')) {
                return (
                    <View
                        style={{
                            width: '70%',
                            alignSelf: 'center'
                        }}
                    >
                        <PetEating food={activity.split('-')[1]} />
                        <Image
                            style={{ height: petHeight, alignSelf: 'center', resizeMode: 'contain' }}
                            source={require('../assets/resize/Bear/Bear-smile.png')}
                        />
                    </View>
                )
            } else if (activity.includes('reactVoice')) {
                var action = activity.split('-')[1]

                if (action == 'hello') {
                    return (
                        <View
                            style={{
                                width: '70%',
                                alignSelf: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 20,
                                }}
                            >
                                Hi !
                            </Text>
                            <Image
                                style={{ height: petHeight, alignSelf: 'center', resizeMode: 'contain' }}
                                source={require('../assets/resize/Bear/Bear-smile.png')}
                            />
                        </View>
                    )
                } else if (action == 'สวัสดี') {
                    return (
                        <View
                            style={{
                                width: '70%',
                                alignSelf: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 20,
                                }}
                            >
                                สวัสดีจ้า !
                            </Text>
                            <Image
                                style={{ height: petHeight, alignSelf: 'center', resizeMode: 'contain' }}
                                source={require('../assets/resize/Bear/Bear-smile.png')}
                            />
                        </View>
                    )
                } else if (action.includes('eat')) {
                    return (
                        <View
                            style={{
                                width: '70%',
                                alignSelf: 'center'
                            }}
                        >
                            <PetEating food={action.split('_')[1]} />
                            <Image
                                style={{ height: petHeight, alignSelf: 'center', resizeMode: 'contain' }}
                                source={require('../assets/resize/Bear/Bear-smile.png')}
                            />
                        </View>
                    )
                } else if (action == 'ball') {
                    return (
                        <Image
                            style={{ height: petHeight, resizeMode: 'contain' }}
                            source={require('../assets/resize/Bear/Bear-playball.png')}
                        />
                    )
                } else if (action == 'confuse') {
                    return (
                        <View
                            style={{
                                width: '70%',
                                alignSelf: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginBottom: 20,
                                }}
                            >
                                ??
                            </Text>
                            <Image
                                style={{ height: petHeight, alignSelf: 'center', resizeMode: 'contain' }}
                                source={require('../assets/resize/Bear/Bear-shocked.png')}
                            />
                        </View>
                    )
                } else {
                    return <PetNormal height={petHeight} />
                }
            }
        } else {
            return <PetNormal height={petHeight} />
        }
    }
}