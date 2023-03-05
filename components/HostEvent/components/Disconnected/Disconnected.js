import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const Disconnected = () => (
    <View style = {styles.container}>
        <Image style = {styles.image} source = {require('./assets/disconnected.png')}/>
        <Text style = {styles.text}>No Internet Connection</Text>
    </View>
)

export default Disconnected

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 80
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