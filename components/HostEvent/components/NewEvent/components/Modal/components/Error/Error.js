import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const Error = ({message}) => (
    <View style = {styles.container}>
        <Image style = {styles.image} source = {require('./assets/error.png')}/>
        <Text style = {styles.text}>{message}</Text>
    </View>
)

export default Error

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    image: {
        height: 22,
        width: 22,
        tintColor: '#E01C10',
        marginRight: 6
    },

    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#E01C10'
    }
})