import React from 'react';
import { TouchableOpacity } from 'react-native'

export default class SleepBackground extends React.Component {
    render() {
        return(
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    backgroundColor: '#00002699',
                    height: '100%',
                    width: '100%'
                }}
                onPress={this.props.wakeup}
            >
            </TouchableOpacity>
        )
    }
}