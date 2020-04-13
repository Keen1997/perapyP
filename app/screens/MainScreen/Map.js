import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import BackButton from '../../components/BackButton'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Map extends React.Component {
    state = {
        location: null,
        region: null,
        errorMessage: null,
        markers: [
            {
                latitude: 14.069482,
                longitude: 100.6011034,
                title: 'University',
                description: 'Thammasat Rangsit',
                imageSrc: require('../../assets/resize/Bear-head/Bear-head.png'),
            },
            {
                latitude: 13.9886947,
                longitude: 100.6176517,
                title: 'Shopping Mall',
                description: 'Future Park Rangsit',
                imageSrc: require('../../assets/map/smile.png'),
            },
            {
                latitude: 13.9645163,
                longitude: 100.5869203,
                title: 'University',
                description: 'Rangsit University',
                imageSrc: require('../../assets/map/book.png'),
            },
            {
                latitude: 14.0673081,
                longitude: 100.6474858,
                title: 'Temple',
                description: 'Dhammakaya Temple',
                imageSrc: require('../../assets/map/temple.png'),
            },
        ],

    };

    UNSAFE_componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        this.setState({
            region: region,
            location: location,
        })
    }

    renderCurrentMarker() {
        if (this.state.location != null) {
            return (
                <Marker
                    key="current"
                    coordinate={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude
                    }}
                    title='your current location'
                >
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 27,
                            backgroundColor: '#fff',
                            shadowColor: "#777",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.45,
                            shadowRadius: 5,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={require('../../assets/map/user.png')}
                            style={{ width: 40, height: 40 }}
                        />
                    </View>
                </Marker>
            )
        }

    }

    renderMarker() {
        return (
            this.state.markers.map(marker => (
                <Marker
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude
                    }}
                    title={marker.title}
                    description={marker.description}
                >
                    <View
                        style={{
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            backgroundColor: '#fff',
                            shadowColor: "#777",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.45,
                            shadowRadius:  5,
                            elevation: 5,
                        }}
                    >
                        <Image
                            source={marker.imageSrc}
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                </Marker>
            ))
        )
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        paddingTop: 58,
                        paddingBottom: 20,
                        backgroundColor: '#ffffff88',
                        position: 'absolute',
                        top: 0,
                        zIndex: 1,
                        width: '100%'
                    }}
                >
                    <BackButton onPress={this.props.goBack} />
                </View>

                <MapView
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                    region={this.state.region}
                >
                    {this.renderCurrentMarker()}
                    {this.renderMarker()}
                </MapView>
            </View>
        )
    }
}
