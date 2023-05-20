import React from 'react'
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import {deleteEvent} from '../../../../../../api'

const EndEvent = ({event, onDelete}) => {
    const onPress = () => {
        (async () => {
            try {
                const {hostId, title} = event
                await deleteEvent(hostId, title)
                onDelete()

            } catch(error) {
                console.error(error)
            }
        })()
    }

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress} activeOpacity = {0.5}>
            <LinearGradient colors = {['#FF4C40', '#EE3124', '#A10B01']} style = {styles.background}>
                <Text style = {styles.text}>End Event</Text>
                <Image style = {styles.image} source = {require('./assets/endEvent.png')}/>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default EndEvent

const styles = StyleSheet.create({
    container: {
        width: '48%',
        aspectRatio: 3.7
    },

    background: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF'
    },
    
    image: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        marginLeft: 8,
        tintColor: '#FFFFFF'
    }
})