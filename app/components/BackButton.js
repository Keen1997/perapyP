import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { playSound } from './PlaySound'

const BackButton = props => {
    return (
        <TouchableOpacity
            style={[{
                alignSelf: 'flex-start',
                marginLeft: '8%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                paddingHorizontal: 10,
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
            }, props.style]}
            onPress={props.onPress!==null ? props.onPress : {}}
            onPressOut={() => playSound(require('../assets/sounds/click.wav'))}
        >
            <Ionicons
                name="ios-arrow-dropleft-circle"
                size={36}
                style={{ marginRight: 7 }}
            />
            <Text style={{ fontSize: 14 }}>BACK</Text>
        </TouchableOpacity>
    )
}

export default BackButton