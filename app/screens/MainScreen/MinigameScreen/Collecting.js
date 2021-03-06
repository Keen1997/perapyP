import React from 'react'
import { View, Image, TouchableOpacity, Dimensions, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import BackButton from '../../../components/BackButton'
import { playSound } from '../../../components/PlaySound'

const initialItems = [
    {
        itemNo: 1,
        src: require('./assets/minigame/randoms/apple.png'),
        speed: 6,
        score: 2
    },
    {
        itemNo: 2,
        src: require('./assets/minigame/randoms/banana.png'),
        speed: 6,
        score: 2
    },
    {
        itemNo: 3,
        src: require('./assets/minigame/randoms/cheese.png'),
        speed: 8,
        score: 3
    },
    {
        itemNo: 4,
        src: require('./assets/minigame/randoms/lettuce.png'),
        speed: 4,
        score: 1
    },
    {
        itemNo: 5,
        src: require('./assets/minigame/randoms/meat.png'),
        speed: 8,
        score: 3
    },
    {
        itemNo: 6,
        src: require('./assets/minigame/randoms/rice.png'),
        speed: 10,
        score: 4
    },
    {
        itemNo: 7,
        src: require('./assets/minigame/randoms/soup.png'),
        speed: 12,
        score: 5
    },
]

export default class Collecting extends React.Component {
    state = {
        grid: [
            Dimensions.get('window').width / 2 - 150,
            Dimensions.get('window').width / 2 - 100,
            Dimensions.get('window').width / 2 - 50,
            Dimensions.get('window').width / 2,
            Dimensions.get('window').width / 2 + 50,
            Dimensions.get('window').width / 2 + 100,
            Dimensions.get('window').width / 2 + 150
        ],
        characterPosition: 3,
        currentItems: [],
        countItem: 0,
        score: 0,
        time: 59,
        collectItems: []
    }

    componentDidMount() {
        this.gameRuning()
    }

    gameRuning() {
        this.generateItems = setInterval(() => {
            this.generateItem(initialItems)
        }, 500)

        this.handleItems = setInterval(() => {
            this.itemFall()
            this.itemDestroy()
        }, 25)

        this.countDown = setInterval(() => {
            this.setState({ time: this.state.time - 1 })
        }, 1000)
    }

    moveLeft() {
        if (this.state.characterPosition != 0) this.setState({ characterPosition: this.state.characterPosition - 1 })
        // playSound(require('../../../assets/sounds/move.wav'))
    }

    moveRight() {
        if (this.state.characterPosition != 6) this.setState({ characterPosition: this.state.characterPosition + 1 })
        // playSound(require('../../../assets/sounds/move.wav'))
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    generateItem(array) {
        let index = this.randomInt(0, array.length - 1)
        let newItem = array[index]
        let position = this.randomInt(0, 6)
        newItem.pos = position
        newItem.bottom = 350
        newItem.no = this.state.countItem

        this.setState({
            currentItems: [...this.state.currentItems, newItem],
            countItem: this.state.countItem + 1
        })
    }

    itemFall() {
        this.setState(state => ({
            currentItems: state.currentItems.map(item => {
                return { ...item, bottom: item.bottom - item.speed }
            })
        }))
    }

    itemDestroy() {
        this.state.currentItems.forEach(item => {
            if (item.pos == this.state.characterPosition && item.bottom < 0) {
                this.setState({
                    score: this.state.score + item.score,
                    collectItems: [...this.state.collectItems, item.itemNo],
                    currentItems: this.state.currentItems.filter(ele => ele.no != item.no)
                })
            }
        })

        this.setState({
            currentItems: this.state.currentItems.filter(item => item.bottom > -25)
        })
    }

    renderItems() {
        let items = []
        this.state.currentItems.forEach((item, index) => {
            items.push(
                <View
                    key={index}
                    style={{
                        bottom: item.bottom,
                        left: this.state.grid[item.pos] - 56,
                        alignSelf: 'center',
                        position: 'absolute',
                    }}
                >
                    <Image
                        style={{
                            width: 45,
                            height: 45,
                        }}
                        source={item.src}
                    />
                </View>
            )
        })
        return items
    }

    renderEachScore() {
        let result = {}
        this.state.collectItems.forEach(i => { result[i] = (result[i] || 0) + 1 })
        let array = []

        Object.keys(result).forEach(element => {
            initialItems.forEach(item => {
                if (element == item.itemNo) {
                    array.push(
                        <View
                            key={item.itemNo}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end'
                            }}
                        >
                            <Image
                                source={item.src}
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 20,
                                    marginRight: 10
                                }}
                            />
                            <Text style={{ fontSize: 24 }}><Text style={{ fontSize: 16 }}>X</Text> {result[element]} = {result[element] * item.score}</Text>
                        </View>
                    )
                }
            })
        })
        return array
    }

    renderResultScreen() {
        clearInterval(this.generateItems)
        clearInterval(this.handleItems)
        clearInterval(this.countDown)

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <BackButton onPress={() => this.props.goBack()} style={{ marginBottom: 20 }} />
                <Text style={{ fontSize: 24 }}>Total Score: <Text style={{ fontSize: 48 }}>{this.state.score}</Text></Text>

                <View height={20} />

                <View
                    style={{ alignItems: 'flex-start' }}
                >
                    {this.renderEachScore()}

                </View>

                <View height={40} />

                <TouchableOpacity
                    style={{
                        width: 150,
                        height: 50,
                        backgroundColor: '#ff002b',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        this.setState({
                            characterPosition: 4,
                            countItem: 0,
                            currentItems: [],
                            score: 0,
                            time: 59,
                            collectItems: []
                        })
                        this.gameRuning()
                    }}
                >
                    <Text style={{ fontSize: 20, color: '#fff' }}>PLAY AGAIN</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderGamePlayScreen() {
        return (
            <View
                style={{
                    marginTop: 100,
                }}
            >
                <BackButton onPress={() => this.props.goBack()} style={{ marginBottom: 20 }} />
                <Text style={{ alignSelf: 'center', fontSize: 32 }}>00:{this.state.time < 10 ? '0' + this.state.time : this.state.time}</Text>
                <View
                    style={{
                        width: 350,
                        height: 400,
                        flexDirection: 'row',
                        alignSelf: 'center'

                    }}
                >
                    {this.renderItems()}
                </View>
                <Image
                    style={{
                        width: 45,
                        height: 45,
                        left: this.state.grid[this.state.characterPosition] - 22.5
                    }}
                    source={require('./assets/minigame/smile-bit.png')}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        width: '100%'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.moveLeft()}
                        style={{
                            // borderWidth: 1,
                            width: 120,
                            height: 80,
                            justifyContent: 'center',
                            paddingLeft: 20
                        }}
                    >
                        <AntDesign
                            name="caretleft"
                            size={45}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.moveRight()}
                        style={{
                            // borderWidth: 1,
                            width: 120,
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingRight: 20
                        }}
                    >
                        <AntDesign
                            name="caretright"
                            size={45}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{ marginTop: -10, fontSize: 28, alignSelf: 'center' }}>{this.state.score}</Text>
                {/* <Text>{JSON.stringify(this.state.currentItems)}</Text> */}
            </View>

        )
    }

    render() {
        if (this.state.time <= 0) {
            return this.renderResultScreen()
        } else {
            return this.renderGamePlayScreen()
        }
    }
}