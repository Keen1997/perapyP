import React from 'react';
import { ImageBackground, StyleSheet, ActivityIndicator } from 'react-native'

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={require('../assets/background/normal.png')}
            >
                <ActivityIndicator size="large" color="#555" />
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
})