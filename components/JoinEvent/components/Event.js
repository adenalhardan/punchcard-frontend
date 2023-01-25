import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const Event = () => (
    <TouchableOpacity style = {styles.container}>
        <Text>Event</Text>
    </TouchableOpacity>
)

export default Event

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        marginBottom: 15,
        backgroundColor: 'yellow',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})