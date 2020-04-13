import React from 'react'
import { View, ScrollView, Text, Dimensions, ImageBackground } from 'react-native'
import BackButton from '../../components/BackButton'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import ProgressBar from '../../components/ProgressBar'
import * as firebase from 'firebase';

export default class Achievement extends React.Component {
    state = {
        achievements: null
    }

    UNSAFE_componentWillMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/achievement').on("value", async (snap) => {
            this.setState({
                achievements: snap.val()
            })
        })
    }

    renderMapAchievement() {
        return this.state.achievements.map(data => {
            return (
                <View
                    key={data.id}
                    style={{
                        marginVertical: 8,
                        padding: 15,
                        width: Dimensions.get('window').width - 40,
                        borderRadius: 8,
                        borderColor: '#eee',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        shadowColor: "#999",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <MaterialCommunityIcons
                                name="run"
                                size={32}
                                style={{ marginRight: 5 }}
                            />
                            <View>
                                <Text style={{ fontSize: 18, marginBottom: 7 }}>{data.name}</Text>
                                <ProgressBar
                                    width={200}
                                    height={15}
                                    borderRadius={0}
                                    percent={1220 / data.name.replace(/\D/g, "") * 100 > 100 ? 100 : 1220 / data.name.replace(/\D/g, "") * 100}
                                    color="#66c79a"
                                    borderColor="#66c79a"
                                // #FF9797 red
                                // #66c79a green
                                // #72f7fc lightBlue
                                // #fefbde yellow (bg)
                                />
                            </View>
                        </View>

                        <Ionicons
                            name="ios-trophy"
                            size={40}
                            color="#e5c100"
                        />
                    </View>

                </View>
            )
        })
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1, }}
                source={require('../../assets/background/normal.png')}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        paddingTop: Dimensions.get('window').width < 400 ? 40 : 68,
                        paddingBottom: 20
                    }}
                >

                    {/* -------- Back Button -------- */}
                    <BackButton
                        onPress={() => this.props.goBack()}
                        style={{ marginLeft: 20 }}
                    />

                    <View style={{ height: 25 }}></View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {/* -------- Title -------- */}
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF6969', alignSelf: 'center', marginLeft: 30 }}>ACHIEVEMENT</Text>

                        <Text style={{ marginRight: 20, fontSize: 16 }}>0 / {this.state.achievements.length}</Text>
                    </View>


                </View>

                {/* -------- Achievements -------- */}
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        paddingVertical: 10,
                        // backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        // backgroundColor: 'transparent',
                        // height: Dimensions.get('window').height - 250
                    }}
                >
                    {this.renderMapAchievement()}
                </ScrollView>

                <View
                    style={{
                        // position: 'absolute',
                        // bottom: 10,
                        paddingBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}
                >
                </View>
            </ImageBackground>

        )
    }
}