import React from 'react';
import { Image } from 'react-native'

export default class PetEating extends React.Component {
    state = {
        src: null
    }

    componentDidMount() {
        switch(this.props.food) {
            case 'Apple': {
                this.setState({ src: require('../assets/resize/Foods/Apple/Apple.gif') })
                break
            }
            case 'Pizza': {
                this.setState({ src: require('../assets/resize/Foods/Pizza/Pizza.gif') })
                break
            }
        }
    }

    render() {
        return (
            <Image
                style={{
                    width: 60,
                    resizeMode: 'contain',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: -50
                }}
                source={this.state.src}
            />
        )
    }
}