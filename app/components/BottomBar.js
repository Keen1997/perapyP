import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as firebase from 'firebase';
import percent_color from '../components/helpers/percent_color'
import { playSound } from './PlaySound'

export default class BottomBar extends React.Component {
    state = {
        hungryPercent: 1,
        hygienePercent: 1
    }

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '90%',
                    alignSelf: 'center',
                }}
            >

                {/* -------- Eat -------- */}
                <View>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            this.props.subBottomBar == 'food' ?
                            this.props.changeSubBottomBar(false) : this.props.changeSubBottomBar('food')
                            playSound(require('../assets/sounds/click.wav'))
                        }}
                    >
                        <Image
                            source={require('../assets/activities/eat.png')}
                            style={[styles.icon]}
                        />
                    </TouchableOpacity>
                    <View style={styles.progressContainer}>
                        <View
                            style={[styles.progress, {
                                height: this.props.hungryPercent ? (this.props.hungryPercent * 60 / 100) : 1,
                                borderTopLeftRadius: this.props.hungryPercent > 92 ? 12 : 4,
                                borderTopRightRadius: this.props.hungryPercent > 92 ? 12 : 4,
                                backgroundColor: percent_color(this.props.hungryPercent)
                            }]}
                        ></View>
                    </View>
                </View>

                {/* -------- Shower -------- */}
                <View>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            this.props.bathing()
                            playSound(require('../assets/sounds/click.wav'))
                        }}
                    >
                        <Image
                            source={require('../assets/activities/shower.png')}
                            style={[styles.icon]}
                        />
                    </TouchableOpacity>
                    <View style={styles.progressContainer}>
                        <View
                            style={[styles.progress, {
                                height: this.props.hygienePercent ? (this.props.hygienePercent * 60 / 100) : 1,
                                borderTopLeftRadius: this.props.hygienePercent > 92 ? 12 : 4,
                                borderTopRightRadius: this.props.hygienePercent > 92 ? 12 : 4,
                                backgroundColor: percent_color(this.props.hygienePercent)
                            }]}
                        ></View>
                    </View>
                </View>

                {/* -------- Step -------- */}
                <TouchableOpacity
                    style={[styles.buttonContainer, { backgroundColor: '#fff' }]}
                    onPress={() => {
                        this.props.toStep()
                        playSound(require('../assets/sounds/click.wav'))
                    }}
                >
                    <Image
                        source={require('../assets/activities/step.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>

                {/* -------- Achivement -------- */}
                <TouchableOpacity
                    style={[styles.buttonContainer , { backgroundColor: '#fff' }]}
                    onPress={() => {
                        this.props.toAchievement()
                        playSound(require('../assets/sounds/click.wav'))
                    }}
                >
                    <Image
                        source={require('../assets/activities/cup.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 28,
        height: 28,
    },
    buttonContainer: {
        marginHorizontal: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 12
    },
    progressContainer: {
        width: 60,
        height: 60,
        marginHorizontal: 10,
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: -1,
        borderRadius: 12,
        justifyContent: 'flex-end'
    },
    progress: {
        width: 60,           
        position: 'absolute',
        zIndex: -1,
        borderRadius: 12,
    }
})