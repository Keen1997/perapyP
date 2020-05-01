import React from 'react'
import { View, StatusBar } from 'react-native'
import Home from './HomeBK'
import Step from './Step'
import Achievement from './Achievement'
import Setting from './Setting'
import StepCount from '../../components/StepCount'
import Tutorial from './Tutorial'
import Shop from './Shop'
import Map from './Map'
import Minigame from './MinigameScreen'

export default class MainScreen extends React.Component {
    state = {
        screen: 'home'
    }

    changeScreen = screen => { this.setState({ screen }) }

    renderScreen() {
        switch (this.state.screen) {
            case 'home':
                return (
                    <Home
                        toStep={() => this.changeScreen('step')}
                        toAchievement={() => this.changeScreen('achievement')}
                        toSetting={() => this.changeScreen('setting')}
                        toMap={() => this.changeScreen('map')}
                        toMinigame={() => this.changeScreen('minigame')}
                        toShop={() => this.changeScreen('shop')}
                    />
                )
            case 'step':
                return <Step goBack={() => this.changeScreen('home')} />
            case 'achievement':
                return <Achievement goBack={() => this.changeScreen('home')} />
            case 'setting':
                return (
                    <Setting
                        goBack={() => this.changeScreen('home')}
                        goTutorial={() => this.changeScreen('tutorial')}
                    />
                )
            case 'tutorial':
                return <Tutorial play={() => this.changeScreen('home')} />
            case 'shop':
                return <Shop goBack={() => this.changeScreen('home')} />
            case 'map':
                return <Map goBack={() => this.changeScreen('home')} />
            case 'map':
                return <Map goBack={() => this.changeScreen('home')} />
            case 'minigame':
                return <Minigame goBack={() => this.changeScreen('home')} />
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor='#FF6969' />
                {this.renderScreen()}
                <StepCount />
            </View>
        )
    }
}