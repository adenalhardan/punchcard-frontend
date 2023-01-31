import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const Submit = () => (
    <View style = {styles.container}>
        <TouchableOpacity style = {styles.button}>
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

    button: {
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 8
    },

    text: {
        fontWeight: '500'
    }
})
