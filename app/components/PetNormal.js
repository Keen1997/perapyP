import React from 'react';
import { Image, Dimensions } from 'react-native'

export default class PetImages extends React.Component {
    randomImage = null

    state = {
        images: [
            // require('../assets/images/Poring.png'),
            // require('../assets/pets/reading.png'),
            // require('../assets/pets/somethings.png'),
            // require('../assets/pets/up.png'),
            require('../assets/resize/Bear/Bear.png'),
            require('../assets/resize/Bear/Bear-clock.png'),
            require('../assets/resize/Bear/Bear-smile.png'),
            require('../assets/resize/Bear/Bear-explain.png'),
            require('../assets/resize/Bear/Bear-boring.png'),
        ],
        selectImage: null,
    }

    // Set initial to normal image
    // Random image every 2000 ms
    componentDidMount() {
        this.setState({ selectImage: require('../assets/resize/Bear/Bear.png') })

        this.randomImage = setInterval(() => {
            this.setState({ selectImage: this.state.images[Math.floor(Math.random() * this.state.images.length)] })
        }, 2000)
    }

    // Clear random image when unmount
    componentWillUnmount() {
        clearInterval(this.randomImage)
        this.randomImage = null
    }

    render() {
        return (
            <Image
                style={{ height: this.props.height? this.props.height : 300, resizeMode: 'contain' }}
                source={this.state.selectImage}
            />
        )
    }
}