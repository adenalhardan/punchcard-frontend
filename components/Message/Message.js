import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const Message = ({disconnected, noEvents}) => (
    <View style = {styles.container}>
        <Image 
            style = {styles.image} 
            source = {disconnected ? require('./assets/disconnected.png') : require('./assets/noEvents.png')}
        />

        <Text style = {styles.text}>{disconnected ? 'No Internet Connection' : 'No Events Near You'}</Text>
    </View>
)

export default Message

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 100
    },

    text: {
        fontSize: 16,
        color: '#CACACA',
        fontWeight: '600'
    },

    image: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        tintColor: '#CACACA',
        marginBottom: 6
    }
})