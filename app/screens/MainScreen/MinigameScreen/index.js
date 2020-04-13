import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import BackButton from '../../../components/BackButton'

import Collecting from './Collecting'
import Letter from './Letter'
import Matching from './Matching'
import Operation from './Operation'

export default class Minigame extends React.Component {
    state = {
        game: null
    }

    goBack = () => this.setState({ game: null })

    render() {
        if (this.state.game == 'Collecting') return <Collecting goBack={() => this.goBack()}/>
        if (this.state.game == 'Letter') return <Letter goBack={() => this.goBack()}/>
        if (this.state.game == 'Matching') return <Matching goBack={() => this.goBack()}/>
        if (this.state.game == 'Operation') return <Operation goBack={() => this.goBack()}/>

        return (
            <ScrollView style={{ paddingTop: 50, backgroundColor: '#e490a8' }} >
                <BackButton onPress={() => this.props.goBack()} style={{ marginBottom: 30 }} />
                <TouchableOpacity
                    style={styles.game}
                    onPress={() => this.setState({ game: 'Collecting' })}
                >
                    <Image source={require('./assets/preview/f.gif')} style={{ height: 150, resizeMode: 'contain' }} />
                    <Text style={styles.text}>Food Fall</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.game}
                    onPress={() => this.setState({ game: 'Letter' })}
                >
                    <Image source={require('./assets/preview/l.jpg')} style={{ height: 150, resizeMode: 'contain' }} />
                    <Text style={styles.text}>Fill the letter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.game}
                    onPress={() => this.setState({ game: 'Matching' })}
                >
                    <Image source={require('./assets/preview/m.gif')} style={{ height: 150, resizeMode: 'contain' }} />
                    <Text style={styles.text}>Match Duo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.game}
                    onPress={() => this.setState({ game: 'Operation' })}
                >
                    <Image source={require('./assets/preview/a.jpg')} style={{ height: 150, resizeMode: 'contain' }} />
                    <Text style={styles.text}>Math Time</Text>
                </TouchableOpacity>

                <View height={100} />
            </ScrollView>
        )

    }
}

const styles = {
    game: {
        width: Dimensions.get('window').width - 40, 
        borderRadius: 12, 
        height: 200, 
        alignSelf: 'center', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 20,
        color: '#000'
    }
}