import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Dimensions, TextInput } from 'react-native'
import BackButton from '../../components/BackButton'
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons'

const HR = () => {
    return (
        <View
            style={{ alignSelf: 'center' }}
        >
            <View style={{ height: 40 }}></View>
            <View style={{ borderBottomWidth: 1, width: 150, borderColor: '#bbb' }}></View>
            <View style={{ height: 40 }}></View>
        </View>
    )
}

export default class Setting extends React.Component {
    state = {
        showPolicy: false,
        language: 'en-US',
        voiceServerIP: ''
    }

    componentDidMount() {
        this.languageListening()
    }

    languageListening() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", async (snap) => {
            this.setState({ language: snap.val().voiceLanguage })
        })
    }

    changeLanguage(language) {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            voiceLanguage: language
        })
    }

    selectedLanguageBackground(language) {
        if (this.state.language == language) return '#0080ff99'
        else return null
    }

    selectedLanguageFontColor(language) {
        if (this.state.language == language) return '#fff'
        else return '#000'
    }

    changeVoiceServerIP(voiceServerIP) {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            voiceServerIP: voiceServerIP
        })
    }

    logout() {
        firebase.auth().signOut().then(() => {
            alert('Your already logout !')
        }).catch((error) => {
            alert(error.message)
        })
    }

    renderPolicy() {
        if (this.state.showPolicy) {
            return (
                <View>
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
                            paddingTop: 3,
                            alignSelf: 'center'
                        }}
                        onPress={() => this.setState({ showPolicy: false })}
                    >
                        <Text style={{ fontSize: 14 }}>POLICY</Text>
                        <Ionicons
                            name="ios-arrow-dropup-circle"
                            size={36}
                            style={{ marginLeft: 7 }}
                        />
                    </TouchableOpacity>

                    <View style={{ height: 20 }}></View>

                    <View
                        style={{

                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#555',
                                textAlign: 'justify'
                            }}
                        >
                            {'\t'}
                            This software is a work developed by Narongchai Jaroonpipatkul and Konthon Nithiphaisan from
                            Sirindhorn International Institute of Technology under the provision of
                            Dr. Sasiporn Usanavasin under "Pet Therapy Application Gamification" project
                            , which has been supported by the National Electronics and Computer Technology Center (NECTEC),
                            in order to encourage pupils and students to learn and practice their skills in developing software.
                            Therefore, the intellectual property of this software shall belong to the developer and the developer
                            gives NECTEC a permission to distribute this software as an “as is ” and non-modified software for a
                            temporary and non-exclusive use without remuneration to anyone for his or her own purpose or academic
                            purpose, which are not commercial purposes. In this connection, NECTEC shall not be responsible to
                            the user for taking care, maintaining, training or developing the efficiency of this software.
                            Moreover, NECTEC shall not be liable for any error, software efficiency and damages in connection
                            with or arising out of the use of the software.
                        </Text>

                        <View style={{ height: 20 }}></View>

                        <Text
                            style={{
                                fontSize: 12,
                                color: '#555',
                                textAlign: 'justify'
                            }}
                        >
                            {'\t'}
                            ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นายณรงค์ชัย จรูญพิพัฒน์กุล และนายกนต์ธร นิธิไพศาล จาก สถาบันเทคโนโลยีนานาชาติสิรินธรภายใต้การดูแลของ ผู้ช่วยศาสตราจารย์ดอกเตอร์ศศิพร อุษณวศิน ภายใต้โครงการพัฒนาแอพพลิเคชันเกมสัตว์เลี้ยงบำบัด ซึ่งสนับสนุนโดย ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟต์แวร์ ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา ซึ่งผู้พัฒนาได้อนุญาตให้ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ เผยแพร่ซอฟต์แวร์นี้ตาม “ต้นฉบับ” โดยไม่มีการแก้ไขดัดแปลงใดๆ ทั้งสิ้น ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่มีวัตถุประสงค์ในเชิงพาณิชย์ โดยไม่คิดค่าตอบแทนการใช้ซอฟต์แวร์ ดังนั้น ศูนย์เทคโนโลยีอิเล็กทรอนิกส์และคอมพิวเตอร์แห่งชาติ จึงไม่มีหน้าที่ในการดูแล บำรุงรักษาจัดการ อบรมการใช้งาน หรือพัฒนาประสิทธิภาพซอฟต์แวร์ รวมทั้งไม่รองรับความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์ ตลอดจนไม่รับประกันความเสียหายต่างๆ อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น
                        </Text>
                    </View>
                </View>
            )
        } else {
            return (
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
                        paddingTop: 3,
                        alignSelf: 'center'
                    }}
                    onPress={() => this.setState({ showPolicy: true })}
                >
                    <Text style={{ fontSize: 14 }}>POLICY</Text>
                    <Ionicons
                        name="ios-arrow-dropdown-circle"
                        size={36}
                        style={{ marginLeft: 7 }}
                    />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        paddingTop: Dimensions.get('window').width < 400 ? 40 : 68,
                        backgroundColor: 'transparent',
                        paddingHorizontal: '8%'
                    }}
                >

                    <BackButton
                        onPress={() => this.props.goBack()}
                        style={{ marginLeft: 0 }}
                    />

                    <View style={{ height: 20 }}></View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: 300
                        }}
                    >
                        <Text>Microphone Language:</Text>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: this.selectedLanguageBackground('en-US'),
                                    padding: 5,
                                    width: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 6,
                                    alignSelf: 'center'
                                }}
                                onPress={() => this.changeLanguage('en-US')}
                            >
                                <Text style={{ color: this.selectedLanguageFontColor('en-US'), fontSize: 16, fontWeight: 'bold' }}>Eng</Text>
                            </TouchableOpacity>
                            <View style={{ width: 10 }}></View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: this.selectedLanguageBackground('th-TH'),
                                    padding: 5,
                                    width: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 6,
                                    alignSelf: 'center'
                                }}

                                onPress={() => this.changeLanguage('th-TH')}
                            >
                                <Text style={{ color: this.selectedLanguageFontColor('th-TH'), fontSize: 16, fontWeight: 'bold' }}>ไทย</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Text>Voice Server IP:</Text>
                        <TextInput 
                            style={{ width: 150, backgroundColor: '#fff', marginHorizontal: 20, paddingVertical: 5, fontSize: 18, borderRadius: 8, paddingHorizontal: 10 }}
                            onChangeText={text => this.setState({ voiceServerIP: text })}
                            value={this.state.voiceServerIP}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: '#0080ff99', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 6, alignSelf: 'center' }}
                            onPress={() => this.changeVoiceServerIP(this.state.voiceServerIP)}
                        >
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>confirm</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 20 }}></View>

                    <HR />

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#0080ff99',
                            padding: 10,
                            width: 110,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 6,
                            alignSelf: 'center'
                        }}

                        onPress={() => this.props.goTutorial()}
                    >
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>TUTORIAL</Text>
                    </TouchableOpacity>

                    <View style={{ height: 20 }}></View>

                    <HR />

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#FF6969',
                            padding: 10,
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 6,
                            alignSelf: 'center'
                        }}

                        onPress={() => this.logout()}
                    >
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>LOGOUT</Text>
                    </TouchableOpacity>

                    <View style={{ height: 20 }}></View>

                    <HR />

                    {this.renderPolicy()}

                    <HR />
                    <Text>Special Thanks</Text>
                    <View style={{ height: 15 }}></View>
                    <Text>นายคมสันต์ เตชะไมตรีจิต</Text>

                    <View style={{ height: 60 }}></View>
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