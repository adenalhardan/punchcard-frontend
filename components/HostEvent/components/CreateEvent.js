import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const CreateEvent = () => (
    <TouchableOpacity style = {styles.container}>
        <Text>Create Event</Text>
    </TouchableOpacity>
)

export default CreateEvent

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        marginBottom: 15,
        backgroundColor: 'orange',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})