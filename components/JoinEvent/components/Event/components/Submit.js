import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const Submit = ({enabled}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {enabled ? styles.enabled : styles.disabled}>
            <Text style = {styles.text}>Submit</Text>
        </TouchableOpacity>
    </View>
)

export default Submit

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',  
        marginTop: 10
    },

    enabled: {
        backgroundColor: 'green',
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
