import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import BackButton from '../../components/BackButton'
import PetHeads from '../../components/ฺPetHeads'
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase';
import step_goal from '../../components/helpers/step_goal'
import PetCheerStep from '../../components/PetCheerStep'

const HR = () => {
    return (
        <View>
            <View style={{ height: 50 }}></View>
            <View style={{ borderBottomWidth: 1, width: 200, borderColor: '#bbb' }}></View>
            <View style={{ height: 50 }}></View>
        </View>
    )
}

export default class Step extends React.Component {
    state = {
        showMoreDetail: false,
        todayStep: 0,
        goal: 0,
        circleColor: '#fff',
    }

    componentDidMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", snap => {
            if(snap.val().step.today!=null)
            this.setState({ 
                todayStep: snap.val().step.today,
                goal: step_goal(snap.val().step.today).goal,
                circleColor: step_goal(snap.val().step.today).color
            })
          })
    }

    renderMoreDetail() {
        if (this.state.showMoreDetail)
            return (
                <View
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <HR />

                    {/* -------- Goal -------- */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Text style={{ fontSize: 16, fontStyle: 'italic' }}>GOAL</Text>
                    </View>

                    <View style={{ height: 10 }}></View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Text style={{ fontSize: 20, fontStyle: 'italic', fontWeight: '200' }}>1220 / </Text>
                        <Text style={{ fontSize: 40, fontStyle: 'italic' }}>2000</Text>
                    </View>
                    <View style={{ height: 2 }}></View>

                    <HR />
                </View>
            )
        else return <View style={{ height: 40 }}></View>
    }
    render() {
        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        paddingTop: Dimensions.get('window').width < 400 ? 40 : 68,
                        backgroundColor: 'transparent'
                    }}
                >

                    {/* -------- Back Button -------- */}
                    <BackButton
                        onPress={() => this.props.goBack()}
                    />

                    <View style={{ height: 70 }}></View>

                    <PetCheerStep />

                    <View style={{ height: 30 }}></View>

                    {/* -------- Circle -------- */}
                    <ProgressCircle
                        percent={this.state.todayStep / this.state.goal * 100}
                        radius={120}
                        borderWidth={25}
                        color="#FF9797"
                        shadowColor="#f9f9f9"
                        bgColor="#F4E9F1"
                    >

                        {/* -------- Pet Image -------- */}
                        <PetHeads height={100} sec={5} />

                    </ProgressCircle>

                    <View style={{ height: 30 }}></View>

                    {/* -------- Information -------- */}
                    <Text style={{ fontSize: 18 }}>Today, You've walked</Text>
                    <View style={{ height: 5 }}></View>
                    <Text style={{ fontSize: 56, fontWeight: 'bold' }}>1,220</Text>
                    <View style={{ height: 5 }}></View>
                    <Text style={{ fontSize: 18 }}>steps</Text>

                    <View style={{ height: 80 }}></View>

                    {/* -------- More Detail Button -------- */}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            paddingLeft: 15,
                            paddingRight: 10,
                            backgroundColor: '#fff',
                            shadowColor: "#777",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.45,
                            shadowRadius: 3.84,
                            elevation: 5,
                            paddingTop: 3
                        }}
                        onPress={() => { this.setState({ showMoreDetail: !this.state.showMoreDetail }) }}
                    >
                        <Text style={{ fontSize: 14 }}>{this.state.showMoreDetail ? "HIDE" : "MORE DETAIL"}</Text>
                        <Ionicons
                            name={this.state.showMoreDetail ? "ios-arrow-dropup-circle" : "ios-arrow-dropdown-circle"}
                            size={36}
                            style={{ marginLeft: 7 }}
                        />
                    </TouchableOpacity>

                    {/* -------- More Detail -------- */}
                    {this.renderMoreDetail()}
                </ScrollView>

                <ImageBackground
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                        zIndex: -1,
                        opacity: 0.9
                    }}
                    source={require('../../assets/background/normal.png')}
                />
            </View>

        )
    }
}