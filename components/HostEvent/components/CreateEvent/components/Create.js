import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const Create = ({enabled}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {enabled ? styles.enabled : styles.disabled}>
            <Text style = {styles.text}>Create</Text>
        </TouchableOpacity>
    </View>
)

export default Create

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        alignItems: 'flex-end'
    },

    enabled: {
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 8
    },

    disabled: {
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 8
    },

    text: {
        fontWeight: '500'
    }
})