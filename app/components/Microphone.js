import React from 'react';
import { TouchableOpacity, Platform, Image } from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions'
import * as FileSystem from 'expo-file-system';
import axios from 'axios'
import * as firebase from 'firebase';

const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
}

export default class Microphone extends React.Component {
    state = {
        permission: false,
        isRecording: false,
        isFetching: false,
        transcription: '',
        language: 'en-US'
    }

    componentDidMount() {
        this.askForPermission()

        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", async (snap) => {
            this.setState({ 
                language: snap.val().voiceLanguage,
                voiceServerIP: snap.val().voiceServerIP
            })
        })
    }

    askForPermission = async () => {
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING)

        if (status == 'granted') {
            this.setState({ permission: true })
        }
    }

    startRecording = async () => {
        if (!this.state.permission) {
            alert('permission not granted')
            return
        }

        this.setState({ isRecording: true })

        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: true,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        })

        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            this.stopRecord()
        }

        this.recording = recording
    }

    stopRecording = async () => {
        this.setState({ isRecording: false })

        try {
            await this.recording.stopAndUnloadAsync()
        } catch (error) {
        }
    }

    getTranscription = async () => {
        this.setState({ isFetching: true })

        try {
            const { uri } = await FileSystem.getInfoAsync(this.recording.getURI())

            let formData = new FormData()
            formData.append('file', {
                uri,
                type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
                name: Platform.OS === 'ios' ? `${Date.now()}_${this.state.language}.wav` : `${Date.now()}_${this.state.language}.m4a`,
            })

            await axios.post('http://' + this.state.voiceServerIP + ':3005/speech', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                this.setState({ transcription: res.data })
                if (res.data != '') this.transcriptionToParent(res.data)
            })
        } catch (error) {
            console.log('There was an error reading file', error)

            this.stopRecording()

            this.recording = null

            try {
                const info = await FileSystem.getInfoAsync(this.recording.getURI())
                await FileSystem.deleteAsync(info.uri)
            } catch (error) {
                console.log('There was an error deleting recorded file', error)
            }
        }

        this.setState({ isFetching: false })
    }

    handleOnPressOut = () => {
        this.stopRecording()
        this.getTranscription()
    }

    transcriptionToParent = (data) => {
        this.props.STT(data)
    }

    render() {
        return (
            <TouchableOpacity
                onPressIn={(this.startRecording)}
                onPressOut={this.handleOnPressOut}
            >
                <Image
                    style={{ width: 90, height: 90 }}
                    source={require('../assets/icons/mic.png')}
                />
            </TouchableOpacity>
        )
    }
}