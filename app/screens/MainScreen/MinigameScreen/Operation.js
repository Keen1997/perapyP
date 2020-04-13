import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import BackButton from '../../../components/BackButton'

const initialStages = [
    {
        first: 20,
        second: 10,
        answer: 2,
        operationNo: 4
    },
    {
        first: 17,
        second: 29,
        answer: 46,
        operationNo: 1
    },
    {
        first: 100,
        second: 12,
        answer: 88,
        operationNo: 2
    },
    {
        first: 36,
        second: 3,
        answer: 108,
        operationNo: 3
    },
    {
        first: 102,
        second: 6,
        answer: 17,
        operationNo: 4
    },
    {
        first: 96,
        second: 24,
        answer: 4,
        operationNo: 4
    },
    {
        first: 27,
        second: 32,
        answer: 59,
        operationNo: 1
    },
    {
        first: 56,
        second: 27,
        answer: 29,
        operationNo: 2
    },
    {
        first: 4,
        second: 8,
        answer: 32,
        operationNo: 3
    },
]

export default class Operation extends React.Component {
    state = {
        currentStage: {},
        time: 20,
        play: [],
        playing: {},
        score: 0,
        plusBG: 'transparent',
        minusBG: 'transparent',
        multipleBG: 'transparent',
        divideBG: 'transparent'

    }

    UNSAFE_componentWillMount() {
        this.setState({ play: initialStages })
    }

    componentDidMount() {
        this.randomStage()
        this.countDown()
    }

    componentWillUnmount() {
        clearInterval(this.countDown)
    }

    countDown() {
        this.countDown = setInterval(() => {
            this.setState({ time: this.state.time - 1 })
            if (this.state.time == 0) clearInterval(this.countDown)
        }, 1000)

    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    randomStage() {
        let n = this.state.play.length
        let i = this.randomInt(1, n) - 1

        let playing = {
            first: this.state.play[i].first,
            second: this.state.play[i].second,
            answer: this.state.play[i].answer,
            operationNo: this.state.play[i].operationNo
        }

        let x = this.state.play
        x.splice(i, 1)
        this.setState({ play: x })

        this.setState({ playing })
    }

    answer(operationNo) {
        if (operationNo == this.state.playing.operationNo) {
            this.setState({ score: this.state.score + 1 })
            this.operationBackgroundColor(operationNo, '#0f0')
        } else {
            this.operationBackgroundColor(operationNo, '#f00')
        }

        this.randomStage()
    }

    operationBackgroundColor(operationNo, color) {
        switch (operationNo) {
            case 1:
                this.setState({ plusBG: color })
                setTimeout(() => {
                    this.setState({ plusBG: 'transparent' })
                }, 200)
                break;

            case 2:
                this.setState({ minusBG: color })
                setTimeout(() => {
                    this.setState({ minusBG: 'transparent' })
                }, 200)
                break;

            case 3:
                this.setState({ multipleBG: color })
                setTimeout(() => {
                    this.setState({ multipleBG: 'transparent' })
                }, 200)
                break;

            case 4:
                this.setState({ divideBG: color })
                setTimeout(() => {
                    this.setState({ divideBG: 'transparent' })
                }, 200)
                break;

            default:
                break;
        }
    }

    renderBox() {
        return (
            <View
                style={{
                    borderWidth: 2,
                    borderRadius: 4,
                    width: 42,
                    height: 42,
                    marginHorizontal: 10,
                }}
            />
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 40,
                }}
            >
                <BackButton onPress={() => this.props.goBack()} style={{ bottom: 60, position: 'absolute' }} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 40
                    }}
                >
                    <Text style={{ fontSize: 28 }}>{this.state.time}</Text>
                    <Text style={{ fontSize: 28 }}>{this.state.score}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={styles.equationText}>{this.state.playing.first}</Text>
                        {this.renderBox()}
                        <Text style={styles.equationText}>{this.state.playing.second}</Text>
                        <Text style={styles.equationText}>=</Text>
                        <Text style={styles.equationText}>{this.state.playing.answer}</Text>
                    </View>

                    <View style={{ height: 100 }} />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity
                            style={[styles.operationContainer, { backgroundColor: this.state.plusBG }]}
                            onPress={() => this.answer(1)}>
                            <Text style={styles.operationText}>
                                +
                            </Text>
                        </TouchableOpacity>

                        <View style={{ width: 20 }} />

                        <TouchableOpacity
                            style={[styles.operationContainer, { backgroundColor: this.state.minusBG }]}
                            onPress={() => this.answer(2)}>
                            <Text style={styles.operationText}>
                                -
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 20 }} />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>

                        <TouchableOpacity
                            style={[styles.operationContainer, { backgroundColor: this.state.multipleBG }]}
                            onPress={() => this.answer(3)}>
                            <Text style={styles.operationText}>
                                X
                            </Text>
                        </TouchableOpacity>

                        <View style={{ width: 20 }} />

                        <TouchableOpacity
                            style={[styles.operationContainer, { backgroundColor: this.state.divideBG }]}
                            onPress={() => this.answer(4)}>
                            <Text style={styles.operationText}>
                                /
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View />
            </View >
        )
    }
}

const styles = {
    equationText: {
        fontSize: 48,
        marginHorizontal: 10
    },
    operationContainer: {
        borderWidth: 2,
        borderRadius: 12,
        width: 125,
        height: 125,
        justifyContent: 'center',
        alignItems: 'center'
    },
    operationText: {
        fontSize: 60
    }
}