import React from 'react'
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Download = () => {
    const onPress = () => {}

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <LinearGradient colors = {['#5C9DF2', '#1E6FD9', '#0D65D9']} style = {styles.background}>
                <Text style = {styles.text}>Download</Text>
                <Image style = {styles.image} source = {require('./assets/download.png')}/>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Download

const styles = StyleSheet.create({
    container: {
        width: '48%',
        aspectRatio: 3.8
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
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 10,
        tintColor: '#FFFFFF'
    }
})