import React from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import * as firebase from 'firebase';
import Pet from '../../components/Pet'
import BehindCamera from '../../components/BehindCamera';
import SmileProcess from '../../components/SmileProgress'
import SmileLevel from '../../components/helpers/smile_level'
import HappyBar from '../../components/HappyBar'
import SmileButton from '../../components/SmileButton'
import BottomBar from '../../components/BottomBar'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle'
import percent_color from '../../components/helpers/percent_color'
import Ball from '../../components/Ball'
import step_goal from '../../components/helpers/step_goal'
import FoodBar from '../../components/FoodBar'
import Food from '../../components/Food'
import SleepBackground from '../../components/SleepBackground'
import SI_money from '../../components/helpers/SI_money'
import Bathing from '../../components/Bathing'
import TranscriptToAction from '../../components/helpers/Transcription_to_action'
import { playSound } from '../../components/PlaySound'

export default class Home extends React.Component {
    smileProgressIncreasing = null

    state = {
        activity: '',
        doingActivity: false,
        faceDetecting: false,
        faces: [],
        smilePressTime: 0,
        smileButtonGuide: false,
        smileProgressPercent: 3,
        happyPercent: 3,
        stepPercent: 0,
        stepColor: '#fff',
        subBottomBar: false,
        food: null,
        foodImgSrc: null,
        money: 0,
        hungryPercent: 0,
        hygienePercent: 0,
        transcription: null,
        transcriptionShow: '',
        voiceLanguage: 'en-US'
    }

    componentDidMount() {
        this.getStatus()
        this.getStep()
    }

