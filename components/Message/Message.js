import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const Message = ({message}) => {
    const image = {
        'noEvents': require('./assets/noEvents.png'),
        'disconnected': require('./assets/disconnected.png'),
        'bluetooth': require('./assets/bluetooth.png')
    }

    const text = {
        'noEvents': 'No Events Near You',
        'disconnected': 'No Internet Connection',
        'bluetooth': 'Please Enable Bluetooth'
    }

    return (
        <View style = {styles.container}>
            <Image 
                style = {styles.image} 
                source = {image[message]}
            />

            <Text style = {styles.text}>{text[message]}</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: '35%'
    },

    text: {
        fontSize: 18,
        color: '#CACACA',
        fontWeight: '600'
    },

    image: {
        height: 75,
        width: 75,
        resizeMode: 'contain',
        tintColor: '#CACACA',
        marginBottom: 6
    }
})