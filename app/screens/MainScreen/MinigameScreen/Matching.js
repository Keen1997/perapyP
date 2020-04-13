import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import BackButton from '../../../components/BackButton'

const initialItems = [
    {
        itemNo: 1,
        matchNo: 1,
        src: require('./assets/minigame/randoms/apple.png'),
        type: 'item',
    },
    {
        itemNo: 2,
        matchNo: 2,
        src: require('./assets/minigame/randoms/banana.png'),
        type: 'item',
    },
    {
        itemNo: 3,
        matchNo: 3,
        src: require('./assets/minigame/randoms/cheese.png'),
        type: 'item',
    },
    {
        itemNo: 4,
        matchNo: 4,
        src: require('./assets/minigame/randoms/lettuce.png'),
        type: 'item',
    },
    {
        itemNo: 5,
        matchNo: 5,
        src: require('./assets/minigame/randoms/meat.png'),
        type: 'item',
    },
    {
        itemNo: 6,
        matchNo: 6,
        src: require('./assets/minigame/randoms/rice.png'),
        type: 'item',
    },
    {
        itemNo: 7,
        matchNo: 7,
        src: require('./assets/minigame/randoms/soup.png'),
        type: 'item',
    },
    {
        itemNo: 8,
        matchNo: 8,
        src: require('./assets/minigame/randoms/bomb.png'),
        type: 'bomb',
    },
    {
        itemNo: 9,
        matchNo: 1,
        src: require('./assets/minigame/randoms/apple.png'),
        type: 'item',
    },
    {
        itemNo: 10,
        matchNo: 2,
        src: require('./assets/minigame/randoms/banana.png'),
        type: 'item',
    },
    {
        itemNo: 11,
        matchNo: 3,
        src: require('./assets/minigame/randoms/cheese.png'),
        type: 'item',
    },
    {
        itemNo: 12,
        matchNo: 4,
        src: require('./assets/minigame/randoms/lettuce.png'),
        type: 'item',
    },
    {
        itemNo: 13,
        matchNo: 5,
        src: require('./assets/minigame/randoms/meat.png'),
        type: 'item',
    },
    {
        itemNo: 14,
        matchNo: 6,
        src: require('./assets/minigame/randoms/rice.png'),
        type: 'item',
    },
    {
        itemNo: 15,
        matchNo: 7,
        src: require('./assets/minigame/randoms/soup.png'),
        type: 'item',
    },
    {
        itemNo: 16,
        matchNo: 8,
        src: require('./assets/minigame/randoms/bomb.png'),
        type: 'bomb',
    },
]

export default class Matching extends React.Component {
    state = {
        items: [],
        left: 0,
        selectFirst: false,
        life: 3,
        canPress: 40,
        status: 'playing'
    }

    componentDidMount() {
        this.setState({
            items: this.shuffle(initialItems).map(item => {
                return {
                    ...item,
                    matched: false,
                    selecting: false
                }
            }),
            left: this.countItems(initialItems) / 2
        })
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    countItems(array) {
        let count = 0

        array.forEach((element) => {
            if (element.type == 'item') count += 1
        })

        return count
    }

    selectItem = (itemNo) => {
        let items = this.state.items

        items.forEach((item, i) => {
            if (item.itemNo == itemNo) {
                if (item.matched == false) {
                    if (item.selecting == false) {
                        this.setState({ canPress: this.state.canPress - 1 }, () => {
                            if (this.state.canPress == 0) {
                                this.setState({ status: 'lose' })
                            }
                        })
                        if (item.type == 'bomb') {
                            if (this.state.selectFirst) {
                                items.forEach((item1, i1) => {
                                    if (item1.selecting == true) {
                                        setTimeout(() => {
                                            let newItems = this.state.items
                                            newItems[i1].selecting = false

                                            this.setState({
                                                items: newItems,
                                                selectFirst: false
                                            })
                                        }, 750)
                                    }
                                })
                            }

                            let newItems = this.state.items
                            newItems[i].selecting = true
                            this.setState({
                                items: newItems,
                                life: this.state.life - 1
                            }, () => {
                                if (this.state.life == 0) {
                                    this.setState({ status: 'lose' })
                                }
                            })

                            setTimeout(() => {
                                newItems[i].selecting = false
                                this.setState({
                                    items: newItems,
                                })
                            }, 750)

                        } else {
                            if (!this.state.selectFirst) {
                                let newItems = this.state.items
                                newItems[i].selecting = true

                                this.setState({
                                    items: newItems,
                                    selectFirst: true
                                })
                            } else {
                                items.forEach((item1, i1) => {
                                    if (item1.selecting == true && item1.itemNo != item.itemNo) {
                                        if (item.matchNo == item1.matchNo) {
                                            let newItems = this.state.items
                                            newItems[i].matched = true
                                            newItems[i1].matched = true
                                            newItems[i].selecting = false
                                            newItems[i1].selecting = false

                                            this.setState({
                                                items: newItems,
                                                left: this.state.left - 1,
                                                selectFirst: false
                                            }, () => {
                                                if (this.state.left == 0) {
                                                    this.setState({ status: 'win' })
                                                }
                                            })
                                        } else {
                                            let tempItems = this.state.items
                                            tempItems[i].selecting = true
                                            this.setState({
                                                items: tempItems,
                                                selectFirst: false
                                            })

                                            setTimeout(() => {
                                                tempItems[i].selecting = false
                                                tempItems[i1].selecting = false

                                                this.setState({
                                                    items: tempItems,
                                                })
                                            }, 750)
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
            }
        })
    }

    renderLife() {
        let array = []
        for (let i = 0; i < this.state.life; i++) {
            array.push(
                <Image
                    key={i}
                    style={{
                        width: 32,
                        height: 32,
                        marginRight: 10
                    }}
                    source={require('./assets/icons/heart.png')}
                />
            )
        }
        return (
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                {array}
            </View>
        )
    }

    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <BackButton onPress={() => this.props.goBack()} style={{ marginBottom: 50 }} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        width: 300
                    }}
                >
                    {this.renderLife()}
                    <Text style={{ fontSize: 32 }}>{this.state.canPress}</Text>
                </View>

                <View style={{ height: 40 }} />

                <View
                    style={{
                        height: 320,
                    }}
                >
                    <FlatList
                        scrollEnabled={false}
                        data={this.state.items}
                        numColumns={4}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 18,
                                    paddingVertical: 15
                                }}
                                onPress={() => this.selectItem(item.itemNo)}
                            >
                                <Image
                                    source={
                                        item.matched || item.selecting
                                            ? item.src : require('./assets/minigame/question.png')
                                    }
                                    style={{
                                        width: 50,
                                        height: 50,
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>

                <Text
                    style={{
                        alignSelf: 'center',
                        marginTop: 40,
                        fontSize: 24
                    }}>
                    {this.state.status.toUpperCase()}
                </Text>

            </View >
        )
    }
}