    // Listening status from database
    getStatus() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", async (snap) => {
            this.setState({
                happyPercent: snap.val().status.happyPercent,
                money: snap.val().money,
                hungryPercent: snap.val().status.hungryPercent,
                hygienePercent: snap.val().status.hygienePercent
            })
        })
    }

    // Listening step from firebase and set color 
    getStep() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/step/today').on('value', (snap) => {
            let goal = step_goal(snap.val()).goal
            let color = step_goal(snap.val()).color
            let stepPercent = snap.val() / goal * 100

            this.setState({
                stepPercent: stepPercent,
                stepColor: color
            })
        })
    }

    // Set face detect from expo into state
    onFacesDetected = ({ faces }) => this.setState({ faces })

    // Calculate smile probability into 3 levels
    smileLevel = () => {
        if (this.state.faces[0] != null) {
            return SmileLevel(this.state.faces[0].smilingProbability)
        }
    }

    // When press in smile button
    // 1) Count press time (long press ,not touch)
    // 2) Set face detection -> true
    // 3) Set smile button guide -> false
    // 4) Use function smileProgressIncrease every 50 ms
    onPressInSmile = () => {
        if (!this.state.doingActivity) {
            this.smilePressTime = setInterval(() => this.setState({ smilePressTime: this.state.smilePressTime + 0.25 }), 250)

            this.setState({
                faceDetecting: true,
                activity: 'smile',
                smileButtonGuide: false,
                doingActivity: true
            })

            this.smileProgressIncreasing = setInterval(() => this.smileProgressIncrease(), 50)
        }
    }

    // When press out smile button
    // 1) Cancel count press time (long press ,not touch)
    // 2) Cancel function smileProgressIncrease every 50 mis
    // 3) Set smile progress bar = 3%
    // 4) If press time < 0.25 ms, show smile button guide 2 sec
    // 5) Set face detection -> false
    // 6) Set press time = 0
    onPressOutSmile = async () => {
        if (this.state.activity === 'smile') {
            await clearInterval(this.smilePressTime)
            await clearInterval(this.smileProgressIncreasing)
            await this.setState({ smileProgressPercent: 3 })

            if (this.state.smilePressTime < 0.25) {
                await setTimeout(() => this.setState({ smileButtonGuide: false }), 2000)
                await this.setState({ smileButtonGuide: true })
            }

            await this.setState({
                smilePressTime: 0,
                faceDetecting: false,
                activity: null,
                doingActivity: false
            })
        }

    }

    // 1) Increase progress when smile
    // 2) High and medium are increase different speed
    // 3) If progress = 100, updateHappy()
    // 4) Re smile progess into 0
    smileProgressIncrease() {
        if (this.state.faceDetecting) {
            if (this.state.smileProgressPercent == 100) {
                this.setState({ smileProgressPercent: 0 })
                this.updateHappy()
            }
            else {
                if (this.smileLevel() == 'high') {
                    this.setState({ smileProgressPercent: this.state.smileProgressPercent + 5 })
                } else if (this.smileLevel() == 'medium') {
                    this.setState({ smileProgressPercent: this.state.smileProgressPercent + 2.5 })
                }
            }
            if (this.state.smileProgressPercent > 100) {
                this.setState({ smileProgressPercent: 0 })
                this.updateHappy()
            }
        }
    }

    // Update happy status into database
    // If happy status = 100, nothing
    // Maximum is 100
    updateHappy = () => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once("value", async (snap) => {
            if (snap.val().status.happyPercent < 100) {
                let status = snap.val().status
                let happyPercent = (snap.val().status.happyPercent + 5 > 100) ? 100 : snap.val().status.happyPercent + 5
                status.happyPercent = happyPercent
                status.lastUpdateHappy = Date.now()
                firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({ status })
            }
        })
    }

    // 1) Set do eating activity 
    // 2) Set image of food
    // 3) Set time until done
    // 4) Update to database
    eatingFood() {
        if (this.state.activity == '') {
            this.setState({
                activity: 'eating-' + this.state.food,
                doingActivity: true,
                food: null,
                foodImgSrc: null
            })

            setTimeout(() => {
                this.setState({
                    activity: '',
                    doingActivity: false
                })
            }, 2500)

            playSound(require('../../assets/sounds/eat.wav'))

            // Update to firebase
            let increaseHungry = Math.floor(Math.random() * 16 + 20)
            let newHungryPercent
            if (this.state.hungryPercent + increaseHungry < 100) {
                newHungryPercent = this.state.hungryPercent + increaseHungry
            } else {
                newHungryPercent = 100
            }

            firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/status').once('value', (snap) => {
                let status = snap.val()

                status.hungryPercent = newHungryPercent
                status.lastUpdateHungry = Date.now()

                firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({ status })
            })
        }
    }

    bathing() {
        if (this.state.activity == '') {
            this.setState({ activity: 'bathing' })

            playSound(require('../../assets/sounds/waterCrop2.wav'))

            setTimeout(() => {
                this.setState({ activity: '' })

                firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/status').update({ hygienePercent: 100 })

            }, 2500)
        }
    }

    sleeping() {
        if (this.state.activity == '') {
            this.setState({ activity: 'sleeping' })
        }
    }

    renderFood() {
        if (this.state.food) {
            return (
                <Food
                    left={-100}
                    top={65}
                    itemSrc={this.state.foodImgSrc}
                    width={60}
                    height={60}
                    food={this.state.food}
                    show={!this.state.doingActivity}
                    eat={() => this.eatingFood()}
                />
            )
        }
    }

    renderSleepBackground() {
        if (this.state.activity === 'sleeping')
            return (
                <SleepBackground
                    wakeup={() => this.setState({ activity: '' })}
                />
            )
    }

    renderBathing() {
        if (this.state.activity === 'bathing')
            return (
                <Bathing />
            )
    }

    // Open sub bottom bar above the bottom bar
    renderSubBottomBar() {
        switch (this.state.subBottomBar) {
            case 'food':
                return (
                    <FoodBar
                        selectFood={(food, src) => this.setState({
                            food,
                            foodImgSrc: src,
                            subBottomBar: false
                        })}
                    />
                )
            default:
                return null
        }
    }

    setTranscription = async (data) => {
        if (TranscriptToAction(data) != null){
            this.setState({
                activity: 'reactVoice-'+TranscriptToAction(data),
                doingActivity: true,
            })
            setTimeout(() => {
                this.setState({
                    activity: '',
                    doingActivity: false,
                })
            }, 2000)
        }
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('../../assets/background/House.png')}
            >

                {/* -------- Behind Camera -------- */}
                <BehindCamera
                    faceDetecting={this.state.faceDetecting}
                    onFacesDetected={this.onFacesDetected}
                />

                <View style={styles.top}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >

                        {/* -------- Setting Icon -------- */}
                        <TouchableOpacity
                            onPress={() => { 
                                this.props.toSetting()
                                playSound(require('../../assets/sounds/click.wav'))
                            }}
                        >
                            <MaterialCommunityIcons
                                name="settings"
                                size={36}
                                color="#7B4513"
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >

                            {/* -------- Steps -------- */}
                            <ProgressCircle
                                percent={this.state.stepPercent}
                                radius={25}
                                borderWidth={5}
                                color={this.state.stepColor}
                                shadowColor="#fff9f1"
                                bgColor="#fff9f1"
                            >
                                <Image
                                    style={{ width: 22, height: 22 }}
                                    source={require('../../assets/activities/step.png')}
                                />
                            </ProgressCircle>

                            <View style={{ width: 10 }}></View>

                            {/* -------- Happy Percent -------- */}
                            <ProgressCircle
                                percent={this.state.happyPercent}
                                radius={25}
                                borderWidth={12}
                                color={percent_color(this.state.happyPercent)}
                                shadowColor="#fff9f1"
                                bgColor="#fff9f1"
                            >
                                <Ionicons
                                    size={33}
                                    color="#333"
                                    name="md-happy"
                                    style={{ margin: -3 }}
                                />
                            </ProgressCircle>

                            <View style={{ width: 10 }}></View>

                            {/* -------- Coin -------- */}
                            <Image
                                source={require('../../assets/icons/Coin.png')}
                                style={{ width: 28, height: 28 }}
                            />
                            <View style={{ width: 5 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{SI_money(this.state.money, 2)}</Text>

                        </View>
                    </View>

                    <View style={{ height: 15 }}></View>

                    {/* -------- Happy Bar -------- */}
                    {this.state.faceDetecting ? <HappyBar width={175} /> : <View style={{ height: 24 }} />}

                </View>

                <View style={styles.middle}>

                    {/* ------- Pet & Smile Process Bar -------- */}
                    <SmileProcess
                        faceDetecting={this.state.faceDetecting}
                        smileLevel={this.smileLevel()}
                        smileProgressPercent={this.state.smileProgressPercent}
                    />
                    <Pet
                        faceDetecting={this.state.faceDetecting}
                        randomIgnoreImageSec={1500}
                        smileLevel={this.smileLevel()}
                        activity={this.state.activity}
                    />

                    {/* -------- Bed Mapping Image -------- */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            // borderWidth: 1,
                            width: Dimensions.get('window').width / 7 * 2 + 50,
                            height: Dimensions.get('window').height / 10 + 40,
                            left: Dimensions.get('window').width / 6 - 60,
                            top: Dimensions.get('window').height / 4 + 30
                        }}
                        onPress={() => this.sleeping()}
                    >
                    </TouchableOpacity>

                    {/* -------- Door Mapping Image -------- */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            // backgroundColor: "#ffffff55",
                            width: Dimensions.get('window').width / 7 + 50,
                            height: Dimensions.get('window').height / 4 + 50,
                            right: Dimensions.get('window').width / 5 - 120,
                            top: Dimensions.get('window').height / 6.5 - 80
                        }}
                        onPress={() => {
                            this.props.toMap()
                            playSound(require('../../assets/sounds/door.wav'))
                        }}
                    >
                    </TouchableOpacity>

                    {/* -------- Ball --------- */}
                    <Ball
                        left={100}
                        top={-50}
                        itemSrc={require('../../assets/items/ball.png')}
                        width={60}
                        height={60}
                        show={!this.state.doingActivity}
                        play={() => {
                            this.setState({
                                activity: 'playBall',
                                doingActivity: true
                            })
                            setTimeout(() => {
                                this.setState({
                                    activity: null,
                                    doingActivity: false
                                }, () => this.props.toMinigame())
                            }, 2000)
                        }}
                    />

                    {/* -------- Food --------- */}
                    {this.renderFood()}
                </View>

                {/* -------- Bottom Bar -------- */}
                <View style={styles.bottom}>
                    <SmileButton
                        smileButtonGuide={this.state.smileButtonGuide}
                        onPressInSmile={this.onPressInSmile}
                        onPressOutSmile={this.onPressOutSmile}
                        STT={data => this.setTranscription(data)}
                    />

                    {/* ---- Sub Bottom Bar ---- */}
                    {this.renderSubBottomBar()}

                    <BottomBar
                        toStep={() => this.props.toStep()}
                        toAchievement={() => this.props.toAchievement()}
                        subBottomBar={this.state.subBottomBar}
                        changeSubBottomBar={mode => this.setState({ subBottomBar: mode })}
                        hungryPercent={this.state.hungryPercent}
                        hygienePercent={this.state.hygienePercent}
                        bathing={() => this.bathing()}
                    />
                </View>

                <View style={{ height: 225 }}></View>

                {this.renderSleepBackground()}
                {this.renderBathing()}

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    top: {
        paddingTop: Dimensions.get('window').width < 400 ? 20 : 40,
        paddingHorizontal: 20,
        width: '100%',
        // backgroundColor: '#f7f7f7'
        // borderWidth: 1
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '60%',
        position: 'relative',
        paddingBottom: 50
    },
    bottom: {
        width: '100%',
        bottom: Dimensions.get('window').width < 400 ? 10 : 50,
        position: 'absolute',
        zIndex: 1
    }
})