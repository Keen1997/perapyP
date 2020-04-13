import React from 'react';
import * as firebase from 'firebase';
import { View, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import PetHeads from '../../components/ฺPetHeads'

export default class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    // Firebase login
    // Reset text input into ''
    login() {
        const { email, password } = this.state

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ email: '', password: '' })
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('../../assets/background/normal.png')}
            >

                {/* -------- Pet Images -------- */}
                <View style={{ height: 80 }}>
                    <PetHeads />
                </View>

                <View style={{ height: 80 }}></View>

                {/* -------- Logo -------- */}
                <Image
                    source={require('../../assets/images/PERAPY.png')}
                />

                <View style={{ height: 60 }}></View>

                <View style={styles.inputContainer}>

                    {/* -------- Email Input -------- */}
                    <View style={styles.inputRowContainer}>
                        <Image
                            style={{ width: 17, height: 17, marginRight: 15, resizeMode: 'contain' }}
                            source={require('../../assets/icons/email.png')}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            placeholder={'email'}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                        />
                    </View>

                    {/* -------- Password Input -------- */}
                    <View style={styles.inputRowContainer}>
                        <Image
                            style={{ width: 17, height: 17, marginRight: 15, resizeMode: 'contain' }}
                            source={require('../../assets/icons/password.png')}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            placeholder={'password'}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{ height: 40 }}></View>

                {/* -------- Login Button-------- */}
                <TouchableOpacity
                    onPress={() => this.login()}
                >
                    <View style={styles.nextContainer}>
                        <Image
                            style={{ width: 17, height: 17, resizeMode: 'contain' }}
                            source={require('../../assets/icons/arrow_next.png')}
                        />
                    </View>
                </TouchableOpacity>

                <View style={{ height: 20 }}></View>

                {/* -------- Link to Signup -------- */}
                <TouchableOpacity
                    style={styles.bottom}
                    onPress={this.props.registerPage}
                >
                    <Text style={{ color: '#777', fontSize: 12 }}>If you didn't have an account</Text>
                    <Text style={{ color: '#FF6969', fontWeight: 'bold', fontSize: 12 }}>Register here</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: 300,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        shadowColor: "#777",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputRowContainer: {
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    input: {
        width: '100%',
        borderRadius: 10,
        fontSize: 18,
        color: '#555'
    },
    nextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 100,
        width: 60,
        height: 60,
        shadowColor: "#777",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
})