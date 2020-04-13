import React from 'react';
import { View } from 'react-native'

export default class ProgressBar extends React.Component {
    render() {
        return (
            <View
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    borderRadius: this.props.borderRadius,
                    backgroundColor: '#FFF',
                    borderWidth: 1,
                    borderColor: this.props.borderColor,
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        width: this.props.percent != 0 ? ((this.props.percent*this.props.width)/100)-2 : 0,
                        height: this.props.height-2,
                        backgroundColor: this.props.color
                    }}
                >
                </View>
            </View>
        )
    }
}