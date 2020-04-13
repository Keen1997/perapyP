import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import BackButton from '../../../components/BackButton'

const initialStages = [
    {
        id: '1',
        word: 'house',
        imageSrc: require('./assets/minigame/test/house.png'),
        score: 10
    },
    {
        id: '2',
        word: 'cat',
        imageSrc: require('./assets/minigame/test/cat.png'),
        score: 10
    },
    {
        id: '3',
        word: 'dog',
        imageSrc: require('./assets/minigame/test/dog.png'),
        score: 10
    }
]

export default class Letter extends React.Component {
    state = {
        currentStage: 0,
        stages: [],
        score: 0,
        time: 59,
        choices: [],
        missingWord: '',
    }

    UNSAFE_componentWillMount() {
        this.setState({
            stages: this.shuffle(initialStages)
        }, () => this.choiceGenerate())
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }


    choiceGenerate() {
        let word = this.state.stages[this.state.currentStage].word
        let characterMissingIndex = Math.floor(Math.random() * word.length)
        let characterMissing = word[characterMissingIndex]
        let missingWord = word.substring(0, characterMissingIndex) + '_' + word.substring(characterMissingIndex + 1);
        this.setState({ missingWord })

        let alphabet = 'abcdefghijklmnopqrstuvwxyz'
        alphabet = alphabet.replace(characterMissing, '')
        this.state.choices.push({
            character: characterMissing,
            isAnswer: true,
            status: 'normal'
        })
        while (this.state.choices.length != 4) {
            let character = alphabet[Math.floor(Math.random() * word.length)]
            this.state.choices.push({
                character,
                isAnswer: false,
                status: 'normal'
            })
            alphabet = alphabet.replace(character, '')
        }

        this.setState({ choice: this.shuffle(this.state.choices) })
    }


    answer(character) {
        this.state.choices.map((choice, index) => {
            if (choice.character == character) {
                if (choice.isAnswer) {
                    this.state.choices[index].status = 'correct'
                    this.forceUpdate()
                    this.setState({ score: this.state.score + this.state.stages[this.state.currentStage].score })
                    setTimeout(() => {
                        this.setState({
                            currentStage: this.state.currentStage + 1,
                            choices: [],
                        }, () => this.choiceGenerate())
                    }, 500)

                } else {
                    this.state.choices[index].status = 'wrong'
                    this.forceUpdate()
                    this.setState({ score: this.state.score - 4 })
                    setTimeout(() => {
                        this.state.choices[index].status = 'normal'
                        this.forceUpdate()
                    }, 750)
                }

            }
        })
    }

    skip() {
        this.setState({
            currentStage: this.state.currentStage + 1,
            choices: [],
            score: this.state.score - 2
        }, () => this.choiceGenerate())
    }

    backgroundColorChoice(status) {
        if (status == 'normal') {
            return {
                backgroundColor: '#FFFFE0',
                borderColor: '#FFA500'
            }
        } else if (status == 'correct') {
            return {
                backgroundColor: '#d8ffd8',
                borderColor: '#768976'
            }
        } else if (status == 'wrong') {
            return {
                backgroundColor: '#ffd8d8',
                borderColor: '#ff2727'
            }
        }
    }

    renderChoice() {
        let array = []

        this.state.choices.map((choice, index) => {
            array.push(
                <TouchableOpacity
                    key={index}
                    onPress={() => this.answer(choice.character)}
                    style={[styles.letterBottom, this.backgroundColorChoice(choice.status)]}
                >
                    <Text style={styles.letterText}>{choice.character.toUpperCase()}</Text>
                </TouchableOpacity>
            )
        })

        return array
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff3eb'
                }}
            >
                <BackButton onPress={() => this.props.goBack()} style={{ position: 'absolute', bottom: 50 }} />
                <View
                    style={{
                        width: 335,
                        justifyContent: 'space-between',
                        paddingTop: 50,
                        flexDirection: 'row'
                    }}
                >
                    <Text style={{ fontSize: 32 }}>00:59</Text>
                    <Text style={{ fontSize: 32 }}>{this.state.score}</Text>
                </View>

                <View style={{ alignItems: 'center', }}>
                    <Text style={{ fontSize: 40 }}>{this.state.missingWord.toUpperCase()}</Text>
                    <Image
                        source={this.state.stages[this.state.currentStage].imageSrc}
                        style={{
                            width: 175,
                            height: 175,
                            marginTop: 50
                        }}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 50
                        }}
                    >
                        {this.renderChoice()}
                    </View>
                </View>

                <View
                    style={{
                        width: 295,
                        alignItems: 'flex-end',
                        paddingBottom: 50,
                    }}
                >
                    <TouchableOpacity
                        style={[styles.letterBottom, { width: 120, height: 50, borderRadius: 12 }]}
                        onPress={() => this.skip()}
                    >
                        <Text style={{ fontSize: 24 }}>SKIP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    letterBottom: {
        width: 65,
        height: 65,
        borderWidth: 3,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#FFFFE0',
        borderColor: '#FFA500'
    },
    letterText: {
        fontSize: 28,
        color: "#555"
    }
})