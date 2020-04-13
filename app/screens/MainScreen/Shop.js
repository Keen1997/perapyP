import React from 'react'
import { ScrollView, View, Image, Text, Dimensions } from 'react-native'
import BackButton from '../../components/BackButton'

export default class Shop extends React.Component {
    render() {
        return (
            <View
                style={{
                    paddingTop: Dimensions.get('window').width < 400 ? 40 : 68,
                    paddingHorizontal: '8%',
                    backgroundColor: '#fff9f1',
                    height: Dimensions.get('window').height
                }}
            >

                {/* -------- Back Button -------- */}
                <BackButton
                    onPress={() => this.props.goBack()}
                    style={{ marginLeft: 0 }}
                />

                {/* -------- Title -------- */}
                <Text style={{ fontSize: 24, marginTop: 30, fontWeight: 'bold', }}>SHOP</Text>

                {/* -------- Item Detail (Option) -------- */}
                <View></View>

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}
                >
                    <View></View>
                </ScrollView>
            </View>

        )
    }
}