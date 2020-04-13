import React from 'react';
import { Image } from 'react-native'

export default class PetHeads extends React.Component {
    randomImage = null

    state = {
        images: [
            require('../assets/Bear-head/Bear-head.png'),
            require('../assets/Bear-head/Bear-head-smile.png'),
            require('../assets/Bear-head/Bear-head-Explain.png'),
            require('../assets/Bear-head/Bear-head-watch.png'),
            require('../assets/Bear-head/Bear-head-boring.png'),
        ],
        selectImage: null,
    }

    // Set initial to normal image
    // Random image every 2000 ms
    componentDidMount() {
        this.setState({ selectImage: require('../assets/Bear-head/Bear-head.png') })

        this.randomImage = setInterval(() => {
            this.setState({ selectImage: this.state.images[Math.floor(Math.random() * this.state.images.length)] })
        }, this.props.sec ? this.props.sec*1000 : 2000)
    }

    // Clear random image when unmount
    componentWillUnmount() {
        clearInterval(this.randomImage)
    }

    render() {
        return (
            <Image
                style={{ height: this.props.height? this.props.height : 150, resizeMode: 'contain' }}
                source={this.state.selectImage}
            />
        )
    }
}