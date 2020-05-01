import React from 'react'
import { ScrollView, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import BackButton from '../../components/BackButton'
import * as firebase from 'firebase';
import SI_money from '../../components/helpers/SI_money'

export default class Shop extends React.Component {
    state = {
        money: null
    }

    componentDidMount() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).on("value", async (snap) => {
            this.setState({
                money: snap.val().money,
            })
        })
    }

    buyBackground() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({ backgroundPink: true, money: 150 })
    }

    backBackground() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({ backgroundPink: false })
    }

    render() {
        return (
            <View
                style={{
                    paddingTop: Dimensions.get('window').width < 400 ? 40 : 68,
                    backgroundColor: '#fff9f1',
                    height: Dimensions.get('window').height
                }}
            >

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    {/* -------- Back Button -------- */}
                    <BackButton
                        onPress={() => this.props.goBack()}
                        style={{ marginLeft: 0, width: 95 }}
                    />

                    {/* -------- Title -------- */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>SHOP</Text>

                    <View style={{ width: 95, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Image
                            source={require('../../assets/icons/Coin.png')}
                            style={{ width: 28, height: 28 }}
                        />
                        <View style={{ width: 5 }}></View>
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{SI_money(this.state.money, 2)}</Text>
                    </View>
                </View>



                {/* -------- Item Detail (Option) -------- */}

                <View style={{ marginTop: 35, marginLeft: 15 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Background</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }} onPress={ () => this.backBackground() }>
                            <Image style={{ width: 100, height: 125, marginBottom: 10 }} source={require('../../assets/shop/House.jpg')} />
                            <Text>owned</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }} onPress={ () => this.buyBackground() }>
                            <Image style={{ width: 100, height: 125, marginBottom: 10 }} source={require('../../assets/shop/House-pink.jpg')} />
                        <Text>350</Text>
                        </TouchableOpacity>
                    </ScrollView>

            </View>

            <View style={{ marginTop: 35, marginLeft: 15 }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Food</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
                        <Image style={{ width: 50, height: 50, marginBottom: 10 }} source={require('../../assets/shop/Chicken.png')} />
                        <Text>35</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
                        <Image style={{ width: 50, height: 50, marginBottom: 10 }} source={require('../../assets/shop/Baguette.png')} />
                        <Text>45</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
                        <Image style={{ width: 50, height: 50, marginBottom: 10 }} source={require('../../assets/shop/lobster.png')} />
                        <Text>80</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
                        <Image style={{ width: 50, height: 50, marginBottom: 10 }} source={require('../../assets/shop/vegetable.png')} />
                        <Text>55</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
                        <Image style={{ width: 50, height: 50, marginBottom: 10 }} source={require('../../assets/shop/pie.png')} />
                        <Text>30</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
                        <Image style={{ width: 50, height: 50, marginBottom: 10 }} source={require('../../assets/shop/breakfast.png')} />
                        <Text>105</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>
            </View >

        )
    }
}