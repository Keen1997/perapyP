import { Audio } from 'expo-av'

export const playSound = async (uri) => {
    try {
        await Audio.Sound.createAsync(
            uri,
            { shouldPlay: true }
        )
    } catch (error) {
        Alert.alert(error)
    }
}