import React from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions, Animated} from 'react-native'

import {useSafeAreaInsets} from 'react-native-safe-area-context'

const underlineWidth = 100

const NavigationBar = ({page, onPress, offset}) => {
    const {width} = useWindowDimensions()
    const {top} = useSafeAreaInsets()

    const underlineMin = (width / 4) - (underlineWidth / 2)
    const underlineMax = (width * 3 / 4) - (underlineWidth / 2)

    return (
        <View style = {{...styles.container, height: top + 50}}>
            <View style = {{...styles.background, height: top + 50}}/>

            <TouchableOpacity 
                style = {{...styles.tab, opacity: page === 'join' ? 1 : 0.5}} 
                onPress = {() => onPress('join')}
            >
                <Text style = {styles.text}>Join</Text>
                <Image style = {styles.joinImage} source = {require('./assets/join.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style = {{...styles.tab, opacity: page === 'host' ? 1 : 0.5}} 
                onPress = {() => onPress('host')}
            >
                <Text style = {styles.text}>Host</Text>
                <Image style = {styles.hostImage} source = {require('./assets/host.png')}/>
            </TouchableOpacity>

            <Animated.View style = {{...styles.underline, left: offset.interpolate({
                inputRange: [0, width], 
                outputRange: [underlineMin, underlineMax],
                extrapolate: 'clamp'
            })}}/>
        </View>
    )
}

export default NavigationBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
    },

    background: {
        position: 'absolute', 
        resizeMode: 'stretch', 
        top: 0, 
        opacity: 0.95, 
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF'
    },

    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        height: '40%',
        width: '50%',
        flexDirection: 'row'
    },

    text: {
        color: '#212427',
        fontWeight: '500',
        fontSize: 18
    },

    joinImage: {
        height: 28,
        width: 28,
        marginLeft: 5,
        resizeMode: 'contain',
        tintColor: '#212427'
    },

    hostImage: {
        height: 35,
        width: 35,
        marginLeft: 8,
        resizeMode: 'contain',
        tintColor: '#212427'
    },

    underline: {
        backgroundColor: '#2F9BF7',
        height: 3,
        width: underlineWidth,
        position: 'absolute',
        bottom: 0,
        borderRadius: 5
    }
})